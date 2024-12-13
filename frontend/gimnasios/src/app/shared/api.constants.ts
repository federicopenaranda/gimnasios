import { environment } from "../../environments/environment";

const API_URL = environment.API_URL
const WEB_URL = environment.WEB_URL

export const CONSTANTS = {
  get_gimnasio: `${API_URL}/gimnasio`,
  get_gimnasio_usuarios: `${API_URL}/gimnasio/:id/usuarios`,
  get_gimnasio_ejercicios: `${API_URL}/gimnasio/:id/ejercicios`,
  get_usuario_rutina: `${API_URL}/usuario/:id/rutina`,
  get_usuario_rutina_dia: `${API_URL}/usuario/:id/rutina/dia/`,
  get_usuario: `${API_URL}/usuario/`,
  editar_gimnasio: `${API_URL}/gimnasio`,
  editar_usuario: `${API_URL}/usuario/`,
  editar_usuario_condicion_edit: `${API_URL}/usuario/:id/condicion`,
  editar_usuario_condicion_add: `${API_URL}/usuario/:id/condicion/`,
  editar_usuario_contacto_edit: `${API_URL}/usuario/:id/contacto`,
  editar_usuario_contacto_add: `${API_URL}/usuario/:id/contacto/`,
  editar_ejercicio: `${API_URL}/ejercicio/`,
  crear_ejercicio: `${API_URL}/ejercicio`,
  crear_usuario: `${API_URL}/usuario`,
  crear_usuario_gimnasio: `${API_URL}/gimnasio/registroUsuario`,
  crear_rutina: `${API_URL}/usuario/:id/rutina`,
  crear_usuario_registro: `${API_URL}/usuario/:id/registro`,
  eliminar_ejercicio: `${API_URL}/ejercicio`,
  eliminar_rutina: `${API_URL}/usuario/:id/rutina`,

}