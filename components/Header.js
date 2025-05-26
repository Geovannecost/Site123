"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Header() {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token")
        const usuarioSalvo = localStorage.getItem("usuario")

        if (token && usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo))
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    setUsuario(null)
    window.location.href = "/"
  }

  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🌱</span>
              <h1 className="text-xl font-bold text-green-600">Planta Fácil</h1>
            </Link>
            <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌱</span>
            <h1 className="text-xl font-bold text-green-600">Planta Fácil</h1>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Início
            </Link>
            <Link href="/anunciar" className="text-gray-700 hover:text-green-600 transition-colors">
              Anunciar
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {usuario ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Olá, {usuario.nome}</span>
                <Link
                  href="/painel"
                  className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Painel
                </Link>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-green-600 transition-colors">
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
