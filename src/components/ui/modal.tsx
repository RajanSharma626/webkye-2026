"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";

type ModalType = "confirm" | "alert" | "success" | "error";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "confirm",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const icons = {
    confirm: <AlertTriangle className="text-yellow-500" size={32} />,
    alert: <Info className="text-blue-500" size={32} />,
    success: <CheckCircle2 className="text-green-500" size={32} />,
    error: <AlertCircle className="text-red-500" size={32} />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card border border-border rounded-[2.5rem] shadow-2xl p-8 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 rounded-3xl bg-secondary">
                {icons[type]}
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {message}
              </p>

              <div className="flex items-center space-x-3 w-full">
                {type === "confirm" && (
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-secondary border border-border rounded-2xl font-bold hover:bg-border transition-all"
                  >
                    {cancelText}
                  </button>
                )}
                <button
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                  className={`flex-1 px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${
                    type === "error" ? "bg-red-500 text-white hover:bg-red-600" :
                    type === "success" ? "bg-green-500 text-white hover:bg-green-600" :
                    "btn-gradient"
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
