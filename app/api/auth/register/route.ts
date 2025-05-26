import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/user-service"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  phone: z.string().optional(),
  userType: z.enum(["buyer", "seller", "both"]),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
})

export async function POST(request: NextRequest) {
  try {
    console.log("Registration request received")

    const body = await request.json()
    console.log("Request body:", { ...body, password: "[HIDDEN]" })

    const validatedData = registerSchema.parse(body)
    console.log("Data validated successfully")

    const user = await UserService.createUser(validatedData)
    console.log("User created successfully:", user.id)

    return NextResponse.json({
      success: true,
      message: "Usuário criado com sucesso",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)

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

    // Handle database constraint errors
    if (error instanceof Error) {
      if (error.message.includes("duplicate key") || error.message.includes("unique constraint")) {
        return NextResponse.json(
          {
            success: false,
            message: "Email ou nome de usuário já existe",
          },
          { status: 400 },
        )
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor. Tente novamente.",
      },
      { status: 500 },
    )
  }
}
