"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export function useAuth() {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Check localStorage first
      const token = localStorage.getItem("token")
      const usuarioSalvo = localStorage.getItem("usuario")

      if (token && usuarioSalvo) {
        // Verify token is still valid
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUsuario(data.usuario)
        } else {
          // Token invalid, clear storage
          localStorage.removeItem("token")
          localStorage.removeItem("usuario")
          setUsuario(null)
        }
      }
    } catch (error) {
      console.error("Auth check error:", error)
      // Clear invalid data
      localStorage.removeItem("token")
      localStorage.removeItem("usuario")
      setUsuario(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, senha) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("usuario", JSON.stringify(data.usuario))
        setUsuario(data.usuario)
        return { success: true, usuario: data.usuario }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      return { success: false, message: "Erro de conexão" }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    setUsuario(null)
    router.push("/")
  }

  const isLoggedIn = !!usuario

  return {
    usuario,
    loading,
    isLoggedIn,
    login,
    logout,
    checkAuthStatus,
  }
}
