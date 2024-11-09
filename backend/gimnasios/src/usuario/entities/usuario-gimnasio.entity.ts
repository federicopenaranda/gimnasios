import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario_gimnasio')
export class UsuarioGimnasio {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_usuario: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_gimnasio: number;

  @Column({ type: 'date', nullable: false })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin: Date;
}
