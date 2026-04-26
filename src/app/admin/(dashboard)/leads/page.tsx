import React from "react";
import { prisma } from "@/lib/prisma";
import { Mail, Calendar, User, MessageSquare } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contact Leads</h1>
          <p className="text-muted-foreground">View and manage form submissions from your website.</p>
        </div>
        <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold">
          {leads.length} Total Leads
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">User</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Subject</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Message</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">
                    No leads found in the database.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="font-bold">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-medium">{lead.subject || "No Subject"}</span>
                    </td>
                    <td className="px-8 py-6 max-w-xs">
                      <p className="text-sm text-muted-foreground line-clamp-2">{lead.message}</p>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <button className="text-primary hover:underline text-sm font-bold">View</button>
                        <DeleteButton 
                          id={lead.id} 
                          endpoint="/api/leads" 
                          className="text-red-500 hover:text-red-400" 
                          iconSize={16} 
                        />
                      </div>
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

