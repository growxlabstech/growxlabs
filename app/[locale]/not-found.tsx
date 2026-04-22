"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <span className="text-primary font-black text-9xl tracking-tighter opacity-20 select-none">404</span>
        <h1 className="text-5xl md:text-7xl font-black text-white mt-[-80px] mb-8 tracking-tighter uppercase leading-tight">
          Page Not <span className="text-primary italic">Found</span>
        </h1>
        <p className="text-xl text-white/40 max-w-lg mx-auto mb-16 font-light">
          The sanctuary you are looking for has been moved or retired. Let us guide you back to safety.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="h-16 px-12 rounded-full bg-white text-black font-black hover:bg-primary hover:text-white transition-all shadow-2xl shadow-white/5">
              <Home className="mr-3 w-5 h-5" /> Return Home
            </Button>
          </Link>
          <Button 
            onClick={() => window.history.back()}
            variant="outline" 
            size="lg" 
            className="h-16 px-12 rounded-full border-white/10 text-white/60 hover:text-white font-black hover:bg-white/5"
          >
            <ArrowLeft className="mr-3 w-5 h-5" /> Go Back
          </Button>
        </div>
      </motion.div>

      {/* Decorative Lines */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1 opacity-20">
         {[...Array(50)].map((_, i) => (
           <div key={i} className="w-[1px] h-8 bg-white" style={{ opacity: Math.random() }} />
         ))}
      </div>
    </div>
  );
}
