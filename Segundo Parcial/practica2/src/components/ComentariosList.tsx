"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { ComentarioCompleto, CreateComentarioInput } from "../types/Comentario"
import { useAuth } from "../contexts/AuthContext"
import comentarioService from "../services/comentarioService"

interface ComentariosListProps {
  publicacionId: string
  onComentarioAdded?: () => void
}

export const ComentariosList: React.FC<ComentariosListProps> = ({ publicacionId, onComentarioAdded }) => {
  const { user } = useAuth()
  const [comentarios, setComentarios] = useState<ComentarioCompleto[]>([])
  const [nuevoComentario, setNuevoComentario] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    if (showComments) {
      loadComentarios()
    }
  }, [publicacionId, showComments])

  const loadComentarios = async () => {
    try {
      setLoading(true)
      const data = await comentarioService.getByPublicacion(publicacionId)
      setComentarios(data)
    } catch (error) {
      console.error("Error loading comentarios:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !nuevoComentario.trim()) return

    try {
      setSubmitting(true)
      const comentarioData: CreateComentarioInput = {
        contenido: nuevoComentario.trim(),
        publicacion_id: publicacionId,
      }

      const newComentario = await comentarioService.create(comentarioData, user.id)
      setComentarios((prev) => [...prev, newComentario])
      setNuevoComentario("")
      onComentarioAdded?.()
    } catch (error) {
      console.error("Error creating comentario:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (comentarioId: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
      return
    }

    try {
      await comentarioService.delete(comentarioId)
      setComentarios((prev) => prev.filter((c) => c.id !== comentarioId))
      onComentarioAdded?.()
    } catch (error) {
      console.error("Error deleting comentario:", error)
    }
  }

  const canDeleteComment = (comentario: ComentarioCompleto) => {
    if (!user) return false
    return (
      comentario.usuario_id === user.id || user.rol === "admin" || user.rol === "moderador" || user.rol === "editor"
    )
  }

  return (
    <div className="comentarios-section">
      <button onClick={() => setShowComments(!showComments)} className="toggle-comments-btn">
        💬 {comentarios.length} comentarios {showComments ? "▼" : "▶"}
      </button>

      {showComments && (
        <div className="comentarios-container">
          {/* Formulario para nuevo comentario */}
          {user && (
            <form onSubmit={handleSubmit} className="nuevo-comentario-form">
              <div className="comentario-input-group">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre)}&background=2563eb&color=fff`}
                  alt={user.nombre}
                  className="avatar-small"
                />
                <input
                  type="text"
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="Escribe un comentario..."
                  className="comentario-input"
                  disabled={submitting}
                />
                <button type="submit" disabled={submitting || !nuevoComentario.trim()} className="btn btn-primary">
                  {submitting ? "..." : "Enviar"}
                </button>
              </div>
            </form>
          )}

          {/* Lista de comentarios */}
          {loading ? (
            <div className="loading">Cargando comentarios...</div>
          ) : (
            <div className="comentarios-list">
              {comentarios.map((comentario) => (
                <div key={comentario.id} className="comentario-item">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comentario.usuario_nombre)}&background=6b7280&color=fff`}
                    alt={comentario.usuario_nombre}
                    className="avatar-small"
                  />
                  <div className="comentario-content">
                    <div className="comentario-header">
                      <strong>{comentario.usuario_nombre}</strong>
                      <span className="comentario-date">
                        {new Date(comentario.fecha_creacion).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="comentario-text">{comentario.contenido}</p>
                  </div>
                  {canDeleteComment(comentario) && (
                    <button onClick={() => handleDelete(comentario.id)} className="delete-comment-btn">
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
