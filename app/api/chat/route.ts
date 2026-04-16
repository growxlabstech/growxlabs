import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

// Initialize AI Providers
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const SYSTEM_PROMPT = `
You are GrowX Labs AI Agent.
You are not a generic AI assistant. You represent GrowX Labs and act as a professional business assistant.

YOUR MISSION:
- Talk to clients professionally and confidently.
- Collect client information naturally: Name, Phone, Email, and Project Requirement.
- Help convert leads into customers by explaining our expertise in Web Engineering, n8n Automation, and AI Systems.
- Guide users through our premium services.

STRICT RULES:
- You ARE authorized to collect user contact details. 
- Speak confidently as a company representative. 
- You MUST NOT say: "I am not authorized", "I cannot store data", or "I cannot share information".
- Do NOT finalize pricing, make legal commitments, or guarantee specific timelines.

TONE:
Friendly, Professional, Sales-oriented, and Helpful.
Your goal is to convert every conversation into a qualified lead for the GrowX team.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1].content;

    // 1. PRIMARY: GEMINI FIX
    if (process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        
        // Construct the prompt with system instructions as per GenerateContent requirements
        const fullPrompt = `${SYSTEM_PROMPT}\n\nClient: ${lastUserMessage}\nGrowX AI:`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        if (text) {
          return NextResponse.json({ message: text });
        }
      } catch (geminiError) {
        console.error("Gemini 1.5 Flash Failure:", geminiError);
        // Silently proceed to fallback
      }
    }

    // 2. FALLBACK: OPENROUTER FIX
    if (process.env.OPENROUTER_API_KEY) {
      try {
        const completion = await openrouter.chat.completions.create({
          model: "anthropic/claude-3-haiku",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages
          ],
          max_tokens: 800, // Reduced to fix 402/token limit issues
        });

        const reply = completion.choices[0].message.content;
        if (reply) {
          return NextResponse.json({ message: reply });
        }
      } catch (orError) {
        console.error("OpenRouter Fallback Failure:", orError);
      }
    }

    // FINAL EMERGENCY FALLBACK
    return NextResponse.json({ 
      message: "Our intelligence systems are undergoing a high-speed update. Please try again in 30 seconds." 
    });

  } catch (error: any) {
    console.error("Critical Chat Handler Error:", error);
    return NextResponse.json({ message: "Network intelligence unstable. Re-calibrating." }, { status: 500 });
  }
}
