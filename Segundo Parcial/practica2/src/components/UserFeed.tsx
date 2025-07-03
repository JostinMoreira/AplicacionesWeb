"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { PublicacionCompleta } from "../types/Like"
import { useAuth } from "../contexts/AuthContext"
import publicacionCompletaService from "../services/publicacionCompletaService"
import likeService from "../services/likeService"
import { FeedPost } from "./FeedPost"
import { PublicacionFormAuth } from "./PublicacionFormAuth"

export const UserFeed: React.FC = () => {
  const { user } = useAuth()
  const [publicaciones, setPublicaciones] = useState<PublicacionCompleta[]>([])
  const [userLikes, setUserLikes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreatePost, setShowCreatePost] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [publicacionesData, likesData] = await Promise.all([
        publicacionCompletaService.getAll(),
        user ? likeService.getUserLikes(user.id) : Promise.resolve([]),
      ])
      setPublicaciones(publicacionesData.filter((p) => p.estado === "publicado"))
      setUserLikes(likesData)
    } catch (error) {
      console.error("Error loading feed data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (postData: any) => {
    if (!user) return
    try {
      await publicacionCompletaService.create(postData, user.id)
      setShowCreatePost(false)
      loadData()
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  // Agregar función para manejar eliminación con confirmación especial para moderadores:
  const handleDelete = async (id: string) => {
    if (!user) return

    const publicacion = publicaciones.find((p) => p.id === id)
    const isOwner = publicacion?.autor_id === user.id
    const isModerator = user.rol === "moderador" || user.rol === "admin" || user.rol === "editor"

    let confirmMessage = "¿Estás seguro de que quieres eliminar esta publicación?"

    if (!isOwner && isModerator) {
      confirmMessage = `🛡️ MODERACIÓN: ¿Eliminar publicación de "${publicacion?.autor_nombre}"?\n\nEsta acción no se puede deshacer.`
    }

    if (!window.confirm(confirmMessage)) {
      return
    }

    try {
      const { publicacionService } = await import("../services/publicacionService")
      await publicacionService.delete(id)
      loadData() // Recargar el feed
    } catch (error) {
      console.error("Error deleting publicacion:", error)
      alert("Error al eliminar la publicación")
    }
  }

  if (loading) {
    return <div className="loading">Cargando feed...</div>
  }

  return (
    <div className="user-feed">
      {/* Header del feed */}
      <div className="feed-header">
        <h1>📱 Feed</h1>
        {user && (
          <button onClick={() => setShowCreatePost(true)} className="btn btn-primary">
            ✍️ Crear publicación
          </button>
        )}
      </div>

      {/* Formulario de creación */}
      {showCreatePost && (
        <div className="create-post-modal">
          <div className="modal-content">
            <PublicacionFormAuth onSubmit={handleCreatePost} onCancel={() => setShowCreatePost(false)} />
          </div>
        </div>
      )}

      {/* Quick post creator */}
      {user && !showCreatePost && (
        <div className="quick-post-creator">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre)}&background=2563eb&color=fff`}
            alt={user.nombre}
            className="avatar"
          />
          <button onClick={() => setShowCreatePost(true)} className="quick-post-input">
            ¿Qué estás pensando, {user.nombre}?
          </button>
        </div>
      )}

      {/* Lista de publicaciones */}
      <div className="feed-posts">
        {publicaciones.length === 0 ? (
          <div className="empty-feed">
            <h3>🌟 ¡Bienvenido al feed!</h3>
            <p>No hay publicaciones aún. ¡Sé el primero en compartir algo!</p>
          </div>
        ) : (
          publicaciones.map((publicacion) => (
            <FeedPost
              key={publicacion.id}
              publicacion={publicacion}
              userLikes={userLikes}
              onLikeUpdate={loadData}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
