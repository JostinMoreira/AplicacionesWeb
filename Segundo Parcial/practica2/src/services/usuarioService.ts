import type { Usuario, CreateUsuarioInput } from "../types/Usuario"

// ✅ API Key actualizada
const SUPABASE_URL = "https://opcqraisjaklmggcyugz.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3FyYWlzamFrbG1nZ2N5dWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTI0ODAsImV4cCI6MjA2NzA2ODQ4MH0.b6jA10X_5dpG19bEjeSlZJ4DZw2BSFGyvjC1V8wI5Mc"
const API_BASE_URL = `${SUPABASE_URL}/rest/v1/usuarios`

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

const usuarioService = {
  async getAll(): Promise<Usuario[]> {
    try {
      console.log("🔍 Fetching usuarios from:", API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}?select=*&order=fecha_registro.desc`, {
        method: "GET",
        headers,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Error response:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ Usuarios loaded:", data.length)
      return data
    } catch (error) {
      console.error("❌ Error fetching usuarios:", error)
      throw error
    }
  },

  async create(usuario: CreateUsuarioInput): Promise<Usuario> {
    try {
      console.log("🔍 Creating usuario:", usuario)

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
        body: JSON.stringify(usuario),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Create error response:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log("✅ Usuario created:", result)
      return result[0]
    } catch (error) {
      console.error("❌ Error creating usuario:", error)
      throw error
    }
  },

  async update(id: string, usuario: Partial<CreateUsuarioInput>): Promise<Usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
        body: JSON.stringify(usuario),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Update error:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      return result[0]
    } catch (error) {
      console.error("❌ Error updating usuario:", error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: "DELETE",
        headers,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Delete error:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }
    } catch (error) {
      console.error("❌ Error deleting usuario:", error)
      throw error
    }
  },

  // ✅ Método para verificar si el usuario puede gestionar otros usuarios
  canManageUsers(userRole: string): boolean {
    return ["moderador", "editor", "admin"].includes(userRole)
  },
}

export default usuarioService
export { usuarioService }
