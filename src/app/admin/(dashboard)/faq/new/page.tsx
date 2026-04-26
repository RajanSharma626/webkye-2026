import React from "react";
import FaqForm from "@/components/admin/FaqForm";

export default function NewFaqPage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New FAQ</h1>
        <p className="text-muted-foreground">Answer commonly asked questions from your clients.</p>
      </div>
      <FaqForm />
    </div>
  );
}
