import { sql } from "../database"
import bcrypt from "bcryptjs"

export interface CreateUserData {
  email: string
  password: string
  username: string
  fullName: string
  phone?: string
  userType: "buyer" | "seller" | "both"
  city: string
  state: string
}

export interface User {
  id: string
  email: string
  username: string
  fullName: string
  phone?: string
  userType: string
  status: string
  createdAt: Date
  city?: string
  state?: string
}

export class UserService {
  static async createUser(userData: CreateUserData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    try {
      // Create user
      const userResult = await sql`
        INSERT INTO users (email, password_hash, username, full_name, phone, user_type)
        VALUES (${userData.email}, ${hashedPassword}, ${userData.username}, ${userData.fullName}, ${userData.phone || null}, ${userData.userType})
        RETURNING id, email, username, full_name, phone, user_type, status, created_at
      `

      if (userResult.length === 0) {
        throw new Error("Failed to create user")
      }

      const user = userResult[0]

      // Create address
      await sql`
        INSERT INTO user_addresses (user_id, city, state, is_primary)
        VALUES (${user.id}, ${userData.city}, ${userData.state}, true)
      `

      // Get free plan and assign it
      const freePlanResult = await sql`
        SELECT id FROM subscription_plans WHERE name = 'Grátis' LIMIT 1
      `

      if (freePlanResult.length > 0) {
        const planId = freePlanResult[0].id
        const now = new Date()
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())

        await sql`
          INSERT INTO user_subscriptions (user_id, plan_id, current_period_start, current_period_end)
          VALUES (${user.id}, ${planId}, ${now.toISOString()}, ${nextMonth.toISOString()})
        `
      }

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        phone: user.phone,
        userType: user.user_type,
        status: user.status,
        createdAt: user.created_at,
        city: userData.city,
        state: userData.state,
      }
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const result = await sql`
        SELECT u.*, ua.city, ua.state
        FROM users u
        LEFT JOIN user_addresses ua ON u.id = ua.user_id AND ua.is_primary = true
        WHERE u.id = ${id}
      `

      if (result.length === 0) {
        return null
      }

      const user = result[0]
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        phone: user.phone,
        userType: user.user_type,
        status: user.status,
        createdAt: user.created_at,
        city: user.city,
        state: user.state,
      }
    } catch (error) {
      console.error("Error getting user:", error)
      return null
    }
  }

  static async getUserSubscription(userId: string) {
    try {
      const result = await sql`
        SELECT us.*, sp.name as plan_name, sp.price_monthly, sp.max_ads_per_month,
               sp.ai_descriptions_included, sp.featured_ads_included
        FROM user_subscriptions us
        JOIN subscription_plans sp ON us.plan_id = sp.id
        WHERE us.user_id = ${userId} AND us.status = 'active'
        ORDER BY us.created_at DESC
        LIMIT 1
      `

      return result[0] || null
    } catch (error) {
      console.error("Error getting user subscription:", error)
      return null
    }
  }

  static async canUserCreateAd(userId: string): Promise<boolean> {
    try {
      // Get user's plan limits
      const subscriptionResult = await sql`
        SELECT sp.max_ads_per_month
        FROM user_subscriptions us
        JOIN subscription_plans sp ON us.plan_id = sp.id
        WHERE us.user_id = ${userId} AND us.status = 'active'
        AND us.current_period_end > CURRENT_TIMESTAMP
        ORDER BY us.created_at DESC
        LIMIT 1
      `

      let maxAds = 3 // Default free plan limit
      if (subscriptionResult.length > 0) {
        maxAds = subscriptionResult[0].max_ads_per_month
      }

      // If unlimited ads (null), return true
      if (maxAds === null) {
        return true
      }

      // Count ads created this month
      const adsResult = await sql`
        SELECT COUNT(*) as count
        FROM advertisements
        WHERE user_id = ${userId}
        AND created_at >= date_trunc('month', CURRENT_TIMESTAMP)
      `

      const currentMonthAds = Number.parseInt(adsResult[0].count)
      return currentMonthAds < maxAds
    } catch (error) {
      console.error("Error checking if user can create ad:", error)
      return false
    }
  }
}
