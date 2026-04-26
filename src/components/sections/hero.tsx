"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  badgeText?: string;
  title?: React.ReactNode;
  description?: string;
  showCTA?: boolean;
}

export default function Hero({ 
  badgeText = "Professional Digital Agency",
  title = <>High-Performance <span className="text-primary">Website</span> & <span className="text-primary">Custom Software</span> Solutions</>,
  description = "We design and build fast, scalable, and user-focused digital products for startups, businesses, and growing teams.",
  showCTA = true
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background elements - Identical to homepage */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full mb-6"
          >
            <Sparkles size={14} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{badgeText}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.1] text-foreground"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <Link href="/contact-us" className="btn-primary h-11 px-8 min-w-[180px] group shadow-md hover:shadow-lg transition-all">
                Start Project
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/case-studies" className="btn-secondary h-11 px-8 min-w-[180px] shadow-sm">
                View Our Work
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
