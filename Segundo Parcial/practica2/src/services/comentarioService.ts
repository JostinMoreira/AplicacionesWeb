import type { ComentarioCompleto, CreateComentarioInput } from "../types/Comentario"

const SUPABASE_URL = "https://opcqraisjaklmggcyugz.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3FyYWlzamFrbG1nZ2N5dWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTI0ODAsImV4cCI6MjA2NzA2ODQ4MH0.b6jA10X_5dpG19bEjeSlZJ4DZw2BSFGyvjC1V8wI5Mc"

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

export const comentarioService = {
  async getByPublicacion(publicacionId: string): Promise<ComentarioCompleto[]> {
    try {
      console.log("🔍 Fetching comentarios for publicacion:", publicacionId)

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/comentarios_completos?publicacion_id=eq.${publicacionId}&select=*`,
        {
          method: "GET",
          headers,
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Error response:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ Comentarios loaded:", data.length)
      return data
    } catch (error) {
      console.error("❌ Error fetching comentarios:", error)
      throw error
    }
  },

  async create(comentario: CreateComentarioInput, usuarioId: string): Promise<ComentarioCompleto> {
    try {
      console.log("🔍 Creating comentario:", comentario)

      const payload = {
        contenido: comentario.contenido,
        publicacion_id: comentario.publicacion_id,
        usuario_id: usuarioId,
      }

      const response = await fetch(`${SUPABASE_URL}/rest/v1/comentarios`, {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      const newComentario = result[0]

      // Obtener el comentario completo con información del usuario
      const completeResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/comentarios_completos?id=eq.${newComentario.id}&select=*`,
        {
          method: "GET",
          headers,
        },
      )

      const completeData = await completeResponse.json()
      return completeData[0]
    } catch (error) {
      console.error("❌ Error creating comentario:", error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/comentarios?id=eq.${id}`, {
        method: "DELETE",
        headers,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      console.log("✅ Comentario deleted:", id)
    } catch (error) {
      console.error("❌ Error deleting comentario:", error)
      throw error
    }
  },
}

export default comentarioService
