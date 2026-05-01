import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { format, date_range, status_filter, source_filter } = body;
    
    let query = supabaseAdmin.from("crm_leads").select("*");
    
    if (status_filter && status_filter !== 'all') {
      query = query.eq('status', status_filter);
    }
    
    if (source_filter && source_filter !== 'all') {
      query = query.eq('source', source_filter);
    }
    
    // Simplistic date filtering
    if (date_range === 'this_week') {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      query = query.gte('created_at', date.toISOString());
    } else if (date_range === 'this_month') {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      query = query.gte('created_at', date.toISOString());
    }
    
    const { data: leads, error } = await query;
    if (error) throw error;
    
    if (format === 'csv') {
      const headers = ["Business Name", "Contact Name", "Phone", "Email", "City", "Status", "Score", "Created At"];
      const rows = leads.map(l => [
        `"${l.business_name || ''}"`,
        `"${l.contact_name || ''}"`,
        `"${l.phone || ''}"`,
        `"${l.email || ''}"`,
        `"${l.city || ''}"`,
        `"${l.status || ''}"`,
        l.score,
        l.created_at
      ].join(","));
      
      const csvContent = [headers.join(","), ...rows].join("\n");
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="leads_export.csv"',
        }
      });
    }
    
    // Future implementation for PDF and DOCX
    return NextResponse.json({ message: `Export in ${format} is generating...`, data: leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
