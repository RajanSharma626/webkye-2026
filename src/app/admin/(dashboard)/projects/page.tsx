import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, FolderKanban, ExternalLink } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import Image from "next/image";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects & Case Studies</h1>
          <p className="text-muted-foreground">Showcase your best work to the world.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="btn-primary space-x-2"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <div className="col-span-full bg-card border border-border border-dashed rounded-xl p-20 text-center text-muted-foreground italic">
            No projects found.
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <Link href={`/admin/projects/edit/${project.id}`} className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                    <Edit2 size={20} />
                  </Link>
                  <DeleteButton 
                    id={project.id} 
                    endpoint="/api/projects" 
                    className="p-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all" 
                    iconSize={20} 
                  />
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="text-xs font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">{project.category}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <span className="text-xs font-medium text-muted-foreground italic">Slug: {project.slug}</span>
                  <Link href={`/case-studies/${project.slug}`} target="_blank" className="text-primary text-xs font-bold flex items-center hover:underline">
                    Preview <ExternalLink size={12} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
