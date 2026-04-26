"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export default function BlogPreviewClient({ blogs }: { blogs: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map((post, index) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group"
        >
          <Link 
            href={`/blogs/${post.slug}`} 
            className="block h-full"
            aria-label={`Read full article: ${post.title}`}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted mb-5">
              <Image
                src={post.image}
                alt={`Cover image for ${post.title}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest shadow-sm">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-xs text-muted-foreground font-medium space-x-2">
                <Calendar size={12} className="text-primary" />
                <span>{formatDate(post.date)}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="pt-2 flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                Read Article
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
