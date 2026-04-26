import React from "react";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [testimonial, projects] = await Promise.all([
    prisma.testimonial.findUnique({ where: { id } }),
    prisma.project.findMany({ 
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true }
    }),
  ]);

  if (!testimonial) notFound();

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Testimonial</h1>
        <p className="text-muted-foreground">Modify the client feedback: {testimonial.author}</p>
      </div>
      <TestimonialForm initialData={testimonial} projects={projects} isEditing={true} />
    </div>
  );
}
