const { Resend } = require("resend");
const fs = require("fs");
const path = require("path");

// Load RESEND_API_KEY from .env.local
const envPath = path.join(__dirname, "../.env.local");
let apiKey = "";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const match = envContent.match(/^RESEND_API_KEY=(.+)$/m);
  if (match) {
    apiKey = match[1].trim();
  }
}

if (!apiKey) {
  console.error("Error: RESEND_API_KEY not found in .env.local");
  process.exit(1);
}

const resend = new Resend(apiKey);

const emailHtml = `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #FAF9F6; border: 1px solid #E5E2DC; border-radius: 8px; color: #1A1A1A; line-height: 1.6;">
    <div style="border-bottom: 2px solid #E60000; padding-bottom: 15px; margin-bottom: 25px;">
      <span style="font-family: monospace; font-size: 10px; font-weight: bold; color: #E60000; letter-spacing: 0.2em; text-transform: uppercase; background-color: rgba(230,0,0,0.05); padding: 4px 8px; border-radius: 4px;">GrowXLabsTech</span>
      <h2 style="font-size: 20px; font-weight: 900; margin: 10px 0 0 0; color: #1A1A1A; letter-spacing: -0.02em;">OPERATIONAL ALIGNMENT & PERFORMANCE PROTOCOL</h2>
    </div>

    <p style="font-size: 15px; margin-bottom: 20px;">Dear Akhilesh,</p>
    
    <p style="font-size: 14px; margin-bottom: 20px; color: #4B5563;">
      As we scale GrowXLabsTech and prepare our technical pipelines for international client delivery, it is critical that we transition from a casual startup structure to a high-performance operating model. To ensure our goals are achieved and daily execution is transparent, we need to set clear, strict operational guidelines for our founding roles.
    </p>

    <p style="font-size: 14px; margin-bottom: 25px; color: #4B5563;">
      Below are the mandatory operational requirements, daily quotas, and weekly deliverables set for your role as the <strong>Co-Founder & Automation Architect</strong>, effective starting Monday morning:
    </p>

    <!-- Rule 1 -->
    <div style="background-color: #FFFFFF; border: 1px solid #E5E2DC; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
      <h3 style="font-size: 13px; font-weight: bold; color: #E60000; margin: 0 0 8px 0; font-family: monospace;">1. DAILY SALES & OUTREACH QUOTA</h3>
      <p style="font-size: 13px; color: #4B5563; margin: 0; line-height: 1.5;">
        Active client acquisition is a primary metric of success for our early-stage growth.
      </p>
      <ul style="font-size: 13px; color: #1A1A1A; margin: 8px 0 0 0; padding-left: 20px; line-height: 1.5;">
        <li><strong>Outreach Volume:</strong> Minimum of <strong>10 cold calls</strong> or <strong>20 highly-targeted custom pitches</strong> sent to prospective clients (restaurants, real estate agencies, software studios) every single day.</li>
        <li><strong>Lead Logging:</strong> All leads contacted, call metrics, response data, and follow-up schedules must be updated in our shared sales tracker by <strong>6:00 PM daily</strong>.</li>
      </ul>
      <p style="font-size: 11px; color: #9CA3AF; margin: 8px 0 0 0; font-style: italic;">
        *Note: Any week with zero calls or outreach logs will be marked as non-performance.
      </p>
    </div>

    <!-- Rule 2 -->
    <div style="background-color: #FFFFFF; border: 1px solid #E5E2DC; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
      <h3 style="font-size: 13px; font-weight: bold; color: #E60000; margin: 0 0 8px 0; font-family: monospace;">2. WEEKLY TECHNICAL SHIPMENTS (BUILDS)</h3>
      <p style="font-size: 13px; color: #4B5563; margin: 0; line-height: 1.5;">
        The primary engineering responsibility of the Automation Architect is designing and shipping robust, production-ready workflows.
      </p>
      <ul style="font-size: 13px; color: #1A1A1A; margin: 8px 0 0 0; padding-left: 20px; line-height: 1.5;">
        <li><strong>Weekly Output:</strong> Minimum of <strong>2 complete, fully tested automation workflows</strong> built inside our staging environment (n8n/make) every week.</li>
        <li><strong>Documentation Standard:</strong> Every workflow must be accompanied by a clean technical walkthrough explaining node triggers, variables, and error-handling loops.</li>
      </ul>
    </div>

    <!-- Rule 3 -->
    <div style="background-color: #FFFFFF; border: 1px solid #E5E2DC; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
      <h3 style="font-size: 13px; font-weight: bold; color: #E60000; margin: 0 0 8px 0; font-family: monospace;">3. DAILY END-OF-DAY (EOD) STATUS REPORTING</h3>
      <p style="font-size: 13px; color: #4B5563; margin: 0; line-height: 1.5;">
        Transparency of daily execution is mandatory to maintain coordination and momentum:
      </p>
      <ul style="font-size: 13px; color: #1A1A1A; margin: 8px 0 0 0; padding-left: 20px; line-height: 1.5;">
        <li><strong>Reporting SLA:</strong> A detailed <strong>EOD Status Update</strong> must be posted in our shared workspace by <strong>6:00 PM every day</strong>.</li>
        <li><strong>Update Format:</strong> Sales metrics, active workflow links created/updated today, and immediate blockers.</li>
      </ul>
    </div>

    <!-- Rule 4 -->
    <div style="background-color: #FFFFFF; border: 1px solid #E5E2DC; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
      <h3 style="font-size: 13px; font-weight: bold; color: #E60000; margin: 0 0 8px 0; font-family: monospace;">4. COMMUNICATION & AVAILABILITY SLA</h3>
      <ul style="font-size: 13px; color: #1A1A1A; margin: 0; padding-left: 20px; line-height: 1.5;">
        <li><strong>Active Window:</strong> Full operational availability between <strong>9:00 AM and 6:00 PM (Monday to Friday)</strong>.</li>
        <li><strong>Response Latency:</strong> A maximum <strong>2-hour response window</strong> for all internal communications during business hours.</li>
      </ul>
    </div>

    <!-- Rule 5 -->
    <div style="background-color: #FFFFFF; border: 1px solid #E5E2DC; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
      <h3 style="font-size: 13px; font-weight: bold; color: #E60000; margin: 0 0 8px 0; font-family: monospace;">5. FRIDAY WEEKLY RECONCILIATION</h3>
      <p style="font-size: 13px; color: #4B5563; margin: 0; line-height: 1.5;">
        A mandatory performance review meeting will occur <strong>every Friday at 5:00 PM</strong> to audit target metrics. We will review the sales logs and staging workspaces together to verify the shipment of <strong>50+ outreach targets</strong> and <strong>2+ custom automation systems</strong> for the week. 
      </p>
      <p style="font-size: 13px; color: #1A1A1A; margin: 8px 0 0 0; line-height: 1.5;">
        Continued deficits across consecutive weeks will trigger an immediate reassessment of partnership roles and equity structures.
      </p>
    </div>

    <p style="font-size: 14px; margin-top: 30px; color: #4B5563;">
      For GrowXLabsTech to reach its potential, we must hold ourselves to these high standards of execution starting next week.
    </p>

    <p style="font-size: 14px; margin-bottom: 25px; color: #4B5563;">
      Please reply to this email to confirm your receipt and alignment with these operating guidelines. Let's get ready to build a high-performance business.
    </p>

    <div style="border-top: 1px solid #E5E2DC; padding-top: 15px; margin-top: 30px; font-size: 13px;">
      <strong>Pujala Sai Varshith</strong><br />
      <span style="color: #6B7280;">Founder & Principal Systems Engineer</span><br />
      <span style="color: #6B7280;">GrowXLabsTech</span><br />
      <a href="https://growxlabs.tech" style="color: #E60000; text-decoration: none;">growxlabs.tech</a>
    </div>
  </div>
`;

console.log("Sending email to Akhilesh...");

resend.emails.send({
  from: "GrowXLabsTech <outreach@growxlabs.tech>",
  to: "saivarshith8284@gmail.com",
  subject: "GrowXLabsTech: Operational Alignment & Performance Protocol",
  html: emailHtml
}).then(({ data, error }) => {
  if (error) {
    console.error("Resend Error:", error);
    process.exit(1);
  }
  console.log("Email sent successfully! Message ID:", data.id);
  process.exit(0);
}).catch(err => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
