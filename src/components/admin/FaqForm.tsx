"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2 } from "lucide-react";
import Toast from "@/components/ui/toast";

export default function FaqForm({ initialData, isEditing = false }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    order: initialData?.order || 0,
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
      const url = isEditing ? `/api/faq/${initialData.id}` : "/api/faq";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setToast({ show: true, message: isEditing ? "FAQ updated!" : "FAQ created!", type: "success" });
        router.refresh();
        setTimeout(() => {
          router.push("/admin/faq");
        }, 1500);
      } else {
        const errorData = await res.json();
        setToast({ show: true, message: errorData.error || "Failed to save FAQ", type: "error" });
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
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Question</label>
          <input type="text" name="question" value={formData.question} onChange={handleChange} required placeholder="FAQ Question" className="input-field h-11" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Answer</label>
          <textarea name="answer" value={formData.answer} onChange={handleChange} required rows={4} placeholder="FAQ Answer" className="input-field h-auto py-2 resize-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Display Order</label>
          <input type="number" name="order" value={formData.order} onChange={handleChange} className="input-field h-11 w-32" />
        </div>
      </div>
      <div className="flex items-center space-x-3 pt-6 border-t border-border">
        <button type="submit" disabled={loading} className="btn-primary min-w-[140px]">
          {loading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
          {isEditing ? "Update FAQ" : "Create FAQ"}
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
