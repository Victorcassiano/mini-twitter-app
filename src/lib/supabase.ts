import { createClient } from "@supabase/supabase-js"
import env from "./env"

const supabaseUrl = env.SUPABASE_URL
const supabaseAnonKey = env.UPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
