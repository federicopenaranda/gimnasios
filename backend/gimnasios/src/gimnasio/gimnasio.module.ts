import { Module } from '@nestjs/common';
import { GimnasioController } from './gimnasio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gimnasio } from './entities/gimnasios.entity';
import { GimnasioService } from './gimnasio.service';
import { Ejercicio } from 'src/ejercicio/entities/ejercicios.entity';
import { Usuario } from 'src/usuario/entities/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Gimnasio,
      Ejercicio,
      Usuario
    ])
  ],
  controllers: [GimnasioController],
  providers: [GimnasioService]
})
export class GimnasioModule {}
