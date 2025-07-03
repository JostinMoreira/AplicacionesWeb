"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { AuthUser, AuthContextType, LoginCredentials, RegisterData } from "../types/Auth"
import authService from "../services/authService"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem("auth_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("auth_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      const userData = await authService.login(credentials)
      setUser(userData)
      localStorage.setItem("auth_user", JSON.stringify(userData))
    } catch (error) {
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const userData = await authService.register(data)
      setUser(userData)
      localStorage.setItem("auth_user", JSON.stringify(userData))
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
