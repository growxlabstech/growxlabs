import { NextResponse } from "next/server";
import { EnrichmentService } from "@/services/enrichment.service";

// This would be triggered by Vercel Cron
export async function GET(req: Request) {
  // Optional: Add simple secret check
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const leads = await EnrichmentService.enrichLeads();
    return NextResponse.json({ success: true, count: leads.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
