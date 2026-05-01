import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const { version, content } = await req.json();
    
    // Invalidate all previous terms
    await supabaseAdmin.from("terms_versions").update({ is_active: false }).eq("is_active", true);
    
    // Invalidate all team member acceptances
    await supabaseAdmin.from("team_members").update({ accepted_terms: false });
    
    // Insert new terms version
    const { data, error } = await supabaseAdmin.from("terms_versions").insert([{
      version,
      content,
      is_active: true
    }]).select().single();
    
    if (error) throw error;
    
    return NextResponse.json({ terms: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
