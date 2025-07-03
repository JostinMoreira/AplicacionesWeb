"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { AuthPage } from "./pages/AuthPage"
import { SetupPage } from "./pages/SetupPage"
import { UserFeed } from "./components/UserFeed"
import { AdminDashboard } from "./components/AdminDashboard"
import { isAdmin } from "./utils/roleUtils"
import "./App.css"

function AppContent() {
  const { user, logout, loading } = useAuth()
  const [showSetup, setShowSetup] = useState(false)

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  if (showSetup) {
    return (
      <div>
        <nav className="navbar">
          <div className="nav-brand">
            <h2>🛠️ Setup</h2>
          </div>
          <button onClick={() => setShowSetup(false)} className="btn btn-secondary">
            Volver a la App
          </button>
        </nav>
        <SetupPage />
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <nav className="navbar">
          <div className="nav-brand">
            <h2>📱 Social CRUD</h2>
          </div>
          <button onClick={() => setShowSetup(true)} className="btn btn-secondary">
            🛠️ Setup DB
          </button>
        </nav>
        <AuthPage />
      </div>
    )
  }

  const userIsAdmin = isAdmin(user.rol)

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>📱 Social CRUD</h2>
        </div>
        <div className="nav-center">
          <button onClick={() => setShowSetup(true)} className="btn btn-secondary">
            🛠️ Setup
          </button>
        </div>
        <div className="user-info">
          <div className="user-details">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre)}&background=2563eb&color=fff`}
              alt={user.nombre}
              className="avatar-small"
            />
            <div>
              <span className="user-name">{user.nombre}</span>
              <span className="user-role" style={{ color: getRoleColor(user.rol) }}>
                {getRoleDisplayName(user.rol)}
              </span>
            </div>
          </div>
          <button onClick={logout} className="btn btn-secondary">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="main-content">{userIsAdmin ? <AdminDashboard /> : <UserFeed />}</main>
    </div>
  )
}

// Helper functions
const getRoleDisplayName = (role: string): string => {
  const roleNames: Record<string, string> = {
    admin: "Administrador",
    moderador: "Moderador",
    editor: "Editor",
    usuario: "Usuario",
  }
  return roleNames[role] || role
}

const getRoleColor = (role: string): string => {
  const roleColors: Record<string, string> = {
    admin: "#dc2626",
    moderador: "#ea580c",
    editor: "#059669",
    usuario: "#2563eb",
  }
  return roleColors[role] || "#6b7280"
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
