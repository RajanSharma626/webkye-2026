import React from "react";
import { prisma } from "@/lib/prisma";
import FaqForm from "@/components/admin/FaqForm";
import { notFound } from "next/navigation";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit FAQ</h1>
        <p className="text-muted-foreground">Modify this frequently asked question.</p>
      </div>
      <FaqForm initialData={faq} isEditing={true} />
    </div>
  );
}
