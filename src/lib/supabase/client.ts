import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
let client: ReturnType<typeof createBrowserClient<Database>> | undefined
export function createClient() {
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
 if(!url||!key) throw new Error('Supabase environment is not configured')
 return client ??= createBrowserClient<Database>(url,key)
}
