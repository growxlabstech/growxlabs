"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Menu, X, Building2, MapPin } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';

export const RealEstateNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/realestate" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/50 group-hover:bg-primary transition-all duration-500">
            <Building2 className="text-primary group-hover:text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">GrowX <span className="text-primary italic">Estates</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Properties', 'About Us', 'Services', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`/realestate/${item.toLowerCase().replace(' ', '-')}`}
              className="text-xs font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all"
            >
              {item}
            </Link>
          ))}
          <Link href="/realestate/properties">
            <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all font-black text-xs uppercase tracking-widest">
              Listing Portal
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-0 left-0 right-0 h-screen bg-black/98 p-12 flex flex-col items-center justify-center gap-12"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            {['Properties', 'About Us', 'Services', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={`/realestate/${item.toLowerCase().replace(' ', '-')}`}
                className="text-4xl font-black text-white hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
