import { Module } from '@nestjs/common';
import { EjercicioController } from './ejercicio.controller';
import { Ejercicio } from './entities/ejercicios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjercicioService } from './ejercicio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ejercicio
    ])
  ],
  controllers: [EjercicioController],
  providers: [EjercicioService]
})
export class EjercicioModule {}
