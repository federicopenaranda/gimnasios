import { IsString } from 'class-validator';

export class CreateUsuarioContactoDto {
  @IsString()
  telefono_contacto: string;

  @IsString()
  relacion_contacto: string;
}
