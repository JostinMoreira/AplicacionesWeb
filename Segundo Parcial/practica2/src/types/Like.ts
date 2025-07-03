export interface Like {
  id: string
  usuario_id: string
  publicacion_id: string
  fecha_like: string
}

export interface PublicacionCompleta {
  id: string
  titulo: string
  contenido: string
  autor_id: string
  autor_nombre: string
  autor_correo: string
  fecha_creacion: string
  fecha_actualizacion: string
  estado: string
  tags: string[]
  total_likes: number
  total_comentarios: number
}
