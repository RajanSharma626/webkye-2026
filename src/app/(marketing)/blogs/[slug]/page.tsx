import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/cta";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import { Calendar, User, ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });

  if (!post) return { title: "Blog Not Found" };

  return {
    title: post.metaTitle || `${post.title} | Webkye Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: `/blogs/${slug}`,
      type: "article",
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({ select: { slug: true } });
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });

  if (!post) {
    notFound();
  }

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "image": post.image ? [post.image] : [],
    "datePublished": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Webkye",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo.png`
      }
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-20 md:py-28" itemScope itemType="https://schema.org/BlogPosting">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-sm font-bold text-primary mb-12 hover:translate-x-1 transition-transform"
            aria-label="Return to the blog listing page"
          >
            <ArrowLeft size={16} className="mr-2" aria-hidden="true" />
            Back to Blog
          </Link>
          
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              <span className="bg-primary/10 px-2.5 py-1 rounded" itemProp="articleSection">{post.category}</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar size={12} aria-hidden="true" />
                <time dateTime={post.createdAt.toISOString()} itemProp="datePublished">
                  {formatDate(post.createdAt.toISOString())}
                </time>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8 leading-tight" itemProp="headline">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-12 border-l-2 border-border pl-6" itemProp="author" itemScope itemType="https://schema.org/Person">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-primary border border-border" aria-hidden="true">
                {post.author[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground" itemProp="name">{post.author}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Expert Contributor</p>
              </div>
            </div>

            {post.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border shadow-sm">
                <Image
                  src={post.image}
                  alt={`Cover image for ${post.title}`}
                  fill
                  className="object-cover"
                  priority
                  itemProp="image"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </header>

          <div 
            className="prose prose-blue dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
            itemProp="articleBody"
          >
            <div className="text-lg md:text-xl font-medium text-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <footer className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-6 text-sm">
              <span className="font-bold text-foreground uppercase tracking-widest text-xs">Share</span>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blogs/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors font-bold"
                aria-label={`Share ${post.title} on Twitter`}
              >
                Twitter
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blogs/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors font-bold"
                aria-label={`Share ${post.title} on LinkedIn`}
              >
                LinkedIn
              </a>
            </div>
            <Link href="/blogs" className="btn-secondary h-10 px-6" aria-label="Read more blog insights">
              Read More Insights
            </Link>
          </footer>
        </div>
      </article>
      <CTA />
    </main>
  );
}
