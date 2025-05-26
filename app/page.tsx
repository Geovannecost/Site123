import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MapPin, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredAds = [
    {
      id: 1,
      title: "Monstera Deliciosa - Planta Adulta",
      price: "R$ 89,90",
      location: "São Paulo, SP",
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
      rating: 4.8,
      seller: "Jardim Verde",
    },
    {
      id: 2,
      title: "Kit Suculentas Variadas (6 unidades)",
      price: "R$ 45,00",
      location: "Rio de Janeiro, RJ",
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
      rating: 4.9,
      seller: "Suculentas & Cia",
    },
    {
      id: 3,
      title: "Vaso de Cerâmica Artesanal",
      price: "R$ 35,00",
      location: "Belo Horizonte, MG",
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      rating: 4.7,
      seller: "Arte em Barro",
    },
    {
      id: 4,
      title: "Fertilizante Orgânico Premium",
      price: "R$ 25,90",
      location: "Curitiba, PR",
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      rating: 4.6,
      seller: "Nutri Plant",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Encontre as melhores <span className="text-green-600">plantas</span> e{" "}
              <span className="text-green-600">produtos</span> de jardinagem
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Conecte-se com vendedores locais e descubra uma variedade incrível de plantas, vasos, ferramentas e tudo
              para seu jardim.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-2 max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar plantas, vasos, ferramentas..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl">Buscar</Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/anuncios">Explorar Anúncios</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/criar-anuncio">Anunciar Grátis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ads */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Anúncios em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra os produtos mais populares e bem avaliados da nossa comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAds.map((ad) => (
              <Card key={ad.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image
                    src={ad.image || "/placeholder.svg"}
                    alt={ad.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {ad.featured && (
                    <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">Destaque</Badge>
                  )}
                  <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{ad.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{ad.rating}</span>
                    <span className="text-sm text-gray-400">• {ad.seller}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {ad.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">{ad.price}</span>
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/anuncios">Ver Todos os Anúncios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Categorias Populares</h2>
            <p className="text-gray-600">Encontre exatamente o que você procura</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Plantas de Interior", icon: "🌿", count: "1.2k anúncios" },
              { name: "Suculentas", icon: "🌵", count: "856 anúncios" },
              { name: "Vasos e Jardineiras", icon: "🏺", count: "634 anúncios" },
              { name: "Ferramentas", icon: "🛠️", count: "423 anúncios" },
              { name: "Sementes", icon: "🌱", count: "789 anúncios" },
              { name: "Fertilizantes", icon: "🧪", count: "345 anúncios" },
              { name: "Plantas Externas", icon: "🌳", count: "567 anúncios" },
              { name: "Decoração", icon: "✨", count: "234 anúncios" },
            ].map((category, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar a vender?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Cadastre-se gratuitamente e comece a vender suas plantas e produtos de jardinagem hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cadastro">Criar Conta Grátis</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600"
              asChild
            >
              <Link href="/planos">Ver Planos Premium</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
