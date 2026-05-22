"use client";

import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function AnimatedStagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function AnimatedItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <span>
      {value}{suffix}
    </span>
  );
}

export function HeroTextReveal({ children, className = "" }: AnimatedSectionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
