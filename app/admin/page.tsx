"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Star, Search, Users, FileText, TrendingUp, Eye } from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const pendingAds = [
    {
      id: 1,
      title: "Monstera Deliciosa - Planta Adulta",
      seller: "João Silva",
      price: "R$ 89,90",
      category: "Plantas de Interior",
      image: "/placeholder.svg?height=60&width=60",
      submittedAt: "2024-01-25 14:30",
      status: "pending",
    },
    {
      id: 2,
      title: "Kit Ferramentas de Jardinagem",
      seller: "Maria Santos",
      price: "R$ 125,00",
      category: "Ferramentas",
      image: "/placeholder.svg?height=60&width=60",
      submittedAt: "2024-01-25 16:45",
      status: "pending",
    },
  ]

  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      type: "Vendedor",
      adsCount: 5,
      joinedAt: "2024-01-15",
      status: "active",
      plan: "Premium",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      type: "Comprador",
      adsCount: 0,
      joinedAt: "2024-01-20",
      status: "active",
      plan: "Grátis",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      type: "Vendedor",
      adsCount: 12,
      joinedAt: "2024-01-10",
      status: "active",
      plan: "Premium",
    },
  ]

  const handleApproveAd = (adId: number) => {
    console.log("Aprovando anúncio:", adId)
    // Aqui seria implementada a lógica de aprovação
  }

  const handleRejectAd = (adId: number) => {
    console.log("Rejeitando anúncio:", adId)
    // Aqui seria implementada a lógica de rejeição
  }

  const handleFeatureAd = (adId: number) => {
    console.log("Destacando anúncio:", adId)
    // Aqui seria implementada a lógica de destaque
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários, anúncios e configurações da plataforma</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Anúncios Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Anúncios Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">567</p>
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
                  <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 12.5k</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="anuncios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="anuncios">Anúncios Pendentes</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="anuncios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Anúncios Aguardando Aprovação</CardTitle>
                <CardDescription>Revise e aprove os anúncios submetidos pelos usuários</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingAds.map((ad) => (
                    <div key={ad.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <Image
                          src={ad.image || "/placeholder.svg"}
                          alt={ad.title}
                          width={60}
                          height={60}
                          className="w-16 h-16 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                              <p className="text-sm text-gray-600">Por: {ad.seller}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className="font-medium text-green-600">{ad.price}</span>
                                <Badge variant="secondary">{ad.category}</Badge>
                                <span>{ad.submittedAt}</span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveAd(ad.id)}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                                onClick={() => handleFeatureAd(ad.id)}
                              >
                                <Star className="h-4 w-4 mr-2" />
                                Destacar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleRejectAd(ad.id)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Rejeitar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Visualize e gerencie todos os usuários da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Anúncios</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.type}</TableCell>
                        <TableCell>{user.adsCount}</TableCell>
                        <TableCell>
                          <Badge variant={user.plan === "Premium" ? "default" : "secondary"}>{user.plan}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Ver
                            </Button>
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório de Vendas</CardTitle>
                  <CardDescription>Estatísticas de receita e transações</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Receita Total (Mês)</span>
                      <span className="font-bold">R$ 12.540,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Planos Premium Ativos</span>
                      <span className="font-bold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Conversão</span>
                      <span className="font-bold">7.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Atividade da Plataforma</CardTitle>
                  <CardDescription>Métricas de uso e engajamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Novos Usuários (Semana)</span>
                      <span className="font-bold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Anúncios Publicados (Semana)</span>
                      <span className="font-bold">234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Aprovação</span>
                      <span className="font-bold">94.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
