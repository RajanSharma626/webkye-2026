"use client";

import React, { useEffect } from "react";
import { CheckCircle, XCircle, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  show: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ show, message, type = "success", onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <XCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  const bgColors = {
    success: "bg-green-500/10 border-green-500/20",
    error: "bg-red-500/10 border-red-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={cn(
            "fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md min-w-[300px]",
            bgColors[type]
          )}
        >
          <div className="flex-shrink-0">{icons[type]}</div>
          <p className="flex-1 text-sm font-medium text-foreground">{message}</p>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
