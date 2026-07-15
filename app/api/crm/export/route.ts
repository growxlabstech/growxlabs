import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = session.user as any;
    if (role !== "ADMIN" && role !== "CO_ADMIN") {
      return NextResponse.json({ error: "Access Denied: Agents are not permitted to export data." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'csv';
    
    let query = supabaseAdmin.from("leads").select("*");

    const { data: leads, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    
    if (format === 'csv') {
      const headers = ["Business Name", "Contact Name", "Phone", "Email", "City", "Status", "Score", "Created At"];
      const rows = (leads || []).map(l => [
        `"${l.business_name || l.name || ''}"`,
        `"${l.name || ''}"`,
        `"${l.phone || ''}"`,
        `"${l.email || ''}"`,
        `"${l.city || ''}"`,
        `"${l.status || ''}"`,
        l.lead_score || 0,
        l.created_at
      ].join(","));
      
      const csvContent = [headers.join(","), ...rows].join("\n");
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="growx_leads_export.csv"',
        }
      });
    }
    
    return NextResponse.json({ data: leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
