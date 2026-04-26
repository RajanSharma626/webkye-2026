import React from "react";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, testimonials] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  if (!project) notFound();

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
        <p className="text-muted-foreground">Update the details of your project: {project.title}</p>
      </div>
      <ProjectForm initialData={project} testimonials={testimonials} isEditing={true} />
    </div>
  );
}
