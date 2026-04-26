import React from "react";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function NewTestimonialPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true }
  });

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Testimonial</h1>
        <p className="text-muted-foreground">Share what your clients have to say about your work.</p>
      </div>
      <TestimonialForm projects={projects} />
    </div>
  );
}
