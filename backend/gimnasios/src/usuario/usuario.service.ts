import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { format, isMatch, isValid, parse } from 'date-fns';

import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { CreateUsuarioRegistroDto } from './dtos/create-usuario-registro.dto';
import { CreateUsuarioContactoDto } from './dtos/create-usuario-contacto.dto';
import { CreateUsuarioCondicionDto } from './dtos/create-usuario-condicion.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioContacto } from './entities/usuario-contacto.entity';
import { UsuarioCondicion } from './entities/usuario-condicion.entity';
import { RegistroEjercicio } from './entities/registro-ejercicio.entity';
import { CreateUsuarioRutinaDto } from './dtos/create-usuario-rutina.dto';
import { Rutina } from './entities/rutina.entity';
import { UsuarioGimnasio } from './entities/usuario-gimnasio.entity';


@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(UsuarioContacto)
        private readonly usuarioContactoRepository: Repository<UsuarioContacto>,
        @InjectRepository(UsuarioCondicion)
        private readonly usuarioCondicionRepository: Repository<UsuarioCondicion>,
        @InjectRepository(RegistroEjercicio)
        private readonly registroEjercicioRepository: Repository<RegistroEjercicio>,
        @InjectRepository(Rutina)
        private readonly rutinaRepository: Repository<Rutina>,
        @InjectRepository(UsuarioGimnasio)
        private readonly usuarioGimnasioRepository: Repository<UsuarioGimnasio>,
        @InjectDataSource()
        private dataSource: DataSource,
    ) {}


    async getOne(id: number): Promise<any> {
        const res = await this.usuarioRepository.findOne({ where: { id } });
        if (!res) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { contrasena, ...rest} = res;

        const usuarioContactos = await this.usuarioContactoRepository.find({ where: { fk_id_usuario: id } });
        const usuarioCondiciones = await this.usuarioCondicionRepository.find({ where: { fk_id_usuario: id } });

        return {
            ...rest, 
            usuario_contacto: [...usuarioContactos],
            usuario_condicion: [...usuarioCondiciones],
        };
    }

    async getAll(): Promise<Partial<Usuario>[]> {
        const res = await this.usuarioRepository.find();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const usuarios = [ ...res.map( ({ contrasena, ...rest}) => ({ ...rest }) ) ];

        const usuariosPromise = usuarios.map( (usr) => this.getOne(usr.id));
        const usuarios2 = Promise.all(usuariosPromise);

        return usuarios2;
    }

    async create(dto: CreateUsuarioDto): Promise<Partial<Usuario>> {
        const { usuario_contacto, usuario_condicion, ...usuario } = dto;

        const found = await this.usuarioRepository.find({ where: { email: usuario.email } });
        if ( found.length ) {
            throw new Error('Email repetido');
        }

        const newRecObj = this.usuarioRepository.create(usuario);
        const usuarioDb = await this.usuarioRepository.save(newRecObj);

        // Guardar contactos
        const newRecContactos = usuario_contacto.map(
            (contacto) => {
                const newContacto = this.usuarioContactoRepository.create(contacto);
                newContacto.fk_id_usuario = usuarioDb.id;
                return newContacto;
            }
        );
        await this.usuarioContactoRepository.save(newRecContactos);

        // Guardar condiciones
        const newRecCondiciones = usuario_condicion.map(
            (condicion) => {
                const newCondicion = this.usuarioCondicionRepository.create(condicion);
                newCondicion.fk_id_usuario = usuarioDb.id;
                return newCondicion;
            }
        );
        await this.usuarioCondicionRepository.save(newRecCondiciones);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { contrasena, ...rest } = dto;
        return { ...rest, id: usuarioDb.id};
    }

    async update(dto: UpdateUsuarioDto, id: number): Promise<Partial<Usuario>> {
        const rec = await this.getOne(id);
        if (rec.email !== dto.email) {
            const found = await this.usuarioRepository.find({ where: { email: dto.email } });
            if ( found.length ) {
                throw new Error('Email repetido');
            }
        }

        const { raw } = await this.usuarioRepository.update(
            id, 
            { ...dto }
        );
        return raw as Partial<Usuario>;
    }

    async usuarioRutina(id: number): Promise<any> {
        return await this.dataSource.query(
            `SELECT e.*, u.nombre, u.apellido, r.dia_semana, r.orden 
            FROM ejercicios e 
                INNER JOIN rutina r ON r.fk_id_ejercicio = e.id 
                INNER JOIN usuarios u ON u.id = r.fk_id_usuario 
            WHERE u.id = ${id}
            ORDER BY r.orden asc`
        );
    }

    async createUsuarioContacto(dto: CreateUsuarioContactoDto, id: number): Promise<UsuarioContacto> {
        const rec = await this.getOne(id);
        const newRecObj = this.usuarioContactoRepository.create(dto);
        newRecObj.fk_id_usuario = rec.id;
        return await this.usuarioContactoRepository.save(newRecObj);
    }

    async createUsuarioRegistro(dto: CreateUsuarioRegistroDto, id: number): Promise<RegistroEjercicio> {
        const rec = await this.getOne(id);
        const newRecObj = this.registroEjercicioRepository.create(dto);
        newRecObj.fk_id_usuario = rec.id;
        return await this.registroEjercicioRepository.save(newRecObj);
    }

    async getUsuarioContactos(id: number): Promise<UsuarioContacto[]> {
        const rec = await this.getOne(id);
        return await this.usuarioContactoRepository.find({ where: { fk_id_usuario: rec.id } });
    }

    async updateUsuarioContacto(dto: CreateUsuarioContactoDto, id: number, usuarioId: number): Promise<Partial<UsuarioContacto>> {
        await this.getOne(usuarioId);
        const { raw } = await this.usuarioContactoRepository.update(
            id, 
            { ...dto }
        );
        return raw as Partial<UsuarioContacto>;
    }

    async deleteUsuarioContacto(id: number, usuarioId: number): Promise<UsuarioContacto> {
        await this.getOne(usuarioId);
        const usuarioContacto = await this.usuarioContactoRepository.findOne({where: { id }});
        return await this.usuarioContactoRepository.remove(usuarioContacto);
    }

    async usuarioCondiciones(id: number): Promise<UsuarioCondicion[]> {
        const rec = await this.getOne(id);
        return await this.usuarioCondicionRepository.find({ where: { fk_id_usuario: rec.id } });
    }

    async createUsuarioCondicion(dto: CreateUsuarioCondicionDto, id: number): Promise<UsuarioCondicion> {
        const rec = await this.getOne(id);
        const newRecObj = this.usuarioCondicionRepository.create(dto);
        newRecObj.fk_id_usuario = rec.id;
        return await this.usuarioCondicionRepository.save(newRecObj);
    }

    async updateUsuarioCondicion(dto: CreateUsuarioCondicionDto, id: number, usuarioId: number): Promise<UsuarioCondicion> {
        await this.getOne(usuarioId);
        const { raw } = await this.usuarioCondicionRepository.update(
            id, 
            { ...dto }
        );
        return raw as UsuarioCondicion;
    }

    async deleteUsuarioCondicion(id: number, usuarioId: number): Promise<UsuarioCondicion> {
        await this.getOne(usuarioId);
        const usuarioCondicion = await this.usuarioCondicionRepository.findOne({where: { id }});
        return await this.usuarioCondicionRepository.remove(usuarioCondicion);
    }

    async usuarioRutinaDia(id: number, fecha: string | undefined): Promise<any> {
        let fechaOk = format(new Date(), 'yyyy-MM-dd');
        if (fecha) {
            // Revisar si fecha está en el formato correcto y existe
            const isValidDate = isMatch(fecha, 'yyyy-MM-dd') && 
                isValid(parse(fecha, 'yyyy-MM-dd', new Date()));
            if (!isValidDate) {
                throw new HttpException(`Formato de fecha equivocado o fecha inexistente.`, HttpStatus.BAD_REQUEST);
            }
            fechaOk = fecha;
        }

        return await this.dataSource.query(
            `SELECT e.*, r.*, re2.repeticiones as re_repeticiones, re2.peso as re_peso
                FROM 
                    ejercicios e
                INNER JOIN 
                    rutina r ON r.fk_id_ejercicio = e.id
                INNER JOIN 
                    usuarios u ON u.id = r.fk_id_usuario
                LEFT JOIN (
                    SELECT re.fk_id_usuario, re.fk_id_ejercicio, re.repeticiones, re.peso
                    FROM registro_ejercicios re
                    WHERE re.fk_id_usuario = ${id}
                    order by re.fecha desc
                    limit 1
                ) re2 ON re2.fk_id_ejercicio = e.id AND re2.fk_id_usuario = u.id
                WHERE 
                    u.id = ${id}
                    AND r.dia_semana = (
                        SELECT EXTRACT(ISODOW FROM '${fechaOk}'::date) AS iso_day_number
                        --SELECT EXTRACT(ISODOW FROM CURRENT_DATE) AS iso_day_number
                    )
                ORDER BY 
                    r.orden ASC;`
        );
    }

    async guardaUsuarioRutina(dto: CreateUsuarioRutinaDto[], id: number): Promise<any> {
        if ( dto.length === 0 ) {
            throw new HttpException(`Rutina vacía`, HttpStatus.BAD_REQUEST);
        }

        // Rutinas nuevas
        const newRecRutina = dto
            .filter( (rutina) => !rutina.id )
            .map(
                (rutina) => {
                    const newRutina = this.rutinaRepository.create(rutina);
                    newRutina.fk_id_usuario = id;
                    return newRutina;
                }
            );
        await this.rutinaRepository.save(newRecRutina);


        // Rutinas para actualizar
        const updateRecRutina = dto
            .filter( (rutina) => rutina.id )
            .map( (rutina) => {
                rutina['fk_id_usuario'] = id;
                return rutina;
            })
            .map(
                (rutina) => this.rutinaRepository.update(rutina.id, rutina)
            );
        await Promise.all(updateRecRutina);

        return;
    }

    async deleteUsuarioRutina(id: number, usuarioId: number): Promise<any> {
        await this.getOne(usuarioId);
        const usuarioRutina = await this.rutinaRepository.findOne({
            where: {
                id, fk_id_usuario: usuarioId
            }});
        return await this.rutinaRepository.remove(usuarioRutina);
    }

    async usuarioGimnasio(id: number): Promise<UsuarioGimnasio[]> {
        return await this.usuarioGimnasioRepository.find({ where: { fk_id_usuario: id } });
    }


}
