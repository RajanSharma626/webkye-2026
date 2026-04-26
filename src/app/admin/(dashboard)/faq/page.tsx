import React from "react";
import { prisma } from "@/lib/prisma";
import { Plus, Edit2, HelpCircle, GripVertical } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminFAQPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: "asc" },
  });


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage FAQ</h1>
          <p className="text-muted-foreground">Add and organize frequently asked questions.</p>
        </div>
        <Link 
          href="/admin/faq/new" 
          className="btn-primary space-x-2"
        >
          <Plus size={18} />
          <span>Add FAQ</span>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-8 space-y-4">
          {faqs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground italic">
              No FAQs found. Click "Add FAQ" to get started.
            </div>
          ) : (
            faqs.map((faq) => (
              <div key={faq.id} className="flex items-start space-x-4 p-6 bg-secondary/30 rounded-lg border border-border group hover:border-primary/50 transition-all">
                <div className="mt-1 text-muted-foreground cursor-move group-hover:text-primary transition-colors">
                  <GripVertical size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <HelpCircle size={18} className="mr-2 text-primary" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link href={`/admin/faq/edit/${faq.id}`} className="p-2 bg-card rounded-xl text-primary hover:bg-primary hover:text-white transition-all border border-border shadow-sm">
                    <Edit2 size={16} />
                  </Link>
                  <DeleteButton 
                    id={faq.id} 
                    endpoint="/api/faq" 
                    className="p-2 bg-card rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all border border-border shadow-sm" 
                  />
                </div>
              </div>

            ))
          )}
        </div>
      </div>
    </div>
  );
}
