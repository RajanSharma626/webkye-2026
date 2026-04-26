"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Leads
export async function submitLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  await prisma.lead.create({
    data: { name, email, subject, message },
  });

  revalidatePath("/admin/leads");
}

// Services
export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
}

// Blogs
export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blogs");
}

// Projects
export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

// Newsletter
export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  try {
    await prisma.newsletter.create({
      data: { email },
    });
    revalidatePath("/admin/newsletter");
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error("Email already exists");
    }
    throw error;
  }
}

// Generic Slug Generator
export async function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
