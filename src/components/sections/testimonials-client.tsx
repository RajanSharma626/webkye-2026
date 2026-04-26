"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
}

export default function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, index) => (
        <motion.div
          key={t.id || index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="p-6 rounded-lg bg-card border border-border relative flex flex-col h-full shadow-sm"
        >
          <Quote className="absolute top-6 right-6 text-primary/10 w-8 h-8" />
          <p className="text-sm md:text-base mb-8 italic text-muted-foreground leading-relaxed flex-grow">
            "{t.content}"
          </p>
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm font-bold text-foreground">{t.author}</p>
            <p className="text-xs text-muted-foreground font-medium">{t.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
