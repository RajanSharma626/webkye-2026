"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-16 md:py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-lg overflow-hidden bg-primary px-8 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-primary/20">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-[100px] -ml-40 -mb-40" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
              Let's Build the Future of Your Digital Business
            </h2>
            <p className="text-primary-foreground/90 text-sm md:text-lg mb-10 leading-relaxed">
              Partner with Webkye to engineer high-performance websites and custom software solutions that drive measurable impact and long-term scalability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact-us" className="h-12 px-8 bg-white text-primary rounded-md font-bold text-sm md:text-base hover:shadow-lg transition-all flex items-center group">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="h-12 px-8 border border-white/30 text-white rounded-md font-bold text-sm md:text-base hover:bg-white/10 transition-all flex items-center">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
