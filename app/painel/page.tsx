"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Eye, Star, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UserAd {
  id: string
  title: string
  price: number
  status: string
  viewCount: number
  favoriteCount: number
  primaryImage?: string
  createdAt: string
  isFeatured: boolean
  categoryName: string
}

interface UserStats {
  totalAds: number
  activeAds: number
  totalViews: number
  totalFavorites: number
  planName: string
}

export default function PainelPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [userAds, setUserAds] = useState<UserAd[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchUserData()
    }
  }, [status, router])

  const fetchUserData = async () => {
    try {
      setIsLoading(true)

      // Fetch user advertisements
      const adsResponse = await fetch("/api/user/advertisements")
      const adsData = await adsResponse.json()

      if (adsData.success) {
        setUserAds(adsData.data)
      }

      // Fetch user statistics
      const statsResponse = await fetch("/api/user/stats")
      const statsData = await statsResponse.json()

      if (statsData.success) {
        setUserStats(statsData.data)
      }
    } catch (error) {
      setError("Erro ao carregar dados")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejeitado</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const handleDeleteAd = async (adId: string) => {
    if (!confirm("Tem certeza que deseja excluir este anúncio?")) return

    try {
      const response = await fetch(`/api/advertisements/${adId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setUserAds((prev) => prev.filter((ad) => ad.id !== adId))
      } else {
        setError("Erro ao excluir anúncio")
      }
    } catch (error) {
      setError("Erro ao excluir anúncio")
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Olá, {session.user.name}!</h1>
          <p className="text-gray-600">Gerencie seus anúncios e configurações</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Anúncios Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats?.activeAds || 0}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Visualizações</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats?.totalViews || 0}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Favoritos</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats?.totalFavorites || 0}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Plano Atual</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats?.planName || "Grátis"}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="anuncios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="anuncios">Meus Anúncios</TabsTrigger>
            <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="anuncios" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Meus Anúncios</h2>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/criar-anuncio">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Anúncio
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {userAds.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <Plus className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum anúncio ainda</h3>
                    <p className="text-gray-500 mb-4">Comece criando seu primeiro anúncio</p>
                    <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <Link href="/criar-anuncio">Criar Primeiro Anúncio</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                userAds.map((ad) => (
                  <Card key={ad.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <Image
                          src={ad.primaryImage || "/placeholder.svg?height=100&width=100"}
                          alt={ad.title}
                          width={100}
                          height={100}
                          className="w-24 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                                {ad.isFeatured && <Badge className="bg-yellow-100 text-yellow-800">Destaque</Badge>}
                                {getStatusBadge(ad.status)}
                              </div>
                              <p className="text-lg font-bold text-green-600 mb-2">R$ {ad.price.toFixed(2)}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {ad.viewCount} visualizações
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  {ad.favoriteCount} favoritos
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(ad.createdAt).toLocaleDateString("pt-BR")}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/anuncio/${ad.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/editar-anuncio/${ad.id}`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteAd(ad.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="favoritos" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Anúncios Favoritos</h2>
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum favorito ainda</h3>
              <p className="text-gray-500 mb-4">Explore anúncios e adicione aos seus favoritos</p>
              <Button variant="outline" asChild>
                <Link href="/anuncios">Explorar Anúncios</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="configuracoes" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Configurações da Conta</h2>
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize suas informações de perfil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline">Editar Perfil</Button>
                <Button variant="outline">Alterar Senha</Button>
                <Button variant="outline">Configurações de Notificação</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plano e Faturamento</CardTitle>
                <CardDescription>Gerencie seu plano e métodos de pagamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Plano Atual: {userStats?.planName || "Grátis"}</p>
                    <p className="text-sm text-gray-500">
                      {userStats?.planName === "Grátis"
                        ? "Limite de 3 anúncios por mês"
                        : "Anúncios ilimitados e recursos premium"}
                    </p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/planos">{userStats?.planName === "Grátis" ? "Fazer Upgrade" : "Gerenciar Plano"}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
