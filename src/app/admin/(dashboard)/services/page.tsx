import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, Code, Palette, Smartphone, Globe, Cloud, BarChart, Layout, ShoppingCart, Monitor, Users, Wrench, Database, ShieldCheck, Search, Megaphone, Cpu, PenTool, TrendingUp, MessageSquare, Video, Server, Zap } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

import ServiceVisibilityToggle from "@/components/admin/ServiceVisibilityToggle";

const iconMap: Record<string, any> = {
  Code: <Code size={18} />,
  Palette: <Palette size={18} />,
  Smartphone: <Smartphone size={18} />,
  Globe: <Globe size={18} />,
  Cloud: <Cloud size={18} />,
  BarChart: <BarChart size={18} />,
  Layout: <Layout size={18} />,
  ShoppingCart: <ShoppingCart size={18} />,
  Monitor: <Monitor size={18} />,
  Users: <Users size={18} />,
  Wrench: <Wrench size={18} />,
  Database: <Database size={18} />,
  ShieldCheck: <ShieldCheck size={18} />,
  Search: <Search size={18} />,
  Megaphone: <Megaphone size={18} />,
  Cpu: <Cpu size={18} />,
  PenTool: <PenTool size={18} />,
  TrendingUp: <TrendingUp size={18} />,
  MessageSquare: <MessageSquare size={18} />,
  Video: <Video size={18} />,
  Server: <Server size={18} />,
  Zap: <Zap size={18} />,
};

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Services</h1>
          <p className="text-muted-foreground">Add, edit or remove services offered by Webkye.</p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="btn-primary space-x-2"
        >
          <Plus size={18} />
          <span>Add Service</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length === 0 ? (
          <div className="col-span-full bg-card border border-border border-dashed rounded-xl p-20 text-center text-muted-foreground italic">
            No services found. Click "Add Service" to create your first one.
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="bg-card border border-border rounded-lg p-8 relative group">
              <div className="absolute top-6 right-6 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/admin/services/edit/${service.id}`} className="p-2 bg-secondary rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                  <Edit2 size={16} />
                </Link>
                <DeleteButton 
                  id={service.id} 
                  endpoint="/api/services" 
                  className="p-2 bg-secondary rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all" 
                />
              </div>

              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {iconMap[service.image || "Code"]}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                {service.shortDesc || service.description}
              </p>
              <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span>{service.features?.split(",").length || 0} Features</span>
                <ServiceVisibilityToggle id={service.id} initialVisible={service.isVisible} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
