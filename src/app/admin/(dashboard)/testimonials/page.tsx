import React from "react";
import { prisma } from "@/lib/prisma";
import { Plus, Edit2, Quote, User } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Testimonials</h1>
          <p className="text-muted-foreground">Manage client feedback and social proof.</p>
        </div>
        <Link 
          href="/admin/testimonials/new" 
          className="btn-primary space-x-2"
        >
          <Plus size={18} />
          <span>Add Testimonial</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.length === 0 ? (
          <div className="col-span-full bg-card border border-border border-dashed rounded-xl p-20 text-center text-muted-foreground italic">
            No testimonials found. Click "Add Testimonial" to create your first one.
          </div>
        ) : (
          testimonials.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-lg p-8 relative group">
              <Quote className="text-primary/10 w-12 h-12 absolute top-6 left-6" />
              <p className="text-foreground/90 italic mb-8 relative z-10 leading-relaxed">
                "{t.content}"
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-6 border-t border-border/50">
                <Link href={`/admin/testimonials/edit/${t.id}`} className="p-2 bg-secondary rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                  <Edit2 size={16} />
                </Link>
                <DeleteButton 
                  id={t.id} 
                  endpoint="/api/testimonials" 
                  className="p-2 bg-secondary rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all" 
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
