"use client"

import type React from "react"
import { useState } from "react"
import type { LoginCredentials } from "../types/Auth"

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>
  onSwitchToRegister: () => void
  loading?: boolean
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSwitchToRegister, loading = false }) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    correo: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido"
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
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
        setErrors({ general: error instanceof Error ? error.message : "Error al iniciar sesión" })
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="auth-form">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {errors.general && <div className="error-banner">{errors.general}</div>}

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

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </div>
      </form>

      <div className="auth-switch">
        <p>
          ¿No tienes cuenta?{" "}
          <button type="button" onClick={onSwitchToRegister} className="link-btn">
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  )
}
