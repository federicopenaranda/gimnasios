import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario_condiciones')
export class UsuarioCondicion {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_usuario: number;

  @Column({ type: 'text', nullable: false })
  tipo_condicion: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}
