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
    const processedLeads = leads
      .filter(l => l.business_name || l.name) // Skip completely empty rows
      .map(lead => ({
        business_name: lead.business_name || lead.name || "Unknown",
        name: lead.name || lead.contact_name || lead.business_name || null,
        contact_name: lead.name || lead.contact_name || null,
        email: lead.email || null,
        phone: lead.phone || null,
        city: lead.city || null,
        status: lead.status || "new",
        assigned_to: role === 'crm_agent' ? userId : lead.assigned_to || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

    if (processedLeads.length === 0) {
      return NextResponse.json({ error: "No valid leads found in file. Ensure columns match Business Name, Email, or Phone." }, { status: 400 });
    }

    console.log(`[IMPORT] Attempting to insert ${processedLeads.length} leads`);

    // Insert into 'leads' table
    const { data: d1, error: e1 } = await supabaseAdmin.from("leads").insert(processedLeads.map(l => ({
      business_name: l.business_name,
      name: l.name,
      email: l.email,
      phone: l.phone,
      city: l.city,
      status: l.status,
      assigned_to: l.assigned_to,
      created_at: l.created_at
    })));

    // Try to insert into 'crm_leads' table as well for the CRM dashboard
    const { data: d2, error: e2 } = await supabaseAdmin.from("crm_leads").insert(processedLeads.map(l => ({
      business_name: l.business_name,
      contact_name: l.contact_name,
      email: l.email,
      phone: l.phone,
      city: l.city,
      status: l.status,
      assigned_to: l.assigned_to,
      created_at: l.created_at
    })));

    if (e1 && e2) {
      console.error("[DATABASE ERROR]:", { e1, e2 });
      return NextResponse.json({ 
        error: `Database Error: ${e1.message}`,
        details: e1.details
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: processedLeads.length });
  } catch (error: any) {
    console.error("Import Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
