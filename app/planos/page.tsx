import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function PlanosPage() {
  const plans = [
    {
      name: "Grátis",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para começar",
      popular: false,
      features: [
        "Até 3 anúncios por mês",
        "Fotos básicas (até 3 por anúncio)",
        "Suporte por email",
        "Perfil básico",
        "Busca simples",
      ],
      limitations: ["Sem destaque nos anúncios", "Sem IA para descrições", "Sem estatísticas detalhadas"],
    },
    {
      name: "Premium",
      price: "R$ 9,90",
      period: "/mês",
      description: "Ideal para vendedores ativos",
      popular: true,
      features: [
        "Anúncios ilimitados",
        "Até 10 fotos por anúncio",
        "Geração de descrições com IA",
        "Destaque automático nos anúncios",
        "Estatísticas detalhadas",
        "Suporte prioritário",
        "Badge de vendedor verificado",
        "Aparece primeiro nas buscas",
      ],
      limitations: [],
    },
    {
      name: "Profissional",
      price: "R$ 19,90",
      period: "/mês",
      description: "Para grandes vendedores",
      popular: false,
      features: [
        "Tudo do plano Premium",
        "Loja personalizada",
        "Múltiplas categorias",
        "API para integração",
        "Relatórios avançados",
        "Gerente de conta dedicado",
        "Campanhas promocionais",
        "Destaque premium na home",
      ],
      limitations: [],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Escolha o plano ideal para você</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Potencialize suas vendas com nossos recursos premium. Comece grátis e faça upgrade quando precisar de mais
            funcionalidades.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-green-500 border-2 shadow-lg scale-105" : "border-gray-200"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 hover:bg-green-600 px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Incluído:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitações:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-start">
                          <span className="text-gray-400 mr-3">•</span>
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-6">
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-green-600 hover:bg-green-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    asChild
                  >
                    <Link href={plan.name === "Grátis" ? "/cadastro" : "/checkout"}>
                      {plan.name === "Grátis" ? "Começar Grátis" : "Assinar Agora"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Por que escolher o Premium?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">IA Integrada</h3>
              <p className="text-gray-600">Gere descrições profissionais automaticamente com nossa IA avançada</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Destaque Garantido</h3>
              <p className="text-gray-600">Seus anúncios aparecem primeiro nas buscas e na página inicial</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mais Vendas</h3>
              <p className="text-gray-600">Vendedores premium vendem 3x mais que usuários do plano gratuito</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Perguntas Frequentes</h2>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Posso cancelar minha assinatura a qualquer momento?
                </h3>
                <p className="text-gray-600">
                  Sim! Você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento e você
                  continuará tendo acesso aos recursos premium até o final do período pago.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Como funciona a geração de descrições com IA?</h3>
                <p className="text-gray-600">
                  Nossa IA analisa o título e categoria do seu produto para gerar uma descrição profissional e atrativa.
                  Você pode editar e personalizar a descrição gerada conforme necessário.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  O que acontece se eu exceder o limite do plano gratuito?
                </h3>
                <p className="text-gray-600">
                  No plano gratuito, você pode publicar até 3 anúncios por mês. Se precisar de mais, você pode fazer
                  upgrade para o plano Premium a qualquer momento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pronto para começar a vender mais?</h2>
            <p className="text-gray-600 mb-6">
              Junte-se a milhares de vendedores que já aumentaram suas vendas com o Planta Fácil
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/cadastro">Começar Grátis</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contato">Falar com Vendas</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
