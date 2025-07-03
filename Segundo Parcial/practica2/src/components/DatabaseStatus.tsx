"use client"

import type React from "react"
import { useState } from "react"

export const DatabaseStatus: React.FC = () => {
  const [status, setStatus] = useState<string>("Haz clic para verificar...")
  const [details, setDetails] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const checkDatabase = async () => {
    try {
      setLoading(true)
      setStatus("Verificando conexión...")

      const SUPABASE_URL = "https://opcqraisjaklmggcyugz.supabase.co"
      const SUPABASE_ANON_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3FyYWlzamFrbG1nZ2N5dWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTI0ODAsImV4cCI6MjA2NzA2ODQ4MH0.b6jA10X_5dpG19bEjeSlZJ4DZw2BSFGyvjC1V8wI5Mc"

      const headers = {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      }

      // Verificar cada tabla
      const tables = ["usuarios", "publicaciones", "comentarios", "likes"]
      const results = []

      for (const table of tables) {
        try {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=count`, {
            headers,
          })

          results.push({
            tabla: table,
            status: response.ok ? "✅ OK" : "❌ Error",
            response: response.status,
            error: response.ok ? null : await response.text(),
          })
        } catch (error) {
          results.push({
            tabla: table,
            status: "❌ Error",
            response: "Error de conexión",
            error: error instanceof Error ? error.message : "Error desconocido",
          })
        }
      }

      setDetails(results)

      const allOk = results.every((r) => r.status.includes("✅"))
      setStatus(
        allOk
          ? "✅ Base de datos configurada correctamente"
          : "❌ Algunas tablas faltan o tienen problemas. Ejecuta los scripts SQL.",
      )
    } catch (error) {
      setStatus("❌ Error de conexión con Supabase")
      console.error("Database check error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="database-status">
      <h3>🔍 Estado de la Base de Datos</h3>
      <button onClick={checkDatabase} className="btn btn-primary" disabled={loading}>
        {loading ? "Verificando..." : "Verificar Conexión"}
      </button>
      <div className="status-result">
        <p>{status}</p>
        {details.length > 0 && (
          <div className="status-details">
            {details.map((detail, index) => (
              <div key={index} className="status-item">
                <strong>{detail.tabla}:</strong> {detail.status}
                {detail.error && <small className="error-text"> - {detail.error}</small>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
