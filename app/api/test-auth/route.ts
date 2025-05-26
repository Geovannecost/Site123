import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const headers = Object.fromEntries(request.headers.entries())

    return NextResponse.json(
      {
        success: true,
        message: "API funcionando",
        headers,
        cookies: request.cookies.getAll(),
        url: request.url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
