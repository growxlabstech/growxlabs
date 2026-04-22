"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Target, Lightbulb } from "lucide-react";
import { Link } from "@/navigation";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#00A86B]">Our Story</span>
            <h1 className="text-[36px] md:text-[56px] font-bold text-white mt-4 mb-8 tracking-tight leading-[1.1]">
              Engineering Digital <br />
              <span className="text-gradient">Growth. Globally.</span>
            </h1>
            <div className="space-y-6 text-[16px] text-[#A0A0A0] leading-[1.7]">
              <p>
                GrowX Labs was founded by two engineers from Andhra Pradesh with one belief — most businesses are losing customers online because their technology has not caught up with their ambition.
              </p>
              <p>
                We bridge that gap. We build AI-powered websites, intelligent automation, and full-stack products that turn online presence into measurable revenue.
              </p>
              <p>
                We do not just build for clients. We build and operate our own products — ResumeForgeAI, UniversalAI, and RecruitAI — serving real users every day.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { label: "Live AI Products", value: "3" },
               { label: "Platform Users", value: "500+" },
               { label: "Expert Founders", value: "2" },
               { label: "Client Satisfaction", value: "100%" }
             ].map((stat, i) => (
               <div key={i} className="rounded-2xl p-8 text-center border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
                 <div className="text-[36px] font-bold text-white mb-2">{stat.value}</div>
                 <div className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-widest">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <Card className="p-10 space-y-5 rounded-2xl">
            <div className="w-12 h-12 bg-[#00A86B]/10 rounded-xl flex items-center justify-center">
              <Target className="text-[#00A86B]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-[#A0A0A0] text-[15px] leading-[1.7]">
              To deliver enterprise-grade digital infrastructure to businesses worldwide through AI-powered development 
              and intelligent automation — faster, smarter, and more affordably than anyone else.
            </p>
          </Card>
          <Card className="p-10 space-y-5 rounded-2xl">
            <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center">
              <Lightbulb className="text-purple-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-[#A0A0A0] text-[15px] leading-[1.7]">
              To become the global standard for AI-first digital agencies — where every website ships faster, 
              every automation runs smarter, and every client grows measurably.
            </p>
          </Card>
        </div>

        {/* Founder Section */}
        <div className="text-center mb-32">
          <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#00A86B] mb-4 block">Leadership</span>
          <h2 className="text-[48px] font-bold text-white mb-16 tracking-tight">Founding Engineers</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Varshith */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 text-left space-y-6 transition-all duration-300 hover:border-[rgba(0,168,107,0.3)]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center border border-white/10">
                <span className="text-xl font-bold text-white">VP</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Varshith Pujala</h3>
                <p className="text-[#00A86B] font-semibold text-xs uppercase tracking-[0.2em] mt-2">Co-Founder & Full Stack Engineer</p>
              </div>
              <p className="text-[#A0A0A0] leading-[1.7] text-[15px]">
                Builder of ResumeForgeAI — a live AI career platform serving 500+ users. 
                Specializes in Next.js, TypeScript, AI API integrations, and scalable SaaS architecture.
              </p>
              <a href="https://linkedin.com/in/varshithpujala" target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                LinkedIn →
              </a>
            </div>

            {/* Akhilesh */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 text-left space-y-6 transition-all duration-300 hover:border-[rgba(0,168,107,0.3)]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600/30 to-blue-600/30 flex items-center justify-center border border-white/10">
                <span className="text-xl font-bold text-white">AK</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Akhilesh</h3>
                <p className="text-[#00A86B] font-semibold text-xs uppercase tracking-[0.2em] mt-2">Co-Founder & Automation Engineer</p>
              </div>
              <p className="text-[#A0A0A0] leading-[1.7] text-[15px]">
                n8n automation specialist building enterprise workflow systems. Expert in connecting business tools 
                and deploying scalable automation infrastructure.
              </p>
              <a href="https://linkedin.com/in/akhilesh" target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                LinkedIn →
              </a>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="max-w-3xl mx-auto p-12 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-center">
            <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-[0.3em] mb-4">Official Entity</p>
            <h3 className="text-2xl font-bold text-white mb-4">GrowX Labs</h3>
            <div className="flex flex-col items-center gap-2">
              <p className="text-white/60 font-medium text-base">MSME Registered · UDYAM-AP-22-0063260</p>
              <p className="text-[#A0A0A0] text-sm mt-2">Guntur, Andhra Pradesh, India</p>
            </div>
        </div>

      </div>
    </div>
  );
}
