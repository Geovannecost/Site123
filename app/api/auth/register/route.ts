import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth-simple"

export async function POST(request: NextRequest) {
  try {
    const { email, password, username, fullName, userType } = await request.json()

    // Validate required fields
    if (!email || !password || !username || !fullName || !userType) {
      return NextResponse.json({ success: false, message: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Email inválido" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ success: false, message: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users 
      WHERE email = ${email} OR username = ${username}
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ success: false, message: "Email ou nome de usuário já está em uso" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const newUsers = await sql`
      INSERT INTO users (email, password_hash, username, full_name, user_type, status)
      VALUES (${email}, ${passwordHash}, ${username}, ${fullName}, ${userType}, 'active')
      RETURNING id, email, username, full_name, user_type
    `

    const newUser = newUsers[0]

    // Create token
    const token = createToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      fullName: newUser.full_name,
    })

    // Set cookie
    const response = NextResponse.json({
      success: true,
      message: "Conta criada com sucesso!",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        fullName: newUser.full_name,
        userType: newUser.user_type,
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
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
