import { query, transaction } from "../database"

export interface CreateAdvertisementData {
  userId: string
  categoryId: string
  title: string
  description: string
  price: number
  location: string
  images: string[]
  aiGenerated?: boolean
}

export interface Advertisement {
  id: string
  title: string
  description: string
  price: number
  currency: string
  status: string
  isFeatured: boolean
  viewCount: number
  favoriteCount: number
  createdAt: Date
  publishedAt?: Date
  categoryName: string
  sellerName: string
  sellerUsername: string
  city?: string
  state?: string
  primaryImage?: string
}

export class AdvertisementService {
  static async createAdvertisement(data: CreateAdvertisementData): Promise<string> {
    return transaction(async (client) => {
      // Create advertisement
      const adResult = await client.query(
        `INSERT INTO advertisements (user_id, category_id, title, description, price, 
                                   status, moderation_status, ai_description_used, published_at)
         VALUES ($1, $2, $3, $4, $5, 'active', 'pending', $6, CURRENT_TIMESTAMP)
         RETURNING id`,
        [data.userId, data.categoryId, data.title, data.description, data.price, data.aiGenerated || false],
      )

      const advertisementId = adResult.rows[0].id

      // Add images
      for (let i = 0; i < data.images.length; i++) {
        await client.query(
          `INSERT INTO advertisement_images (advertisement_id, image_url, sort_order, is_primary)
           VALUES ($1, $2, $3, $4)`,
          [advertisementId, data.images[i], i, i === 0],
        )
      }

      return advertisementId
    })
  }

  static async getAdvertisements(
    filters: {
      category?: string
      search?: string
      minPrice?: number
      maxPrice?: number
      city?: string
      state?: string
      featured?: boolean
      limit?: number
      offset?: number
    } = {},
  ): Promise<Advertisement[]> {
    const whereConditions = ["a.status = $1", "a.moderation_status = $2", "u.status = $3"]
    const params = ["active", "approved", "active"]
    let paramIndex = 4

    if (filters.category) {
      whereConditions.push(`c.slug = $${paramIndex}`)
      params.push(filters.category)
      paramIndex++
    }

    if (filters.search) {
      whereConditions.push(`a.search_vector @@ plainto_tsquery('portuguese', $${paramIndex})`)
      params.push(filters.search)
      paramIndex++
    }

    if (filters.minPrice !== undefined) {
      whereConditions.push(`a.price >= $${paramIndex}`)
      params.push(filters.minPrice.toString())
      paramIndex++
    }

    if (filters.maxPrice !== undefined) {
      whereConditions.push(`a.price <= $${paramIndex}`)
      params.push(filters.maxPrice.toString())
      paramIndex++
    }

    if (filters.city) {
      whereConditions.push(`ua.city ILIKE $${paramIndex}`)
      params.push(`%${filters.city}%`)
      paramIndex++
    }

    if (filters.state) {
      whereConditions.push(`ua.state = $${paramIndex}`)
      params.push(filters.state)
      paramIndex++
    }

    if (filters.featured) {
      whereConditions.push("a.is_featured = true")
    }

    const orderBy = filters.featured ? "ORDER BY a.is_featured DESC, a.created_at DESC" : "ORDER BY a.created_at DESC"

    const limit = filters.limit || 20
    const offset = filters.offset || 0

    const queryText = `
      SELECT a.id, a.title, a.description, a.price, a.currency, a.status,
             a.is_featured, a.view_count, a.favorite_count, a.created_at, a.published_at,
             c.name as category_name, u.full_name as seller_name, u.username as seller_username,
             ua.city, ua.state,
             (SELECT image_url FROM advertisement_images ai 
              WHERE ai.advertisement_id = a.id AND ai.is_primary = true LIMIT 1) as primary_image
      FROM advertisements a
      JOIN users u ON a.user_id = u.id
      JOIN categories c ON a.category_id = c.id
      LEFT JOIN user_addresses ua ON u.id = ua.user_id AND ua.is_primary = true
      WHERE ${whereConditions.join(" AND ")}
      ${orderBy}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `

    params.push(limit.toString(), offset.toString())

    const result = await query(queryText, params)

    return result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      price: Number.parseFloat(row.price),
      currency: row.currency,
      status: row.status,
      isFeatured: row.is_featured,
      viewCount: row.view_count,
      favoriteCount: row.favorite_count,
      createdAt: row.created_at,
      publishedAt: row.published_at,
      categoryName: row.category_name,
      sellerName: row.seller_name,
      sellerUsername: row.seller_username,
      city: row.city,
      state: row.state,
      primaryImage: row.primary_image,
    }))
  }

  static async getUserAdvertisements(userId: string): Promise<Advertisement[]> {
    const result = await query(
      `SELECT a.id, a.title, a.description, a.price, a.currency, a.status,
              a.is_featured, a.view_count, a.favorite_count, a.created_at, a.published_at,
              c.name as category_name,
              (SELECT image_url FROM advertisement_images ai 
               WHERE ai.advertisement_id = a.id AND ai.is_primary = true LIMIT 1) as primary_image
       FROM advertisements a
       JOIN categories c ON a.category_id = c.id
       WHERE a.user_id = $1
       ORDER BY a.created_at DESC`,
      [userId],
    )

    return result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      price: Number.parseFloat(row.price),
      currency: row.currency,
      status: row.status,
      isFeatured: row.is_featured,
      viewCount: row.view_count,
      favoriteCount: row.favorite_count,
      createdAt: row.created_at,
      publishedAt: row.published_at,
      categoryName: row.category_name,
      sellerName: "",
      sellerUsername: "",
      primaryImage: row.primary_image,
    }))
  }

  static async recordView(advertisementId: string, userId?: string, ipAddress?: string) {
    await query(
      `INSERT INTO advertisement_views (advertisement_id, user_id, ip_address, viewed_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
      [advertisementId, userId || null, ipAddress || null],
    )
  }

  static async toggleFavorite(userId: string, advertisementId: string): Promise<boolean> {
    const existing = await query("SELECT id FROM user_favorites WHERE user_id = $1 AND advertisement_id = $2", [
      userId,
      advertisementId,
    ])

    if (existing.rows.length > 0) {
      await query("DELETE FROM user_favorites WHERE user_id = $1 AND advertisement_id = $2", [userId, advertisementId])
      return false
    } else {
      await query("INSERT INTO user_favorites (user_id, advertisement_id) VALUES ($1, $2)", [userId, advertisementId])
      return true
    }
  }
}
