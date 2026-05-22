"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function AccordionFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-lg border border-[#E5E2DC] bg-white overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-6 text-left gap-4 group cursor-pointer"
            >
              <h4 className="text-[#1A1A1A] font-semibold text-[16px] leading-snug">
                {faq.question}
              </h4>
              <div className={`flex-shrink-0 w-8 h-8 rounded-md border border-[#E5E2DC] flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#355CFF] border-[#355CFF] rotate-45' : ''}`}>
                <Plus className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-[#9CA3AF]'}`} />
              </div>
            </button>

            <div className={isOpen ? "block" : "hidden"}>
              <div className="px-6 pb-6 pt-0">
                <p className="text-[#6B7280] text-[15px] leading-relaxed">
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

