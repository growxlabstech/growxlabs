import React from "react";
import Script from "next/script";
import Image from "next/image";
import { Link, locales } from "@/navigation";
import { 
  ReadingProgressBar, 
  TableOfContents 
} from "@/components/marketing/BlogInteractive";
import { Reveal } from "@/components/marketing/Reveal";
import { ArrowRight, Calendar, Clock, User, ArrowUpRight, Rocket } from "lucide-react";
import { FlickerText } from "@/components/marketing/FlickerText";
import { BlogShare, NewsletterCTA } from "./InteractiveComponents";

// ═══════════════════════════════════════════════════
// METADATA GENERATOR (SEO & Social Previews)
// ═══════════════════════════════════════════════════
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const path = "blog/blue-origin-new-glenn-rocket-explosion";

  const languages: Record<string, string> = {
    'x-default': `https://growxlabs.tech/en-IN/${path}`,
  };
  locales.forEach((l) => {
    languages[l] = `https://growxlabs.tech/${l}/${path}`;
  });

  const title = "Blue Origin’s New Glenn Rocket Explodes During Test: What Happened?";
  const description = "Blue Origin's New Glenn rocket exploded during a hot-fire test in Florida. Here's what happened, why it matters, and what it means for the future of space technology.";

  return {
    title: `${title} | GrowXLabsTech`,
    description,
    alternates: {
      canonical: `https://growxlabs.tech/${locale}/${path}`,
      languages
    },
    openGraph: {
      title,
      description,
      url: `https://growxlabs.tech/${locale}/${path}`,
      siteName: "GrowXLabsTech",
      type: "article",
      publishedTime: "2026-05-30T17:00:00.000Z",
      authors: ["GrowXLabsTech"],
      images: [
        {
          url: "https://growxlabs.tech/images/blue-origin-new-glenn-rocket-explosion.png",
          width: 1200,
          height: 630,
          alt: "Blue Origin's New Glenn Rocket Explodes During Test"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://growxlabs.tech/images/blue-origin-new-glenn-rocket-explosion.png"]
    },
    keywords: [
      "Blue Origin",
      "New Glenn",
      "Rocket Explosion",
      "Jeff Bezos",
      "Space technology",
      "NASA Artemis",
      "Project Kuiper",
      "SpaceX competitor",
      "Launch failure",
      "Cape Canaveral"
    ]
  };
}

export default async function NewGlennExplosionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titleName = "NEW GLENN";

  // Headings for Table of Contents scrollspy
  const headings = [
    { id: "setback", text: "Blue Origin Faces Major Setback" },
    { id: "what-is-new-glenn", text: "What Is New Glenn?" },
    { id: "what-happened", text: "What Exactly Happened?" },
    { id: "why-it-matters", text: "Why This Matters" },
    { id: "bezos-responds", text: "Jeff Bezos Responds" },
    { id: "bigger-picture", text: "The Bigger Picture" },
    { id: "key-takeaways", text: "Key Takeaways" },
    { id: "final-thoughts", text: "Final Thoughts" }
  ];

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://growxlabs.tech/${locale}/blog/blue-origin-new-glenn-rocket-explosion/#article`,
        "headline": "Blue Origin’s New Glenn Rocket Explodes During Test: What Happened?",
        "description": "Blue Origin's New Glenn rocket exploded during a hot-fire test in Florida. Here's what happened, why it matters, and what it means for the future of space technology.",
        "datePublished": "2026-05-30T17:00:00Z",
        "dateModified": "2026-05-30T17:00:00Z",
        "image": "https://growxlabs.tech/images/blue-origin-new-glenn-rocket-explosion.png",
        "author": {
          "@type": "Organization",
          "name": "GrowXLabsTech",
          "url": "https://growxlabs.tech",
          "logo": "https://growxlabs.tech/logo.png"
        },
        "publisher": {
          "@type": "Organization",
          "name": "GrowXLabsTech",
          "logo": {
            "@type": "ImageObject",
            "url": "https://growxlabs.tech/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://growxlabs.tech/${locale}/blog/blue-origin-new-glenn-rocket-explosion`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `https://growxlabs.tech/${locale}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `https://growxlabs.tech/${locale}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "New Glenn Explosion",
            "item": `https://growxlabs.tech/${locale}/blog/blue-origin-new-glenn-rocket-explosion`
          }
        ]
      }
    ]
  };

  // Related articles
  const relatedArticles = [
    {
      title: "Claude Opus 4.8: Anthropic's Most Advanced AI Model — Benchmarks & Review",
      href: "/blog/claude-opus-4-8-anthropic-ai-model",
      date: "May 29, 2026",
      readTime: "12 min read"
    },
    {
      title: "Why Anthropic Is Becoming a Serious Threat to OpenAI",
      href: "/blog/why-anthropic-is-becoming-a-serious-threat-to-openai",
      date: "May 27, 2026",
      readTime: "5 min read"
    },
    {
      title: "Google I/O 2026: The Beginning of the AI-Native Internet",
      href: "/blog/google-io-2026",
      date: "May 27, 2026",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="w-full bg-[#F5F3EE] min-h-screen text-[#1A1A1A] selection:bg-[#355CFF]/10 selection:text-[#355CFF] pt-32 pb-24">
      {/* JSON-LD Structured Data */}
      <Script
        id="blue-origin-explosion-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky Reading Progress */}
      <ReadingProgressBar />

      {/* ═══════════════════════════════════════════════════ */}
      {/* HERO SECTION                                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <header className="w-full border-b border-[#E5E2DC] pb-16 px-6 md:px-10 xl:px-16 2xl:px-24 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Swiss Title */}
          <div className="w-full overflow-hidden flex justify-center items-end select-none pointer-events-none mb-10">
            <h1 className="font-black select-none tracking-[-0.06em] text-[#1A1A1A] leading-[0.8] text-[9.2vw] uppercase whitespace-nowrap">
              <FlickerText text={titleName} />
            </h1>
          </div>

          <Reveal y={20}>
            {/* Category Tags */}
            <div className="flex gap-2 justify-center items-center mb-6">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#355CFF] uppercase font-bold bg-[#355CFF]/5 px-2.5 py-1 rounded">
                Space
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#6B7280] uppercase">
                /
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#6B7280] uppercase">
                Technology
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#6B7280] uppercase">
                /
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#6B7280] uppercase">
                Innovation
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-[clamp(32px,4.5vw,56px)] font-black leading-[1.1] tracking-tighter text-[#1A1A1A] mb-8 max-w-4xl mx-auto">
              Blue Origin’s New Glenn Rocket Explodes During Test:
              <br />
              <span className="text-[#355CFF]">What Happened?</span>
            </h2>

            {/* Meta Bar */}
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-6 sm:gap-10 font-mono text-[11px] tracking-[0.1em] text-[#6B7280] uppercase border-t border-b border-[#E5E2DC] py-5">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#355CFF]" />
                <span>By GrowXLabsTech</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#355CFF]" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#355CFF]" />
                <span>May 30, 2026</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Visual — Featured Image */}
          <Reveal y={30} delay={0.2}>
            <div className="mt-14 w-full max-w-5xl mx-auto">
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#E5E2DC] bg-[#0F0F12] shadow-md">
                <Image
                  src="/images/blue-origin-new-glenn-rocket-explosion.png"
                  alt="Blue Origin New Glenn Rocket Explosion Test Anomaly"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════ */}
      {/* ARTICLE BODY                                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <main className="w-full px-6 md:px-10 xl:px-16 2xl:px-24 py-16">
        <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 relative">
          
          {/* Desktop TOC Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <TableOfContents headings={headings} />
          </aside>

          {/* Article Content */}
          <article className="col-span-12 lg:col-span-9 max-w-[70ch] mx-auto lg:mx-0">
            {/* Mobile TOC */}
            <div className="lg:hidden mb-12 bg-white/60 border border-[#E5E2DC] rounded-xl p-6">
              <TableOfContents headings={headings} />
            </div>

            {/* ─────────────────────────────────────── */}
            {/* SECTION 01 — SETBACK                   */}
            {/* ─────────────────────────────────────── */}
            <section id="setback" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                Blue Origin Faces Major Setback as New Glenn Rocket Explodes
              </h2>
              <div className="text-[18px] leading-[1.85] text-[#374151] font-normal space-y-6 font-sans">
                <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[#355CFF] first-letter:mr-3 first-letter:float-left">
                  Jeff Bezos&apos; space company, Blue Origin, suffered a significant setback after its New Glenn rocket exploded during a hot-fire test at Cape Canaveral, Florida.
                </p>
                <p>
                  The incident occurred while engineers were performing a routine ground test designed to verify the rocket&apos;s systems before an upcoming mission. During the test, an anomaly triggered a massive explosion, destroying the rocket and creating a huge fireball visible across Florida&apos;s Space Coast. Fortunately, no injuries were reported, and all personnel were safely accounted for.
                </p>
              </div>
            </section>

            <div className="w-full h-px bg-[#E5E2DC] my-14" />

            {/* ─────────────────────────────────────── */}
            {/* SECTION 02 — WHAT IS NEW GLENN?        */}
            {/* ─────────────────────────────────────── */}
            <section id="what-is-new-glenn" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                What Is New Glenn?
              </h2>
              <div className="text-[18px] leading-[1.85] text-[#374151] font-normal space-y-6 font-sans">
                <p>
                  New Glenn is Blue Origin&apos;s flagship heavy-lift rocket and one of the company&apos;s most ambitious projects.
                </p>
                <p>
                  Named after astronaut John Glenn, the first American to orbit Earth, the rocket has been under development for more than a decade. It was designed to compete directly with SpaceX&apos;s Falcon Heavy and future Starship missions while supporting commercial satellite launches, government contracts, and NASA programs.
                </p>
                <div className="bg-white border border-[#E5E2DC] rounded-xl p-6 space-y-4">
                  <p className="font-semibold text-[#1A1A1A] flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-[#355CFF]" />
                    <span>The rocket plays a critical role in:</span>
                  </p>
                  <ul className="list-none space-y-2.5 pl-4 border-l-2 border-[#355CFF]/30">
                    {[
                      "Commercial satellite launches",
                      "Amazon's Project Kuiper internet constellation",
                      "NASA lunar missions",
                      "National security launch contracts",
                      "Future deep-space missions"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[16px] text-[#374151]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#355CFF]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-[#E5E2DC] my-14" />

            {/* ─────────────────────────────────────── */}
            {/* SECTION 03 — WHAT HAPPENED             */}
            {/* ─────────────────────────────────────── */}
            <section id="what-happened" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                What Exactly Happened?
              </h2>
              <div className="text-[18px] leading-[1.85] text-[#374151] font-normal space-y-6 font-sans">
                <p>
                  Blue Origin was conducting a hot-fire test, a procedure where rocket engines are ignited while the vehicle remains secured to the launch pad.
                </p>
                <p>
                  These tests are performed to verify engine performance, fuel systems, and launch readiness before an actual mission.
                </p>
                <p>
                  During the test, New Glenn experienced what the company described as an &ldquo;anomaly.&rdquo; Seconds later, the rocket exploded on the launch pad, producing a massive fireball and destroying the vehicle. Blue Origin immediately confirmed that no personnel were harmed and that an investigation was underway.
                </p>
              </div>
            </section>

            <div className="w-full h-px bg-[#E5E2DC] my-14" />

            {/* ─────────────────────────────────────── */}
            {/* SECTION 04 — WHY IT MATTERS            */}
            {/* ─────────────────────────────────────── */}
            <section id="why-it-matters" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                Why This Matters
              </h2>
              <div className="text-[18px] leading-[1.85] text-[#374151] font-normal space-y-6 font-sans">
                <p>
                  This is more than just a failed test.
                </p>
                <p>
                  The explosion impacts Blue Origin&apos;s efforts to close the gap with SpaceX, which currently dominates the commercial launch industry.
                </p>
                <p>
                  The destroyed New Glenn rocket was expected to support future satellite deployments, including missions related to Amazon&apos;s Project Kuiper broadband network, a direct competitor to SpaceX&apos;s Starlink service.
                </p>
                <p>
                  The incident may also affect timelines for future NASA-related programs that rely on Blue Origin&apos;s launch capabilities. NASA has already acknowledged the anomaly and stated it will support the investigation.
                </p>
              </div>
            </section>

            <div className="w-full h-px bg-[#E5E2DC] my-14" />

            {/* ─────────────────────────────────────── */}
            {/* SECTION 05 — BEZOS RESPONDS            */}
            {/* ─────────────────────────────────────── */}
            <section id="bezos-responds" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                Jeff Bezos Responds
              </h2>
              <div className="text-[18px] leading-[1.85] text-[#374151] font-normal space-y-6 font-sans">
                <p>
                  Following the explosion, Jeff Bezos described the event as a &ldquo;very rough day&rdquo; for the company.
                </p>
                <blockquote className="border-l-4 border-[#355CFF] bg-[#355CFF]/[0.03] pl-6 pr-6 py-6 my-8 rounded-r-xl">
                  <p className="text-[17px] italic leading-relaxed text-[#374151] font-medium">
                    &ldquo;...very rough day&rdquo;
                  </p>
                  <cite className="text-[13px] text-[#6B7280] font-mono mt-3 block not-italic">— Jeff Bezos</cite>
                </blockquote>
                <p>
                  Despite the setback, Blue Origin has made it clear that development will continue. The company plans to investigate the root cause of the anomaly, rebuild, and return New Glenn to flight operations as quickly as possible.
                </p>
              </div>
            </section>

            <div className="w-full h-px bg-[#E5E2DC] my-14" />

            {/* ─────────────────────────────────────── */}
            {/* SECTION 06 — THE BIGGER PICTURE        */}
            {/* ─────────────────────────────────────── */}
            <section id="bigger-picture" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                The Bigger Picture
              </h2>
              <div className="text-[18px] leading-[1.85] text-[#374151] font-normal space-y-6 font-sans">
                <p>
                  Space exploration has always been filled with failures before success.
                </p>
                <p>
                  Many of today&apos;s most successful rockets, including those developed by SpaceX, experienced multiple explosions and failed tests during development.
                </p>
                <p>
                  While this explosion is a major setback, it is unlikely to end Blue Origin&apos;s ambitions. Instead, it highlights the complexity of building next-generation launch systems capable of carrying satellites, lunar payloads, and future human missions.
                </p>
                <p>
                  In the space industry, failures are often part of the path toward innovation.
                </p>
              </div>
            </section>

            <div className="w-full h-px bg-[#E5E2DC] my-14" />

            {/* ─────────────────────────────────────── */}
            {/* SECTION 07 — KEY TAKEAWAYS             */}
            {/* ─────────────────────────────────────── */}
            <section id="key-takeaways" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                Key Takeaways
              </h2>
              <div className="bg-white border border-[#E5E2DC] rounded-xl p-6 md:p-8 space-y-4">
                <ul className="list-none space-y-3">
                  {[
                    "Blue Origin's New Glenn rocket exploded during a hot-fire test in Florida.",
                    "No injuries were reported.",
                    "The rocket was being prepared for future missions, including Project Kuiper deployments.",
                    "NASA is supporting the investigation into the anomaly.",
                    "The incident represents a significant setback for Blue Origin's competition with SpaceX.",
                    "Jeff Bezos has confirmed the company will rebuild and continue development efforts."
                  ].map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-[16px] text-[#374151] leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#355CFF] mt-2.5 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="w-full h-px bg-[#E5E2DC] my-14" />

            {/* ─────────────────────────────────────── */}
            {/* SECTION 08 — FINAL THOUGHTS            */}
            {/* ─────────────────────────────────────── */}
            <section id="final-thoughts" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                Final Thoughts
              </h2>
              <div className="text-[18px] leading-[1.85] text-[#374151] font-normal space-y-6 font-sans">
                <p>
                  Blue Origin&apos;s New Glenn explosion is a reminder that space remains one of the most difficult engineering challenges on Earth.
                </p>
                <p>
                  While the failure may delay future missions, it also represents another chapter in the race to build the next generation of space transportation systems.
                </p>
                <p>
                  The question now is not whether Blue Origin will recover.
                </p>
                <p>
                  The question is how quickly they can learn from this failure and return to the launch pad.
                </p>
                <p className="pt-4 font-semibold text-[#1D1D21]">
                  Follow GrowXLabsTech for the latest updates in AI, space technology, startups, automation, and future innovation.
                </p>
              </div>
            </section>

            {/* Share and Social Panel */}
            <BlogShare title="Blue Origin’s New Glenn Rocket Explodes During Test" slug="blue-origin-new-glenn-rocket-explosion" />

            {/* Newsletter Subscription Block */}
            <NewsletterCTA />

            {/* Related Articles Section */}
            <section className="space-y-8 mt-16">
              <h2 className="text-2xl font-black tracking-tight text-[#1A1A1A]">Continue Reading</h2>
              <div className="grid gap-4">
                {relatedArticles.map((article, i) => (
                  <Link key={i} href={article.href} className="group block bg-white border border-[#E5E2DC] rounded-xl p-6 hover:border-[#355CFF]/30 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-[17px] font-bold text-[#1A1A1A] group-hover:text-[#355CFF] transition-colors leading-snug">{article.title}</h3>
                        <div className="flex items-center gap-4 font-mono text-[11px] text-[#6B7280] tracking-wider uppercase">
                          <span>{article.date}</span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#D1D5DB] group-hover:text-[#355CFF] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}
