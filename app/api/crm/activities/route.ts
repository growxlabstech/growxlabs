import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const leadId = searchParams.get('lead_id');
    
    if (!leadId) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
    
    const { data, error } = await supabaseAdmin.from("lead_activities").select(`
      *,
      team_member:team_members(name)
    `).eq("lead_id", leadId).order("created_at", { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json({ activities: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await supabaseAdmin.from("lead_activities").insert([body]).select().single();
    if (error) throw error;
    return NextResponse.json({ activity: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
