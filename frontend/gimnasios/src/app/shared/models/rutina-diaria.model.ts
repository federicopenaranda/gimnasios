export interface RutinaDiaria{
  id: number;
  fk_id_gimnasio: number;
  nombre: string;
  descripcion: string;
  grupo_muscular: string;
  fk_id_usuario: number;
  fk_id_ejercicio: number;
  dia_semana: number;
  orden: number;
  nro_series: number;
  nro_repeticiones: number;
}