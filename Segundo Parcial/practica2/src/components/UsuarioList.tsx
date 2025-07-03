"use client"

import type React from "react"
import type { Usuario } from "../types/Usuario"

interface UsuarioListProps {
  usuarios: Usuario[]
  onEdit: (usuario: Usuario) => void
  onDelete: (id: string) => void
  loading: boolean
}

export const UsuarioList: React.FC<UsuarioListProps> = ({ usuarios, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Cargando usuarios...</div>
  }

  if (usuarios.length === 0) {
    return <div className="empty-state">No hay usuarios registrados</div>
  }

  return (
    <div className="usuario-list">
      <h2>Lista de Usuarios</h2>
      <div className="list-container">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="usuario-card">
            <div className="usuario-info">
              <h3>{usuario.nombre}</h3>
              <p>
                <strong>Correo:</strong> {usuario.correo}
              </p>
              <p>
                <strong>Rol:</strong> {usuario.rol}
              </p>
              <p>
                <strong>Estado:</strong> {usuario.activo ? "Activo" : "Inactivo"}
              </p>
              <p>
                <strong>Registro:</strong> {new Date(usuario.fecha_registro).toLocaleDateString()}
              </p>
            </div>
            <div className="usuario-actions">
              <button onClick={() => onEdit(usuario)} className="btn btn-edit">
                Editar
              </button>
              <button onClick={() => onDelete(usuario.id)} className="btn btn-delete">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
