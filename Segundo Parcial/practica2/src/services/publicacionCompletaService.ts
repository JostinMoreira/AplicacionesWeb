import type { PublicacionCompleta } from "../types/Like"
import type { CreatePublicacionInput } from "../types/Publicacion"

const SUPABASE_URL = "https://opcqraisjaklmggcyugz.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3FyYWlzamFrbG1nZ2N5dWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTI0ODAsImV4cCI6MjA2NzA2ODQ4MH0.b6jA10X_5dpG19bEjeSlZJ4DZw2BSFGyvjC1V8wI5Mc"

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

export const publicacionCompletaService = {
  async getAll(): Promise<PublicacionCompleta[]> {
    try {
      console.log("🔍 Fetching publicaciones completas...")

      const response = await fetch(`${SUPABASE_URL}/rest/v1/publicaciones_completas?select=*`, {
        method: "GET",
        headers,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Error response:", response.status, errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ Publicaciones completas loaded:", data.length)
      return data
    } catch (error) {
      console.error("❌ Error fetching publicaciones completas:", error)
      throw error
    }
  },

  async create(publicacion: CreatePublicacionInput, autorId: string): Promise<PublicacionCompleta> {
    try {
      console.log("🔍 Creating publicacion with author:", autorId)

      const payload = {
        titulo: publicacion.titulo,
        contenido: publicacion.contenido,
        autor_id: autorId,
        estado: publicacion.estado || "borrador",
        tags: publicacion.tags || [],
      }

      const response = await fetch(`${SUPABASE_URL}/rest/v1/publicaciones`, {
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
      const newPublicacion = result[0]

      // Obtener la publicación completa con información del autor
      const completeResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/publicaciones_completas?id=eq.${newPublicacion.id}&select=*`,
        {
          method: "GET",
          headers,
        },
      )

      const completeData = await completeResponse.json()
      return completeData[0]
    } catch (error) {
      console.error("❌ Error creating publicacion:", error)
      throw error
    }
  },
}

export default publicacionCompletaService
