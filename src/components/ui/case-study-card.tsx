"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  project: {
    slug: string;
    title: string;
    category: string;
    image: string;
    description?: string;
    tags?: string;
  };
  index?: number;
  className?: string;
}

export default function CaseStudyCard({ project, index = 0, className }: CaseStudyCardProps) {
  const tags = project.tags ? project.tags.split(",").map(t => t.trim()) : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("group relative flex flex-col", className)}
    >
      <Link 
        href={`/case-studies/${project.slug}`} 
        className="block relative h-full"
        aria-label={`View details for ${project.title}`}
      >
        <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-secondary/20">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title} project`}
            width={800}
            height={500}
            className="w-full h-auto transition-all duration-500"
          />
          
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-primary/90 backdrop-blur-md rounded-full shadow-lg transform -translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {project.category}
            </span>
          </div>

          {/* Quick Action Button (Floating) */}
          <div className="absolute bottom-4 right-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-xl">
              <ExternalLink size={18} />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 px-1">
          <div className="flex items-center justify-between gap-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {project.category}
            </span>
            <div className="h-px flex-1 bg-border group-hover:bg-primary/30 transition-colors" />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">
            {project.title}
          </h3>

          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
              {project.description}
            </p>
          )}

          <div className="pt-2 flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-all duration-300">
            <span className="relative overflow-hidden inline-block">
              View Project Analysis
              <span className="absolute bottom-0 left-0 w-full h-px bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </span>
            <ArrowRight className="ml-2 w-4 h-4 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
