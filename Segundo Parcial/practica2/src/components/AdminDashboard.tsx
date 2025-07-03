"use client"

import type React from "react"
import { useState } from "react"
import { UsuariosPage } from "../pages/UsuariosPage"
import { PublicacionesAuthPage } from "../pages/PublicacionesAuthPage"
// Importar el nuevo componente:
import { ModerationLog } from "./ModerationLog"

type AdminView = "overview" | "users" | "posts" | "analytics"

export const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminView>("overview")

  const renderView = () => {
    switch (currentView) {
      case "users":
        return <UsuariosPage />
      case "posts":
        return <PublicacionesAuthPage />
      case "analytics":
        return <AnalyticsView />
      default:
        return <OverviewView onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>🛠️ Panel Admin</h2>
        <nav className="admin-nav">
          <button
            onClick={() => setCurrentView("overview")}
            className={`admin-nav-btn ${currentView === "overview" ? "active" : ""}`}
          >
            📊 Resumen
          </button>
          <button
            onClick={() => setCurrentView("users")}
            className={`admin-nav-btn ${currentView === "users" ? "active" : ""}`}
          >
            👥 Usuarios
          </button>
          <button
            onClick={() => setCurrentView("posts")}
            className={`admin-nav-btn ${currentView === "posts" ? "active" : ""}`}
          >
            📝 Publicaciones
          </button>
          <button
            onClick={() => setCurrentView("analytics")}
            className={`admin-nav-btn ${currentView === "analytics" ? "active" : ""}`}
          >
            📈 Analíticas
          </button>
        </nav>
      </div>
      <div className="admin-content">{renderView()}</div>
    </div>
  )
}

const OverviewView: React.FC<{ onNavigate: (view: AdminView) => void }> = ({ onNavigate }) => {
  return (
    <div className="overview-view">
      <h1>📊 Panel de Control</h1>
      <div className="overview-cards">
        <div className="overview-card" onClick={() => onNavigate("users")}>
          <div className="card-icon">👥</div>
          <div className="card-content">
            <h3>Gestionar Usuarios</h3>
            <p>Administrar cuentas de usuario</p>
          </div>
        </div>
        <div className="overview-card" onClick={() => onNavigate("posts")}>
          <div className="card-icon">📝</div>
          <div className="card-content">
            <h3>Gestionar Publicaciones</h3>
            <p>Moderar contenido y publicaciones</p>
          </div>
        </div>
        <div className="overview-card" onClick={() => onNavigate("analytics")}>
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h3>Ver Analíticas</h3>
            <p>Estadísticas y métricas</p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <ModerationLog />
      </div>
    </div>
  )
}

const AnalyticsView: React.FC = () => {
  return (
    <div className="analytics-view">
      <h1>📈 Analíticas</h1>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Usuarios Activos</h3>
          <div className="metric">1,234</div>
          <div className="metric-change positive">+12%</div>
        </div>
        <div className="analytics-card">
          <h3>Publicaciones</h3>
          <div className="metric">567</div>
          <div className="metric-change positive">+8%</div>
        </div>
        <div className="analytics-card">
          <h3>Comentarios</h3>
          <div className="metric">2,890</div>
          <div className="metric-change positive">+15%</div>
        </div>
        <div className="analytics-card">
          <h3>Likes</h3>
          <div className="metric">12,456</div>
          <div className="metric-change positive">+22%</div>
        </div>
      </div>
    </div>
  )
}
