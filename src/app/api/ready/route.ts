import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export async function GET() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from("workspaces").select("id").limit(1)
    if (error) throw error
    return NextResponse.json({ status: "ready", checks: { database: "ok" } }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ status: "not_ready", checks: { database: "unavailable" } }, { status: 503, headers: { "Cache-Control": "no-store" } })
  }
}
