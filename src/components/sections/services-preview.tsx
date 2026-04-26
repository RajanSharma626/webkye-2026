import React from "react";
import { prisma } from "@/lib/prisma";
import servicesData from "@/data/services.json";
import ServicesPreviewClient from "./services-preview-client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function ServicesPreview() {
  const dbServices = await prisma.service.findMany({
    take: 3,
    orderBy: { createdAt: "asc" }
  });

  const displayServices = dbServices.length > 0 
    ? dbServices.map(s => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        description: s.shortDesc || s.description,
        icon: s.image || "Code"
      }))
    : servicesData.slice(0, 3).map(s => ({
        id: s.id,
        slug: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon || "Code"
      }));

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Core Services</h2>
            <p className="text-base text-muted-foreground">
              We provide professional digital solutions engineered for performance, scalability, and exceptional user experience.
            </p>
          </div>
          <Link href="/services" className="btn-secondary h-11 px-6 group">
            View All Services
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ServicesPreviewClient services={displayServices} />
      </div>
    </section>
  );
}
