import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { PDFService } from "@/lib/services/pdf.service";
import { RazorpayService } from "@/lib/services/razorpay.service";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { data: client, error: clientError } = await supabaseAdmin
      .from("clients")
      .select("*")
      .eq("id", data.client_id)
      .single();

    if (clientError || !client) throw new Error("Client not found");

    // 1. Create Invoice in DB
    const { data: invoice, error: invError } = await supabaseAdmin
      .from("invoices")
      .insert([{
        client_id: data.client_id,
        agreement_id: data.agreement_id,
        amount: data.amount,
        balance_due: data.amount,
        status: "pending",
        due_date: data.due_date
      }])
      .select()
      .single();

    if (invError) throw invError;

    // 2. Generate PDF
    const pdfUrl = await PDFService.generateInvoice({
      ...invoice,
      client_name: client.name,
      business_name: client.business_name,
      description: data.description || "Project Milestone Payment",
      invoice_id: invoice.id.slice(0, 8).toUpperCase()
    });

    // 3. Create Razorpay Order
    const order = await RazorpayService.createOrder(data.amount, invoice.id);

    // 4. Update Invoice
    await supabaseAdmin
      .from("invoices")
      .update({ 
        pdf_url: pdfUrl,
        razorpay_order_id: order.id 
      })
      .eq("id", invoice.id);

    return NextResponse.json({ 
      success: true, 
      invoiceId: invoice.id, 
      razorpayOrderId: order.id,
      pdfUrl 
    });
  } catch (error: any) {
    console.error("Invoice API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
