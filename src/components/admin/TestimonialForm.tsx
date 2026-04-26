"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";
import Toast from "@/components/ui/toast";

export default function TestimonialForm({ initialData, projects = [], isEditing = false }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: initialData?.content || "",
    author: initialData?.author || "",
    role: initialData?.role || "",
    image: initialData?.image || "",
    projectId: initialData?.projectId || "",
  });
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEditing ? `/api/testimonials/${initialData.id}` : "/api/testimonials";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setToast({ show: true, message: isEditing ? "Testimonial updated!" : "Testimonial created!", type: "success" });
        router.refresh();
        setTimeout(() => {
          router.push("/admin/testimonials");
        }, 1500);
      } else {
        const errorData = await res.json();
        setToast({ show: true, message: errorData.error || "Failed to save testimonial", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "Something went wrong while saving", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6 shadow-sm w-full max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Testimonial Content</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required rows={3} placeholder="Client feedback..." className="input-field h-auto py-2 resize-none italic" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Author Name</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} required placeholder="Name" className="input-field h-11" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Author Role/Company</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} required placeholder="Role" className="input-field h-11" />
        </div>
        <div className="md:col-span-2">
          <ImageUpload 
            label="Author Image" 
            value={formData.image} 
            onChange={(url) => setFormData({ ...formData, image: url })} 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Linked Case Study (Project)</label>
          <select 
            name="projectId" 
            value={formData.projectId} 
            onChange={handleChange} 
            className="input-field h-11"
          >
            <option value="">No Project</option>
            {projects.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-3 pt-6 border-t border-border">
        <button type="submit" disabled={loading} className="btn-primary min-w-[140px]">
          {loading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
          {isEditing ? "Update Testimonial" : "Create Testimonial"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          <X size={18} className="mr-2" />
          Cancel
        </button>
      </div>
      </div>

      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </form>
  );
}
