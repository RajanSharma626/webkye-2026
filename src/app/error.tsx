"use client";

import { useEffect } from "react";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Something went wrong!</h2>
      <p className="text-xl text-muted-foreground max-w-md mb-12">
        An unexpected error occurred. Our team has been notified and is working on it.
      </p>
      <button
        onClick={() => reset()}
        className="btn-gradient px-8 py-4 rounded-full text-lg font-bold transition-all"
      >
        Try again
      </button>
    </div>
  );
}
