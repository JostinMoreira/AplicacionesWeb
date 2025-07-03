"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Publicacion, CreatePublicacionInput } from "../types/Publicacion"
import publicacionService from "../services/publicacionService"
import { PublicacionList } from "../components/PublicacionList"
import { PublicacionForm } from "../components/PublicacionForm"

export const PublicacionesPage: React.FC = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([])
  const [editingPublicacion, setEditingPublicacion] = useState<Publicacion | null>(null)
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
      console.log("🔍 Loading publicaciones...")
      const data = await publicacionService.getAll()
      setPublicaciones(data)
    } catch (err) {
      setError("Error al cargar las publicaciones")
      console.error("❌ Error loading publicaciones:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (publicacionData: CreatePublicacionInput) => {
    try {
      setError(null)
      console.log("🔍 Creating publicacion with data:", publicacionData)
      const newPublicacion = await publicacionService.create(publicacionData)
      setPublicaciones((prev) => [newPublicacion, ...prev])
      setShowForm(false)
      // ✅ Limpiar estado de edición
      setEditingPublicacion(null)
    } catch (err) {
      setError("Error al crear la publicación")
      console.error("❌ Error creating publicacion:", err)
    }
  }

  const handleUpdate = async (publicacionData: CreatePublicacionInput) => {
    if (!editingPublicacion) return

    try {
      setError(null)
      console.log("🔍 Updating publicacion:", editingPublicacion.id, publicacionData)
      const updatedPublicacion = await publicacionService.update(editingPublicacion.id, publicacionData)
      setPublicaciones((prev) =>
        prev.map((publicacion) => (publicacion.id === editingPublicacion.id ? updatedPublicacion : publicacion)),
      )
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
      await publicacionService.delete(id)
      setPublicaciones((prev) => prev.filter((publicacion) => publicacion.id !== id))
    } catch (err) {
      setError("Error al eliminar la publicación")
      console.error("❌ Error deleting publicacion:", err)
    }
  }

  const handleEdit = (publicacion: Publicacion) => {
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
        <h1>Gestión de Publicaciones</h1>
        {!showForm && (
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
        <PublicacionForm publicacion={editingPublicacion} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <PublicacionList publicaciones={publicaciones} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
      )}
    </div>
  )
}
