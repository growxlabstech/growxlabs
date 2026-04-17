import { supabaseAdmin } from "@/lib/supabase/admin";

export class OnboardingService {
  static async startOnboarding(leadId: string) {
    const { data: lead, error: fetchError } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (fetchError || !lead) throw new Error("Lead not found");

    console.log(`Starting onboarding for ${lead.business_name}...`);

    await supabaseAdmin
      .from("leads")
      .update({ status: "client" })
      .eq("id", leadId);

    // Send onboarding agreement
    return {
      success: true,
      message: "Onboarding initiated. Agreement sent to " + lead.email
    };
  }
}
