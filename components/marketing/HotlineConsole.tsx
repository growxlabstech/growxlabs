"use client";

import Image from "next/image";
import { Phone, MessageSquare, Calendar, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "@/navigation";

export function HotlineConsole() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-16 px-4">
      {/* Outer Console Case with architectural Swiss lines */}
      <div 
        className="relative rounded-2xl border border-[#E5E2DC] bg-white p-6 sm:p-8 shadow-[0_24px_50px_rgba(26,26,26,0.04)] overflow-hidden group transition-shadow"
      >
        {/* Top Status Header */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E2DC]/80 pb-6 mb-8 text-left">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
            </span>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#355CFF]">Direct Studio Connect</p>
              <h3 className="text-[15px] font-bold text-[#1A1A1A] tracking-tight mt-0.5">LINE OPEN & ACTIVE NOW</h3>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E2DC] bg-[#FAF9F6] px-3.5 py-1 text-[12px] font-semibold text-[#6B7280]">
            <Sparkles className="w-3.5 h-3.5 text-[#355CFF]" />
            <span>Average response: <span className="font-bold text-[#1A1A1A]">4 mins</span></span>
          </div>
        </div>

        {/* Central Graphic Section: The telephone container */}
        <div className="relative flex flex-col items-center justify-center py-6">
          {/* Subtle Technical Label Overlays */}
          <div className="absolute top-2 left-2 text-[10px] font-mono text-[#6B7280] tracking-widest hidden sm:block">
            SYS_STATUS // SECURE_HOTLINE
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-[#6B7280] tracking-widest hidden sm:block">
            GL-X_PRTCL // PORT: 009
          </div>

          {/* Static Telephone Graphic */}
          <div className="relative z-10 w-[240px] sm:w-[280px] h-[220px] sm:h-[260px] flex items-center justify-center select-none">
            <Image
              src="/images/cta-phone.png"
              alt="GrowXLabsTech premium hotline connection"
              width={280}
              height={260}
              className="object-contain pointer-events-none select-none"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </div>
        </div>

        {/* Bottom Swiss Grid Action Panel */}
        <div className="relative mt-8 pt-6 border-t border-[#E5E2DC]/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/contact"
            className="group/btn flex items-center justify-between rounded-xl border border-[#E5E2DC] bg-[#FAF9F6] p-4 text-left hover:border-[#355CFF] hover:bg-white transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#355CFF]/5 text-[#355CFF] flex items-center justify-center group-hover/btn:bg-[#355CFF] group-hover/btn:text-white transition-all duration-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13px] font-black tracking-tight text-[#1A1A1A]">Text via WhatsApp</p>
                <p className="text-[11px] text-[#6B7280]">Instant dispatch to engineer</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#6B7280] group-hover/btn:text-[#355CFF] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
          </Link>

          <Link 
            href="/contact"
            className="group/btn flex items-center justify-between rounded-xl border border-[#E5E2DC] bg-[#FAF9F6] p-4 text-left hover:border-[#355CFF] hover:bg-white transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#355CFF]/5 text-[#355CFF] flex items-center justify-center group-hover/btn:bg-[#355CFF] group-hover/btn:text-white transition-all duration-300">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13px] font-black tracking-tight text-[#1A1A1A]">Calendar Schedule</p>
                <p className="text-[11px] text-[#6B7280]">Book detailed digital strategy</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#6B7280] group-hover/btn:text-[#355CFF] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
          </Link>
        </div>

        {/* Footer Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#6B7280] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Encrypted connection. Zero third-party tracking.</span>
        </div>
      </div>
    </div>
  );
}

