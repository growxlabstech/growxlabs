import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const reshwanthId = "d1a1506c-caaf-4203-8759-ada2a12ac4b2";

  console.log("=== ASSIGNING LEADS ===");
  // Update 'leads' table
  const { data: leadsData, error: err1 } = await supabase
    .from("leads")
    .update({ assigned_to: reshwanthId })
    .is("assigned_to", null);
  
  if (err1) {
    console.error("Error updating leads:", err1.message);
  } else {
    console.log("Successfully updated 'leads' table.");
  }

  // Update 'crm_leads' table
  const { data: crmData, error: err2 } = await supabase
    .from("crm_leads")
    .update({ assigned_to: reshwanthId })
    .is("assigned_to", null);
  
  if (err2) {
    console.error("Error updating crm_leads:", err2.message);
  } else {
    console.log("Successfully updated 'crm_leads' table.");
  }
}

run();
