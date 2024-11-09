import { IsString, IsOptional, IsInt, IsDateString, Min } from 'class-validator';

export class UpdateUsuarioDto {
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
}
