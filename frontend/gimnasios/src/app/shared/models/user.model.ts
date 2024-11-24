export interface UserContacto{
  id: number;
  fk_id_usuario: number;
  telefono_contacto: string;
  relacion_contacto: string;
}

export interface UserCondicion{
  id: number;
  fk_id_usuario: number;
  tipo_condicion: string;
  descripcion: string;
}

export interface User{
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  celular: string;
  cedula: string;
  contrasena: string;
  edad: number;
  fecha_nacimiento: Date;
  direccion: string;
  cobertura_medica: string;
  emergencia_movil: string;
  usuario_contacto: UserContacto[];
  usuario_condicion: UserCondicion[];
}