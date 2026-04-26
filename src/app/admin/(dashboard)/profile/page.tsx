import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Lock } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  async function updatePassword(formData: FormData) {
    "use server";
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      throw new Error("New passwords do not match.");
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return;

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account security.</p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center gap-3">
          <Lock size={18} className="text-primary" />
          <h2 className="font-bold text-sm uppercase tracking-wider">Change Password</h2>
        </div>
        
        <form action={updatePassword} className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <input 
              type="password" 
              name="currentPassword" 
              required 
              className="input-field" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              required 
              minLength={6}
              className="input-field" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              required 
              minLength={6}
              className="input-field" 
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="btn-primary w-full">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
