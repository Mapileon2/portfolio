"use client"

import type React from "react"
import { createContext, useContext } from "react"

type SupabaseContext = {
  supabase: undefined
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return <Context.Provider value={{ supabase: undefined }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}
