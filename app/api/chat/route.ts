import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key",
});

const SYSTEM_PROMPT = `
You are GrowX AI, the intelligent assistant for GrowX Labs. 
Your goal is to assist clients, explain our services, and collect lead information professionally.

SERVICES:
- Web Development: Specialized in Next.js, React, and high-performance ecosystems.
- AI & Automation: Custom n8n workflows and AI logic systems to reduce operational overhead.
- Performance SEO: Data-driven search excellence.
- Systems Hosting: Premium managed cloud infrastructure.

PRICING RANGES (SUGGESTIONS ONLY):
- Web Projects: Typically $2,000 - $15,000+
- Automation: Usually $500 - $5,000 setup, plus monthly maintenance.
- SEO: Retainers from $1,000/mo.

RULES:
1. DO NOT finalize pricing or promise specific delivery dates.
2. DO NOT agree to contracts or negotiate final deals.
3. ALWAYS offer to schedule a strategy call if the user is interested.
4. BE professional, concise, and cinematic in your tone.

LEAD COLLECTION:
Try to naturally collect the following from potential clients:
- Name
- Email address
- Business type/Vertical
- Project Requirement
- Budget (optional)

Once you have Name, Email, and Requirement, use the 'save_lead' tool to store the data.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_lead",
            description: "Save client lead information to the GrowX database.",
            parameters: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                business: { type: "string" },
                requirement: { type: "string" },
                budget: { type: "string" }
              },
              required: ["name", "email", "requirement"]
            }
          }
        }
      ],
      tool_choice: "auto"
    });

    const message = response.choices[0].message;

    // Handle tool calls
    if (message.tool_calls) {
      for (const toolCall of message.tool_calls) {
        if ('function' in toolCall && toolCall.function.name === "save_lead") {
          const leadData = JSON.parse(toolCall.function.arguments);
          
          return NextResponse.json({ 
            message: "I've noted your architectural requirements and our team will contact you shortly. Is there anything else you'd like to verify?",
            isLeadSaved: true,
            leadData 
          });
        }
      }
    }

    return NextResponse.json({ message: message.content });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return NextResponse.json({ message: "System is re-calibrating. Please try again in a moment." }, { status: 500 });
  }
}
