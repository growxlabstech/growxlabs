import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getToken } from "next-auth/jwt";

// List of ignored Instagram paths that are not usernames
const IGNORED_PATHS = new Set([
  "p", "reels", "reel", "explore", "tags", "tv", "stories", "direct", 
  "developer", "about", "legal", "press", "jobs", "blog", "accounts"
]);

export async function POST(req: Request) {
  try {
    // 1. Session authorization
    const token = await getToken({
      req: req as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { niche, city, emailDomain } = await req.json();

    if (!niche || !city) {
      return NextResponse.json({ error: "Niche and City are required" }, { status: 400 });
    }

    const targetEmailDomain = emailDomain || "@gmail.com";
    
    let nicheQuery = `"${niche}"`;
    if (niche === "All Niches") {
      nicheQuery = `("clothing brand" OR "restaurant" OR "salon" OR "gym" OR "boutique" OR "founder" OR "sarees")`;
    }

    let cityQuery = `"${city}"`;
    if (city === "All Cities") {
      cityQuery = `"India"`; // Scope to all of India
    }

    const searchQuery = `site:instagram.com ${nicheQuery} ${cityQuery} "${targetEmailDomain}"`;

    console.log(`Instagram X-Ray Search Initiated via DuckDuckGo: ${searchQuery}`);

    // 2. Fetch DuckDuckGo Search HTML
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;
    const response = await fetch(ddgUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    if (!response.ok) {
      throw new Error(`DuckDuckGo Search responded with status ${response.status}`);
    }

    const html = await response.text();
    const leads: any[] = [];

    // 3. Parse DuckDuckGo Search Results HTML
    // DuckDuckGo separates links with class="result results_links results_links_deep web-result"
    const resultBlocks = html.split(/class="result results_links/);
    const blocksToProcess = resultBlocks.slice(1);

    for (const block of blocksToProcess) {
      // Find instagram handle link inside the block
      // e.g. uddg=https%3A%2F%2Fwww.instagram.com%2Fvinnu_lifestyle
      const urlMatch = block.match(/uddg=https?(?:%3A%2F%2F|:\/\/)(?:www\.)?instagram\.com%2F([a-zA-Z0-9_\.]+)/i) || 
                       block.match(/instagram\.com\/([a-zA-Z0-9_\.]+)/i);
                       
      if (!urlMatch) continue;

      const rawUsername = decodeURIComponent(urlMatch[1]);
      const username = rawUsername.split(/[/?#&%]/)[0].trim().toLowerCase();

      if (!username || IGNORED_PATHS.has(username) || username.length < 3) {
        continue;
      }

      // Find email inside this result snippet block
      const emailMatch = block.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (!emailMatch) continue;
      const email = emailMatch[0].trim().toLowerCase();

      // Find profile / business name from the result__a title tag
      const titleMatch = block.match(/class="result__a"[^>]*>([\s\S]*?)<\/a>/i);
      let name = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "").trim() : `@${username}`;
      name = name.replace(/\s*[•|(-]\s*Instagram.*$/i, "").trim();
      name = name.replace(/^@/, "").trim();

      // Check if snippet lists any other website domains
      const snippetMatch = block.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i);
      const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]*>/g, "").trim() : "";

      const linksInSnippet = snippet.match(/[a-zA-Z0-9-]+\.(com|in|org|net|co|io|me|linktr\.ee|info)/gi) || [];
      const externalLink = linksInSnippet.find(link => {
        const l = link.toLowerCase();
        return !l.includes("instagram") && !l.includes("facebook") && !l.includes("gmail") && !l.includes("yahoo") && !l.includes("outlook");
      });

      const hasWebsite = !!externalLink;

      // Scoring
      let score = 7;
      if (!hasWebsite) score += 2;
      if (snippet.toLowerCase().includes("whatsapp") || snippet.toLowerCase().includes("contact") || snippet.toLowerCase().includes("dm")) {
        score += 1;
      }

      const lead = {
        name: name || username,
        business_name: name || username,
        phone: "",
        website_url: `https://instagram.com/${username}`,
        has_website: hasWebsite,
        google_rating: 0,
        reviews_count: 0,
        city,
        lead_score: score,
        status: "new",
        message: "",
        requirement: "",
        notes: `Instagram: @${username} | Email: ${email} | Bio: ${snippet}`,
        created_at: new Date().toISOString()
      };

      // Check if lead already exists in DB
      const { data: existing } = await supabaseAdmin
        .from("leads")
        .select("id")
        .eq("business_name", lead.business_name)
        .maybeSingle();

      if (!existing) {
        const { data, error } = await supabaseAdmin
          .from("leads")
          .insert([lead])
          .select()
          .single();

        if (!error && data) {
          leads.push(data);
        } else if (error) {
          console.error("INSTAGRAM LEAD SAVE FAILURE:", error.message);
        }
      } else {
        const { data: fullLead } = await supabaseAdmin
          .from("leads")
          .select("*")
          .eq("id", existing.id)
          .single();
        if (fullLead) {
          leads.push({ ...fullLead, alreadyExists: true });
        }
      }
    }

    console.log(`Instagram X-Ray Scrape completed: Saved/Retrieved ${leads.length} leads.`);

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads
    });

  } catch (error: any) {
    console.error("Instagram Scraper API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
