"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowLeft, Home, Search } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-20 mt-20">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative inline-block mb-12"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-secondary flex items-center justify-center mx-auto border border-border shadow-2xl">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Rocket className="w-16 h-16 md:w-20 md:h-20 text-primary" />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 -right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
            >
              404 Error
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-foreground">
              Page <span className="text-primary">Not Found</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto font-medium">
              We&apos;re sorry, but the page you were looking for doesn&apos;t exist or has been moved to a new galaxy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/" 
              className="btn-primary h-12 px-8 flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="h-12 px-8 rounded-md border border-border bg-background hover:bg-secondary text-foreground font-bold transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-2 text-muted-foreground"
          >
            <Search size={14} />
            <p className="text-sm font-medium">
              Try checking the URL or navigating through our services.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
