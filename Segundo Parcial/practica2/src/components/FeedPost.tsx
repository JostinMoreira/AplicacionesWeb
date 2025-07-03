"use client"

import type React from "react"
import { useState } from "react"
import type { PublicacionCompleta } from "../types/Like"
import { useAuth } from "../contexts/AuthContext"
import { ComentariosList } from "./ComentariosList"
import likeService from "../services/likeService"
import { ModerationBadge } from "./ModerationBadge"

interface FeedPostProps {
  publicacion: PublicacionCompleta
  userLikes: string[]
  onLikeUpdate: () => void
  onEdit?: (publicacion: PublicacionCompleta) => void
  onDelete?: (id: string) => void
}

export const FeedPost: React.FC<FeedPostProps> = ({ publicacion, userLikes, onLikeUpdate, onEdit, onDelete }) => {
  const { user } = useAuth()
  const [isLiking, setIsLiking] = useState(false)

  const isLiked = userLikes.includes(publicacion.id)
  const canEdit = user && user.id === publicacion.autor_id
  const canDelete =
    user &&
    (user.id === publicacion.autor_id || user.rol === "moderador" || user.rol === "admin" || user.rol === "editor")
  const isAdmin = user && (user.rol === "admin" || user.rol === "moderador" || user.rol === "editor")

  const handleLike = async () => {
    if (!user || isLiking) return

    setIsLiking(true)
    try {
      await likeService.toggleLike(user.id, publicacion.id)
      onLikeUpdate()
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setIsLiking(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace menos de 1 hora"
    if (diffInHours < 24) return `Hace ${diffInHours} horas`
    if (diffInHours < 48) return "Ayer"
    return date.toLocaleDateString()
  }

  return (
    <div className="feed-post">
      {/* Header del post */}
      <div className="post-header">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(publicacion.autor_nombre || "Usuario")}&background=2563eb&color=fff`}
          alt={publicacion.autor_nombre}
          className="avatar"
        />
        <div className="post-author-info">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h3>{publicacion.autor_nombre || "Usuario anónimo"}</h3>
            {user && (user.rol === "moderador" || user.rol === "admin" || user.rol === "editor") && (
              <ModerationBadge userRole={user.rol} />
            )}
          </div>
          <p className="post-date">{formatDate(publicacion.fecha_creacion)}</p>
        </div>
        {(canEdit || canDelete) && (
          <div className="post-menu">
            {canEdit && onEdit && (
              <button onClick={() => onEdit(publicacion)} className="menu-btn">
                ✏️
              </button>
            )}
            {canDelete && onDelete && (
              <button onClick={() => onDelete(publicacion.id)} className="menu-btn delete">
                🗑️
              </button>
            )}
          </div>
        )}
      </div>

      {/* Contenido del post */}
      <div className="post-content">
        <h2>{publicacion.titulo}</h2>
        <p>{publicacion.contenido}</p>
        {publicacion.tags && publicacion.tags.length > 0 && (
          <div className="post-tags">
            {publicacion.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Estadísticas del post */}
      <div className="post-stats">
        <span>{publicacion.total_likes} likes</span>
        <span>{publicacion.total_comentarios} comentarios</span>
      </div>

      {/* Acciones del post */}
      <div className="post-actions">
        {user && (
          <button onClick={handleLike} disabled={isLiking} className={`action-btn ${isLiked ? "liked" : ""}`}>
            {isLiked ? "❤️" : "🤍"} Me gusta
          </button>
        )}
        <button className="action-btn">💬 Comentar</button>
        <button className="action-btn">📤 Compartir</button>
      </div>

      {/* Comentarios */}
      <ComentariosList publicacionId={publicacion.id} onComentarioAdded={onLikeUpdate} />
    </div>
  )
}
