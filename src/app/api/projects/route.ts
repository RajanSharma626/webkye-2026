import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        description: body.description || "",
        content: body.content,
        image: body.image,
        tags: body.tags,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        metaKeywords: body.metaKeywords,
        testimonialId: body.testimonialId || null,
      },
    });
    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Error creating project:", error);
    if (error.code === 'P2031') {
      return NextResponse.json({ 
        error: "MongoDB Replica Set Required", 
        details: "Prisma requires MongoDB to run as a replica set for transactions." 
      }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
