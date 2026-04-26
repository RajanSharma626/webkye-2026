import React from "react";
import { prisma } from "@/lib/prisma";
import projectsData from "@/data/projects.json";
import CaseStudiesPreviewClient from "./case-studies-preview-client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function CaseStudiesPreview() {
  const dbProjects = await prisma.project.findMany({
    take: 4,
    orderBy: { createdAt: "desc" }
  });

  const displayProjects = dbProjects.length > 0 
    ? dbProjects.map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        image: p.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
      }))
    : projectsData.slice(0, 4).map(p => ({
        slug: p.id,
        title: p.title,
        category: p.category,
        image: p.image
      }));

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Case Studies</h2>
            <p className="text-base text-muted-foreground">
              Explore how we've helped leading brands transform their digital presence through precision engineering and professional design.
            </p>
          </div>
          <Link href="/case-studies" className="btn-secondary h-11 px-6 group">
            View All Work
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <CaseStudiesPreviewClient projects={displayProjects} />
      </div>
    </section>
  );
}
