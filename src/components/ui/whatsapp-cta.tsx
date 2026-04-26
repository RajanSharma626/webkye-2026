"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./icons";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhatsAppCTA() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      })
      .catch(err => console.error("WhatsApp CTA Settings Fetch Error:", err));

    // Show the popup message after another delay
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    // Observe footer to avoid covering content
    const footer = document.getElementById("main-footer");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footer) observer.observe(footer);

    return () => {
      clearTimeout(popupTimer);
      if (footer) observer.unobserve(footer);
    };
  }, [pathname]);

  if (pathname?.startsWith("/admin") || isFooterVisible) return null;

  const whatsappNumber = settings?.whatsapp && settings.whatsapp !== "#" 
    ? settings.whatsapp 
    : "+919310468455"; // Fallback number

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Webkye! I'm interested in your services. Can you help me?")}`;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
        {/* Popup Message */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="pointer-events-auto relative bg-background border border-border rounded-xl p-4 shadow-2xl max-w-[240px] mb-2 hidden md:block"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close message"
              >
                <X size={14} />
              </button>
              <div className="pr-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">We're Online!</p>
                <p className="text-sm text-foreground font-medium leading-relaxed">
                  Have a question? Chat with our team on WhatsApp for instant support.
                </p>
              </div>
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-background border-r border-b border-border rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="pointer-events-auto relative group"
        >
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all"
            aria-label="Chat on WhatsApp"
          >
            <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            <WhatsAppIcon size={30} className="relative z-10" />
            
            {/* Tooltip for mobile or when popup is closed */}
            {!showPopup && (
              <span className="absolute right-full mr-4 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Chat with us
              </span>
            )}
          </motion.a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
