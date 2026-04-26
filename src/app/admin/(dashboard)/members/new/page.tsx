import React from "react";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import bcrypt from "bcrypt";

export default function NewMemberPage() {
  async function createMember(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!email || !password) return;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "admin",
      },
    });

    redirect("/admin/members");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add New Member</h1>
        <Link href="/admin/members" className="text-muted-foreground hover:text-foreground font-medium">
          Cancel
        </Link>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 md:p-8">
        <form action={createMember} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input type="text" name="name" className="input-field" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email *</label>
            <input type="email" name="email" required className="input-field" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password *</label>
            <input type="password" name="password" required className="input-field" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select name="role" className="input-field bg-background">
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div className="pt-4">
            <button type="submit" className="btn-primary w-full">
              Create Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
