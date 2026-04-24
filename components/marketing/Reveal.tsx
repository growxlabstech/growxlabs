"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
}

export function Reveal({ children, delay = 0, y = 20, scale = 1, ...props }: RevealProps) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      initial={{ opacity: 0, y, scale }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
