import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario_contactos')
export class UsuarioContacto {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  fk_id_usuario: number;

  @Column({ type: 'text', nullable: false })
  telefono_contacto: string;

  @Column({ type: 'text', nullable: false })
  relacion_contacto: string;
}
