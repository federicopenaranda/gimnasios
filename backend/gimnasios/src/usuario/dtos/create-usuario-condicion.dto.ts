import { IsString } from 'class-validator';

export class CreateUsuarioCondicionDto {
  @IsString()
  tipo_condicion: string;

  @IsString()
  descripcion: string;
}