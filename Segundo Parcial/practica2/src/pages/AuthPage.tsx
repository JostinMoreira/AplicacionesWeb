"use client"

import type React from "react"
import { useState } from "react"
import { LoginForm } from "../components/LoginForm"
import { RegisterForm } from "../components/RegisterForm"
import { useAuth } from "../contexts/AuthContext"

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()

  const handleLogin = async (credentials: any) => {
    setLoading(true)
    try {
      await login(credentials)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (data: any) => {
    setLoading(true)
    try {
      await register(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} onSwitchToRegister={() => setIsLogin(false)} loading={loading} />
        ) : (
          <RegisterForm onSubmit={handleRegister} onSwitchToLogin={() => setIsLogin(true)} loading={loading} />
        )}
      </div>
    </div>
  )
}
