import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ejercicios')
export class Ejercicio {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_gimnasio: number;

  @Column({ type: 'text', nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  grupo_muscular: string;
}
