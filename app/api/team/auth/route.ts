import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    // Find the team member
    const { data: member, error } = await supabaseAdmin
      .from("team_members")
      .select("*")
      .eq("email", email)
      .eq("is_active", true)
      .single();

    if (error || !member) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, member.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create session in database
    const sessionId = uuidv4();
    const { error: sessionError } = await supabaseAdmin
      .from("team_sessions")
      .insert({
        id: sessionId,
        team_member_id: member.id,
        login_at: new Date().toISOString(),
        is_active: true,
      });

    if (sessionError) {
      console.error("Session creation error:", sessionError);
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set("team_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        accepted_terms: member.accepted_terms,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("team_session")?.value;

  if (sessionId) {
    // Invalidate session in database
    await supabaseAdmin
      .from("team_sessions")
      .update({ logout_at: new Date().toISOString(), is_active: false })
      .eq("id", sessionId);

    // Remove cookie
    cookieStore.delete("team_session");
  }

  return NextResponse.json({ success: true });
}
