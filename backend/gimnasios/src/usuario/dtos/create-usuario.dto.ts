import { IsString, IsOptional, IsInt, IsDateString, Min, IsArray, ValidateNested } from 'class-validator';
import { CreateUsuarioContactoDto } from './create-usuario-contacto.dto';
import { CreateUsuarioCondicionDto } from './create-usuario-condicion.dto';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  celular: string;

  @IsString()
  cedula: string;

  @IsOptional()
  @IsString()
  contrasena?: string;

  @IsInt()
  @Min(0)
  edad: number;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: Date;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  cobertura_medica?: string;

  @IsOptional()
  @IsString()
  emergencia_movil?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUsuarioContactoDto)
  usuario_contacto: CreateUsuarioContactoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUsuarioCondicionDto)
  usuario_condicion: CreateUsuarioCondicionDto[]
}
