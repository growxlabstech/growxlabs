import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      location,
      linkedin,
      github,
      portfolio,
      resume,
      role,
      experience,
      techStack,
      jobTitle,
      company,
      expectedSalary,
      noticePeriod,
      employmentType,
      motivation,
    } = body;

    // Basic Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required fields." },
        { status: 400 }
      );
    }

    // Format all 17 fields into a structured Markdown message
    const formattedMessage = `### 💼 Careers Application Brief
- **Full Name:** ${name}
- **Email:** ${email}
- **Phone:** ${phone || "Not provided"}
- **Location:** ${location || "Not provided"}

---

### 🔗 Professional Footprint
- **LinkedIn Profile:** ${linkedin || "Not provided"}
- **GitHub Profile:** ${github || "Not provided"}
- **Portfolio / Website:** ${portfolio || "Not provided"}
- **Resume / CV Link:** ${resume || "Not provided"}

---

### 🧠 Experience & Competence
- **Target Role:** ${role || "Not specified"}
- **Years of Experience:** ${experience || "Not specified"}
- **Core Tech Stack:** ${techStack || "Not specified"}
- **Last Job Title:** ${jobTitle || "Not specified"}
- **Last Employer:** ${company || "Not specified"}

---

### 📅 Logistics & Compensation
- **Notice Period / Availability:** ${noticePeriod || "Not specified"}
- **Expected Compensation:** ${expectedSalary || "Not specified"}
- **Employment Type:** ${employmentType || "Not specified"}

---

### 📝 Motivation
${motivation || "No motivation statement provided."}`;

    // Prepare lead payload matching DB schema
    const leadPayload: any = {
      name,
      email,
      message: formattedMessage,
      phone: phone || null,
      status: "new",
      source: "Careers Portal",
      lead_score: 5, // Label as career lead
      business_name: company || name,
    };

    const { error } = await supabaseAdmin.from("leads").insert([leadPayload]);

    if (error) {
      console.error("Error submitting career application to Supabase:", error);
      return NextResponse.json(
        { error: "Failed to submit application to the database." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Application submitted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Careers API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
