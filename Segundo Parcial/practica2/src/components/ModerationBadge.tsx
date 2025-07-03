"use client"

import type React from "react"

interface ModerationBadgeProps {
  userRole: string
  className?: string
}

export const ModerationBadge: React.FC<ModerationBadgeProps> = ({ userRole, className = "" }) => {
  if (!["moderador", "admin", "editor"].includes(userRole)) {
    return null
  }

  const getBadgeConfig = (role: string) => {
    switch (role) {
      case "admin":
        return { emoji: "👑", text: "Admin", color: "#dc2626" }
      case "moderador":
        return { emoji: "🛡️", text: "Mod", color: "#ea580c" }
      case "editor":
        return { emoji: "✏️", text: "Editor", color: "#059669" }
      default:
        return { emoji: "👤", text: "User", color: "#6b7280" }
    }
  }

  const config = getBadgeConfig(userRole)

  return (
    <span
      className={`moderation-badge ${className}`}
      style={{
        backgroundColor: config.color,
        color: "white",
        fontSize: "0.75rem",
        padding: "0.125rem 0.375rem",
        borderRadius: "9999px",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
      }}
    >
      <span>{config.emoji}</span>
      <span>{config.text}</span>
    </span>
  )
}
