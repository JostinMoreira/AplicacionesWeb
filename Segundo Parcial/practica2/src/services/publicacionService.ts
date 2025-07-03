import type { Publicacion, CreatePublicacionInput } from "../types/Publicacion"

// ✅ API Key actualizada
const SUPABASE_URL = "https://opcqraisjaklmggcyugz.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3FyYWlzamFrbG1nZ2N5dWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTI0ODAsImV4cCI6MjA2NzA2ODQ4MH0.b6jA10X_5dpG19bEjeSlZJ4DZw2BSFGyvjC1V8wI5Mc"
const API_BASE_URL = `${SUPABASE_URL}/rest/v1/publicaciones`

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

const publicacionService = {
  async getAll(): Promise<Publicacion[]> {
    try {
      console.log("🔍 Fetching publicaciones from:", API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}?select=*&order=fecha_creacion.desc`, {
        method: "GET",
        headers,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Error response:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ Publicaciones loaded:", data.length)
      return data
    } catch (error) {
      console.error("❌ Error fetching publicaciones:", error)
      throw error
    }
  },

  async create(publicacion: CreatePublicacionInput): Promise<Publicacion> {
    try {
      console.log("🔍 Creating publicacion:", publicacion)

      const payload = {
        titulo: publicacion.titulo,
        contenido: publicacion.contenido,
        // ✅ Hacer autor_id opcional - usar null si no se proporciona o es inválido
        autor_id: publicacion.autor_id && publicacion.autor_id.trim() !== "" ? publicacion.autor_id : null,
        estado: publicacion.estado || "borrador",
        tags: publicacion.tags || [],
      }

      console.log("📤 Sending payload:", payload)

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Create error response:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log("✅ Publicacion created:", result)
      return result[0]
    } catch (error) {
      console.error("❌ Error creating publicacion:", error)
      throw error
    }
  },

  async update(id: string, publicacion: Partial<CreatePublicacionInput>): Promise<Publicacion> {
    try {
      console.log("🔍 Updating publicacion:", id, publicacion)

      // ✅ Preparar payload para actualización
      const payload: any = {
        fecha_actualizacion: new Date().toISOString(),
      }

      // Solo incluir campos que han cambiado
      if (publicacion.titulo !== undefined) payload.titulo = publicacion.titulo
      if (publicacion.contenido !== undefined) payload.contenido = publicacion.contenido
      if (publicacion.estado !== undefined) payload.estado = publicacion.estado
      if (publicacion.tags !== undefined) payload.tags = publicacion.tags

      // ✅ Manejar autor_id de la misma manera que en create
      if (publicacion.autor_id !== undefined) {
        payload.autor_id = publicacion.autor_id && publicacion.autor_id.trim() !== "" ? publicacion.autor_id : null
      }

      console.log("📤 Sending update payload:", payload)

      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Update error:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log("✅ Publicacion updated:", result)
      return result[0]
    } catch (error) {
      console.error("❌ Error updating publicacion:", error)
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

      console.log("✅ Publicacion deleted:", id)
    } catch (error) {
      console.error("❌ Error deleting publicacion:", error)
      throw error
    }
  },
}

export default publicacionService
export { publicacionService }
