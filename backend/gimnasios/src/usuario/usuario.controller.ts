import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { CreateUsuarioRegistroDto } from './dtos/create-usuario-registro.dto';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { CreateUsuarioContactoDto } from './dtos/create-usuario-contacto.dto';
import { CreateUsuarioCondicionDto } from './dtos/create-usuario-condicion.dto';
import { ServerResponse } from 'src/shared/server-response.model';
import { CreateUsuarioRutinaDto } from './dtos/create-usuario-rutina.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @Get()
	async getAll() {
        try {
            const res = await this.usuarioService.getAll();
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Lista de Usuarios.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al listar los usuarios.`
            } as ServerResponse);
        }
    }

    @Get(':id')
	async getOne(
        @Param('id') id: number
    ) {
        try {
            const res = await this.usuarioService.getOne(+id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Datos de Usuario.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al listar el usuario.`
            } as ServerResponse);
        }
    }

    @Post()
    async create(
        @Body() dto: CreateUsuarioDto
    ) {
        try {
            const res = await this.usuarioService.create(dto);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Usuario creado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al crear usuario.`
            } as ServerResponse);
        }
    }

    @Patch(':id')
    async update(
        @Body() dto: UpdateUsuarioDto,
        @Param('id') id: number
    ) {
        try {
            const res = await this.usuarioService.update(dto, +id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Usuario actualizado.`
            } as ServerResponse;
        } catch(e) {
            throw new HttpException({
                success: false,
                statusCode: e.status,
                data: '',
                error: e.message,
                message: `Error al actualizar el usuario.`
            } as ServerResponse, e.status);
        }
    }

    // Devuelve la rutina que corresponde al día actual (si no se pasa una fecha)
    // o devuelve la rutina del día de la fecha que se envía en el parámetro :fecha
    @Get(':id/rutina/dia/:fecha?')
	async getUsuarioRutinaDia(
        @Param('id') id: number,
        @Param('fecha') fecha?: string
    ) {
        try {
            const res = await this.usuarioService.usuarioRutinaDia(+id, fecha);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Rutina diaria devuelta.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al obtener la rutina del día.`
            } as ServerResponse);
        }
    }

    // Devuelve toda la rutina del usuario
    @Get(':id/rutina')
	async getUsuarioRutina(
        @Param('id') id: number
    ) {
        try {
            const res = await this.usuarioService.usuarioRutina(+id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Rutina de usuario devuelta.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al obtener la rutina del usuario.`
            } as ServerResponse);
        }
    }

    @Post(':id/rutina')
	async guardaUsuarioRutina(
        @Param('id') id: number,
        @Body() dto: CreateUsuarioRutinaDto[]
    ) {
        try {
            const res = await this.usuarioService.guardaUsuarioRutina(dto, id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Rutina de usuario creada.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al crear la rutina del usuario.`
            } as ServerResponse);
        }
    }

    @Delete(':usuarioId/rutina/:id')
    async deleteUsuarioRutina(
        @Param('id') id: number,
        @Param('usuarioId') usuarioId: number,
    ) {
        try {
            const res = await this.usuarioService.deleteUsuarioRutina(+id, usuarioId);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Rutina de usuario eliminado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al eliminar la rutina del usuario.`
            } as ServerResponse);
        }
    }

    @Get(':id/contactos')
	async getUsuarioContactos(
        @Param('id') id: number
    ) {
        try {
            const res = await this.usuarioService.getUsuarioContactos(+id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Contactos de usuario devueltos.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al obtener los contactos del usuario.`
            } as ServerResponse);
        }
    }

    @Post(':id/contacto')
    async createUsuarioContacto(
        @Param('id') id: number, // id de Usuario
        @Body() dto: CreateUsuarioContactoDto
    ) {
        try {
            const res = await this.usuarioService.createUsuarioContacto(dto, +id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Contacto de usuario creado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al crear el contacto del usuario.`
            } as ServerResponse);
        }
    }

    @Patch(':usuarioId/contacto/:id')
    async updateUsuarioContacto(
        @Param('id') id: number,
        @Param('usuarioId') usuarioId: number,
        @Body() dto: CreateUsuarioContactoDto
    ) {
        try {
            const res = await this.usuarioService.updateUsuarioContacto(dto, id, usuarioId);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Contacto de usuario actualizado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al actualizar el contacto del usuario.`
            } as ServerResponse);
        }
    }

    @Delete(':usuarioId/contacto/:id')
    async deleteUsuarioContacto(
        @Param('id') id: number,
        @Param('usuarioId') usuarioId: number,
    ) {
        try {
            const res = await this.usuarioService.deleteUsuarioContacto(+id, usuarioId);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Contacto de usuario eliminado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al eliminar el contacto del usuario.`
            } as ServerResponse);
        }
    }

    @Get(':id/condiciones')
	async getUsuarioCondiciones(
        @Param('id') id: number
    ) {
        try {
            const res = await this.usuarioService.usuarioCondiciones(+id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Condiciones del usuario devueltos.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al obtener las condiciones del usuario.`
            } as ServerResponse);
        }
    }

    @Post(':id/condicion')
    async createUsuarioCondicion(
        @Param('id') id: number,
        @Body() dto: CreateUsuarioCondicionDto
    ) {
        try {
            const res = await this.usuarioService.createUsuarioCondicion(dto, +id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Condicion de usuario creado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al crear la condicion del usuario.`
            } as ServerResponse);
        }
    }

    @Patch(':usuarioId/condicion/:id')
    async updateUsuarioCondicion(
        @Param('id') id: number,
        @Param('usuarioId') usuarioId: number,
        @Body() dto: CreateUsuarioCondicionDto
    ) {
        try {
            const res = await this.usuarioService.updateUsuarioCondicion(dto, id, usuarioId);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Condición de usuario actualizado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al actualizar la condición del usuario.`
            } as ServerResponse);
        }
    }

    @Delete(':usuarioId/condicion/:id')
    async deleteUsuarioCondicion(
        @Param('id') id: number,
        @Param('usuarioId') usuarioId: number,
    ) {
        try {
            const res = await this.usuarioService.deleteUsuarioCondicion(+id, usuarioId);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Condición de usuario eliminado.`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al eliminar la condición del usuario.`
            } as ServerResponse);
        }
    }
   
    @Post(':id/registro')
    async createUsuarioRegistro(
        @Param('id') id: number,
        @Body() dto: CreateUsuarioRegistroDto
    ) {
        try {
            const res = await this.usuarioService.createUsuarioRegistro(dto, +id);
            return {
                success: true,
                statusCode: HttpStatus.OK,
                data: res,
                error: '',
                message: `Ejercicio registrado`
            } as ServerResponse;
        } catch(e) {
            throw new BadRequestException({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                data: '',
                error: e.message,
                message: `Error al registrar el usuario.`
            } as ServerResponse);
        }
    }

}
