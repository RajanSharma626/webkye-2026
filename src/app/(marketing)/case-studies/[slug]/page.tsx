import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/cta";
import { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Quote } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.metaTitle || `${project.title} | Case Study`,
    description: project.metaDescription || project.description,
    keywords: project.metaKeywords,
    alternates: {
      canonical: `/case-studies/${slug}`,
    },
    openGraph: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.description,
      url: `https://webkye.com/case-studies/${slug}`,
      type: "article",
      images: project.image ? [project.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ 
    where: { slug },
    include: { testimonial: true }
  });

  if (!project) {
    notFound();
  }

  const tags = project.tags ? project.tags.split(",").map(t => t.trim()) : [];

  return (
    <main className="bg-background min-h-screen">
      <article className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center text-sm font-bold text-primary mb-12 hover:translate-x-1 transition-transform"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Case Studies
          </Link>
          
          <header className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-2.5 py-1 rounded mb-6 inline-block">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-10 leading-tight">
              {project.title}
            </h1>
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-2 space-y-16">
              {project.description && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-foreground">Project Overview</h2>
                  <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </section>
              )}
              
              {project.content && (
                <section className="prose prose-blue dark:prose-invert max-w-none">
                   <div dangerouslySetInnerHTML={{ __html: project.content }} />
                </section>
              )}

              {project.testimonial && (
                <section className="relative py-12 px-8 md:px-12 bg-secondary/30 rounded-2xl border border-border overflow-hidden">
                  <Quote className="absolute top-6 right-8 text-primary/10 w-24 h-24 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8">Client Testimonial</h3>
                    <blockquote className="text-base md:text-lg font-medium text-foreground italic mb-10 leading-relaxed">
                      "{project.testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      {project.testimonial.image ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                          <Image 
                            src={project.testimonial.image} 
                            alt={project.testimonial.author} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {project.testimonial.author[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-foreground">{project.testimonial.author}</p>
                        <p className="text-sm text-muted-foreground font-medium">{project.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-10 sticky top-24">
              <div className="p-6 rounded-lg border border-border bg-card shadow-sm space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-4">Core Technology</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-secondary text-foreground/80 rounded text-[11px] font-bold border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                


                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-4">Delivered Services</h3>
                  <ul className="space-y-3">
                    {["Technical Discovery", "User Experience Design", "Full-Stack Engineering", "Infrastructure Deployment"].map((s, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-muted-foreground">
                        <CheckCircle2 size={14} className="text-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <CTA />
    </main>
  );
}
