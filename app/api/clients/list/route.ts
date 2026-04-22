import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const { data: clients, error } = await supabaseAdmin
      .from("clients")
      .select(`
        id,
        business_name,
        profiles (
          id,
          email,
          role
        )
      `);

    if (error) throw error;
    
    // Transform to match front-end expectation
    const transformedClients = (clients || [])
      .filter(c => (c.profiles as any)?.role === 'CLIENT')
      .map(c => ({
        id: c.id,
        business_name: c.business_name,
        email: (c.profiles as any)?.email,
        name: (c.profiles as any)?.email.split('@')[0], // Fallback name
      }));

    // Add ReturnBox Mock per client setup request
    transformedClients.push({
      id: "client-returnbox-001",
      business_name: "ReturnBox",
      email: "hello@returnbox.growxlabs.tech",
      name: "ReturnBox Admin",
    });

    return NextResponse.json(transformedClients);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
