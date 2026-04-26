"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
          <h2 className="text-2xl font-bold mb-4">A critical error occurred</h2>
          <button
            onClick={() => reset()}
            className="bg-primary text-white px-6 py-2 rounded-lg font-bold"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
