export const isAdmin = (userRole: string): boolean => {
  return ["admin", "moderador", "editor"].includes(userRole)
}

export const canManageUsers = (userRole: string): boolean => {
  return ["moderador", "editor"].includes(userRole)
}

export const canModerateContent = (userRole: string): boolean => {
  return ["admin", "moderador", "editor"].includes(userRole)
}

export const getRoleDisplayName = (role: string): string => {
  const roleNames: Record<string, string> = {
    admin: "Administrador",
    moderador: "Moderador",
    editor: "Editor",
    usuario: "Usuario",
  }
  return roleNames[role] || role
}

export const getRoleColor = (role: string): string => {
  const roleColors: Record<string, string> = {
    admin: "#dc2626",
    moderador: "#ea580c",
    editor: "#059669",
    usuario: "#2563eb",
  }
  return roleColors[role] || "#6b7280"
}
