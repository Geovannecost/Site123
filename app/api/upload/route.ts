import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ImageService } from "@/lib/services/image-service"

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

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Nenhum arquivo enviado",
        },
        { status: 400 },
      )
    }

    // Validate each file
    for (const file of files) {
      const validation = ImageService.validateImage(file)
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            message: validation.error,
          },
          { status: 400 },
        )
      }
    }

    const imageUrls = await ImageService.uploadMultipleImages(files)

    return NextResponse.json({
      success: true,
      data: { imageUrls },
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao fazer upload das imagens",
      },
      { status: 500 },
    )
  }
}
