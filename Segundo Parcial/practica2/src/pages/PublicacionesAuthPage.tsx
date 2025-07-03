"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { PublicacionCompleta } from "../types/Like"
import type { CreatePublicacionInput } from "../types/Publicacion"
import { useAuth } from "../contexts/AuthContext"
import publicacionCompletaService from "../services/publicacionCompletaService"
import { PublicacionCompletaList } from "../components/PublicacionCompletaList"
import { PublicacionFormAuth } from "../components/PublicacionFormAuth"

export const PublicacionesAuthPage: React.FC = () => {
  const { user } = useAuth()
  const [publicaciones, setPublicaciones] = useState<PublicacionCompleta[]>([])
  const [editingPublicacion, setEditingPublicacion] = useState<PublicacionCompleta | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPublicaciones()
  }, [])

  const loadPublicaciones = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await publicacionCompletaService.getAll()
      setPublicaciones(data)
    } catch (err) {
      setError("Error al cargar las publicaciones")
      console.error("❌ Error loading publicaciones:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (publicacionData: CreatePublicacionInput) => {
    if (!user) return

    try {
      setError(null)
      const newPublicacion = await publicacionCompletaService.create(publicacionData, user.id)
      setPublicaciones((prev) => [newPublicacion, ...prev])
      setShowForm(false)
      setEditingPublicacion(null)
    } catch (err) {
      setError("Error al crear la publicación")
      console.error("❌ Error creating publicacion:", err)
    }
  }

  const handleUpdate = async (publicacionData: CreatePublicacionInput) => {
    if (!editingPublicacion || !user) return

    try {
      setError(null)
      // Usar el servicio original para actualizar
      const { publicacionService } = await import("../services/publicacionService")
      await publicacionService.update(editingPublicacion.id, publicacionData)

      // Recargar todas las publicaciones para obtener datos actualizados
      await loadPublicaciones()
      setEditingPublicacion(null)
      setShowForm(false)
    } catch (err) {
      setError("Error al actualizar la publicación")
      console.error("❌ Error updating publicacion:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
      return
    }

    try {
      setError(null)
      const { publicacionService } = await import("../services/publicacionService")
      await publicacionService.delete(id)
      setPublicaciones((prev) => prev.filter((publicacion) => publicacion.id !== id))
    } catch (err) {
      setError("Error al eliminar la publicación")
      console.error("❌ Error deleting publicacion:", err)
    }
  }

  const handleEdit = (publicacion: PublicacionCompleta) => {
    setEditingPublicacion(publicacion)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingPublicacion(null)
    setShowForm(false)
  }

  const handleSubmit = (publicacionData: CreatePublicacionInput) => {
    if (editingPublicacion) {
      handleUpdate(publicacionData)
    } else {
      handleCreate(publicacionData)
    }
  }

  return (
    <div className="publicaciones-page">
      <div className="page-header">
        <h1>Publicaciones</h1>
        {user && !showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            Nueva Publicación
          </button>
        )}
      </div>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)} className="close-btn">
            ×
          </button>
        </div>
      )}

      {showForm ? (
        <PublicacionFormAuth publicacion={editingPublicacion} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <PublicacionCompletaList
          publicaciones={publicaciones}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          onLikeUpdate={loadPublicaciones}
        />
      )}
    </div>
  )
}
