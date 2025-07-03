"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Usuario, CreateUsuarioInput } from "../types/Usuario"
import usuarioService from "../services/usuarioService"
import { UsuarioList } from "../components/UsuarioList"
import { UsuarioForm } from "../components/UsuarioForm"
import { useAuth } from "../contexts/AuthContext"

export const UsuariosPage: React.FC = () => {
  const { user } = useAuth()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Verificar permisos
  const canManage = user && usuarioService.canManageUsers(user.rol)

  useEffect(() => {
    loadUsuarios()
  }, [])

  const loadUsuarios = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await usuarioService.getAll()
      setUsuarios(data)
    } catch (err) {
      setError("Error al cargar los usuarios")
      console.error("Error loading usuarios:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (usuarioData: CreateUsuarioInput) => {
    if (!canManage) {
      setError("No tienes permisos para crear usuarios")
      return
    }

    try {
      setError(null)
      const newUsuario = await usuarioService.create(usuarioData)
      setUsuarios((prev) => [newUsuario, ...prev])
      setShowForm(false)
    } catch (err) {
      setError("Error al crear el usuario")
      console.error("Error creating usuario:", err)
    }
  }

  const handleUpdate = async (usuarioData: CreateUsuarioInput) => {
    if (!editingUsuario || !canManage) {
      setError("No tienes permisos para actualizar usuarios")
      return
    }

    try {
      setError(null)
      const updatedUsuario = await usuarioService.update(editingUsuario.id, usuarioData)
      setUsuarios((prev) => prev.map((usuario) => (usuario.id === editingUsuario.id ? updatedUsuario : usuario)))
      setEditingUsuario(null)
      setShowForm(false)
    } catch (err) {
      setError("Error al actualizar el usuario")
      console.error("Error updating usuario:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!canManage) {
      setError("No tienes permisos para eliminar usuarios")
      return
    }

    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      return
    }

    try {
      setError(null)
      await usuarioService.delete(id)
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id))
    } catch (err) {
      setError("Error al eliminar el usuario")
      console.error("Error deleting usuario:", err)
    }
  }

  const handleEdit = (usuario: Usuario) => {
    if (!canManage) {
      setError("No tienes permisos para editar usuarios")
      return
    }
    setEditingUsuario(usuario)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingUsuario(null)
    setShowForm(false)
  }

  const handleSubmit = (usuarioData: CreateUsuarioInput) => {
    if (editingUsuario) {
      handleUpdate(usuarioData)
    } else {
      handleCreate(usuarioData)
    }
  }

  // ✅ Si no tiene permisos, mostrar mensaje
  if (!canManage) {
    return (
      <div className="access-denied">
        <h1>🚫 Acceso Denegado</h1>
        <p>Solo los moderadores y editores pueden gestionar usuarios.</p>
        <p>
          Tu rol actual: <strong>{user?.rol}</strong>
        </p>
      </div>
    )
  }

  return (
    <div className="usuarios-page">
      <div className="page-header">
        <h1>Gestión de Usuarios</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            Nuevo Usuario
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
        <UsuarioForm usuario={editingUsuario} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <UsuarioList usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
      )}
    </div>
  )
}
