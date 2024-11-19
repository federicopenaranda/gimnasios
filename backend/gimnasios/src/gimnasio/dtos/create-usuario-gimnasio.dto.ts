import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateUsuarioGimnasioDto {
  @IsNotEmpty()
  @IsNumber()
  fk_id_usuario: number;

  @IsNotEmpty()
  @IsNumber()
  fk_id_gimnasio: number;

  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: string;

  @IsOptional()
  @IsDateString()
  fecha_fin?: string;
}
