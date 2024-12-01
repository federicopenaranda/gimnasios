import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { GimnasioService } from './gimnasio.service';
import { CreateGimnasioDto } from './dtos/create-gimnasio.dto';
import { UpdateGimnasioDto } from './dtos/update-gimnasio.dto';
import { ServerResponse } from 'src/shared/server-response.model';
import { CreateUsuarioGimnasioDto } from './dtos/create-usuario-gimnasio.dto';

@Controller('gimnasio')
export class GimnasioController {
    constructor(private readonly gimnasioService: GimnasioService) { }

	@Get()
	async getAll() {
        try {
            const res = await this.gimnasioService.getAll();
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Lista de gimnasios.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al listar los gimnasios.`
            } as ServerResponse);
        }
    }

    @Get(':id')
	async getOne(
        @Param('id') id: number
    ) {
        try {
            const res = await this.gimnasioService.getOne(+id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Datos de gimnasio.`
            } as ServerResponse;
        } catch(e) {
            throw new HttpException({
                success: false,
                statusCode: e.status,
                data: '',
                error: e.message,
                message: `Error al listar el gimnasio.`
            } as ServerResponse, e.status);
        }
    }

    @Post()
    async create(
        @Body() dto: CreateGimnasioDto
    ) {
        try {
            const res = await this.gimnasioService.create(dto);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Gimnasio creado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al crear el gimnasio.`
            } as ServerResponse);
        }
    }
    
    @Patch(':id')
    async update(
        @Body() dto: UpdateGimnasioDto,
        @Param('id') id: number
    ) {
        try {
            const res = await this.gimnasioService.update(dto, +id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Gimnasio actualizado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al actualizar el gimnasio.`
            } as ServerResponse);
        }
    }
    
    @Delete(':id')
    async delete(
        @Param('id') id: number
    ) {
        try {
            const res = await this.gimnasioService.delete(+id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Gimnasio eliminado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al eliminar el gimnasio.`
            } as ServerResponse);
        }
    }

    @Get(':id/ejercicios')
	async getGimnasioEjercicios(
        @Param('id') id: number
    ) {
        try {
            const res = await this.gimnasioService.gimnasioEjercicios(+id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Ejercicios de gimnasio devueltos.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al listar los ejercicios del gimnasio.`
            } as ServerResponse);
        }
    }

    @Get(':id/usuarios')
	async getGimnasioUsuarios(
        @Param('id') id: number
    ) {
        try {
            const res = await this.gimnasioService.gimnasioUsuarios(+id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Usuarios del gimnasio devueltos.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al listar los usuarios del gimnasio.`
            } as ServerResponse);
        }
    }

    @Post('registroUsuario')
    async postRegistroUsuarioGimnasio(
        @Body() dto: CreateUsuarioGimnasioDto
    ) {
        try {
            const res = await this.gimnasioService.registroUsuarioGimnasio(dto);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Usuario registrado en Gimnasio.`
            } as ServerResponse;
        } catch(e) {
            throw new HttpException({
                success: false,
                statusCode: e.status,
                data: '',
                error: e.message,
                message: `Error al registrar el usuario.`
            } as ServerResponse, e.status);
        }
    }

}
