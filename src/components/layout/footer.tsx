"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Rocket, Linkedin, Facebook, Instagram } from "lucide-react";
import { XLogo, WhatsAppIcon } from "@/components/ui/icons";
import { subscribeToNewsletter } from "@/lib/server-actions";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(data => setSettings(data));
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const visibleServices = data.filter((s: any) => s.isVisible !== false);
          setServices(visibleServices.slice(0, 5));
        }
      })
      .catch(err => console.error("Error fetching footer services:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      await subscribeToNewsletter(formData);
      setStatus("success");
      setEmail("");
      setMessage("Subscribed successfully!");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to subscribe.");
    }
  };

  return (
    <footer id="main-footer" className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Rocket className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Web<span className="text-primary">kye</span></span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {settings?.footerText || "Building the next generation of digital experiences. Innovative, fast, and professionally engineered for business growth."}
            </p>
            <div className="flex space-x-4">
              <Link href={settings?.twitter || "#"} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <XLogo size={18} />
              </Link>
              <Link href={settings?.facebook || "#"} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href={settings?.instagram || "#"} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href={settings?.linkedin || "#"} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </Link>
              <Link href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Webkye! I'm interested in your services. Can you help me?")}` : "#"} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <WhatsAppIcon size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">Services</h4>
            <ul className="space-y-4">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <Link href={`/services/${service.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
                  <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">UI/UX Design</Link></li>
                  <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mobile Apps</Link></li>
                  <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cloud Solutions</Link></li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about-us" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/blogs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/faqs" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/contact-us" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Stay updated with our latest professional insights and case studies.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                type="email"
                id="footer-newsletter-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address for newsletter"
                className="input-field"
              />
              <button 
                disabled={status === "loading"}
                className="btn-primary w-full"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
              {message && (
                <p className={`text-xs mt-2 font-medium ${status === "success" ? "text-green-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Webkye. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors font-medium">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors font-medium">Terms</Link>
            <Link href="/refund-policy" className="hover:text-primary transition-colors font-medium">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
