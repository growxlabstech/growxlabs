import { NextResponse } from "next/server";
import { OutreachService } from "@/services/outreach.service";

export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();

    if (!leadId) {
      return NextResponse.json({ error: "LeadId is required" }, { status: 400 });
    }

    const result = await OutreachService.sendInitialOutreach(leadId);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Outreach API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
