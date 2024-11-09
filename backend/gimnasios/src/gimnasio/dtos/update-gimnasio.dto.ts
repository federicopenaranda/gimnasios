import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateGimnasioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  celular_whatsapp?: string;

  @IsOptional()
  @IsString()
  sitio_web?: string;
}
