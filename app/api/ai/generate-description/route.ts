import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { AIService } from "@/lib/services/ai-service"
import { UserService } from "@/lib/services/user-service"
import { z } from "zod"

const generateDescriptionSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Não autorizado",
        },
        { status: 401 },
      )
    }

    // Check if user has AI access
    const subscription = await UserService.getUserSubscription(session.user.id)
    if (!subscription?.ai_descriptions_included) {
      return NextResponse.json(
        {
          success: false,
          message: "Recurso disponível apenas para usuários Premium. Faça upgrade do seu plano.",
        },
        { status: 403 },
      )
    }

    const body = await request.json()
    const { title, category } = generateDescriptionSchema.parse(body)

    const description = await AIService.generateDescription(title, category)

    return NextResponse.json({
      success: true,
      data: { description },
    })
  } catch (error) {
    console.error("Generate description error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao gerar descrição",
      },
      { status: 500 },
    )
  }
}
