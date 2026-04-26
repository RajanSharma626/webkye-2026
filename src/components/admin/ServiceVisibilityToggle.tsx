"use client";

import React, { useTransition } from "react";
import { toggleServiceVisibility } from "@/lib/server-actions";

export default function ServiceVisibilityToggle({ id, initialVisible }: { id: string, initialVisible: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleServiceVisibility(id, !initialVisible);
    });
  };

  return (
    <div className="flex items-center space-x-2 bg-secondary px-3 py-1.5 rounded-md">
      <span className={`text-[10px] font-bold uppercase tracking-wider ${initialVisible ? 'text-primary' : 'text-muted-foreground'}`}>
        {initialVisible ? "Visible" : "Hidden"}
      </span>
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${
          initialVisible ? 'bg-primary' : 'bg-muted-foreground/30'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            initialVisible ? 'translate-x-4' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
