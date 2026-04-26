import React from "react";
import { prisma } from "@/lib/prisma";
import FaqAccordion from "@/components/sections/faq-accordion";
import CTA from "@/components/sections/cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Webkye",
  description: "Find answers to common questions about our services, process, and how we help businesses grow through technology.",
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: "Webkye FAQs | Support Center",
    description: "Get answers to your questions about our digital services and engineering process.",
    url: "/faqs",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Webkye FAQs | Support Center",
    description: "Get answers to common questions about our services and process.",
  },
};

export default async function FaqsPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="py-20 md:py-32 border-b border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-8 inline-block">
            Support Center
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8">
            Common <span className="text-primary">Questions</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our products and services. Can't find the answer you're looking for? Reach out to our team.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          {faqs.length > 0 ? (
            <FaqAccordion faqs={faqs} />
          ) : (
            <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground italic">No questions found. Please check back later or contact support.</p>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </main>
  );
}
