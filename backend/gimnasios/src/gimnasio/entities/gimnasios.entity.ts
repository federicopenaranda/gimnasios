import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gimnasios')
export class Gimnasio {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ type: 'text', nullable: true, unique: true })
  celular_whatsapp: string;

  @Column({ type: 'text', nullable: true })
  sitio_web: string;
}
