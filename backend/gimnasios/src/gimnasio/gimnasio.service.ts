import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGimnasioDto } from './dtos/create-gimnasio.dto';
import { UpdateGimnasioDto } from './dtos/update-gimnasio.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Gimnasio } from './entities/gimnasios.entity';
import { DataSource, Repository } from 'typeorm';
import { Ejercicio } from 'src/ejercicio/entities/ejercicios.entity';
import { CreateUsuarioGimnasioDto } from './dtos/create-usuario-gimnasio.dto';
import { UsuarioGimnasio } from 'src/usuario/entities/usuario-gimnasio.entity';

@Injectable()
export class GimnasioService {

    constructor(
        @InjectRepository(Gimnasio)
        private readonly gimnasioRepository: Repository<Gimnasio>,
        @InjectRepository(Ejercicio)
        private readonly ejercicioRepository: Repository<Ejercicio>,
        @InjectRepository(UsuarioGimnasio)
        private readonly usuarioGimnasioRepository: Repository<UsuarioGimnasio>,
        @InjectDataSource()
        private dataSource: DataSource,
    ) {}

    async getOne(id: number): Promise<Gimnasio> {
        const res = await this.gimnasioRepository.findOne({ where: { id } });
        if (!res) {
            throw new HttpException('Gimnasio no encontrado', HttpStatus.NOT_FOUND);
        }
        return res;
    }

    async getAll(): Promise<Gimnasio[]> {
        return await this.gimnasioRepository.find();
    }

    async create(dto: CreateGimnasioDto): Promise<Gimnasio> {
        const newRecObj = this.gimnasioRepository.create(dto);
        return await this.gimnasioRepository.save(newRecObj);
    }

    async update(dto: UpdateGimnasioDto, id: number): Promise<Partial<Gimnasio>> {
        const rec = await this.getOne(id);
        await this.gimnasioRepository.update(
            rec.id, 
            { ...dto }
        );
        return { id: rec.id, ...dto } as Partial<Gimnasio>;
    }

    async delete(id: number): Promise<Gimnasio> {
        const rec = await this.getOne(id);
        return await this.gimnasioRepository.remove(rec);
    }

    async gimnasioEjercicios(id: number): Promise<Ejercicio[]> {
        const rec = await this.getOne(id);
        return await this.ejercicioRepository.find({ where: { fk_id_gimnasio: rec.id } })
    }

    async gimnasioUsuarios(id: number): Promise<any> {
        return await this.dataSource.query(`
            SELECT 
                u.id, 
                u.nombre, 
                u.apellido, 
                u.email, 
                u.telefono, 
                u.celular, 
                u.edad, 
                u.fecha_nacimiento, 
                u.direccion, 
                u.cobertura_medica, 
                u.emergencia_movil
            FROM usuarios u 
            INNER JOIN usuario_gimnasio ug ON u.id = ug.fk_id_usuario 
            WHERE
                ug.fecha_fin IS NULL AND 
                ug.fk_id_gimnasio = ${id}
        `);
    }

    async registroUsuarioGimnasio(dto: CreateUsuarioGimnasioDto) {
        const newRecObj = this.usuarioGimnasioRepository.create(dto);
        return await this.usuarioGimnasioRepository.save(newRecObj);
    }

}
