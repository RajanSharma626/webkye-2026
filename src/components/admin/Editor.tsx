"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the CKEditorContent component with SSR disabled
const CKEditorContent = dynamic(() => import("./CKEditorContent"), {
  ssr: false,
  loading: () => (
    <div className="h-40 bg-secondary/20 animate-pulse rounded-xl flex items-center justify-center text-muted-foreground">
      Loading editor...
    </div>
  ),
});

export default function Editor({ value, onChange, placeholder }: { 
  value: string; 
  onChange: (data: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="prose prose-sm max-w-none">
      <CKEditorContent 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
      />
      <style jsx global>{`
        .ck-editor__editable_inline {
          min-height: 200px;
          border-bottom-left-radius: 1rem !important;
          border-bottom-right-radius: 1rem !important;
          background-color: transparent !important;
          color: inherit !important;
        }
        .ck-toolbar {
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
          background-color: var(--secondary) !important;
          border-color: var(--border) !important;
        }
        .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
          border-color: var(--border) !important;
        }
        .ck.ck-editor__main>.ck-editor__editable.ck-focused {
          border-color: var(--primary) !important;
        }
        .ck-reset_all, .ck-reset_all * {
          color: hsl(var(--foreground)) !important;
        }
        .ck-content {
          color: hsl(var(--foreground)) !important;
        }
        .ck-toolbar__items {
          background-color: var(--secondary) !important;
        }
        .ck-button:hover {
          background-color: var(--border) !important;
        }
      `}</style>
    </div>
  );
}
