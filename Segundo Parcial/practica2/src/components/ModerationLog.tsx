"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

interface ModerationAction {
  id: string
  action: string
  target: string
  moderator: string
  timestamp: string
  reason?: string
}

export const ModerationLog: React.FC = () => {
  const { user } = useAuth()
  const [actions, setActions] = useState<ModerationAction[]>([])

  // Simulación de log de moderación (en una app real, esto vendría de la BD)
  useEffect(() => {
    if (user && (user.rol === "moderador" || user.rol === "admin" || user.rol === "editor")) {
      // Simular algunas acciones de moderación
      setActions([
        {
          id: "1",
          action: "Eliminó publicación",
          target: "Publicación: 'Contenido inapropiado'",
          moderator: user.nombre,
          timestamp: new Date().toISOString(),
          reason: "Violación de términos de servicio",
        },
      ])
    }
  }, [user])

  if (!user || !["moderador", "admin", "editor"].includes(user.rol)) {
    return null
  }

  return (
    <div className="moderation-log">
      <h3>📋 Log de Moderación</h3>
      {actions.length === 0 ? (
        <p className="empty-log">No hay acciones de moderación recientes</p>
      ) : (
        <div className="log-entries">
          {actions.map((action) => (
            <div key={action.id} className="log-entry">
              <div className="log-header">
                <strong>{action.moderator}</strong>
                <span className="log-action">{action.action}</span>
                <span className="log-timestamp">{new Date(action.timestamp).toLocaleString()}</span>
              </div>
              <div className="log-target">{action.target}</div>
              {action.reason && <div className="log-reason">Razón: {action.reason}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
