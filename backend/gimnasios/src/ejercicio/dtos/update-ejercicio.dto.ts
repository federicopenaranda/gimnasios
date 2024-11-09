import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateEjercicioDto {
  @IsNotEmpty()
  @IsNumber()
  fk_id_gimnasio: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  grupo_muscular?: string;
}
