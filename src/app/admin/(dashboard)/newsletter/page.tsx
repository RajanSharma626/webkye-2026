import React from "react";
import { prisma } from "@/lib/prisma";
import { Mail, Calendar, Download } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">Manage your mailing list and export data.</p>
        </div>
        <button className="bg-secondary text-foreground px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-secondary/80 transition-colors border border-border">
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Email Address</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Joined Date</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-muted-foreground italic">
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Mail size={18} />
                        </div>
                        <span className="font-bold">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-muted-foreground">
                       <div className="flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 bg-green-500/10 rounded-full text-xs font-bold text-green-500 uppercase">
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <DeleteButton 
                        id={sub.id} 
                        endpoint="/api/newsletter" 
                        className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors" 
                        iconSize={18} 
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

