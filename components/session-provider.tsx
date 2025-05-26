"use client"

import type React from "react"
import { AuthProvider } from "@/lib/hooks/use-auth"

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
