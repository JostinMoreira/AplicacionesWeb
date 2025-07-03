"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Publicacion, CreatePublicacionInput } from "../types/Publicacion"

interface PublicacionFormProps {
  publicacion?: Publicacion | null
  onSubmit: (publicacion: CreatePublicacionInput) => void
  onCancel: () => void
}

export const PublicacionForm: React.FC<PublicacionFormProps> = ({ publicacion, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreatePublicacionInput>({
    titulo: "",
    contenido: "",
    autor_id: "",
    estado: "borrador",
    tags: [],
  })

  const [tagsInput, setTagsInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (publicacion) {
      setFormData({
        titulo: publicacion.titulo || "",
        contenido: publicacion.contenido || "",
        autor_id: publicacion.autor_id || "",
        estado: publicacion.estado || "borrador",
        tags: publicacion.tags || [],
      })
      setTagsInput(publicacion.tags ? publicacion.tags.join(", ") : "")
    } else {
      // ✅ Resetear formulario cuando no hay publicación
      setFormData({
        titulo: "",
        contenido: "",
        autor_id: "",
        estado: "borrador",
        tags: [],
      })
      setTagsInput("")
    }
  }, [publicacion])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es requerido"
    }

    if (!formData.contenido.trim()) {
      newErrors.contenido = "El contenido es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const tags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      onSubmit({
        ...formData,
        autor_id: formData.autor_id || "", // ✅ Asegurar que nunca sea null
        tags,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="publicacion-form">
      <h2>{publicacion ? "Editar Publicación" : "Crear Publicación"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo || ""} // ✅ Evitar null
            onChange={handleChange}
            className={errors.titulo ? "error" : ""}
            placeholder="Ingresa el título de la publicación"
          />
          {errors.titulo && <span className="error-message">{errors.titulo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            name="contenido"
            value={formData.contenido || ""} // ✅ Evitar null
            onChange={handleChange}
            rows={6}
            className={errors.contenido ? "error" : ""}
            placeholder="Escribe el contenido de la publicación..."
          />
          {errors.contenido && <span className="error-message">{errors.contenido}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="autor_id">Nombre del Autor (opcional):</label>
          <input
            type="text"
            id="autor_id"
            name="autor_id"
            value={formData.autor_id || ""} // ✅ Evitar null
            onChange={handleChange}
            placeholder="Deja vacío para generar automáticamente"
          />
          <small style={{ color: "#666", fontSize: "0.8rem" }}>
            💡 Si no ingresas un UUID válido, se generará uno automáticamente
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select id="estado" name="estado" value={formData.estado || "borrador"} onChange={handleChange}>
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
            <option value="archivado">Archivado</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (separados por comas):</label>
          <input
            type="text"
            id="tags"
            value={tagsInput || ""} // ✅ Evitar null
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="tecnología, programación, react"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {publicacion ? "Actualizar" : "Crear"}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
