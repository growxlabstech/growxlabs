"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;          // e.g. "Services", "Portfolio", "Products", "Courses", "Blog", "About", "Contact"
  viewingText: string;    // e.g. "SERVICES", "PORTFOLIO", etc.
  exploreText?: string;   // e.g. "WHAT WE DO", etc.
  tagline?: string;       // e.g. "AI ENGINEERING", etc.
  className?: string;
}

export function PageHero({
  title,
  viewingText,
  exploreText = "EXPLORE",
  tagline = "SYSTEMS & LAB",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "w-full px-6 md:px-10 xl:px-16 2xl:px-24 pb-12 md:pb-16 bg-background relative overflow-hidden select-none",
        className
      )}
    >
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full flex flex-col pt-28">
        
        {/* Metadata Columns Aligned to the Right */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-start sm:justify-end mb-8 md:mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 md:gap-16 text-left">
            <div className="flex flex-col font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase leading-[1.6]">
              <span>You Are</span>
              <span>Now</span>
              <span className="text-foreground font-bold">{viewingText}</span>
            </div>
            
            <div className="flex flex-col font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase leading-[1.6]">
              <span>Scroll</span>
              <span>To</span>
              <span className="text-foreground font-bold">{exploreText}</span>
            </div>

            <div className="flex flex-col font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase leading-[1.6]">
              <span>What</span>
              <span>We Do &</span>
              <span className="text-foreground font-bold">{tagline}</span>
            </div>

            <div className="flex flex-col font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase leading-[1.6]">
              <span>© 2026</span>
              <span>GrowXLabs</span>
              <span className="text-foreground font-bold">Tech</span>
            </div>
          </div>
        </motion.div>

        {/* Huge Swiss Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="w-full overflow-visible flex justify-start items-end"
        >
          <h1 className="font-sans font-black select-none tracking-[-0.06em] text-foreground leading-[0.9] text-[clamp(2.8rem,11.5vw,10.5rem)] md:text-[10vw] xl:text-[11.5vw] whitespace-nowrap uppercase sm:normal-case inline-block origin-bottom scale-y-[1.35]">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
