import { NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function GET() {
  try {
    const result = await query(
      "SELECT id, name, slug, description, icon FROM categories WHERE is_active = true ORDER BY sort_order, name",
    )

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar categorias",
      },
      { status: 500 },
    )
  }
}
