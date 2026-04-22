"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wifi, Waves, Dumbbell, Car, Star, ArrowRight, MapPin } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';
import { rooms } from '@/lib/hotel-data';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: y1 }} className="absolute inset-0">
           <img 
            src="/images/hotel/hero.png" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
        >
          <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full glass border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 animate-float">
            <MapPin size={12} /> Manhattan, New York
          </span>
          <h1 className="text-7xl md:text-[10rem] font-black text-white mb-10 tracking-tighter leading-[0.8]">
            Luxury Stay <br />
            <span className="text-primary">Experience</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
            Discover a sanctuary of modern elegance and timeless comfort where every detail is crafted for your ultimate indulgence.
          </p>
          <Link href="/hotel/rooms">
            <Button size="lg" className="h-20 px-16 text-xl rounded-full font-black bg-white text-black hover:bg-primary hover:text-white transition-all shadow-2xl shadow-primary/20">
              Book Your Sanctuary
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-40">
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

const RoomsPreview = () => {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">Exquisite Rooms</h2>
            <p className="text-xl text-white/40 font-light italic">Carefully curated spaces designed to inspire rest and rejuvenation.</p>
          </div>
          <Link href="/hotel/rooms">
            <Button variant="ghost" className="text-primary font-bold text-lg group">
              View All Accommodations <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.slice(0, 3).map((room, i) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[500px] rounded-[3rem] overflow-hidden mb-8 border border-white/5">
                <img src={room.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-primary font-black text-sm uppercase mb-2">From ₹{room.price.toLocaleString()}/night</p>
                  <h3 className="text-3xl font-black text-white tracking-tight">{room.name}</h3>
                </div>
              </div>
              <Link href={`/hotel/room/${room.id}`}>
                <Button className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black font-black">
                  View Details
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Amenities = () => {
  const ams = [
    { icon: Wifi, label: 'High-Speed WiFi', desc: 'Seamless connectivity for work or leisure.' },
    { icon: Waves, label: 'Infinity Pool', desc: 'Heated oceanfront pool with private cabanas.' },
    { icon: Dumbbell, label: 'Fitness Center', desc: 'State-of-the-art equipment and yoga studio.' },
    { icon: Car, label: 'Valet Parking', desc: '24/7 secure underground parking and valet.' },
  ];

  return (
    <section className="py-32 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {ams.map((a, i) => (
            <div key={i} className="text-center group">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                <a.icon className="text-primary group-hover:text-white w-10 h-10 transition-colors" />
              </div>
              <h4 className="text-xl font-black text-white mb-2">{a.label}</h4>
              <p className="text-sm text-white/30 font-light px-4">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black text-white mb-16 tracking-tighter text-center">Visual Narrative</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
          <div className="col-span-2 row-span-2 rounded-[2rem] overflow-hidden border border-white/5">
            <img src="/images/hotel/suite-ocean.png" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-[2rem] overflow-hidden border border-white/5">
            <img src="/images/hotel/hero.png" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-[2rem] overflow-hidden border border-white/5">
            <img src="/images/hotel/suite-ocean.png" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 rounded-[2rem] overflow-hidden border border-white/5">
            <img src="/images/hotel/hero.png" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const revs = [
    { name: 'Sarah Jenkins', text: 'An absolute masterpiece of hospitality. The ocean suite view is breathtaking.', stars: 5 },
    { name: 'David Chen', text: 'Impeccable service and world-class amenities. The definition of premium.', stars: 5 },
  ];

  return (
    <section className="py-32 bg-primary/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-20">
           <div className="flex justify-center gap-1 text-primary mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">"A paradigm of modern luxury"</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {revs.map((r, i) => (
             <div key={i} className="text-left glass-card">
                <p className="text-lg text-white/50 font-light mb-8 leading-relaxed">"{r.text}"</p>
                <div>
                   <h4 className="text-white font-black">{r.name}</h4>
                   <p className="text-xs text-primary font-bold uppercase tracking-widest">Verified Guest</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Membership = () => (
   <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto glass-card bg-primary/5 border-primary/20 rounded-[4rem] p-16 md:p-32 flex flex-col md:flex-row items-center gap-24 relative">
         <div className="absolute top-0 right-0 p-12"><div className="w-16 h-16 border-2 border-primary/20 rounded-full animate-spin-slow rotate-45" /></div>
         
         <div className="max-w-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 block">Exclusive Access</span>
           <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.8]">The <br />Privilege <br /><span className="text-primary italic">Club</span></h2>
           <p className="text-xl text-white/40 font-light leading-relaxed mb-12">
             Unlock a world of unparalleled luxury with our quarterly membership. Priority suite allocation, chauffeur services, and private chef access.
           </p>
           <Button variant="outline" className="h-16 px-12 rounded-full border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest text-xs">Explore Benefits</Button>
         </div>
         
         <div className="flex-grow grid grid-cols-1 gap-6">
            {['Global Concierge', 'Spa & Wellness', 'Private Aviation'].map((benefit, i) => (
              <div key={i} className="flex items-center justify-between p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-primary/10 transition-colors group">
                 <span className="text-xl font-black text-white group-hover:text-primary transition-colors">{benefit}</span>
                 <ArrowRight className="text-white/20 group-hover:text-primary transition-colors" />
              </div>
            ))}
         </div>
      </div>
   </section>
);

export default function HotelLanding() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Hero />
      <RoomsPreview />
      <Amenities />
      <Membership />
      <Gallery />
      <Reviews />
    </div>
  );
}
