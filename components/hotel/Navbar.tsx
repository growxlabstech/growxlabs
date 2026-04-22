"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, BedDouble, Calendar } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';

export const HotelNavbar = () => {
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
        <Link href="/hotel" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/50 group-hover:bg-primary transition-all duration-500">
            <BedDouble className="text-primary group-hover:text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">GrowX <span className="text-primary italic">Hotels</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Rooms', 'Amenities', 'Gallery', 'Booking'].map((item) => (
            <Link 
              key={item} 
              href={`/hotel/${item.toLowerCase()}`}
              className="text-sm font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all hover:translate-y-[-2px]"
            >
              {item}
            </Link>
          ))}
          <Link href="/hotel/rooms">
            <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all font-black text-xs uppercase tracking-widest">
              Reserve Now
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-8 p-12">
              {['Rooms', 'Amenities', 'Gallery', 'Booking'].map((item) => (
                <Link 
                  key={item} 
                  href={`/hotel/${item.toLowerCase()}`}
                  className="text-4xl font-black text-white hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
