import React from "react";
import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Blog Post</h1>
        <p className="text-muted-foreground">Share your thoughts and updates with your audience.</p>
      </div>
      <BlogForm />
    </div>
  );
}
