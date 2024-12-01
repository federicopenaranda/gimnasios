import { IsInt, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class CreateUsuarioRutinaDto {

  @IsOptional()
  @IsNumber()
  id: number | null;

  @IsInt()
  @IsPositive()
  fk_id_ejercicio: number;

  @IsInt()
  @Min(1)
  @Max(7)
  @IsPositive()
  dia_semana: number;

  @IsInt()
  @IsPositive()
  orden: number;

  @IsInt()
  @IsPositive()
  nro_series: number;

  @IsInt()
  @IsPositive()
  nro_repeticiones: number;
}