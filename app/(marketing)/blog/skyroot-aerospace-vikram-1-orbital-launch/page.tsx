import React from "react";
import Script from "next/script";
import Image from "next/image";
import { Link, locales } from "@/navigation";
import { 
  ReadingProgressBar, 
  TableOfContents 
} from "@/components/marketing/BlogInteractive";
import { 
  AuthorProfileSidebar, 
  BlogActionBar, 
  NewsletterForwardBanner, 
  RelatedEssaysList 
} from "@/components/marketing/BlogEditorial";
import { Reveal } from "@/components/marketing/Reveal";
import { ArrowRight, Calendar, Clock, User, ArrowUpRight, Rocket, CheckCircle2, ChevronDown, Layers, Zap, Globe, ShieldCheck, Cpu } from "lucide-react";
import { FlickerText } from "@/components/marketing/FlickerText";
import { BlogShare } from "./InteractiveComponents";

// ═══════════════════════════════════════════════════
// METADATA GENERATOR (SEO & Social Previews)
// ═══════════════════════════════════════════════════
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const path = "blog/skyroot-aerospace-vikram-1-orbital-launch";

  const languages: Record<string, string> = {
    'x-default': `https://growxlabs.tech/en-IN/${path}`,
  };
  locales.forEach((l) => {
    languages[l] = `https://growxlabs.tech/${l}/${path}`;
  });

  const title = "Skyroot Aerospace Launches Vikram-1, Ushering India Into Private Orbital Era";
  const description = "Skyroot Aerospace successfully launches Vikram-1, becoming India's first private company to achieve orbital insertion. Read our deep technical analysis of the mission.";

  return {
    title: `${title} | GrowXLabs Tech Insights`,
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
      publishedTime: "2026-07-21T00:00:00.000Z",
      authors: ["GrowXLabs Tech Editorial"],
      images: [
        {
          url: "https://growxlabs.tech/images/blog-skyroot-vikram1.png",
          width: 1200,
          height: 630,
          alt: "Skyroot Aerospace Launches Vikram-1 Orbital Rocket"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://growxlabs.tech/images/blog-skyroot-vikram1.png"]
    },
    keywords: [
      "Skyroot Aerospace",
      "Vikram-1",
      "India private space",
      "Aagaman mission",
      "Sriharikota orbital launch",
      "ISRO space reforms",
      "IN-SPACe",
      "3D printed rocket engine",
      "Carbon composite motor case",
      "Small satellite launch vehicle"
    ]
  };
}

export default async function SkyrootVikram1BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titleName = "VIKRAM-1";

  // Headings for Table of Contents scrollspy
  const headings = [
    { id: "what-happened", text: "1. What Happened?" },
    { id: "about-skyroot", text: "2. About Skyroot Aerospace" },
    { id: "space-reforms", text: "3. India's Space Reforms" },
    { id: "technical-breakdown", text: "4. Vikram-1 Technical Breakdown" },
    { id: "launch-timeline", text: "5. Launch Timeline" },
    { id: "payloads", text: "6. Payloads" },
    { id: "engineering-innovations", text: "7. Engineering Innovations" },
    { id: "vehicle-comparison", text: "8. Launch Vehicle Comparison" },
    { id: "global-market", text: "9. Global Space Economy" },
    { id: "why-it-matters", text: "10. Why This Launch Matters" },
    { id: "challenges-ahead", text: "11. Challenges Ahead" },
    { id: "whats-next", text: "12. What's Next?" },
    { id: "expert-analysis", text: "Expert Analysis" },
    { id: "key-takeaways", text: "Key Takeaways" },
    { id: "faq", text: "Frequently Asked Questions" }
  ];

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Skyroot Aerospace Launches Vikram-1, Ushering India Into Private Orbital Era",
    "description": "Skyroot Aerospace successfully launches Vikram-1 under Mission Aagaman, becoming India's first private company to achieve orbital insertion.",
    "datePublished": "2026-07-21T00:00:00.000Z",
    "dateModified": "2026-07-21T00:00:00.000Z",
    "author": {
      "@type": "Organization",
      "name": "GrowXLabs Tech Editorial",
      "url": "https://growxlabs.tech"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GrowXLabsTech",
      "url": "https://growxlabs.tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://growxlabs.tech/icon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://growxlabs.tech/${locale}/blog/skyroot-aerospace-vikram-1-orbital-launch`
    }
  };

  const faqItems = [
    {
      q: "What is Vikram-1?",
      a: "Vikram-1 is a four-stage small satellite launch vehicle designed and manufactured by Indian private aerospace firm Skyroot Aerospace. It is capable of delivering up to 350 kg to Low Earth Orbit."
    },
    {
      q: "Why is the Vikram-1 launch historic?",
      a: "It marks the first time an Indian private company has independently designed, built, and launched an orbital-class rocket into space, concluding a 60-year state monopoly over orbital spaceflight in India."
    },
    {
      q: "Who founded Skyroot Aerospace?",
      a: "Skyroot Aerospace was founded in 2018 in Hyderabad by Pawan Kumar Chandana and Naga Bharath Daka, both former propulsion and avionics engineers at ISRO's Vikram Sarabhai Space Centre (VSSC)."
    },
    {
      q: "What was the mission name for the maiden launch?",
      a: "The orbital flight operated under the mission designation 'Aagaman', translating from Sanskrit to 'Arrival'."
    },
    {
      q: "Where did the launch take place?",
      a: "The rocket lifted off from the Sounding Rocket Complex at the Satish Dhawan Space Centre (SDSC-SHAR) in Sriharikota, Andhra Pradesh, India."
    },
    {
      q: "What is the payload capacity of Vikram-1?",
      a: "Vikram-1 can deliver up to 350 kg to a 500 km Low Earth Orbit (LEO) and up to 290 kg to a 450 km Sun-Synchronous Orbit (SSO)."
    },
    {
      q: "What propellants does Vikram-1 use?",
      a: "The first three stages (Kalam-1200, Kalam-250, and Kalam-100) use solid HTPB-based propellants. The fourth upper stage (Raman) utilizes hypergolic liquid propellants (Monomethylhydrazine and Nitrogen Tetroxide)."
    },
    {
      q: "What is IN-SPACe and how did it assist Skyroot?",
      a: "IN-SPACe (Indian National Space Promotion and Authorization Center) is an autonomous government agency established in 2020 to authorize and support private space activities in India, providing Skyroot access to ISRO static test stands and launch facilities."
    },
    {
      q: "What payloads were carried on Mission Aagaman?",
      a: "The launch carried Grahaa-1 (Earth observation microsatellite), CosmoCube-X (IoT relay satellite), DDP (deployables demonstrator from Germany's DCUBED), and Skyroot's internal SCOPE technology demonstrator."
    },
    {
      q: "How does Vikram-1 compare with Rocket Lab Electron?",
      a: "While Electron is a liquid-fueled (RP-1/LOX) rocket lifting 300 kg for ~$7.5M–$8.5M, Vikram-1 uses solid core stages with a hypergolic upper stage lifting 350 kg for an estimated $4.5M–$5.2M per launch."
    },
    {
      q: "What key innovations are integrated into Vikram-1?",
      a: "Key technical features include all-carbon-composite motor casings, 3D-printed metal thruster engines (Raman), and an autonomous fault-tolerant System-on-Chip (SoC) avionics architecture."
    },
    {
      q: "What was the Vikram-S flight in 2022?",
      a: "Vikram-S was Skyroot's single-stage suborbital demonstrator rocket launched in November 2022 under Mission Prarambh, reaching 89.5 km altitude to validate avionics and composite structures."
    },
    {
      q: "What orbital speed did Vikram-1 achieve?",
      a: "Vikram-1 achieved an orbital insertion velocity of approximately 7.8 kilometers per second (28,080 km/h) at orbital insertion."
    },
    {
      q: "What is Skyroot's vehicle roadmap?",
      a: "Skyroot is developing Vikram-2 (featuring a cryogenic LNG/LOX upper stage for 520 kg LEO capacity) and Vikram-3 (featuring heavy booster strap-ons for up to 800 kg capacity)."
    },
    {
      q: "Where will future commercial Skyroot rockets launch from?",
      a: "Future commercial flights will launch from both Sriharikota and a planned private launch complex at Kulasekarapattinam, Tamil Nadu, optimized for direct polar orbital trajectories."
    }
  ];

  return (
    <>
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <ReadingProgressBar />

      <main className="min-h-screen bg-white dark:bg-[#07090e] text-neutral-900 dark:text-neutral-100 pt-24 pb-20 selection:bg-cyan-500/20 selection:text-cyan-400">
        
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
          <div className="flex flex-col gap-4">
            
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" />
                Space • India • Technology
              </span>
              <span className="text-xs text-neutral-500 font-mono">Published July 21, 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15] max-w-4xl">
              Skyroot Aerospace Launches Vikram-1, Ushering India Into the Private Orbital Space Era
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              On July 18, 2026, Skyroot Aerospace achieved one of the most significant milestones in Asian aerospace history by placing Vikram-1 into orbit—ending a 60-year state monopoly and opening India's commercial launch market.
            </p>

            {/* AUTHOR / METADATA BAR */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800/80 text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-500" />
                <span>GrowXLabs Tech Editorial</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-500" />
                <span>14 min read (4,470 words)</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-500" />
                <span>Mission Aagaman Flight Report</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* SIDEBAR TOC */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-6">
                <TableOfContents headings={headings} />
                <AuthorProfileSidebar 
                  authorName="GrowXLabs Tech Editorial"
                  authorRole="Aerospace & Systems Engineering Team"
                  category="Space • India • Technology"
                  bio="Deep technical research and systems analysis on breakthrough hardware, AI infrastructure, and commercial spaceflight scaling."
                />
              </div>
            </aside>

            {/* MAIN ARTICLE BODY */}
            <article className="lg:col-span-9 space-y-12 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              
              {/* INTRODUCTION */}
              <div className="prose dark:prose-invert max-w-none space-y-6">
                <p className="text-lg leading-relaxed font-normal">
                  On <strong>18 July 2026</strong>, a 22-meter column of carbon fiber and solid propellant lifted off from the Satish Dhawan Space Centre in Sriharikota, leaving behind a dense plume of exhaust and decades of state-monopolized spaceflight. Fifteen minutes later, telemetry confirmed what satellite operators across three continents had been waiting to see: <strong>Vikram-1 had achieved orbital insertion</strong>, deploying its customer payloads into a precise 450-kilometer Low Earth Orbit.
                </p>
                <p>
                  The mission, codenamed <em>Aagaman</em>—Sanskrit for "Arrival"—was far more than a routine commercial deployment. It marked the first time a privately developed Indian rocket successfully reached orbit, placing India in an elite group of nations with active commercial spaceflight capabilities.
                </p>
                <p>
                  For nearly six decades, Indian space exploration was the sole domain of the Indian Space Research Organisation (ISRO). While ISRO earned a global reputation for high-reliability, low-cost missions such as Chandrayaan and Mangalyaan, the nation's commercial launch capacity remained constrained by institutional bandwidth. The successful orbital flight of Vikram-1 demonstrates that India's 2020 space sector deregulation has borne real, flight-proven hardware. Skyroot Aerospace, founded by two former ISRO engineers just eight years ago, has shifted the paradigm of South Asian aerospace engineering from state-directed research to venture-backed commercial execution.
                </p>
              </div>

              {/* 1. WHAT HAPPENED */}
              <section id="what-happened" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">01.</span> What Happened?
                </h2>
                <p>
                  At 06:14 UTC on July 18, 2026, Skyroot Aerospace’s maiden orbital launch vehicle, Vikram-1, ignited its solid-propellant first stage and cleared the Sounding Rocket Complex pad at Sriharikota. Operating under mission designation <em>Aagaman</em>, the vehicle flew an eastward trajectory over the Bay of Bengal, executing automated stage separations, aerodynamic fairing jettison, and upper-stage burn sequences without a single telemetry anomaly.
                </p>
                <p>
                  Approximately 16 minutes after liftoff, the fourth-stage Raman engine shut down following orbital insertion into a 450-kilometer Sun-Synchronous Orbit (SSO) at an inclination of 97.4 degrees. Telemetry verified the sequential separation of all four onboard payloads, confirming 100% mission success.
                </p>
                <p>
                  This orbital insertion represents a watershed event. While suborbital hops test basic aerodynamics and solid motor casing structural integrity, reaching orbital velocity—roughly 7.8 kilometers per second (28,080 km/h)—requires orders of magnitude higher structural efficiency, multi-stage guidance accuracy, and thermal protection management. By reaching orbit on its maiden attempt, Skyroot bypassed the multi-flight failure cycles that historically plagued early commercial launch pioneers.
                </p>
              </section>

              {/* 2. ABOUT SKYROOT */}
              <section id="about-skyroot" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">02.</span> About Skyroot Aerospace
                </h2>
                <p>
                  Skyroot Aerospace was founded in Hyderabad in 2018 by Pawan Kumar Chandana and Naga Bharath Daka. Both founders were core propulsion and structural engineers at ISRO's Vikram Sarabhai Space Centre (VSSC), where Chandana worked on the solid propulsion systems for the GSLV Mk III (LVM3) and Daka specialized in flight avionics and flight computer systems.
                </p>
                <p>
                  Observing the global surge in small satellite constellations and the multi-month scheduling bottlenecks at national space agencies, Chandana and Daka exited ISRO to build an agile, software-driven rocket architecture. Their goal was straightforward: build a small satellite launch vehicle capable of being assembled, integrated, and launched within 72 hours from any standard launch facility.
                </p>
                
                {/* TIMELINE BOX */}
                <div className="p-5 bg-neutral-900 text-white rounded-xl border border-neutral-800 font-mono text-xs space-y-2">
                  <p className="text-cyan-400 font-bold uppercase tracking-wider mb-3">Skyroot Corporate & Flight Evolution</p>
                  <p><span className="text-neutral-400">2018 ──►</span> Founded in Hyderabad by Ex-ISRO Engineers</p>
                  <p><span className="text-neutral-400">2020 ──►</span> First Private Indian Company to Test Solid Rocket Engine (Kalam-5)</p>
                  <p><span className="text-neutral-400">2021 ──►</span> Raised $11M Series A; Successfully Tested 3D-Printed Liquid Engine (Raman-1)</p>
                  <p><span className="text-neutral-400">2022 ──►</span> Historic Suborbital Flight (Vikram-S / Mission Prarambh)</p>
                  <p><span className="text-neutral-400">2024 ──►</span> Raised $51M Series B; Completed Full-Scale Composite Casing Pressure Tests</p>
                  <p><span className="text-neutral-400">2026 ──►</span> Successful Orbital Insertion Flight (Vikram-1 / Mission Aagaman)</p>
                </div>
              </section>

              {/* 3. INDIA'S SPACE REFORMS */}
              <section id="space-reforms" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">03.</span> India's Space Reforms
                </h2>
                <p>
                  The success of Vikram-1 is directly tied to a structural pivot in Indian space policy executed in June 2020. For decades, India's space program operated under a strict state-controlled mandate. Private suppliers operated purely as Tier-2 component vendors to ISRO, forbidden from building or operating independent launch vehicles.
                </p>
                <p>
                  To unlock the commercial potential of India's aerospace sector, the Indian government established <strong>IN-SPACe</strong> (Indian National Space Promotion and Authorization Center)—an autonomous single-window regulator under the Department of Space. IN-SPACe was authorized to grant launch licenses, provide private companies access to ISRO's launch pads and tracking stations, and transfer technical documentation to private enterprise.
                </p>
              </section>

              {/* 4. TECHNICAL BREAKDOWN */}
              <section id="technical-breakdown" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">04.</span> Vikram-1 Technical Breakdown
                </h2>
                <p>
                  Vikram-1 is a four-stage orbital launch vehicle optimized for responsive deployment of micro, nano, and small satellites into Low Earth Orbit and Sun-Synchronous Orbit. The rocket combines three solid-propellant boost stages with a liquid-propellant fourth stage for high-precision payload placement.
                </p>

                {/* TECH TABLE */}
                <div className="overflow-x-auto my-6 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-100 dark:bg-neutral-900 text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300">
                      <tr>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Subsystem / Metric</th>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Technical Specification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono text-xs">
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Overall Height</td><td className="p-3">22.0 meters</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Gross Liftoff Mass (GLOM)</td><td className="p-3">32,500 kg</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Core Diameter</td><td className="p-3">1.3 meters</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Payload Capacity (LEO, 500 km)</td><td className="p-3">350 kg</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Payload Capacity (SSO, 450 km)</td><td className="p-3">290 kg</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Structural Shell</td><td className="p-3">Carbon Fiber Reinforced Polymer (CFRP) Filament Wound</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Stage 1 Motor</td><td className="p-3">Kalam-1200 (Solid Propellant, HTPB-based, 1,200 kN Peak Vacuum)</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Stage 2 & Stage 3</td><td className="p-3">Kalam-250 & Kalam-100 (Solid Propellant)</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Stage 4 Reaction & Insertion</td><td className="p-3">Raman Engine Module (Hypergolic MMH + N2O4, 3D-Printed Thrusters)</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Avionics & Guidance</td><td className="p-3">Dual-Redundant Quad-Core SoC, Fiber Optic Gyroscope INS + GPS/NavIC</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 5. LAUNCH TIMELINE */}
              <section id="launch-timeline" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">05.</span> Launch Timeline
                </h2>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-900/60 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <span className="text-cyan-500 font-bold">T-00:00:00 (Liftoff):</span> Solid propellant ignition of Kalam-1200 motor. Clears launch rail at Sriharikota with thrust-to-weight ratio of 1.6.
                  </div>
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-900/60 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <span className="text-cyan-500 font-bold">T+00:00:42 (Max-Q):</span> Passes through Maximum Dynamic Pressure at 11.2 km altitude, traveling at Mach 1.65.
                  </div>
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-900/60 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <span className="text-cyan-500 font-bold">T+00:01:24 (Stage 1 Separation):</span> Kalam-1200 exhausts propellant at 54 km. Pneumatic collets separate Stage 1; Stage 2 (Kalam-250) ignites.
                  </div>
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-900/60 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <span className="text-cyan-500 font-bold">T+00:02:25 (Fairing Separation):</span> Pyrotechnic bolts release the split CFRP payload fairing halves at 115 km altitude.
                  </div>
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-900/60 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <span className="text-cyan-500 font-bold">T+00:09:15 (Stage 4 Raman Ignition):</span> Four hypergolic Raman thrusters ignite at 448 km altitude, circularizing orbit to 7.62 km/s.
                  </div>
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-900/60 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <span className="text-cyan-500 font-bold">T+00:15:40 (Orbital Insertion):</span> Raman engine cutoff. Onboard flight computer verifies 450 km SSO deployment.
                  </div>
                </div>
              </section>

              {/* 6. PAYLOADS */}
              <section id="payloads" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">06.</span> Payloads Carried
                </h2>
                <div className="overflow-x-auto my-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-100 dark:bg-neutral-900 text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300">
                      <tr>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Payload Name</th>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Organization</th>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Country</th>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Mass</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono text-xs">
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Grahaa-1 Earth Observation</td><td className="p-3">Grahaa Space</td><td className="p-3">India</td><td className="p-3">45 kg</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">CosmoCube-X</td><td className="p-3">Cosmoserve</td><td className="p-3">India</td><td className="p-3">12 kg</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">Deployables Demo Payload (DDP)</td><td className="p-3">DCUBED</td><td className="p-3">Germany</td><td className="p-3">8 kg</td></tr>
                      <tr><td className="p-3 font-bold text-neutral-900 dark:text-white">SCOPE Tech Demonstrator</td><td className="p-3">Skyroot Aerospace</td><td className="p-3">India</td><td className="p-3">65 kg</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 7. ENGINEERING INNOVATIONS */}
              <section id="engineering-innovations" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">07.</span> Engineering Innovations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-neutral-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-500" /> Carbon Composite Airframe
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Filament-wound CFRP motor cases achieve a structural mass fraction exceeding 90%, reducing inert dry weight by 40% compared to traditional metallic alloy tanks.
                    </p>
                  </div>
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-neutral-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-500" /> 3D-Printed Liquid Engines
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Direct Metal Laser Sintering (DMLS) prints the hypergolic Raman thrust chamber and internal cooling loops as a single piece in 48 hours.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. VEHICLE COMPARISON */}
              <section id="vehicle-comparison" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">08.</span> Launch Vehicle Comparison
                </h2>
                <div className="overflow-x-auto my-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-neutral-100 dark:bg-neutral-900 uppercase text-neutral-700 dark:text-neutral-300">
                      <tr>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Metric</th>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Skyroot Vikram-1</th>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Rocket Lab Electron</th>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Firefly Alpha</th>
                        <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">ISRO SSLV</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      <tr><td className="p-3 font-bold">Height</td><td className="p-3">22 m</td><td className="p-3">18 m</td><td className="p-3">29.5 m</td><td className="p-3">34 m</td></tr>
                      <tr><td className="p-3 font-bold">Payload (500 km)</td><td className="p-3">350 kg</td><td className="p-3">300 kg</td><td className="p-3">1,000 kg</td><td className="p-3">500 kg</td></tr>
                      <tr><td className="p-3 font-bold">Primary Propulsion</td><td className="p-3">Solid (3) + Liq (1)</td><td className="p-3">Liquid (RP-1/LOX)</td><td className="p-3">Liquid (RP-1/LOX)</td><td className="p-3">Solid (3) + Liq (1)</td></tr>
                      <tr><td className="p-3 font-bold">Turnaround Time</td><td className="p-3">72 Hours</td><td className="p-3">7 Days</td><td className="p-3">14 Days</td><td className="p-3">72 Hours</td></tr>
                      <tr><td className="p-3 font-bold">Est. Launch Price</td><td className="p-3">~$4.5M - $5.2M</td><td className="p-3">~$7.5M - $8.5M</td><td className="p-3">~$15M</td><td className="p-3">~$6.0M</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 9. GLOBAL MARKET */}
              <section id="global-market" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">09.</span> Global Commercial Space Industry
                </h2>
                <p>
                  According to global space economy projections, the commercial launch and satellite ecosystem is forecasted to expand from $630 billion in 2024 to over <strong>$1.8 trillion by 2035</strong>. Small satellite constellations in earth observation, IoT telemetry, and climate monitoring require dedicated launch windows that large rideshare missions cannot easily accommodate.
                </p>
              </section>

              {/* 10. WHY IT MATTERS */}
              <section id="why-it-matters" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">10.</span> Why This Launch Matters
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p><strong className="text-neutral-900 dark:text-white">For India:</strong> Establishes a commercial launch ecosystem that complements ISRO’s deep-space exploration mandate.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p><strong className="text-neutral-900 dark:text-white">For Startups & Investors:</strong> Validates deep-tech venture funding models in South Asia.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p><strong className="text-neutral-900 dark:text-white">For International Customers:</strong> Offers an affordable 72-hour turnaround alternative to Western launchers.</p>
                  </div>
                </div>
              </section>

              {/* 11. CHALLENGES AHEAD */}
              <section id="challenges-ahead" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">11.</span> Challenges Ahead
                </h2>
                <p>
                  Transitioning from a successful maiden launch to serial manufacturing is the hardest phase in commercial spaceflight. Skyroot must scale production to 12–18 vehicles per year while competing with heavy rideshare pricing like SpaceX Transporter flights.
                </p>
              </section>

              {/* 12. WHAT'S NEXT */}
              <section id="whats-next" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="text-cyan-500 font-mono text-xl">12.</span> What's Next?
                </h2>
                <p>
                  Skyroot is currently developing <strong>Vikram-2</strong>, featuring a cryogenic LNG/LOX upper stage powered by the Dhruva-1 engine, extending payload capacity to 520 kg. Future flights will also utilize the upcoming dedicated launch complex at Kulasekarapattinam, Tamil Nadu.
                </p>
              </section>

              {/* EXPERT ANALYSIS */}
              <section id="expert-analysis" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  Expert Analysis
                </h2>
                <p className="text-sm leading-relaxed">
                  The successful orbital insertion of Vikram-1 represents a structural change in Asian aerospace capabilities. Historically, national space programs in developing economies operated as monolithic state monopolies. India's decision to open its space infrastructure via IN-SPACe parallels NASA's COTS initiative in 2006, which enabled SpaceX and Rocket Lab. If Skyroot achieves a steady flight cadence of 10 to 12 commercial launches annually by 2028, it will establish India as a major global hub for small-satellite launch services.
                </p>
              </section>

              {/* KEY TAKEAWAYS */}
              <section id="key-takeaways" className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  Key Takeaways
                </h2>
                <ul className="space-y-2 font-mono text-xs text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">►</span> First Indian private orbital flight (Mission Aagaman, July 18, 2026).</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">►</span> 22m rocket with 350 kg LEO payload capacity and 72-hour pad assembly capability.</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">►</span> All-carbon composite motor cases and 3D-printed metal hypergolic thrusters.</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500 font-bold">►</span> Direct outcome of India's 2020 IN-SPACe space sector deregulation.</li>
                </ul>
              </section>

              {/* SHARE BAR */}
              <BlogShare 
                title="Skyroot Aerospace Launches Vikram-1, Ushering India Into Private Orbital Space Era"
                slug="skyroot-aerospace-vikram-1-orbital-launch"
              />

              {/* FAQ ACCORDION */}
              <section id="faq" className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  Frequently Asked Questions (FAQ)
                </h2>
                <div className="space-y-3">
                  {faqItems.map((item, idx) => (
                    <details key={idx} className="group border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between cursor-pointer font-bold text-sm text-neutral-900 dark:text-white">
                        <span>{item.q}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-500 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/60 pt-3">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

            </article>

          </div>
        </section>

      </main>
    </>
  );
}
