import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless"
import { createToken } from "@/lib/auth-simple"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email e senha são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Find user by email
    const users = await sql`
      SELECT id, email, username, full_name, password_hash 
      FROM users 
      WHERE email = ${email}
    `

    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Credenciais inválidas",
        },
        { status: 401 },
      )
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Credenciais inválidas",
        },
        { status: 401 },
      )
    }

    // Create user object for token
    const authUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.full_name,
    }

    // Create token
    const token = createToken(authUser)

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
      user: authUser,
    })

    // Set cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
