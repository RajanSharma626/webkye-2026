"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Facebook, Instagram, Linkedin } from "lucide-react";
import { XLogo, WhatsAppIcon } from "@/components/ui/icons";
import Link from "next/link";
import { submitLead } from "@/lib/server-actions";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(data => setSettings(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("subject", formData.subject);
      formDataObj.append("message", formData.message);
      
      await submitLead(formDataObj);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-foreground">
                Partner with <span className="text-primary">Professionals</span>.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Have a vision for your next digital product? Our team of engineers and designers is ready to help you build something exceptional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 pt-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-foreground">Email</p>
                  <p className="text-base text-muted-foreground">{settings?.email || "hello@webkye.com"}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <WhatsAppIcon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-foreground">WhatsApp</p>
                  <p className="text-base text-muted-foreground">{settings?.whatsapp || "+91 9310468455"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-foreground">Location</p>
                  <p className="text-base text-muted-foreground">{settings?.address || "123 Innovation Way, Tech City, TC 12345"}</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Connect with us</p>
              <div className="flex gap-4">
                <Link href={settings?.twitter || "#"} target="_blank" aria-label="Connect on Twitter" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <XLogo size={18} />
                </Link>
                <Link href={settings?.facebook || "#"} target="_blank" aria-label="Connect on Facebook" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <Facebook size={18} />
                </Link>
                <Link href={settings?.instagram || "#"} target="_blank" aria-label="Connect on Instagram" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <Instagram size={18} />
                </Link>
                <Link href={settings?.linkedin || "#"} target="_blank" aria-label="Connect on LinkedIn" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <Linkedin size={18} />
                </Link>
                <Link href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Webkye! I'm interested in your services. Can you help me?")}` : "#"} target="_blank" aria-label="Connect on WhatsApp" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <WhatsAppIcon size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 md:p-10 shadow-sm relative">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Message Received</h2>
                  <p className="text-muted-foreground text-base max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. A professional from our team will contact you within one business day.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-field h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input-field h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                  <input
                    required
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="input-field h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    className="input-field h-auto py-3 resize-none"
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn-primary w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
