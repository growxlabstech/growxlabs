import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const reshwanthId = "d1a1506c-caaf-4203-8759-ada2a12ac4b2";

  console.log("=== UPDATING RESHWANTH PERMISSIONS ===");
  const { data, error } = await supabase
    .from("team_members")
    .update({ 
      allowed_paths: ["/admin/crm", "/admin/leads", "/admin/outreach"] 
    })
    .eq("id", reshwanthId)
    .select();
  
  if (error) {
    console.error("Error setting reshwanth permissions:", error.message);
  } else {
    console.log("Successfully set reshwanth permissions to CRM, Leads, and Outreach!", data);
  }
}

run();
