"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, TrendingUp, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import ServicesPreviewClient from "@/components/sections/services-preview-client";

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
}

interface AboutUsClientWrapperProps {
  services: Service[];
}

export default function AboutUsClientWrapper({ services }: AboutUsClientWrapperProps) {
  return (
    <>
      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-secondary/10 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Who We Are
                </h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
              <div className="space-y-6 text-base text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  At Webkye, we believe that world-class digital experiences are built on the foundation of clean engineering and intentional design. Founded as a strategic partner for businesses, startups, and growing teams, we specialize in bridging the gap between ambitious ideas and high-performance digital products.
                </p>
                <p>
                  Our expertise spans across enterprise-grade web development, custom software systems, and intuitive UI/UX design. We don't just write code; we solve complex business problems through scalable architecture and optimized workflows. By prioritizing technical performance and user-centric logic, we ensure that every solution we deliver serves as a long-term competitive advantage for our clients.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full"
            >
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-primary" />, title: "Trusted Partners", desc: "Building long-term strategic relationships through reliable, enterprise-grade engineering." },
                { icon: <Zap className="w-5 h-5 text-primary" />, title: "Rapid Delivery", desc: "Streamlined agile methodologies that move your project from discovery to production with precision." },
                { icon: <TrendingUp className="w-5 h-5 text-primary" />, title: "Growth Focused", desc: "Architecting scalable digital products that evolve seamlessly alongside your business success." },
                { icon: <Cpu className="w-5 h-5 text-primary" />, title: "Elite Tech Stack", desc: "Leveraging Next.js and high-performance cloud architecture to give your brand a modern edge." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                  <div className="mb-4 w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do - Now Dynamic */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">What We Do</h2>
              <p className="text-base text-muted-foreground">We offer comprehensive digital engineering and strategic design services tailored for the modern enterprise. From custom software to SEO-optimized websites, our solutions are built for speed, security, and impact.</p>
            </div>
            <Link href="/services" className="btn-secondary h-11 px-6 group flex items-center gap-2">
              See More Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <ServicesPreviewClient services={services} />
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 bg-secondary/10 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/3">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Our Approach</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
            </div>
            <div className="lg:w-2/3 space-y-10">
              {[
                { step: "01", title: "Technical Discovery", desc: "We conduct a deep-dive analysis of your business logic and user requirements to establish a high-precision technical roadmap." },
                { step: "02", title: "Agile Development", desc: "Our iterative, sprint-based workflow ensures continuous progress, absolute transparency, and the flexibility to adapt to evolving needs." },
                { step: "03", title: "Performance Optimization", desc: "Every product is subjected to rigorous testing and fine-tuning to guarantee peak speed, maximum security, and flawless scalability." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start group"
                >
                  <span className="text-2xl font-bold text-primary/30 group-hover:text-primary transition-colors leading-none pt-1">
                    {item.step}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-primary to-primary/90 rounded-lg p-10 md:p-16 text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Why Choose Us</h2>
                <ul className="space-y-4">
                  {[
                    "Performance-first engineering to maximize retention and SEO results.",
                    "Strategic solutions designed to drive measurable business ROI.",
                    "Future-proof codebases built to support long-term business evolution.",
                    "Seamless collaboration with weekly updates and dedicated support."
                  ].map((strength, i) => (
                    <li key={i} className="flex items-start gap-4 text-white font-medium">
                      <CheckCircle2 size={18} className="text-white mt-1 flex-shrink-0" />
                      <span className="text-base text-white/90">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden lg:block border-l border-white/20 pl-12">
                <p className="text-lg md:text-xl font-medium italic text-white leading-relaxed">
                  "Our mission is to build technology that feels like a powerful extension of your business, transforming complex challenges into seamless digital advantages."
                </p>
                <div className="mt-6 flex flex-col">
                  <span className="font-bold uppercase tracking-widest text-xs text-white">The Webkye Leadership</span>
                  <span className="text-xs text-white/70">Established 2021</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12 md:py-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
              "To empower global enterprises through elite-level digital engineering and intentional design, ensuring that their technology acts as a catalyst for innovation and sustainable business growth."
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
