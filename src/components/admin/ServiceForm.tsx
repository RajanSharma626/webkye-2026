"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2 } from "lucide-react";
import Editor from "./Editor";
import Modal from "@/components/ui/modal";
import Toast from "@/components/ui/toast";

interface ServiceFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
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
    shortDesc: initialData?.shortDesc || "",
    description: initialData?.description || "",
    image: initialData?.image || "Code",
    features: initialData?.features || "",
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
      setFormData((prev) => ({ ...prev, description: e }));
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
      const url = isEditing ? `/api/services/${initialData.id}` : "/api/services";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setToast({ show: true, message: isEditing ? "Service updated successfully!" : "Service created successfully!", type: "success" });
        router.refresh();
        setTimeout(() => {
          router.push("/admin/services");
        }, 1500);
      } else {
        const errorData = await res.json();
        setToast({ show: true, message: errorData.error || "Something went wrong", type: "error" });
      }
    } catch (error) {
      console.error("Error saving service:", error);
      setToast({ show: true, message: "Failed to save service", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6 shadow-sm w-full max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Service Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Web Development"
              className="input-field h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">URL Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="e.g. web-development"
              className="input-field h-11"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Short Description</label>
            <textarea
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              required
              rows={2}
              placeholder="A brief summary for the service cards..."
              className="input-field h-auto py-2 resize-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Description (Rich Text)</label>
            <div className="rounded-md border border-input overflow-hidden">
              <Editor 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Write a detailed description of the service..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Icon Type</label>
            <select
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input-field h-11 appearance-none"
            >
              <option value="Code">Code</option>
              <option value="Palette">Palette</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Globe">Globe</option>
              <option value="Cloud">Cloud</option>
              <option value="BarChart">BarChart</option>
              <option value="Layout">Layout (UI/UX)</option>
              <option value="ShoppingCart">ShoppingCart (eCommerce)</option>
              <option value="Monitor">Monitor (Website)</option>
              <option value="Users">Users (HRMS)</option>
              <option value="Wrench">Wrench (Maintenance)</option>
              <option value="Database">Database (ERP)</option>
              <option value="ShieldCheck">Shield (Security)</option>
              <option value="Search">Search (SEO)</option>
              <option value="Megaphone">Megaphone (Marketing)</option>
              <option value="Cpu">CPU (AI/Hardware)</option>
              <option value="PenTool">Pen (Graphic Design)</option>
              <option value="TrendingUp">Chart (Growth)</option>
              <option value="MessageSquare">Message (Consulting)</option>
              <option value="Video">Video (Media)</option>
              <option value="Server">Server (Hosting)</option>
              <option value="Zap">Lightning (Performance)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Features (Comma Separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="e.g. SEO, Responsive, Next.js"
              className="input-field h-11"
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
          <button
            type="submit"
            disabled={loading}
            className="btn-primary min-w-[140px]"
          >
            {loading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
            {isEditing ? "Update Service" : "Create Service"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
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
