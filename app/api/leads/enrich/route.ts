import { NextResponse } from "next/server";
import { EnrichmentService } from "@/services/enrichment.service";

export async function POST() {
  try {
    const leads = await EnrichmentService.enrichLeads();

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error: any) {
    console.error("Enrichment API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
