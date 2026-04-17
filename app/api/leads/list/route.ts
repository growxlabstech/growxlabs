import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    // Ensure every lead has a business_name for the UI
    const processedLeads = (data || []).map(lead => ({
      ...lead,
      business_name: lead.business_name || lead.name || "Unknown Business"
    }));

    return NextResponse.json(processedLeads);
  } catch (error: any) {
    console.error("Leads Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
