"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, User, Plus } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-xl font-bold text-green-800">Planta Fácil</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
              Início
            </Link>
            <Link href="/anuncios" className="text-gray-600 hover:text-green-600 transition-colors">
              Anúncios
            </Link>
            <Link href="/como-funciona" className="text-gray-600 hover:text-green-600 transition-colors">
              Como Funciona
            </Link>
            <Link href="/planos" className="text-gray-600 hover:text-green-600 transition-colors">
              Planos
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link href="/login">
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/criar-anuncio">
                <Plus className="h-4 w-4 mr-2" />
                Anunciar
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <Link href="/" className="text-lg font-medium">
                  Início
                </Link>
                <Link href="/anuncios" className="text-lg font-medium">
                  Anúncios
                </Link>
                <Link href="/como-funciona" className="text-lg font-medium">
                  Como Funciona
                </Link>
                <Link href="/planos" className="text-lg font-medium">
                  Planos
                </Link>
                <div className="pt-4 border-t space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">
                      <User className="h-4 w-4 mr-2" />
                      Entrar
                    </Link>
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/criar-anuncio">
                      <Plus className="h-4 w-4 mr-2" />
                      Anunciar
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
