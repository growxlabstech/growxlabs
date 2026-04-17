import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data: invoices, error } = await supabaseAdmin
      .from("invoices")
      .select("*, clients(business_name, name)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(invoices || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
