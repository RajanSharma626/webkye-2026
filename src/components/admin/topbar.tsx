"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, User, Bell } from "lucide-react";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-20 bg-card border-b border-border flex items-center justify-between px-8">
      <h2 className="text-xl font-bold">Welcome, {session?.user?.name || "Admin"}</h2>
      
      <div className="flex items-center space-x-6">
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card" />
        </button>
        
        <div className="flex items-center space-x-3 border-l border-border pl-6">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <User size={20} className="text-muted-foreground" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-bold">{session?.user?.name || "Admin User"}</p>
            <p className="text-xs text-muted-foreground capitalize">{session?.user?.role || "Administrator"}</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="ml-4 p-2 text-muted-foreground hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
