export interface Rutina{
  id: number;
  fk_id_usuario: number;
  fk_id_ejercicio: number;
  dia_semana: number;
  orden: number;
  nro_series: number;
  nro_repeticiones: number;
}