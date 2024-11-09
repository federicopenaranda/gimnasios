import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  apellido: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  telefono: string;

  @Column({ type: 'text' })
  celular: string;

  @Column({ type: 'text' })
  cedula: string;

  @Column({ type: 'text', nullable: true })
  contrasena: string;

  @Column({ type: 'int4' })
  edad: number;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ type: 'text', nullable: true })
  cobertura_medica: string;

  @Column({ type: 'text', nullable: true })
  emergencia_movil: string;
}
