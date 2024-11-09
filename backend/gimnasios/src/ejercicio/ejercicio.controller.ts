import { BadRequestException, Body, Controller, Delete, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { CreateEjercicioDto } from './dtos/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dtos/update-ejercicio.dto';
import { ServerResponse } from 'src/shared/server-response.model';

@Controller('ejercicio')
export class EjercicioController {
    constructor(private readonly ejercicioService: EjercicioService) { }

    @Post()
    async create(
        @Body() dto: CreateEjercicioDto
    ) {
        try {
            const res = await this.ejercicioService.create(dto);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Ejercicio creado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al crear el ejercicio.`
            } as ServerResponse);
        }
    }

    @Patch(':id')
    async update(
        @Body() dto: UpdateEjercicioDto,
        @Param('id') id: number,
    ) {
        try {
            const res = await this.ejercicioService.update(dto, id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Ejercicio actualizado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al actualizar el ejercicio.`
            } as ServerResponse);
        }
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number
    ) {
        try {
            const res = await this.ejercicioService.delete(id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Ejercicio eliminado.`
            } as ServerResponse;
        } catch(e) {
            throw new HttpException({
                success: false,
                statusCode: e.status,
                data: '',
                error: e.message,
                message: `Error al eliminar el ejercicio.`
            } as ServerResponse, e.status);
        }
    }

}
