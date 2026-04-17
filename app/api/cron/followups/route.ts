import { NextResponse } from "next/server";
import { FollowUpService } from "@/services/followup.service";

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const leads = await FollowUpService.processFollowUps();
    return NextResponse.json({ success: true, count: leads.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
