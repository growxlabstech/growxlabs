"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { usePathname } from "@/navigation";

interface FAQItem {
  question: string;
  answer: string;
}

export function AccordionFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const isBlog = pathname?.includes("/blog");

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Dynamic theme variables
  const activeBg = isBlog 
    ? "bg-[#355CFF] border-[#355CFF]" 
    : "bg-[#C0F0FB] border-[#C0F0FB]";
    
  const activeIcon = isBlog 
    ? "text-white" 
    : "text-black";

  return (
    <div className="space-y-3">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-lg border border-border bg-card overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-6 text-left gap-4 group cursor-pointer"
            >
              <h4 className="text-foreground font-sans font-semibold text-[16px] leading-snug">
                {faq.question}
              </h4>
              <div className={`flex-shrink-0 w-8 h-8 rounded-md border border-border flex items-center justify-center transition-all duration-300 ${isOpen ? `${activeBg} rotate-45` : ''}`}>
                <Plus className={`w-4 h-4 transition-colors ${isOpen ? activeIcon : 'text-[#9CA3AF]'}`} />
              </div>
            </button>

            <div className={isOpen ? "block" : "hidden"}>
              <div className="px-6 pb-6 pt-0">
                <p className="text-muted-foreground font-sans text-[15px] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


