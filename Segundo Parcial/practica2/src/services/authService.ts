import type { LoginCredentials, RegisterData, AuthUser } from "../types/Auth"

const SUPABASE_URL = "https://opcqraisjaklmggcyugz.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3FyYWlzamFrbG1nZ2N5dWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTI0ODAsImV4cCI6MjA2NzA2ODQ4MH0.b6jA10X_5dpG19bEjeSlZJ4DZw2BSFGyvjC1V8wI5Mc"

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

// Función simple de hash (en producción usar bcrypt)
function simpleHash(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16)
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      console.log("🔍 Attempting login for:", credentials.correo)

      const hashedPassword = simpleHash(credentials.password)

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/usuarios?correo=eq.${credentials.correo}&password=eq.${hashedPassword}&select=*`,
        {
          method: "GET",
          headers,
        },
      )

      if (!response.ok) {
        throw new Error("Error en la conexión")
      }

      const users = await response.json()

      if (users.length === 0) {
        throw new Error("Credenciales incorrectas")
      }

      const user = users[0]
      console.log("✅ Login successful:", user.nombre)
      return user
    } catch (error) {
      console.error("❌ Login error:", error)
      throw error
    }
  },

  async register(data: RegisterData): Promise<AuthUser> {
    try {
      console.log("🔍 Registering user:", data.correo)

      // Verificar si el usuario ya existe
      const existingResponse = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?correo=eq.${data.correo}&select=id`, {
        method: "GET",
        headers,
      })

      const existingUsers = await existingResponse.json()
      if (existingUsers.length > 0) {
        throw new Error("El correo ya está registrado")
      }

      // Crear nuevo usuario
      const hashedPassword = simpleHash(data.password)

      const response = await fetch(`${SUPABASE_URL}/rest/v1/usuarios`, {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          nombre: data.nombre,
          correo: data.correo,
          password: hashedPassword,
          rol: data.rol || "usuario",
          activo: true,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error al registrar: ${errorText}`)
      }

      const result = await response.json()
      const newUser = result[0]

      console.log("✅ Registration successful:", newUser.nombre)
      return newUser
    } catch (error) {
      console.error("❌ Registration error:", error)
      throw error
    }
  },
}

export default authService
