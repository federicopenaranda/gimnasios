export interface usuarioGimnasio{
  id: number;
  fk_id_usuario: number;
  fk_id_gimnasio: number;
  fecha_inicio: Date;
  fecha_fin?: Date;
}