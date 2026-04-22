"use client";

import { Link } from "@/navigation";
import { UtensilsCrossed } from "lucide-react";

export const RestaurantFooter = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/restaurant" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">GrowX <span className="text-primary">Eats</span></span>
            </Link>
            <p className="text-white/40 max-w-sm font-light leading-relaxed">
              Experience the pinnacle of culinary excellence delivered to your home. We combine traditional techniques with modern logistics for the perfect dining experience.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/restaurant/menu" className="text-white/40 hover:text-white transition-colors">Full Menu</Link></li>
              <li><Link href="/restaurant/cart" className="text-white/40 hover:text-white transition-colors">Your Bag</Link></li>
              <li><Link href="/restaurant/track-order" className="text-white/40 hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/about" className="text-white/40 hover:text-white transition-colors">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Contact</h4>
            <ul className="space-y-4 text-white/40">
              <li>info@growxeats.com</li>
              <li>+1 (555) 000-1234</li>
              <li>123 Gastronomy Way,<br />Kitchen City, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
            © {new Date().getFullYear()} GrowX Labs Restaurant Demo. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
