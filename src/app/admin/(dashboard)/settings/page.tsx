"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, Globe, Mail, Phone, MapPin, Twitter, Linkedin, FileText, Facebook, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/toast";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    whatsapp: "",
    footerText: "",
  });
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data) {
        setFormData({
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          twitter: data.twitter || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          linkedin: data.linkedin || "",
          whatsapp: data.whatsapp || "",
          footerText: data.footerText || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setToast({ show: true, message: "Settings updated successfully!", type: "success" });
        router.refresh();
      } else {
        const data = await res.json();
        setToast({ show: true, message: data.error || "Failed to update settings.", type: "error" });
      }
    } catch (error) {
      console.error("Failed to update settings:", error);
      setToast({ show: true, message: "An unexpected error occurred.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
        <p className="text-muted-foreground">Manage your contact information, social links, and global site content.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center gap-3">
            <Globe size={18} className="text-primary" />
            <h2 className="font-bold text-sm uppercase tracking-wider">Contact Information</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Mail size={12} /> Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="hello@example.com" 
                className="input-field h-11" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Phone size={12} /> Phone Number
              </label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+1 (555) 000-0000" 
                className="input-field h-11" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <MapPin size={12} /> Office Address
              </label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="123 Street Name, City, Country" 
                className="input-field h-11" 
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center gap-3">
            <Twitter size={18} className="text-primary" />
            <h2 className="font-bold text-sm uppercase tracking-wider">Social Presence</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Twitter size={12} /> Twitter (X) URL
              </label>
              <input 
                type="text" 
                name="twitter" 
                value={formData.twitter} 
                onChange={handleChange} 
                placeholder="https://twitter.com/username" 
                className="input-field h-11" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Facebook size={12} /> Facebook URL
              </label>
              <input 
                type="text" 
                name="facebook" 
                value={formData.facebook} 
                onChange={handleChange} 
                placeholder="https://facebook.com/username" 
                className="input-field h-11" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Instagram size={12} /> Instagram URL
              </label>
              <input 
                type="text" 
                name="instagram" 
                value={formData.instagram} 
                onChange={handleChange} 
                placeholder="https://instagram.com/username" 
                className="input-field h-11" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Linkedin size={12} /> LinkedIn URL
              </label>
              <input 
                type="text" 
                name="linkedin" 
                value={formData.linkedin} 
                onChange={handleChange} 
                placeholder="https://linkedin.com/in/username" 
                className="input-field h-11" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Globe size={12} /> WhatsApp (Number)
              </label>
              <input 
                type="text" 
                name="whatsapp" 
                value={formData.whatsapp} 
                onChange={handleChange} 
                placeholder="+15550000000" 
                className="input-field h-11" 
              />
            </div>
          </div>
        </div>

        {/* Global Content */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center gap-3">
            <FileText size={18} className="text-primary" />
            <h2 className="font-bold text-sm uppercase tracking-wider">Footer Content</h2>
          </div>
          <div className="p-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Footer "About" Text</label>
              <textarea 
                name="footerText" 
                value={formData.footerText} 
                onChange={handleChange} 
                rows={4} 
                placeholder="Describe your company for the footer..." 
                className="input-field h-auto py-3 resize-none" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saving} 
            className="btn-primary min-w-[200px] h-12 text-base shadow-xl shadow-primary/20"
          >
            {saving ? <Loader2 size={20} className="animate-spin mr-2" /> : <Save size={20} className="mr-2" />}
            Save All Settings
          </button>
        </div>
      </form>

      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </div>
  );
}
