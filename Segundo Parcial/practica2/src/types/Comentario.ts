export interface Comentario {
  id: string
  contenido: string
  usuario_id: string
  publicacion_id: string
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface ComentarioCompleto {
  id: string
  contenido: string
  usuario_id: string
  usuario_nombre: string
  usuario_correo: string
  publicacion_id: string
  fecha_creacion: string
  fecha_actualizacion: string
}

export type CreateComentarioInput = {
  contenido: string
  publicacion_id: string
}
