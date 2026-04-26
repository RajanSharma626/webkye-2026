import React from "react";
import { prisma } from "@/lib/prisma";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Blog Post</h1>
        <p className="text-muted-foreground">Modify the details of your blog: {blog.title}</p>
      </div>
      <BlogForm initialData={blog} isEditing={true} />
    </div>
  );
}
