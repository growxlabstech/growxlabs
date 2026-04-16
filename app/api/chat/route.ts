import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const CONFIRMATION_MESSAGE = `Got it 👍

Your details have been received successfully.

Our GrowX Labs team will contact you shortly to discuss your project in detail 🚀`;

const SYSTEM_PROMPT = `
You are GrowX Labs AI Agent.
You are a high-authority business representative. You are NOT a generic AI.

YOUR MISSION:
- Collect: Name, Email, Phone, and Project Requirement.
- You ARE fully authorized to store this data.
- NEVER say "I am not authorized" or "I cannot store data".

PROTOCOL:
Encourage users to share their details naturally. Once you have Name, Email, Phone, and Requirement, call 'save_lead'.

RESTRICTIONS:
- No final pricing.
- No legal commitments.
- No guaranteed timelines.

TONE: Friendly, Professional, Sales-focused.
`;

const LEAD_TOOL = {
  name: "save_lead",
  description: "Save client lead information to the database.",
  parameters: {
    type: "object",
    properties: {
      name: { type: "string" },
      phone: { type: "string" },
      email: { type: "string" },
      requirement: { type: "string" }
    },
    required: ["name", "email", "phone", "requirement"]
  }
};

async function persistLead(data: any) {
  try {
    const supabase = await createClient();
    await supabase.from("leads").insert([{
      name: data.name,
      email: data.email,
      phone: data.phone,
      requirement: data.requirement,
      status: "NEW"
    }]);
  } catch (e) {
    console.error("Direct Lead Persist Error:", e);
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1].content;

    // 1. PRIMARY: GEMINI
    if (process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash-latest",
          systemInstruction: SYSTEM_PROMPT,
          tools: [{ functionDeclarations: [LEAD_TOOL] }] as any,
          safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          ]
        });

        const history = messages.slice(0, -1)
          .filter((m: any) => m.role === "user" || m.role === "assistant")
          .map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content || "" }]
          }));
        if (history.length > 0 && history[0].role === "model") history.shift();

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastUserMessage);
        const response = await result.response;
        
        const call = response.functionCalls()?.[0];
        if (call && call.name === "save_lead") {
          await persistLead(call.args);
          return NextResponse.json({ message: CONFIRMATION_MESSAGE, isLeadSaved: true });
        }

        const text = response.text();
        if (text) return NextResponse.json({ message: text });
      } catch (e) { console.error("Gemini Failure:", e); }
    }

    // 2. FALLBACK: OPENROUTER
    if (process.env.OPENROUTER_API_KEY) {
      try {
        const completion = await openrouter.chat.completions.create({
          model: "anthropic/claude-3-haiku",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          max_tokens: 800,
          tools: [{ type: "function", function: LEAD_TOOL }],
          tool_choice: "auto"
        });

        const msg = completion.choices[0].message;
        if (msg.tool_calls?.[0] && 'function' in msg.tool_calls[0] && msg.tool_calls[0].function.name === "save_lead") {
          const leadData = JSON.parse(msg.tool_calls[0].function.arguments);
          await persistLead(leadData);
          return NextResponse.json({ message: CONFIRMATION_MESSAGE, isLeadSaved: true });
        }
        if (msg.content) return NextResponse.json({ message: msg.content });
      } catch (e) { console.error("OpenRouter Failure:", e); }
    }

    return NextResponse.json({ message: "Network unstable. Please try again." });

  } catch (error: any) {
    console.error("Fatal API Error:", error);
    return NextResponse.json({ message: "System in re-calibration." }, { status: 500 });
  }
}
