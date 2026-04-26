import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author,
        image: body.image,
        category: body.category,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        metaKeywords: body.metaKeywords,
      },
    });
    return NextResponse.json(blog);
  } catch (error: any) {
    // console.error("Error creating blog:", error);
    if (error.code === 'P2031') {
      return NextResponse.json({ 
        error: "MongoDB Replica Set Required", 
        details: "Prisma requires MongoDB to run as a replica set for transactions." 
      }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
