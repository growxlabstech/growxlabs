"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Building, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';
import { properties } from '@/lib/property-data';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-40 pb-20 flex flex-col items-center justify-center bg-black overflow-hidden px-6">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl aspect-square bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl mx-auto mb-16 relative z-10"
      >
        <span className="inline-block py-2 px-6 rounded-full glass border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">
          The Future of Living
        </span>
        <h1 className="text-6xl md:text-[8rem] font-black text-white leading-[0.8] mb-12 tracking-tighter">
          Find Your <br />
          <span className="text-primary">Dream Property</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
          Access a curated portfolio of world-class real estate. From high-tech urban studios to expansive beachfront villas.
        </p>
      </motion.div>

      {/* Modern Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-4xl glass p-3 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row gap-4 relative z-10"
      >
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex items-center gap-4 px-6 md:border-r border-white/5 py-4">
            <MapPin className="text-primary w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Location</span>
              <input type="text" placeholder="Dubai, NY, London..." className="bg-transparent text-white focus:outline-none font-bold" />
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 md:border-r border-white/5 py-4">
            <DollarSign className="text-primary w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Budget</span>
              <select className="bg-transparent text-white focus:outline-none font-bold appearance-none cursor-pointer">
                <option className="bg-black">$1M - $5M</option>
                <option className="bg-black">$5M - $20M</option>
                <option className="bg-black">$20M+</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-4">
            <Building className="text-primary w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Property Type</span>
              <select className="bg-transparent text-white focus:outline-none font-bold appearance-none cursor-pointer">
                <option className="bg-black">Villa</option>
                <option className="bg-black">Apartment</option>
                <option className="bg-black">Commercial</option>
              </select>
            </div>
          </div>
        </div>
        <Link href="/realestate/properties">
          <Button size="lg" className="h-full px-12 rounded-[2rem] bg-white text-black hover:bg-primary hover:text-white transition-all font-black text-lg">
            Search
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

const FeaturedProperties = () => {
  return (
    <section className="py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
             <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Featured Portfolio</h2>
             <p className="text-xl text-white/40 font-light italic">Exceptional listings verified by our expert team.</p>
          </div>
          <Link href="/realestate/properties">
            <Button variant="ghost" className="text-primary font-bold group">
              Explore All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.slice(0, 3).map((prop, i) => (
            <motion.div 
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-0 overflow-hidden border-white/5 group"
            >
              <div className="relative h-72 overflow-hidden">
                <img src={prop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 left-6 px-4 py-2 bg-primary text-white text-[10px] font-black uppercase rounded-lg tracking-widest">
                  {prop.type}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-primary font-black text-xl mb-2">
                   ₹{(prop.price / 10000000).toFixed(1)} <span className="text-xs uppercase opacity-70">Cr</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-primary transition-colors">{prop.title}</h3>
                <div className="flex items-center gap-2 text-white/30 text-sm font-bold uppercase tracking-widest">
                   <MapPin size={14} /> {prop.location}
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                   <Link href={`/realestate/property/${prop.id}`}>
                      <Button variant="ghost" className="text-white hover:text-primary p-0 font-bold group/btn">
                        View Details <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const steps = [
    { title: 'Verified Listings', desc: 'Every property undergoes a rigorous 50-point inspection before it goes live.', icon: ShieldCheck },
    { title: 'Expert Guidance', desc: 'Our agents have an average of 15 years experience in the luxury market.', icon: Star },
    { title: 'Premium Portfolio', desc: 'We only list properties that meet our stringent quality and aesthetic standards.', icon: Building },
  ];

  return (
    <section className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((s, i) => (
            <div key={i} className="text-center md:text-left group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500">
                <s.icon className="text-primary group-hover:text-white" size={32} />
              </div>
              <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{s.title}</h4>
              <p className="text-white/40 leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MarketIntelligence = () => (
  <section className="py-32 bg-black border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <span className="text-primary font-black uppercase tracking-widest text-xs mb-8 block">Live Insights</span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none uppercase">Market <br /> Intelligence</h2>
          <p className="text-xl text-white/40 font-light leading-relaxed mb-12">
            Our data-driven approach provides you with real-time analytics on asset appreciation, rental yields, and neighborhood growth forecasting.
          </p>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-4xl font-black text-white mb-1">12.4%</p>
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">Avg. Appreciation</p>
            </div>
            <div>
              <p className="text-4xl font-black text-white mb-1">₹4.2Cr</p>
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">Median Value</p>
            </div>
          </div>
        </div>
        <div className="glass-card bg-primary/5 border-primary/20 p-12 aspect-square flex items-center justify-center relative overflow-hidden group">
           <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-1 h-32 bg-primary/40 rounded-full mb-4 animate-pulse" />
              <p className="text-6xl font-black text-white group-hover:scale-110 transition-transform duration-700">98%</p>
              <p className="text-xs font-black uppercase tracking-widest text-primary mt-2">Retention Rate</p>
           </div>
           {/* Animated Grid lines */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      </div>
    </div>
  </section>
);

export default function RealEstateLanding() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <MarketIntelligence />
    </div>
  );
}

