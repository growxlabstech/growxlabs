"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, UtensilsCrossed } from 'lucide-react';
import { Link } from '@/navigation';
import { useCart } from '@/lib/restaurant-context';
import { Button } from '@/components/ui/Button';

export const RestaurantNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/restaurant" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <UtensilsCrossed className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">GrowX <span className="text-primary">Eats</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Menu', 'Cart', 'Track Order'].map((item) => (
            <Link 
              key={item} 
              href={`/restaurant/${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link href="/restaurant/cart">
            <Button size="sm" className="relative h-12 px-6 rounded-full bg-white text-black hover:bg-neutral-200 transition-all font-black">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                  {totalItems}
                </span>
              )}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden flex flex-col gap-6"
          >
            {['Menu', 'Cart', 'Track Order'].map((item) => (
              <Link 
                key={item} 
                href={`/restaurant/${item.toLowerCase().replace(' ', '-')}`}
                className="text-2xl font-black text-white"
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
