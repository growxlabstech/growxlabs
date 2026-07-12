import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File is too large (max 10MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Safe filename generation
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `resumes/resume_${Date.now()}_${cleanFileName}`;

    const { data: uploadData, error } = await supabaseAdmin.storage
      .from("documents")
      .upload(fileName, buffer, {
        contentType: file.type || "application/pdf",
        upsert: true,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return NextResponse.json({ error: "Failed to upload file to storage" }, { status: 500 });
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("documents")
      .getPublicUrl(uploadData.path);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("Resume Upload API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
