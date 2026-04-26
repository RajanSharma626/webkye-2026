import React from "react";
import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Service</h1>
        <p className="text-muted-foreground">Create a new service to showcase on your website.</p>
      </div>
      <ServiceForm />
    </div>
  );
}
