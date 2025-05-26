import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"
import { initializeDatabase } from "@/lib/init-db"

// Initialize database on first request
let dbInitialized = false

async function ensureDbInitialized() {
  if (!dbInitialized) {
    try {
      await initializeDatabase()
      dbInitialized = true
    } catch (error) {
      console.error("Failed to initialize database:", error)
    }
  }
}

const handler = async (req: Request, context: any) => {
  try {
    await ensureDbInitialized()
    return NextAuth(req, context, authOptions)
  } catch (error) {
    console.error("NextAuth error:", error)
    return new Response(JSON.stringify({ error: "Authentication service unavailable" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export { handler as GET, handler as POST }
