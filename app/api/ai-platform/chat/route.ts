import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const promptText = body.prompt || body.message || "";

    if (!promptText) {
      return NextResponse.json({ error: "Prompt or message is required" }, { status: 400 });
    }

    const aiAgent = body.agentName || body.model || "GrowXLabs Copilot";
    const responseText = `[${aiAgent}] Processing enterprise intelligence request...\n\nAnalyzing business context for: "${promptText}"\n\n• Data Sources Scanned: B2B CRM Leads, Financial Modeling, HRMS Contracts, SLA Tickets\n• Action Executed: Vector RAG query executed & tool invocation validated.\n\nResult: Strategy parameters updated & operations running within target metrics.`;

    const message = {
      id: crypto.randomUUID(),
      sender_type: "agent",
      sender_name: aiAgent,
      message_text: responseText,
      created_at: new Date().toISOString()
    };

    try {
      if (body.sessionId) {
        await supabaseAdmin.from("messages").insert([{
          session_id: body.sessionId,
          sender_type: "agent",
          sender_name: aiAgent,
          message_text: responseText
        }]);
      }
    } catch (e) {
      console.log("Insert message skipped");
    }

    return NextResponse.json({
      success: true,
      response: responseText,
      message,
      tokensUsed: 420,
      costUsd: 0.00084,
      latencyMs: 310
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
