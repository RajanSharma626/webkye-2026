import React from "react";
import { prisma } from "@/lib/prisma";
import ServiceForm from "@/components/admin/ServiceForm";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Service</h1>
        <p className="text-muted-foreground">Modify the details of your service: {service.title}</p>
      </div>
      <ServiceForm initialData={service} isEditing={true} />
    </div>
  );
}
