import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { query } from "@/lib/database"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Não autorizado",
        },
        { status: 401 },
      )
    }

    const result = await query(
      `SELECT 
         COUNT(DISTINCT a.id) as total_ads,
         COUNT(DISTINCT CASE WHEN a.status = 'active' THEN a.id END) as active_ads,
         COALESCE(SUM(a.view_count), 0) as total_views,
         COALESCE(SUM(a.favorite_count), 0) as total_favorites,
         sp.name as plan_name
       FROM users u
       LEFT JOIN advertisements a ON u.id = a.user_id
       LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
       LEFT JOIN subscription_plans sp ON us.plan_id = sp.id
       WHERE u.id = $1
       GROUP BY u.id, sp.name`,
      [session.user.id],
    )

    const stats = result.rows[0] || {
      total_ads: 0,
      active_ads: 0,
      total_views: 0,
      total_favorites: 0,
      plan_name: "Grátis",
    }

    return NextResponse.json({
      success: true,
      data: {
        totalAds: Number.parseInt(stats.total_ads),
        activeAds: Number.parseInt(stats.active_ads),
        totalViews: Number.parseInt(stats.total_views),
        totalFavorites: Number.parseInt(stats.total_favorites),
        planName: stats.plan_name || "Grátis",
      },
    })
  } catch (error) {
    console.error("Get user stats error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar estatísticas",
      },
      { status: 500 },
    )
  }
}
