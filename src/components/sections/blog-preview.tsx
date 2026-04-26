import React from "react";
import { prisma } from "@/lib/prisma";
import blogsData from "@/data/blogs.json";
import BlogPreviewClient from "./blog-preview-client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function BlogPreview() {
  const dbBlogs = await prisma.blog.findMany({
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  const displayBlogs = dbBlogs.length > 0 
    ? dbBlogs.map(b => ({
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        date: b.createdAt.toISOString(),
        image: b.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        category: b.category || "Technology"
      }))
    : blogsData.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Latest Insights</h2>
            <p className="text-base text-muted-foreground">
              Professional perspectives on technology, design, and digital strategy to help you stay ahead in the modern market.
            </p>
          </div>
          <Link href="/blogs" className="btn-secondary h-11 px-6 group">
            Read Our Blog
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <BlogPreviewClient blogs={displayBlogs} />
      </div>
    </section>
  );
}
