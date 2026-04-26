import React from "react";
import servicesData from "@/data/services.json";
import { Code, Palette, Smartphone, Globe, Cloud, BarChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Professional Services | Webkye",
  description: "Explore our comprehensive range of professional digital services including high-performance web development, UI/UX design, and cross-platform mobile apps.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | Webkye Digital Solutions",
    description: "Explore our range of professional services from web development to UI/UX design.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Webkye Digital Solutions",
    description: "High-performance web development, UI/UX design, and mobile app solutions.",
  },
};

const iconMap: Record<string, any> = {
  Code: <Code className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  BarChart: <BarChart className="w-6 h-6" />,
};

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany({
    where: { isVisible: true },
    orderBy: { createdAt: "asc" }
  });
  
  const allServices = dbServices.length > 0 
    ? dbServices.map(s => ({ 
        id: s.id,
        slug: s.slug,
        title: s.title,
        description: s.shortDesc || s.description,
        icon: s.image || "Code", 
        features: s.features ? s.features.split(",").map(f => f.trim()) : [] 
      }))
    : servicesData.map(s => ({ ...s, icon: s.icon || "Code", slug: s.id }));

  return (
    <main className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">
            Our Professional Services
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We deliver specialized digital solutions engineered to meet the complex needs of modern enterprises, focusing on performance, security, and exceptional user experience.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service) => (
            <article key={service.id}>
              <Link 
                href={`/services/${service.slug}`}
                className="p-6 h-full rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col group"
                aria-label={`Learn more about our ${service.title} service`}
              >
              <div className="mb-6 w-12 h-12 rounded-md bg-secondary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {iconMap[service.icon] || <Code className="w-6 h-6" />}
              </div>
              <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                {service.description}
              </p>
              
              <div className="space-y-3 mb-8 flex-grow">
                {service.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-center text-xs font-medium text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary/60 mr-2.5" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                Service Details
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </Link>
          </article>
          ))}
        </div>
      </div>
    </main>
  );
}
