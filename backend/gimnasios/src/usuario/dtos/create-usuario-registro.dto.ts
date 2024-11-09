import { IsOptional, IsInt, IsDateString, IsPositive } from 'class-validator';

export class CreateUsuarioRegistroDto {
  
  @IsInt()
  @IsPositive()
  fk_id_ejercicio: number;

  @IsInt()
  @IsPositive()
  repeticiones: number;

  @IsInt()
  @IsPositive()
  serie: number;

  @IsOptional()
  @IsInt()
  peso?: number;

  @IsDateString()
  fecha: Date;

}
