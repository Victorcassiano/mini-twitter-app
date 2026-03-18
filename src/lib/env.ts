const env = {
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || "",
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  UPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
} as const

export default env
