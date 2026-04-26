import React from "react";
import { prisma } from "@/lib/prisma";
import TestimonialsClient from "./testimonials-client";

const staticTestimonials = [
  {
    id: "t1",
    content: "Webkye delivered a professional platform that exceeded our expectations. Their technical engineering and design sense are truly elite.",
    author: "Sarah Johnson",
    role: "CEO, TechFlow",
  },
  {
    id: "t2",
    content: "The best professional agency we've partnered with. They understood our complex business logic and delivered a seamless solution.",
    author: "Michael Chen",
    role: "CTO, InnovateLabs",
  },
  {
    id: "t3",
    content: "Our operational efficiency increased significantly after the digital transformation. Highly recommended for any professional enterprise.",
    author: "Emma Williams",
    role: "Product Manager, GrowthSaaS",
  },
];

export default async function Testimonials() {
  const dbTestimonials = await prisma.testimonial.findMany({
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  const displayTestimonials = dbTestimonials.length > 0 
    ? dbTestimonials.map(t => ({
        id: t.id,
        content: t.content,
        author: t.author,
        role: t.role
      }))
    : staticTestimonials;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Client Feedback</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Trusted by innovative teams to deliver high-performance digital products and measurable business impact.
          </p>
        </div>

        <TestimonialsClient testimonials={displayTestimonials} />
      </div>
    </section>
  );
}
