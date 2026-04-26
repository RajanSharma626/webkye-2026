import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function MembersPage() {
  const members = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function deleteMember(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    // Don't delete the last admin
    const count = await prisma.user.count();
    if (count > 1) {
      await prisma.user.delete({ where: { id } });
      revalidatePath("/admin/members");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
        <Link href="/admin/members/new" className="btn-primary">
          <Plus size={18} className="mr-2" />
          Add Member
        </Link>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-secondary text-secondary-foreground font-medium border-b border-border">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-4 font-medium">{member.name || "N/A"}</td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4 capitalize">{member.role}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/members/${member.id}`} className="text-primary hover:underline font-medium">
                    Edit
                  </Link>
                  <form action={deleteMember} className="inline">
                    <input type="hidden" name="id" value={member.id} />
                    <button type="submit" className="text-red-500 hover:underline font-medium ml-3">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
