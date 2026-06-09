"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/Button";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe2,
  MessagesSquare,
  Settings2,
  Workflow,
  Zap,
} from "lucide-react";

const signals = [
  { text: "7–21 day builds", icon: Clock },
  { text: "Web + automation", icon: Settings2 },
  { text: "Global remote delivery", icon: Globe2 },
] as const;

// ─── Animated Counter ───────────────────────────────
function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, active]);

  return value;
}

// ─── Growth Console (Interactive) ───────────────────
function GrowthConsolePreview() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFunnelStep, setActiveFunnelStep] = useState(-1);
  const [progressWidth, setProgressWidth] = useState(0);
  const [leadBoost, setLeadBoost] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-trigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequential funnel activation
  useEffect(() => {
    if (!isVisible) return;
    const timers = [
      setTimeout(() => setActiveFunnelStep(0), 600),
      setTimeout(() => setActiveFunnelStep(1), 1200),
      setTimeout(() => setActiveFunnelStep(2), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  // Progress bar animation
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setProgressWidth(76), 400);
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Periodic lead number tick
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setLeadBoost((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const leadsValue = useCountUp(38 + leadBoost, 1200, isVisible);
  const responseValue = useCountUp(4, 800, isVisible);
  const tasksValue = useCountUp(21, 1000, isVisible);

  const funnelSteps = ["Visitor intent", "CTA capture", "Booked call"];
  const automationItems = [
    {
      icon: MessagesSquare,
      title: "WhatsApp follow-up",
      text: "Every lead receives instant next steps.",
    },
    {
      icon: Workflow,
      title: "CRM routing",
      text: "Qualified requests move to your pipeline.",
    },
    {
      icon: CheckCircle2,
      title: "Daily reporting",
      text: "You see what converted and why.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative lg:sticky lg:top-28"
      aria-label="Website, automation, and growth system preview"
    >
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Growth Console
            </p>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-foreground tracking-tight">
                Lead engine live
              </h2>
              {/* Live pulse indicator */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]" />
              </span>
            </div>
          </div>
          <motion.div
            className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center"
            animate={isVisible ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Zap className="h-5 w-5" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Metrics with count-up */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            {
              label: "Qualified leads",
              value: `+${leadsValue}%`,
              color: "#10B981",
            },
            {
              label: "Response time",
              value: `${responseValue} sec`,
              color: "var(--primary)",
            },
            {
              label: "Manual tasks",
              value: `-${tasksValue}h`,
              color: "#EF4444",
            },
          ].map((metric, idx) => (
            <motion.div
              key={metric.label}
              className="rounded-lg bg-background border border-border p-4 relative overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.12 }}
            >
              <p className="text-[12px] text-muted-foreground font-semibold">
                {metric.label}
              </p>
              <p className="text-2xl font-black text-foreground mt-2 tabular-nums">
                {metric.value}
              </p>
              {/* Subtle bottom accent bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px]"
                style={{ backgroundColor: metric.color }}
                initial={{ width: "0%" }}
                animate={isVisible ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.5 + idx * 0.15 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Funnel + Automation */}
        <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-4">
          {/* Website Funnel */}
          <div className="rounded-lg bg-black border border-border p-5 text-white min-h-[220px] sm:min-h-[240px] flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mb-4">
                Website funnel
              </p>
              <div className="space-y-3">
                {funnelSteps.map((step, index) => {
                  const isActive = index <= activeFunnelStep;
                  const isCurrent = index === activeFunnelStep;
                  return (
                    <motion.div
                      key={step}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0.4, x: -8 }}
                      animate={
                        isActive
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0.4, x: 0 }
                      }
                      transition={{ duration: 0.4 }}
                    >
                      <motion.span
                        className="h-8 w-8 rounded-md flex items-center justify-center text-[12px] font-bold transition-colors duration-300"
                        style={{
                          backgroundColor: isActive
                            ? "var(--primary)"
                            : "rgba(255,255,255,0.1)",
                          color: isActive
                            ? "var(--primary-foreground)"
                            : "inherit"
                        }}
                        animate={
                          isCurrent
                            ? { scale: [1, 1.12, 1] }
                            : { scale: 1 }
                        }
                        transition={{
                          duration: 0.8,
                          repeat: isCurrent ? Infinity : 0,
                          repeatType: "reverse",
                        }}
                      >
                        {isActive && index < activeFunnelStep ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </motion.span>
                      <span
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/40"
                        }`}
                      >
                        {step}
                      </span>
                      {isCurrent && (
                        <motion.span
                          className="ml-auto text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/15 px-2 py-0.5 rounded"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          Active
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
            {/* Animated progress bar */}
            <div className="h-2 rounded-full bg-card/10 overflow-hidden mt-4">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              />
            </div>
          </div>

          {/* Automation Stack */}
          <div className="rounded-lg border border-border p-5 bg-card/20">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Automation stack
            </p>
            <div className="space-y-3">
              {automationItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="flex gap-3 rounded-md bg-background border border-border p-3 group hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, x: 12 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.8 + idx * 0.2,
                  }}
                >
                  <motion.div
                    animate={
                      isVisible
                        ? { scale: [1, 1.15, 1] }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: 1.2 + idx * 0.2,
                    }}
                  >
                    <item.icon
                      className="h-5 w-5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-muted-foreground leading-snug">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Home page block: lead-engine story, CTAs, and Growth Console (below the minimal hero). */
export function LeadEngineSection() {
  return (
    <section
      className="w-full px-6 md:px-10 xl:px-16 2xl:px-24 pt-8 pb-16 md:pb-24 border-t border-border"
      aria-labelledby="lead-engine-heading"
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        <div className="space-y-6 flex flex-col items-center">
          {/* Commented out as requested:
          <div className="space-y-3">
            <h2
              id="lead-engine-heading"
              className="text-[clamp(1.65rem,3.8vw,2.35rem)] font-black tracking-tight text-foreground leading-[1.12]"
            >
              A website connected to your lead engine.
            </h2>
            <p className="text-muted-foreground text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Design becomes operations: capture, instant follow-up, CRM routing, and reporting in one system you
              can run—not a pile of disconnected tools.
            </p>
          </div>
          */}

          {/* Commented out as requested:
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {signals.map(({ text, icon: Icon }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-[13px] font-semibold text-foreground shadow-sm"
              >
                <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
          */}

          {/* Commented out as requested:
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-1 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-[50px] px-7 text-[14px] rounded-md font-semibold inline-flex items-center justify-center gap-2 hover:gap-3"
                trackEvent="cta_clicked"
                trackProperties={{ location: "lead_engine_section", text: "Book a Growth Call" }}
              >
                Book a Growth Call <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-[50px] px-7 text-[14px] rounded-md font-semibold"
                trackEvent="cta_clicked"
                trackProperties={{ location: "lead_engine_section", text: "View Work" }}
              >
                View Work
              </Button>
            </Link>
          </div>
          */}

          {/* Commented out as requested:
          <div className="rounded-xl border border-border bg-card/40 px-4 py-3.5 sm:px-5 sm:py-4 max-w-xl mx-auto text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary mb-1.5 text-center">
              What moves into production
            </p>
            <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
              The live layer ships with your funnel, automations, and dashboards wired together—the Growth Console
              preview shows the shape of what we deploy.
            </p>
          </div>
          */}

          {/* Commented out as requested:
          <GrowthConsolePreview />
          */}
        </div>
      </div>
    </section>
  );
}
