"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data/projects";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/Button";

export default function PortfolioPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#00A86B]">
              Our Work
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[48px] md:text-[72px] font-bold text-white mb-8 tracking-tight"
          >
            Engineering <br />
            <span className="text-gradient">Real Results.</span>
          </motion.h1>
          <p className="text-[18px] text-[#A0A0A0] max-w-[560px] mx-auto leading-[1.7]">
            Every project listed here is live, serving real users, and built by our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              {...project}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center p-12 md:p-16 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A86B]/10 rounded-full blur-[100px] -z-10" />
          <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6 tracking-tight">Ready to be our next success story?</h2>
          <p className="text-[#A0A0A0] mb-10 max-w-[520px] mx-auto text-base leading-relaxed">
            We partner with ambitious businesses to build AI-powered digital systems that drive real growth.
          </p>
          <Link href="/contact">
            <Button className="px-10 py-3 bg-[#00A86B] text-white rounded-full font-semibold text-base hover:bg-[#00A86B]/90 hover:scale-105 transition-all shadow-none h-12">
              Start Your Project →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
