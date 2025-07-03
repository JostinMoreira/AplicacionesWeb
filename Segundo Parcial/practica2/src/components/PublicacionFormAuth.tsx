"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { PublicacionCompleta } from "../types/Like"
import type { CreatePublicacionInput } from "../types/Publicacion"

interface PublicacionFormAuthProps {
  publicacion?: PublicacionCompleta | null
  onSubmit: (publicacion: CreatePublicacionInput) => void
  onCancel: () => void
}

export const PublicacionFormAuth: React.FC<PublicacionFormAuthProps> = ({ publicacion, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreatePublicacionInput>({
    titulo: "",
    contenido: "",
    autor_id: "", // No se usa en el formulario autenticado
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
      <h2>{publicacion ? "Editar Publicación" : "Crear Nueva Publicación"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo || ""}
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
            value={formData.contenido || ""}
            onChange={handleChange}
            rows={6}
            className={errors.contenido ? "error" : ""}
            placeholder="Escribe el contenido de la publicación..."
          />
          {errors.contenido && <span className="error-message">{errors.contenido}</span>}
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
            value={tagsInput || ""}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="tecnología, programación, react"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {publicacion ? "Actualizar" : "Publicar"}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
