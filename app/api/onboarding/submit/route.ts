import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Onboarding Data Received:", data);

    console.log("Attempting to insert into 'onboarding' table...");
    const { data: onboarding, error } = await supabaseAdmin
      .from("onboarding")
      .insert([{
        business_name: data.businessName,
        industry: data.industry,
        city: data.city,
        email: data.email,
        phone: data.phone,
        primary_color: data.primaryColor,
        secondary_color: data.secondaryColor,
        brand_personality: data.brandPersonality,
        competitors: data.competitors,
        primary_goal: data.primaryGoal,
        features: data.features,
        target_audience: data.targetAudience,
        launch_date: data.launchDate || null,
        comm_pref: data.commPref,
        notes: data.notes
      }])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw error;
    }
    console.log("Insert Successful:", onboarding.id);

    return NextResponse.json({ success: true, id: onboarding.id });
  } catch (error: any) {
    console.error("Onboarding Submit Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
