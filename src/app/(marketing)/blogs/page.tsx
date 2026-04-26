import React from "react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
import { formatDate } from "@/lib/utils";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights & Articles | Webkye Professional Blog",
  description: "Stay ahead with professional insights on technology, design, and digital strategy from the Webkye team.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Webkye Blog | Professional Insights",
    description: "Stay ahead with professional insights on technology, design, and digital strategy.",
    url: "/blogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webkye Blog | Professional Insights",
    description: "Expert perspectives on technology, design, and digital strategy.",
  },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const pageParam = typeof resolvedSearchParams.page === "string" ? parseInt(resolvedSearchParams.page, 10) : 1;
  const currentPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;
  const itemsPerPage = 6;

  const [blogs, totalBlogs] = await Promise.all([
    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.blog.count()
  ]);

  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  return (
    <main className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">
            Latest Insights & <span className="text-primary">Articles</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Professional perspectives on the digital landscape, engineered to provide you with the knowledge needed to drive growth and innovation.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article key={post.slug}>
              <Link 
                href={`/blogs/${post.slug}`} 
                className="group flex flex-col h-full rounded-lg border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300"
                aria-label={`Read full article: ${post.title}`}
              >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-primary" />
                    {formatDate(post.date.toISOString())}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={12} className="text-primary" />
                    {post.author}
                  </div>
                </div>
                <h2 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                  Read Full Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>
          </article>
          ))}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          baseUrl="/blogs" 
        />
      </div>
    </main>
  );
}
