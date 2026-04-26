"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, TrendingUp, Cpu } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                About Web<span className="text-primary">kye</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Webkye is a high-performance tech agency specializing in expert web development, custom software solutions, and strategic UI/UX design. We empower businesses and startups to achieve sustainable growth by building scalable digital products engineered for maximum technical performance.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Our team focuses on delivering measurable results through a blend of technical excellence and strategic insight. We transform complex operational challenges into seamless digital advantages, ensuring every solution we deliver provides long-term value for our partners.
              </p>
              
              <ul className="space-y-3 pt-2">
                {[
                  "High-performance web development & scalable architecture",
                  "Custom software solutions tailored to specific business needs",
                  "User-focused UI/UX design for enhanced digital engagement"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-foreground/80">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Link href="/about-us" className="inline-flex items-center text-sm font-bold text-primary group">
                  Explore Our Full Agency Story
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { 
                icon: <ShieldCheck className="w-6 h-6 text-primary" />, 
                title: "Trusted Partners", 
                desc: "Fostering long-term relationships through reliable, enterprise-grade engineering." 
              },
              { 
                icon: <Zap className="w-6 h-6 text-primary" />, 
                title: "Rapid Delivery", 
                desc: "Streamlined agile workflows that accelerate your speed-to-market with precision." 
              },
              { 
                icon: <TrendingUp className="w-6 h-6 text-primary" />, 
                title: "Growth Focused", 
                desc: "Architecting future-proof solutions designed to scale alongside your business success." 
              },
              { 
                icon: <Cpu className="w-6 h-6 text-primary" />, 
                title: "Elite Tech Stack", 
                desc: "Leveraging modern, high-performance technologies for a superior technical edge." 
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="mb-5 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
