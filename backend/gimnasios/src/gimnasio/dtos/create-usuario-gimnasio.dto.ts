import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { IsFutureDate } from 'src/shared/custom-validators';

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
  @IsFutureDate({ message: 'La fecha de fin debe estar en el futuro.' })
  fecha_fin?: string;
}
