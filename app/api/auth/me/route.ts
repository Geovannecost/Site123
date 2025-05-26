import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, getTokenFromCookies } from "@/lib/auth-simple"

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get("cookie")

    if (!cookieHeader) {
      return NextResponse.json({
        success: false,
        message: "Não autenticado",
        user: null,
      })
    }

    const token = getTokenFromCookies(cookieHeader)

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token não encontrado",
        user: null,
      })
    }

    const user = verifyToken(token)

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Token inválido",
        user: null,
      })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({
      success: false,
      message: "Erro interno do servidor",
      user: null,
    })
  }
}
