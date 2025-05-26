import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { AdvertisementService } from "@/lib/services/advertisement-service"

export async function GET() {
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

    const advertisements = await AdvertisementService.getUserAdvertisements(session.user.id)

    return NextResponse.json({
      success: true,
      data: advertisements,
    })
  } catch (error) {
    console.error("Get user advertisements error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar anúncios",
      },
      { status: 500 },
    )
  }
}
