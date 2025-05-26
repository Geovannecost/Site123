"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export function useAuth() {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se há token salvo
    const token = localStorage.getItem("token")
    const usuarioSalvo = localStorage.getItem("usuario")

    if (token && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }

    setLoading(false)
  }, [])

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
    logout,
  }
}
