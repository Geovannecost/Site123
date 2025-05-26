"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Heart, Share2, Flag, MessageCircle, Phone, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/hooks/use-auth"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { user } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock data - em produção viria da API
  const product = {
    id: params.id,
    title: "Zamioculca em vaso cerâmico artesanal",
    price: 89.9,
    location: "São Paulo, SP",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 24,
    seller: {
      name: "Jardim Verde",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      totalSales: 156,
      memberSince: "2022",
    },
    category: "Plantas Ornamentais",
    description: `Linda zamioculca (Zamioculcas zamiifolia) em vaso de cerâmica artesanal.
    
Esta planta é perfeita para iniciantes, pois é muito resistente e requer poucos cuidados. A zamioculca é conhecida por sua capacidade de purificar o ar e por se adaptar bem a ambientes com pouca luz.

Características:
• Altura: aproximadamente 40cm
• Vaso: cerâmica artesanal de 15cm de diâmetro
• Idade: 2 anos
• Estado: excelente
• Inclui: planta + vaso + pratinho

Cuidados:
• Rega: 1 vez por semana no verão, quinzenal no inverno
• Luz: indireta, tolera sombra
• Temperatura: entre 18°C e 26°C`,
    condition: "Nova",
    views: 342,
    postedAt: "2024-01-15",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-green-600">
              Início
            </Link>
            <span>/</span>
            <Link href="/anuncios" className="hover:text-green-600">
              Anúncios
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative">
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.title}
                  width={600}
                  height={500}
                  className="w-full h-96 object-cover"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600">Destaque</Badge>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="bg-white/80 hover:bg-white"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          currentImageIndex === index ? "border-green-500" : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.title} ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Description */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                <div className="prose prose-sm max-w-none">
                  {product.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-3 text-gray-700 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info & Actions */}
          <div className="space-y-6">
            {/* Main Info Card */}
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviewCount} avaliações)</span>
                  </div>
                  <span className="text-sm text-gray-400">•</span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="h-4 w-4" />
                    {product.views} visualizações
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.location}
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-green-600">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-gray-500">Categoria:</span>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Condição:</span>
                    <p className="font-medium">{product.condition}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Entrar em contato
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Ver telefone
                  </Button>
                </div>

                <Separator className="my-4" />

                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                  <Flag className="h-4 w-4 mr-2" />
                  Denunciar anúncio
                </Button>
              </CardContent>
            </Card>

            {/* Seller Info Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Vendedor</h3>

                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                    <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{product.seller.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.seller.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Vendas:</span>
                    <p className="font-medium">{product.seller.totalSales}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Membro desde:</span>
                    <p className="font-medium">{product.seller.memberSince}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/vendedor/${product.seller.name}`}>Ver perfil do vendedor</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Dicas de segurança</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Prefira encontros em locais públicos</li>
                  <li>• Verifique o produto antes de pagar</li>
                  <li>• Desconfie de preços muito baixos</li>
                  <li>• Use o chat do Planta Fácil</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
