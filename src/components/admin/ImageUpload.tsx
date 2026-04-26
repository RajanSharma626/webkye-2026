"use client";

import React, { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24 rounded-xl border-2 border-dashed border-border bg-secondary/30 overflow-hidden flex items-center justify-center group">
          {value ? (
            <>
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-cover"
                loading="lazy"
                quality={65}
                sizes="96px"
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </>
          ) : (
            <ImageIcon className="text-muted-foreground" size={24} />
          )}
        </div>

        <div className="flex-1">
          <label className="cursor-pointer">
            <div className="flex items-center space-x-2 px-4 py-2.5 bg-secondary hover:bg-border border border-border rounded-xl text-sm font-bold transition-all w-fit">
              {uploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              <span>{uploading ? "Uploading..." : "Upload Image"}</span>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          <p className="text-[10px] text-muted-foreground mt-2">
            Recommended: JPG, PNG, WEBP (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}
