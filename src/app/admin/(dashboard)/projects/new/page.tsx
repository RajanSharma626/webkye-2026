import React from "react";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
        <p className="text-muted-foreground">Showcase your latest work and achievements.</p>
      </div>
      <ProjectForm testimonials={testimonials} />
    </div>
  );
}
