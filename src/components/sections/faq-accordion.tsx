"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItemProps[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div 
          key={faq.id} 
          className={cn(
            "group rounded-2xl border transition-all duration-300",
            openId === faq.id 
              ? "bg-secondary/30 border-primary/20 shadow-sm" 
              : "bg-card border-border hover:border-primary/20"
          )}
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <h3 className={cn(
              "text-base md:text-lg font-bold tracking-tight transition-colors",
              openId === faq.id ? "text-primary" : "text-foreground"
            )}>
              {faq.question}
            </h3>
            <div className={cn(
              "flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300",
              openId === faq.id ? "bg-primary text-white rotate-180" : "bg-secondary text-muted-foreground"
            )}>
              {openId === faq.id ? <Minus size={18} /> : <Plus size={18} />}
            </div>
          </button>
          
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            openId === faq.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="px-6 pb-8 text-muted-foreground leading-relaxed">
              <p className="text-sm md:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
