import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rutina')
export class Rutina {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_usuario: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_ejercicio: number;

  @Column({ type: 'smallint', nullable: false })
  dia_semana: number;

  @Column({ type: 'smallint', nullable: false })
  orden: number;
}
