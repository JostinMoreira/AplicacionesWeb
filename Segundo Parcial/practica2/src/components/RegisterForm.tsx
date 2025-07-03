"use client"

import type React from "react"
import { useState } from "react"
import type { RegisterData } from "../types/Auth"

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>
  onSwitchToLogin: () => void
  loading?: boolean
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onSwitchToLogin, loading = false }) => {
  const [formData, setFormData] = useState<RegisterData>({
    nombre: "",
    correo: "",
    password: "",
    rol: "usuario",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

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

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await onSubmit(formData)
      } catch (error) {
        setErrors({ general: error instanceof Error ? error.message : "Error al registrarse" })
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="auth-form">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        {errors.general && <div className="error-banner">{errors.general}</div>}

        <div className="form-group">
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? "error" : ""}
            disabled={loading}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={errors.correo ? "error" : ""}
            disabled={loading}
          />
          {errors.correo && <span className="error-message">{errors.correo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
            disabled={loading}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "error" : ""}
            disabled={loading}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <select id="rol" name="rol" value={formData.rol} onChange={handleChange} disabled={loading}>
            <option value="usuario">Usuario</option>
            <option value="editor">Editor</option>
            <option value="moderador">Moderador</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </div>
      </form>

      <div className="auth-switch">
        <p>
          ¿Ya tienes cuenta?{" "}
          <button type="button" onClick={onSwitchToLogin} className="link-btn">
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  )
}
