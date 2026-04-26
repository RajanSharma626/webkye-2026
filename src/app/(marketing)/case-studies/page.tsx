import React from "react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import CaseStudyCard from "@/components/ui/case-study-card";

export const metadata: Metadata = {
  title: "Case Studies | Portfolio of Success by Webkye",
  description: "Browse our portfolio of successful professional projects and see how we've helped our clients achieve measurable business results.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies | Webkye Portfolio",
    description: "Discover how we solve complex business challenges with innovative digital engineering.",
    url: "/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Webkye Portfolio",
    description: "Browse our portfolio of successful digital engineering projects.",
  },
};

export default async function CaseStudiesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const pageParam = typeof resolvedSearchParams.page === "string" ? parseInt(resolvedSearchParams.page, 10) : 1;
  const currentPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;
  const itemsPerPage = 6;

  const [projects, totalProjects] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.project.count()
  ]);

  const totalPages = Math.ceil(totalProjects / itemsPerPage);

  return (
    <main className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">
            Professional Case Studies
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            A selection of our most impactful digital engineering projects. We build high-performance tools that solve real-world business challenges.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project, index) => (
            <CaseStudyCard key={project.id} project={project as any} index={index} />
          ))}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          baseUrl="/case-studies" 
        />
      </div>
    </main>
  );
}
