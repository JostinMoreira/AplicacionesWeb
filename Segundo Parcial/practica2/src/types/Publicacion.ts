export interface Publicacion {
  id: string
  titulo: string
  contenido: string
  autor_id: string
  fecha_creacion: string
  fecha_actualizacion: string
  estado: string
  tags: string[]
}

export type CreatePublicacionInput = Omit<Publicacion, "id" | "fecha_creacion" | "fecha_actualizacion">
