"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Truck, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';
import { menuItems } from '@/lib/restaurant-data';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: y1 }} className="absolute inset-0">
           <img 
            src="/images/dishes/hero.png" 
            alt="Premium Dish" 
            className="w-full h-full object-cover opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-2 px-6 rounded-full glass border border-white/10 text-[12px] font-black uppercase tracking-[0.3em] text-primary mb-8">
            The Ultimate Gastronomy
          </span>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            Premium Dining <br />
            <span className="text-primary italic">Experience</span> Delivered
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Savor the world's finest ingredients, curated by Michelin-star chefs, delivered straight to your doorstep with clinical precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/restaurant/menu">
              <Button size="lg" className="h-16 px-12 text-lg rounded-full font-black bg-white text-black hover:bg-neutral-200 transition-all shadow-2xl shadow-white/10 group">
                Order Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/restaurant/menu">
              <Button variant="ghost" className="text-white hover:text-primary font-bold text-lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white">Scroll Down</span>
        <div className="w-[1px] h-12 bg-white" />
      </div>
    </section>
  );
};

const Features = () => {
  const list = [
    { title: 'Fast Delivery', desc: 'Average 30 mins delivery time with precision tracking.', icon: Truck },
    { title: 'Fresh Ingredients', desc: 'Sourced daily from organic farms and premium suppliers.', icon: Leaf },
    { title: 'Secure Payments', desc: 'Bank-grade encryption for all your transactions.', icon: ShieldCheck },
  ];

  return (
    <section className="py-32 bg-black relative">
       <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {list.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <f.icon className="text-primary w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{f.title}</h3>
              <p className="text-white/40 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SignatureDishes = () => {
  const signatureDishes = menuItems.filter(item => item.id === 'm1' || item.id === 'm2' || item.id === 's1');

  return (
    <section className="py-32 bg-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">Signature Dishes</h2>
            <p className="text-xl text-white/40 font-light italic">Artistic creations that define our culinary philosophy.</p>
          </div>
          <Link href="/restaurant/menu">
            <Button variant="ghost" className="text-primary font-bold group">
              See All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-10 -mx-6 px-6">
          {signatureDishes.map((dish, i) => (
            <motion.div 
              key={i}
              className="min-w-[350px] md:min-w-[450px] group cursor-pointer"
              whileHover={{ y: -10 }}
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden mb-6">
                 <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">{dish.category}</span>
                  <h4 className="text-3xl font-black text-white tracking-tight">{dish.name}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { name: "Julianne Rossi", role: "Food Critic", text: "The pan-seared sea bass was a revelation. Effortless elegance delivered to my dining table.", stars: 5 },
    { name: "Marcus Thorne", role: "Chef", text: "Incredible attention to detail in packaging and flavor preservation. Best in the city.", stars: 5 },
    { name: "Elena Gilbert", role: "Blogger", text: "Their Wagyu burger is legendary. The truffle notes are perfectly balanced.", stars: 4 },
  ];

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-20 tracking-tighter text-center">In Their Words</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="glass-card text-left">
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(r.stars)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
              </div>
              <p className="text-xl text-white/70 italic mb-8 font-light">"{r.text}"</p>
              <div>
                <h4 className="font-black text-white tracking-tight">{r.name}</h4>
                <p className="text-sm text-white/30 uppercase tracking-widest font-bold">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto glass-card bg-primary/10 border-primary/20 rounded-[4rem] text-center py-24 px-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 blur-[120px] rounded-full" />
        
        <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter">Ready to Taste <br /> Excellence?</h2>
        <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto font-light">Join the thousands of happy diners who trust GrowX Eats for their premium culinary experiences.</p>
        <Link href="/restaurant/menu">
          <Button size="lg" className="h-16 px-16 text-xl rounded-full font-black bg-primary text-white hover:bg-primary/80 transition-all">
            Order Your Meal Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

const ChefsTable = () => (
   <section className="py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
               <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative group">
                  <img src="/images/dishes/signature-1.png" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                     <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">The Maestro</p>
                     <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Chef Marco Rossi</h3>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-3 lg:pl-20">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 block font-mono">Series #01</span>
               <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.8] uppercase">The <br />Chef's <br /><span className="text-primary italic">Table</span></h2>
               <p className="text-2xl text-white/40 font-light leading-relaxed mb-12">
                  An intimate, curated experience where storytelling meets gastronomy. Limited to 12 guests per evening, featuring a 9-course seasonal journey.
               </p>
               <div className="flex gap-16">
                  <div><p className="text-white font-black text-4xl mb-1">09</p><p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Courses</p></div>
                  <div><p className="text-white font-black text-4xl mb-1">12</p><p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Seats</p></div>
                  <div><p className="text-white font-black text-4xl mb-1">04</p><p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Sommeliers</p></div>
               </div>
            </div>
         </div>
      </div>
   </section>
);

export default function RestaurantLanding() {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <Features />
      <ChefsTable />
      <SignatureDishes />
      <Reviews />
      <CTA />
    </div>
  );
}
