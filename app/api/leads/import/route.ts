import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, id: userId } = session.user as any;
    const body = await req.json();
    const { leads } = body;

    if (!Array.isArray(leads)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Process leads: assign to agent if needed
    const processedLeads = leads.map(lead => ({
      business_name: lead.business_name || lead.name || "Unknown",
      email: lead.email || null,
      phone: lead.phone || null,
      city: lead.city || null,
      status: lead.status || "new",
      assigned_to: role === 'crm_agent' ? userId : lead.assigned_to || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert(processedLeads)
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, count: data.length });
  } catch (error: any) {
    console.error("Import Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
