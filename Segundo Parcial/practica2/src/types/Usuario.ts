export interface Usuario {
  id: string
  nombre: string
  correo: string
  rol: string
  fecha_registro: string
  activo: boolean
}

export type CreateUsuarioInput = Omit<Usuario, "id" | "fecha_registro">
