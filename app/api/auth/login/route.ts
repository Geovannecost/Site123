import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth-simple"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Find user by email
    const users = await sql`
      SELECT id, email, username, full_name, password_hash, status
      FROM users 
      WHERE email = ${email}
    `

    if (users.length === 0) {
      return NextResponse.json({ success: false, message: "Email ou senha incorretos" }, { status: 401 })
    }

    const user = users[0]

    // Check if user is active
    if (user.status !== "active") {
      return NextResponse.json({ success: false, message: "Conta inativa ou suspensa" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: "Email ou senha incorretos" }, { status: 401 })
    }

    // Create token
    const token = createToken({
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.full_name,
    })

    // Set cookie
    const response = NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
