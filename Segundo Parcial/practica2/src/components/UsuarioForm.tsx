"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Usuario, CreateUsuarioInput } from "../types/Usuario"

interface UsuarioFormProps {
  usuario?: Usuario | null
  onSubmit: (usuario: CreateUsuarioInput) => void
  onCancel: () => void
}

export const UsuarioForm: React.FC<UsuarioFormProps> = ({ usuario, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateUsuarioInput>({
    nombre: "",
    correo: "",
    rol: "usuario",
    activo: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        activo: usuario.activo,
      })
    }
  }, [usuario])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido"
    }

    if (!formData.rol.trim()) {
      newErrors.rol = "El rol es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="usuario-form">
      <h2>{usuario ? "Editar Usuario" : "Crear Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? "error" : ""}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={errors.correo ? "error" : ""}
          />
          {errors.correo && <span className="error-message">{errors.correo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className={errors.rol ? "error" : ""}
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="moderador">Moderador</option>
          </select>
          {errors.rol && <span className="error-message">{errors.rol}</span>}
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} />
            Usuario activo
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {usuario ? "Actualizar" : "Crear"}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
