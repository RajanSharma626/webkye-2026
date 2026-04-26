import Hero from "@/components/sections/hero";
import CTA from "@/components/sections/cta";
import { prisma } from "@/lib/prisma";
import servicesData from "@/data/services.json";
import ServicesPreviewClient from "@/components/sections/services-preview-client";
import AboutUsClientWrapper from "./about-us-client-wrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function AboutUsPage() {
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
    <main className="bg-background min-h-screen">
      <Hero 
        badgeText="Our Agency Story"
        title={<>About Web<span className="text-primary">kye</span></>}
        description="Webkye is an elite tech agency specializing in high-performance web development, custom software, and scalable digital products for ambitious brands."
        showCTA={false}
      />

      <AboutUsClientWrapper services={displayServices} />

      <CTA />
    </main>
  );
}
