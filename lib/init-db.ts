import { sql } from "./database"

export async function initializeDatabase() {
  try {
    // Check if tables exist
    const tablesResult = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    `

    if (tablesResult.length === 0) {
      console.log("Initializing database...")

      // Create basic tables for demo
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          username VARCHAR(50) UNIQUE NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('buyer', 'seller', 'both')),
          status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned', 'pending')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          last_login_at TIMESTAMP WITH TIME ZONE
        )
      `

      await sql`
        CREATE TABLE IF NOT EXISTS user_addresses (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(50) NOT NULL,
          is_primary BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `

      await sql`
        CREATE TABLE IF NOT EXISTS subscription_plans (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(50) NOT NULL,
          description TEXT,
          price_monthly DECIMAL(10, 2) NOT NULL,
          max_ads_per_month INTEGER,
          ai_descriptions_included BOOLEAN DEFAULT FALSE,
          featured_ads_included BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `

      await sql`
        CREATE TABLE IF NOT EXISTS user_subscriptions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          plan_id UUID NOT NULL REFERENCES subscription_plans(id),
          status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'pending')),
          current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
          current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `

      await sql`
        CREATE TABLE IF NOT EXISTS categories (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(100) NOT NULL,
          slug VARCHAR(100) UNIQUE NOT NULL,
          description TEXT,
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `

      await sql`
        CREATE TABLE IF NOT EXISTS advertisements (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          category_id UUID NOT NULL REFERENCES categories(id),
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'pending', 'active', 'sold', 'expired', 'rejected')),
          is_featured BOOLEAN DEFAULT FALSE,
          view_count INTEGER DEFAULT 0,
          favorite_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          published_at TIMESTAMP WITH TIME ZONE
        )
      `

      // Insert default data
      await sql`
        INSERT INTO subscription_plans (name, description, price_monthly, max_ads_per_month, ai_descriptions_included, featured_ads_included) 
        VALUES 
        ('Grátis', 'Perfeito para começar', 0.00, 3, FALSE, FALSE),
        ('Premium', 'Ideal para vendedores ativos', 9.90, NULL, TRUE, TRUE),
        ('Profissional', 'Para grandes vendedores', 19.90, NULL, TRUE, TRUE)
        ON CONFLICT DO NOTHING
      `

      await sql`
        INSERT INTO categories (name, slug, description, sort_order) 
        VALUES 
        ('Plantas de Interior', 'plantas-interior', 'Plantas ideais para ambientes internos', 1),
        ('Plantas de Exterior', 'plantas-exterior', 'Plantas para jardins e áreas externas', 2),
        ('Suculentas', 'suculentas', 'Suculentas e cactos', 3),
        ('Vasos e Jardineiras', 'vasos', 'Vasos, jardineiras e recipientes', 4),
        ('Ferramentas', 'ferramentas', 'Ferramentas de jardinagem', 5),
        ('Sementes', 'sementes', 'Sementes e mudas', 6),
        ('Fertilizantes', 'fertilizantes', 'Fertilizantes e adubos', 7),
        ('Decoração', 'decoracao', 'Itens decorativos para jardim', 8)
        ON CONFLICT DO NOTHING
      `

      console.log("Database initialized successfully!")
    }
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  }
}
