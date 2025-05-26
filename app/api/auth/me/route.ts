import { NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth-simple"

export async function GET() {
  try {
    const user = await getServerSession()

    if (!user) {
      return NextResponse.json({ success: false, message: "Não autenticado" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
