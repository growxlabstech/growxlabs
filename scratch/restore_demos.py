import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Restaurant Pages
write_file('app/[locale]/(restaurant)/restaurant/checkout/page.tsx', '''"use client";
import React, { useState } from 'react';
import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setTimeout(() => router.push('/restaurant/order-success'), 1500);
  };
  return (
    <div className="pt-40 max-w-4xl mx-auto px-6 text-white min-h-screen">
      <h1 className="text-5xl font-black mb-12 uppercase">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="glass-card p-12 space-y-8">
        <input required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl" />
        <input required placeholder="Phone" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl" />
        <textarea required placeholder="Address" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl h-32" />
        <Button size="lg" className="w-full h-20 rounded-full font-black bg-primary text-white">Place Order</Button>
      </form>
    </div>
  );
}''')

write_file('app/[locale]/(restaurant)/restaurant/order-success/page.tsx', '''"use client";
import React from 'react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="pt-40 flex flex-col items-center justify-center text-center px-6 min-h-screen">
      <div className="w-32 h-32 bg-primary/20 rounded-[3rem] flex items-center justify-center mb-8 border border-primary/50">
        <CheckCircle2 className="text-primary w-20 h-20" />
      </div>
      <h1 className="text-6xl font-black text-white mb-6 uppercase">Order Received!</h1>
      <Link href="/restaurant/track-order">
        <Button size="lg" className="h-20 px-16 rounded-full font-black bg-white text-black">Track Order</Button>
      </Link>
    </div>
  );
}''')

write_file('app/[locale]/(restaurant)/restaurant/track-order/page.tsx', '''"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Flame, Navigation, Package } from 'lucide-react';

export default function TrackOrderPage() {
  const [stage, setStage] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setStage(s => (s < 4 ? s + 1 : 4)), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="pt-40 max-w-2xl mx-auto px-6 text-white min-h-screen text-center">
      <h1 className="text-5xl font-black mb-16 uppercase">Live Tracking</h1>
      <div className="space-y-12">
        {[{id:1, n:'Confirmed', i:CheckCircle2}, {id:2, n:'Preparing', i:Flame}, {id:3, n:'On the Way', i:Navigation}, {id:4, n:'Delivered', i:Package}].map(s => (
          <div key={s.id} className={`flex items-center gap-8 ${stage >= s.id ? 'opacity-100' : 'opacity-20'}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${stage >= s.id ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10'}`}>
              <s.i className={stage >= s.id ? 'text-primary' : 'text-white/40'} />
            </div>
            <h3 className="text-2xl font-black">{s.n}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}''')

# Hotel Pages
write_file('app/[locale]/(hotel)/hotel/room/[id]/page.tsx', '''"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/navigation';
import { rooms } from '@/lib/hotel-data';
import { Button } from '@/components/ui/Button';

export default function RoomDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const room = rooms.find(r => r.id === id);
  if (!room) return <div className="pt-40 text-white text-center">Not Found</div>;
  return (
    <div className="pt-24 min-h-screen bg-black">
      <div className="h-[60vh] w-full relative">
        <img src={room.image} className="w-full h-full object-cover" />
        <div className="absolute bottom-12 left-12"><h1 className="text-8xl font-black text-white uppercase">{room.name}</h1></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-20 flex gap-20">
        <div className="flex-grow">
          <p className="text-2xl text-white/50 font-light">{room.description}</p>
        </div>
        <div className="w-96 glass-card p-10 bg-white/5 border-white/10 h-fit sticky top-32">
          <p className="text-3xl font-black text-white mb-8">₹{room.price.toLocaleString()} <span className="text-sm opacity-50">/ night</span></p>
          <Button onClick={() => router.push('/hotel/booking')} className="w-full h-16 rounded-2xl bg-white text-black font-black">Book Sanctuary</Button>
        </div>
      </div>
    </div>
  );
}''')

write_file('app/[locale]/(hotel)/hotel/booking/page.tsx', '''"use client";
import React from 'react';
import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/Button';

export default function BookingPage() {
  const router = useRouter();
  return (
    <div className="pt-40 max-w-4xl mx-auto px-6 text-white min-h-screen">
      <h1 className="text-5xl font-black mb-16 uppercase">Finalize Booking</h1>
      <form onSubmit={(e) => { e.preventDefault(); router.push('/hotel/confirmation'); }} className="glass-card p-12 space-y-8">
        <input required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl" />
        <div className="grid grid-cols-2 gap-8"><input type="date" className="bg-white/5 border border-white/10 p-5 rounded-2xl" /><input type="date" className="bg-white/5 border border-white/10 p-5 rounded-2xl" /></div>
        <Button size="lg" className="w-full h-20 rounded-full font-black bg-primary text-white">Confirm Booking</Button>
      </form>
    </div>
  );
}''')

write_file('app/[locale]/(hotel)/hotel/confirmation/page.tsx', '''"use client";
import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="pt-40 flex flex-col items-center justify-center text-center px-6 min-h-screen text-white">
      <div className="w-40 h-40 bg-primary/10 rounded-[4rem] flex items-center justify-center mb-8 border border-primary/30">
        <CheckCircle className="text-primary w-20 h-20" />
      </div>
      <h1 className="text-6xl font-black mb-6 uppercase">Stay Confirmed</h1>
      <p className="text-xl text-white/40 max-w-md mx-auto">We are preparing your sanctuary for arrival.</p>
    </div>
  );
}''')

# Real Estate Pages
write_file('app/[locale]/(realestate)/realestate/property/[id]/page.tsx', '''"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { properties } from '@/lib/property-data';
import { Button } from '@/components/ui/Button';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  if (!property) return <div className="pt-40 text-white text-center">Not Found</div>;
  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      <div className="h-[70vh] w-full"><img src={property.image} className="w-full h-full object-cover" /></div>
      <div className="max-w-7xl mx-auto px-6 py-20 flex gap-20">
        <div className="flex-grow">
           <h1 className="text-8xl font-black mb-10 uppercase">{property.title}</h1>
           <p className="text-2xl text-white/50 font-light">{property.description}</p>
        </div>
        <div className="w-96 glass-card p-10 bg-white/5 border-white/10 h-fit sticky top-32">
           <p className="text-5xl font-black text-primary mb-8">₹{(property.price / 10000000).toFixed(1)}Cr</p>
           <Button className="w-full h-16 rounded-2xl bg-white text-black font-black">Schedule Visit</Button>
        </div>
      </div>
    </div>
  );
}''')

write_file('app/[locale]/(realestate)/realestate/contact/page.tsx', '''"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [sub, setSub] = useState(false);
  if (sub) return <div className="pt-40 text-center text-white min-h-screen"><h1 className="text-5xl font-black">Inquiry Sent</h1></div>;
  return (
    <div className="pt-24 max-w-4xl mx-auto px-6 text-white min-h-screen">
       <h1 className="text-8xl font-black mb-20 uppercase">Contact Advisor</h1>
       <form onSubmit={(e) => { e.preventDefault(); setSub(true); }} className="glass-card p-12 space-y-8">
          <input required placeholder="Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl" />
          <input required placeholder="Email" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl" />
          <textarea required placeholder="Message" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl h-40" />
          <Button size="lg" className="w-full h-20 rounded-full font-black bg-primary">Send Inquiry</Button>
       </form>
    </div>
  );
}''')
