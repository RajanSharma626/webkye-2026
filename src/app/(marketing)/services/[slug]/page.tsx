import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import CTA from "@/components/sections/cta";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service) return { title: "Service Not Found" };

  return {
    title: service.metaTitle || `${service.title} | Webkye`,
    description: service.metaDescription || service.shortDesc,
    keywords: service.metaKeywords,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.shortDesc || "",
      url: `/services/${slug}`,
      type: "website",
      images: service.image ? [service.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.shortDesc || "",
      images: service.image ? [service.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    select: { slug: true }
  });
  
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const service = await prisma.service.findUnique({
    where: { slug }
  });

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen">
      <article className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/services" 
            className="inline-flex items-center text-sm font-bold text-primary mb-10 hover:translate-x-1 transition-transform"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Services
          </Link>
          
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8">
              {service.title}
            </h1>
            
            {service.shortDesc && (
              <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed border-l-4 border-primary pl-6 py-1 italic">
                {service.shortDesc}
              </p>
            )}
          </header>

          <div className="prose prose-blue dark:prose-invert max-w-none mb-20 text-muted-foreground leading-relaxed">
             <div dangerouslySetInnerHTML={{ __html: service.description }} />
          </div>

          <section className="bg-secondary/30 rounded-lg p-8 md:p-10 border border-border shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight text-foreground">
              Our Professional Approach
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              We utilize an industry-standard engineering lifecycle, ensuring transparency, security, and high-performance delivery for every professional project.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Dedicated Technical Project Management",
                "Weekly Strategic Progress Reviews",
                "Enterprise-Grade Scalable Architecture",
                "Rigorous Quality Assurance & Testing"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
      <CTA />
    </main>
  );
}
