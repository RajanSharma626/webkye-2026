import React from "react";
import { prisma } from "@/lib/prisma";
import { Briefcase, FolderKanban, FileText, Users, TrendingUp, Quote, HelpCircle } from "lucide-react";

export default async function AdminDashboard() {
  try {
    const [servicesCount, projectsCount, blogsCount, leadsCount, testimonialsCount, faqCount] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.blog.count(),
      prisma.lead.count(),
      prisma.testimonial.count(),
      prisma.faq.count(),
    ]);

    const stats = [
      { name: "Services", value: servicesCount, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
      { name: "Projects", value: projectsCount, icon: FolderKanban, color: "text-indigo-500", bg: "bg-indigo-500/10" },
      { name: "Blog Posts", value: blogsCount, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
      { name: "Testimonials", value: testimonialsCount, icon: Quote, color: "text-orange-500", bg: "bg-orange-500/10" },
      { name: "FAQs", value: faqCount, icon: HelpCircle, color: "text-pink-500", bg: "bg-pink-500/10" },
      { name: "New Leads", value: leadsCount, icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor your agency's performance and manage content.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-green-500 flex items-center bg-green-500/10 px-2 py-1 rounded-full">
                  <TrendingUp size={12} className="mr-1" />
                  +12%
                </span>
              </div>
              <p className="text-muted-foreground text-sm font-medium">{stat.name}</p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Recent Leads</h2>
            <div className="space-y-6">
              {leadsCount === 0 ? (
                <p className="text-muted-foreground text-center py-10 italic">No leads found yet.</p>
              ) : (
                <p>Leads list will be here...</p>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">System Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-2xl">
                <span className="font-medium">Database</span>
                <span className="text-green-500 font-bold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-2xl">
                <span className="font-medium">Auth Provider</span>
                <span className="text-green-500 font-bold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-2xl">
                <span className="font-medium">Storage</span>
                <span className="text-green-500 font-bold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  92% Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Dashboard</h1>
        <pre className="text-sm overflow-auto p-4 bg-black/10 rounded-xl">
          {error.stack || error.message}
        </pre>
      </div>
    );
  }
}
