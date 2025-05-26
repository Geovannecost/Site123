"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, MapPin, Heart, Filter, Grid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/hooks/use-auth"

interface Product {
  id: string
  title: string
  price: number
  location: string
  image: string
  featured: boolean
  rating: number
  seller: string
  category: string
  description: string
  isFavorite?: boolean
}

const categories = [
  { id: "all", name: "Todos", count: 2847 },
  { id: "suculentas", name: "Suculentas", count: 856 },
  { id: "frutiferas", name: "Frutíferas", count: 423 },
  { id: "ornamentais", name: "Ornamentais", count: 1234 },
  { id: "jardinagem", name: "Jardinagem", count: 567 },
  { id: "acessorios", name: "Acessórios", count: 234 },
]

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Zamioculca em vaso cerâmico",
    price: 89.9,
    location: "São Paulo, SP",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    rating: 4.8,
    seller: "Jardim Verde",
    category: "ornamentais",
    description: "Linda zamioculca em vaso de cerâmica artesanal",
  },
  {
    id: "2",
    title: "Kit 6 Suculentas Variadas",
    price: 45.0,
    location: "Rio de Janeiro, RJ",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    rating: 4.9,
    seller: "Suculentas & Cia",
    category: "suculentas",
    description: "Kit com 6 suculentas diferentes em vasinhos",
  },
  {
    id: "3",
    title: "Muda de Limoeiro Siciliano",
    price: 35.0,
    location: "Belo Horizonte, MG",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    rating: 4.7,
    seller: "Frutas do Quintal",
    category: "frutiferas",
    description: "Muda de limoeiro siciliano com 60cm",
  },
  {
    id: "4",
    title: "Fertilizante Orgânico Premium 2kg",
    price: 25.9,
    location: "Curitiba, PR",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    rating: 4.6,
    seller: "Nutri Plant",
    category: "jardinagem",
    description: "Fertilizante orgânico para todas as plantas",
  },
  {
    id: "5",
    title: "Vaso Autoirrigável 15cm",
    price: 42.0,
    location: "Porto Alegre, RS",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    rating: 4.5,
    seller: "Vasos & Design",
    category: "acessorios",
    description: "Vaso com sistema de autoirrigação",
  },
  {
    id: "6",
    title: "Monstera Deliciosa Grande",
    price: 120.0,
    location: "Brasília, DF",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    rating: 4.9,
    seller: "Plantas Tropicais",
    category: "ornamentais",
    description: "Monstera deliciosa adulta com 1,2m",
  },
  {
    id: "7",
    title: "Echeveria Elegans",
    price: 18.5,
    location: "Salvador, BA",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    rating: 4.4,
    seller: "Cactos do Nordeste",
    category: "suculentas",
    description: "Suculenta echeveria elegans em vaso 8cm",
  },
  {
    id: "8",
    title: "Kit Ferramentas Jardinagem",
    price: 67.9,
    location: "Fortaleza, CE",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    rating: 4.3,
    seller: "Ferramentas Pro",
    category: "jardinagem",
    description: "Kit com 5 ferramentas essenciais",
  },
]

export default function AnunciosPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Keep original order (recent)
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm, sortBy])

  const toggleFavorite = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, isFavorite: !product.isFavorite } : product)),
    )
  }

  const promoteAd = (productId: string) => {
    // Aqui seria feita a chamada para a API de promoção
    alert("Funcionalidade de destaque em desenvolvimento!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Explore nossos <span className="text-green-600">produtos</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra uma variedade incrível de plantas, vasos, ferramentas e tudo para seu jardim
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar plantas, vasos, ferramentas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full ${
                  selectedCategory === category.id
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                {category.name}
                <span className="ml-1 text-xs opacity-75">({category.count})</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{filteredProducts.length} produtos encontrados</span>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="recent">Mais recentes</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
              <option value="rating">Melhor avaliação</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={300}
                  height={300}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === "list" ? "w-full h-full" : "w-full h-48"
                  }`}
                />
                {product.featured && (
                  <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">Destaque</Badge>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                >
                  <Heart className={`h-4 w-4 ${product.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                  <span className="text-sm text-gray-400">• {product.seller}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.location}
                </div>

                {viewMode === "list" && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/anuncios/${product.id}`}>Ver mais</Link>
                    </Button>
                    {user && (
                      <Button
                        size="sm"
                        onClick={() => promoteAd(product.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Destacar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar mais produtos
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
            <Button
              onClick={() => {
                setSelectedCategory("all")
                setSearchTerm("")
              }}
              variant="outline"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
