import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from './entities/ejercicios.entity';
import { Repository } from 'typeorm';
import { CreateEjercicioDto } from './dtos/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dtos/update-ejercicio.dto';

@Injectable()
export class EjercicioService {

    constructor(
        @InjectRepository(Ejercicio)
		private readonly ejercicioRepository: Repository<Ejercicio>,
    ) {}


    async create(dto: CreateEjercicioDto): Promise<Ejercicio> {
        const found = await this.ejercicioRepository.find({
            where: { nombre: dto.nombre, fk_id_gimnasio: dto.fk_id_gimnasio }
        });
        if ( found.length ) {
            throw new BadRequestException('Ejercicio repetido en gimnasio.');
        }
        const newRecObj = this.ejercicioRepository.create(dto);
        return await this.ejercicioRepository.save(newRecObj);
    }

    async update(dto: UpdateEjercicioDto, id: number): Promise<Ejercicio> {
        const found = await this.ejercicioRepository.findOne({
            where: { id, fk_id_gimnasio: dto.fk_id_gimnasio }
        });
        if ( !found ) {
            throw new NotFoundException('Ejercicio no encontrado en gimnasio.');
        }
        await this.ejercicioRepository.update(id, dto);
        return { id: found.id, ...dto } as Ejercicio;
    }

    async delete(id: number): Promise<Ejercicio> {
        const found = await this.ejercicioRepository.findOne({ where: { id } });
        if ( !found ) {
            throw new HttpException(`Ejercicio no encontrado en gimnasio.`, HttpStatus.NOT_FOUND);
        }
        return await this.ejercicioRepository.remove(found);
    }

}
