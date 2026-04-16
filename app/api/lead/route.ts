import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const supabase = await createClient();

    const { error } = await supabase.from("leads").insert([
      {
        name: data.name,
        email: data.email,
        business_type: data.business,
        requirement: data.requirement,
        budget: data.budget,
        status: "NEW"
      }
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lead Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
