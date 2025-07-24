export interface IPublicacion {
  id: number
  titulo: string
  contenido: string
  tipo: "queja" | "idea"
  categoria: string
  usuarioId: number
  usuarioNombre: string
  fechaCreacion: Date
  estado: "pendiente" | "en_revision" | "resuelta" | "rechazada"
  prioridad: "baja" | "media" | "alta"
}
