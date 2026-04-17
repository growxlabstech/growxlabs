import { supabaseAdmin } from "@/lib/supabase/admin";

export class InvoiceService {
  static async createInvoice(clientId: string, amount: number, description: string) {
    const { data: lead, error: fetchError } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("id", clientId)
      .single();

    if (fetchError || !lead) throw new Error("Client/Lead not found");

    console.log(`Creating invoice for ${lead.business_name}: $${amount}`);

    // In a real system, we'd integrate with Stripe or similar
    const invoice = {
      client_id: lead.id,
      amount,
      description,
      status: "pending",
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from("invoices")
      .insert([invoice])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
