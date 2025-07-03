const SUPABASE_URL = "https://opcqraisjaklmggcyugz.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3FyYWlzamFrbG1nZ2N5dWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTI0ODAsImV4cCI6MjA2NzA2ODQ4MH0.b6jA10X_5dpG19bEjeSlZJ4DZw2BSFGyvjC1V8wI5Mc"

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

export const likeService = {
  async toggleLike(usuarioId: string, publicacionId: string): Promise<boolean> {
    try {
      console.log("🔍 Toggling like:", { usuarioId, publicacionId })

      // Verificar si ya existe el like
      const checkResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/likes?usuario_id=eq.${usuarioId}&publicacion_id=eq.${publicacionId}&select=id`,
        {
          method: "GET",
          headers,
        },
      )

      const existingLikes = await checkResponse.json()

      if (existingLikes.length > 0) {
        // Ya existe, eliminar like
        const deleteResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/likes?usuario_id=eq.${usuarioId}&publicacion_id=eq.${publicacionId}`,
          {
            method: "DELETE",
            headers,
          },
        )

        if (!deleteResponse.ok) {
          throw new Error("Error al eliminar like")
        }

        console.log("✅ Like removed")
        return false // No liked
      } else {
        // No existe, crear like
        const createResponse = await fetch(`${SUPABASE_URL}/rest/v1/likes`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            usuario_id: usuarioId,
            publicacion_id: publicacionId,
          }),
        })

        if (!createResponse.ok) {
          throw new Error("Error al crear like")
        }

        console.log("✅ Like added")
        return true // Liked
      }
    } catch (error) {
      console.error("❌ Error toggling like:", error)
      throw error
    }
  },

  async getUserLikes(usuarioId: string): Promise<string[]> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/likes?usuario_id=eq.${usuarioId}&select=publicacion_id`, {
        method: "GET",
        headers,
      })

      if (!response.ok) {
        throw new Error("Error al obtener likes del usuario")
      }

      const likes = await response.json()
      return likes.map((like: any) => like.publicacion_id)
    } catch (error) {
      console.error("❌ Error getting user likes:", error)
      return []
    }
  },
}

export default likeService
