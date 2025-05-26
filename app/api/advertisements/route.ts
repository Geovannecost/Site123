import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { AdvertisementService } from "@/lib/services/advertisement-service"
import { UserService } from "@/lib/services/user-service"
import { z } from "zod"

const createAdSchema = z.object({
  categoryId: z.string().uuid(),
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
  description: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres"),
  price: z.number().positive("Preço deve ser positivo"),
  location: z.string().min(2, "Localização é obrigatória"),
  images: z.array(z.string()).min(1, "Pelo menos uma imagem é obrigatória"),
  aiGenerated: z.boolean().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      category: searchParams.get("category") || undefined,
      search: searchParams.get("search") || undefined,
      minPrice: searchParams.get("minPrice") ? Number.parseFloat(searchParams.get("minPrice")!) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : undefined,
      city: searchParams.get("city") || undefined,
      state: searchParams.get("state") || undefined,
      featured: searchParams.get("featured") === "true",
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 20,
      offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0,
    }

    const advertisements = await AdvertisementService.getAdvertisements(filters)

    return NextResponse.json({
      success: true,
      data: advertisements,
    })
  } catch (error) {
    console.error("Get advertisements error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar anúncios",
      },
      { status: 500 },
    )
  }
}

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

    const body = await request.json()
    const validatedData = createAdSchema.parse(body)

    // Check if user can create more ads
    const canCreate = await UserService.canUserCreateAd(session.user.id)
    if (!canCreate) {
      return NextResponse.json(
        {
          success: false,
          message: "Limite de anúncios atingido. Faça upgrade do seu plano.",
        },
        { status: 403 },
      )
    }

    const advertisementId = await AdvertisementService.createAdvertisement({
      userId: session.user.id,
      ...validatedData,
    })

    return NextResponse.json({
      success: true,
      message: "Anúncio criado com sucesso",
      data: { id: advertisementId },
    })
  } catch (error) {
    console.error("Create advertisement error:", error)

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
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
