import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data: terms, error } = await supabaseAdmin
      .from("terms_versions")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return NextResponse.json({ terms: terms || null });
  } catch (error) {
    console.error("Fetch terms error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("team_session")?.value;

    if (!sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the team member ID from session
    const { data: session } = await supabaseAdmin
      .from("team_sessions")
      .select("team_member_id")
      .eq("id", sessionId)
      .eq("is_active", true)
      .single();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update the team member's accepted_terms
    const { error } = await supabaseAdmin
      .from("team_members")
      .update({
        accepted_terms: true,
        accepted_terms_at: new Date().toISOString(),
      })
      .eq("id", session.team_member_id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Accept terms error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
