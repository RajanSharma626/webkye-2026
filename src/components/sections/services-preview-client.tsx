"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Globe, Cloud, BarChart, ArrowRight } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  Code: <Code className="w-6 h-6 text-primary" />,
  Palette: <Palette className="w-6 h-6 text-primary" />,
  Smartphone: <Smartphone className="w-6 h-6 text-primary" />,
  Globe: <Globe className="w-6 h-6 text-primary" />,
  Cloud: <Cloud className="w-6 h-6 text-primary" />,
  BarChart: <BarChart className="w-6 h-6 text-primary" />,
};

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export default function ServicesPreviewClient({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.article
          key={service.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link 
            href={`/services/${service.slug}`}
            className="group block h-full p-6 rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300"
            aria-label={`Learn more about ${service.title} service`}
          >
            <div className="mb-5 w-12 h-12 rounded-md bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              {iconMap[service.icon] || <Code className="w-6 h-6 text-primary" />}
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
              {service.description}
            </p>
            <div className="flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
