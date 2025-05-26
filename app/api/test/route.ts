import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "API funcionando corretamente",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erro na API",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
