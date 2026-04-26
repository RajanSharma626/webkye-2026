import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.user.findUnique({ where: { id } });

  if (!member) notFound();

  async function updateMember(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    if (!email) return;

    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role: role || "admin",
      },
    });

    redirect("/admin/members");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Member</h1>
        <Link href="/admin/members" className="text-muted-foreground hover:text-foreground font-medium">
          Cancel
        </Link>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 md:p-8">
        <form action={updateMember} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input type="text" name="name" defaultValue={member.name || ""} className="input-field" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email *</label>
            <input type="email" name="email" required defaultValue={member.email} className="input-field" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select name="role" defaultValue={member.role} className="input-field bg-background">
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div className="pt-4 text-muted-foreground text-sm">
            <p>Note: To change password, the member must use the profile page.</p>
          </div>
          <div className="pt-4">
            <button type="submit" className="btn-primary w-full">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
