import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroEjercicio } from './entities/registro-ejercicio.entity';
import { Rutina } from './entities/rutina.entity';
import { UsuarioCondicion } from './entities/usuario-condicion.entity';
import { UsuarioGimnasio } from './entities/usuario-gimnasio.entity';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioService } from './usuario.service';
import { Gimnasio } from 'src/gimnasio/entities/gimnasios.entity';
import { Ejercicio } from 'src/ejercicio/entities/ejercicios.entity';
import { UsuarioContacto } from './entities/usuario-contacto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegistroEjercicio,
      Rutina,
      UsuarioCondicion,
      UsuarioGimnasio,
      Usuario,
      UsuarioContacto,
      UsuarioCondicion,
      Gimnasio,
      Ejercicio
    ])
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
