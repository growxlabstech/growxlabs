import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data: agreements, error } = await supabaseAdmin
      .from("agreements")
      .select("*, clients(business_name, name)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(agreements || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
