"use client"

import type React from "react"
import type { Publicacion } from "../types/Publicacion"

interface PublicacionListProps {
  publicaciones: Publicacion[]
  onEdit: (publicacion: Publicacion) => void
  onDelete: (id: string) => void
  loading: boolean
}

export const PublicacionList: React.FC<PublicacionListProps> = ({ publicaciones, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Cargando publicaciones...</div>
  }

  if (publicaciones.length === 0) {
    return <div className="empty-state">No hay publicaciones disponibles</div>
  }

  return (
    <div className="publicacion-list">
      <h2>Lista de Publicaciones</h2>
      <div className="list-container">
        {publicaciones.map((publicacion) => (
          <div key={publicacion.id} className="publicacion-card">
            <div className="publicacion-info">
              <h3>{publicacion.titulo}</h3>
              <p className="contenido">{publicacion.contenido.substring(0, 150)}...</p>
              <div className="meta-info">
                <p>
                  <strong>Estado:</strong> {publicacion.estado}
                </p>
                <p>
                  <strong>Creado:</strong> {new Date(publicacion.fecha_creacion).toLocaleDateString()}
                </p>
                <p>
                  <strong>Actualizado:</strong> {new Date(publicacion.fecha_actualizacion).toLocaleDateString()}
                </p>
                {publicacion.tags && publicacion.tags.length > 0 && (
                  <div className="tags">
                    <strong>Tags:</strong> {publicacion.tags.join(", ")}
                  </div>
                )}
              </div>
            </div>
            <div className="publicacion-actions">
              <button onClick={() => onEdit(publicacion)} className="btn btn-edit">
                Editar
              </button>
              <button onClick={() => onDelete(publicacion.id)} className="btn btn-delete">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
