import { config } from "dotenv";
config({ path: ".env.local" });

console.log("Configured Database/Supabase keys:");
for (const key of Object.keys(process.env)) {
  if (key.includes("DATABASE") || key.includes("SUPABASE") || key.includes("URL") || key.includes("KEY")) {
    console.log(`- ${key}: ${process.env[key] ? "DEFINED" : "UNDEFINED"}`);
  }
}
