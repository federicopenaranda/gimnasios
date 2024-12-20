import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('registro_ejercicios')
@Unique(['fk_id_ejercicio', 'fecha', 'serie'])
export class RegistroEjercicio {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_usuario: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_ejercicio: number;

  @Column({ type: 'int4', nullable: false })
  repeticiones: number;

  @Column({ type: 'smallint', nullable: false })
  serie: number;

  @Column({ type: 'int4', nullable: true })
  peso: number;

  @Column({ type: 'date', nullable: false })
  fecha: Date;
}
