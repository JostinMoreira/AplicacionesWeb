export interface LoginCredentials {
  correo: string
  password: string
}

export interface RegisterData {
  nombre: string
  correo: string
  password: string
  rol?: string
}

export interface AuthUser {
  id: string
  nombre: string
  correo: string
  rol: string
  fecha_registro: string
  activo: boolean
}

export interface AuthContextType {
  user: AuthUser | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  loading: boolean
}
