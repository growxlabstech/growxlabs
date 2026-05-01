import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const { data: clients, error } = await supabaseAdmin
      .from("users")
      .select("id, email, name, role")
      .eq("role", "CLIENT")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    // Transform to match front-end expectation
    const transformedClients = (clients || []).map(c => ({
      id: c.id,
      business_name: c.name || c.email.split('@')[0],
      email: c.email,
      name: c.name || c.email.split('@')[0],
    }));

    return NextResponse.json(transformedClients);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
