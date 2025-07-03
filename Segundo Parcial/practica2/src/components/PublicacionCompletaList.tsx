"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { PublicacionCompleta } from "../types/Like"
import { useAuth } from "../contexts/AuthContext"
import likeService from "../services/likeService"

interface PublicacionCompletaListProps {
  publicaciones: PublicacionCompleta[]
  onEdit: (publicacion: PublicacionCompleta) => void
  onDelete: (id: string) => void
  loading: boolean
  onLikeUpdate: () => void
}

export const PublicacionCompletaList: React.FC<PublicacionCompletaListProps> = ({
  publicaciones,
  onEdit,
  onDelete,
  loading,
  onLikeUpdate,
}) => {
  const { user } = useAuth()
  const [userLikes, setUserLikes] = useState<string[]>([])
  const [likingPosts, setLikingPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (user) {
      loadUserLikes()
    }
  }, [user])

  const loadUserLikes = async () => {
    if (!user) return
    try {
      const likes = await likeService.getUserLikes(user.id)
      setUserLikes(likes)
    } catch (error) {
      console.error("Error loading user likes:", error)
    }
  }

  const handleLike = async (publicacionId: string) => {
    if (!user) return

    setLikingPosts((prev) => new Set(prev).add(publicacionId))

    try {
      await likeService.toggleLike(user.id, publicacionId)
      await loadUserLikes()
      onLikeUpdate() // Actualizar la lista de publicaciones
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setLikingPosts((prev) => {
        const newSet = new Set(prev)
        newSet.delete(publicacionId)
        return newSet
      })
    }
  }

  if (loading) {
    return <div className="loading">Cargando publicaciones...</div>
  }

  if (publicaciones.length === 0) {
    return <div className="empty-state">No hay publicaciones disponibles</div>
  }

  return (
    <div className="publicacion-list">
      <h2>Publicaciones</h2>
      <div className="list-container">
        {publicaciones.map((publicacion) => {
          const isLiked = userLikes.includes(publicacion.id)
          const isLiking = likingPosts.has(publicacion.id)

          return (
            <div key={publicacion.id} className="publicacion-card">
              <div className="publicacion-info">
                <h3>{publicacion.titulo}</h3>
                <p className="contenido">{publicacion.contenido.substring(0, 150)}...</p>

                <div className="meta-info">
                  <p>
                    <strong>Autor:</strong> {publicacion.autor_nombre || "Usuario anónimo"}
                  </p>
                  <p>
                    <strong>Estado:</strong> {publicacion.estado}
                  </p>
                  <p>
                    <strong>Creado:</strong> {new Date(publicacion.fecha_creacion).toLocaleDateString()}
                  </p>
                  {publicacion.tags && publicacion.tags.length > 0 && (
                    <div className="tags">
                      <strong>Tags:</strong> {publicacion.tags.join(", ")}
                    </div>
                  )}
                </div>

                {/* Sistema de likes */}
                <div className="likes-section">
                  {user && (
                    <button
                      onClick={() => handleLike(publicacion.id)}
                      disabled={isLiking}
                      className={`like-btn ${isLiked ? "liked" : ""}`}
                    >
                      {isLiking ? "..." : isLiked ? "❤️" : "🤍"} {publicacion.total_likes}
                    </button>
                  )}
                  {!user && <span className="likes-count">❤️ {publicacion.total_likes} likes</span>}
                </div>
              </div>

              <div className="publicacion-actions">
                {user && user.id === publicacion.autor_id && (
                  <>
                    <button onClick={() => onEdit(publicacion)} className="btn btn-edit">
                      Editar
                    </button>
                    <button onClick={() => onDelete(publicacion.id)} className="btn btn-delete">
                      Eliminar
                    </button>
                  </>
                )}
                {user &&
                  user.id !== publicacion.autor_id &&
                  (user.rol === "moderador" || user.rol === "admin" || user.rol === "editor") && (
                    <button onClick={() => onDelete(publicacion.id)} className="btn btn-delete">
                      🗑️ Moderar
                    </button>
                  )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
