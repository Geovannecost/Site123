import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

const sql = neon(process.env.DATABASE_URL)

export { sql }

// Database query helper for backward compatibility
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    // Convert parameterized query to template literal format for Neon
    let processedText = text
    if (params && params.length > 0) {
      params.forEach((param, index) => {
        processedText = processedText.replace(`$${index + 1}`, `'${param}'`)
      })
    }

    const result = await sql(processedText)
    const duration = Date.now() - start
    console.log("Executed query", { text: text.substring(0, 100), duration, rows: result.length })
    return { rows: result, rowCount: result.length }
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Transaction helper for Neon
export async function transaction<T>(callback: (sql: typeof sql) => Promise<T>): Promise<T> {
  try {
    const result = await callback(sql)
    return result
  } catch (error) {
    console.error("Transaction error:", error)
    throw error
  }
}
