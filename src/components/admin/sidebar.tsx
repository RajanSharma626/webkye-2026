"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  FileText, 
  Users, 
  Quote,
  Mail,
  HelpCircle,
  Settings,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { name: "Leads", href: "/admin/leads", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Rocket className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Webkye Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = item.href === "/admin" 
            ? pathname === "/admin" 
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border">
        <Link 
          href="/admin/settings" 
          className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
            pathname === "/admin/settings" 
              ? "bg-primary text-white shadow-lg shadow-primary/20" 
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
