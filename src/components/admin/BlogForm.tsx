"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";
import Editor from "./Editor";
import Modal from "@/components/ui/modal";
import Toast from "@/components/ui/toast";

export default function BlogForm({ initialData, isEditing = false }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ show: boolean; title: string; message: string; type: "confirm" | "alert" | "success" | "error" }>({
    show: false,
    title: "",
    message: "",
    type: "alert",
  });
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    author: initialData?.author || "",
    image: initialData?.image || "",
    category: initialData?.category || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    metaKeywords: initialData?.metaKeywords || "",
  });
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });
  const [manualSlug, setManualSlug] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (e: any) => {
    if (typeof e === 'string') {
      setFormData((prev) => ({ ...prev, content: e }));
      return;
    }

    const { name, value } = e.target;
    
    if (name === "title" && !manualSlug) {
      setFormData((prev) => ({ 
        ...prev, 
        title: value,
        slug: generateSlug(value)
      }));
    } else if (name === "slug") {
      setManualSlug(true);
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEditing ? `/api/blogs/${initialData.id}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setToast({ show: true, message: isEditing ? "Blog post updated!" : "Blog post created!", type: "success" });
        router.refresh();
        setTimeout(() => {
          router.push("/admin/blogs");
        }, 1500);
      } else {
        const errorData = await res.json();
        setToast({ show: true, message: errorData.error || "Failed to save blog post", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "Something went wrong while saving", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6 shadow-sm w-full max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Blog Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Article title" className="input-field h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required placeholder="url-slug" className="input-field h-11" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Excerpt</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required rows={2} placeholder="Short summary..." className="input-field h-auto py-2 resize-none" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Content (Rich Text)</label>
            <div className="rounded-md border border-input overflow-hidden">
              <Editor 
                value={formData.content} 
                onChange={handleChange} 
                placeholder="Write your blog post content here..."
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} required placeholder="Author name" className="input-field h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. Technology" className="input-field h-11" />
          </div>
          <div className="md:col-span-2">
            <ImageUpload 
              label="Featured Image" 
              value={formData.image} 
              onChange={(url: string) => setFormData({ ...formData, image: url })} 
            />
          </div>

          <div className="md:col-span-2 pt-6 border-t border-border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">SEO Metadata</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="SEO Title"
                  className="input-field h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Meta Keywords</label>
                <input
                  type="text"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleChange}
                  placeholder="Keywords"
                  className="input-field h-11"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={2}
                  placeholder="SEO Description"
                  className="input-field h-auto py-2 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 pt-6 border-t border-border">
          <button type="submit" disabled={loading} className="btn-primary min-w-[140px]">
            {loading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
            {isEditing ? "Update Blog" : "Create Blog"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">
            <X size={18} className="mr-2" />
            Cancel
          </button>
        </div>
      </form>

      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </>
  );
}
