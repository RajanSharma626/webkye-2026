import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        content: body.content,
        author: body.author,
        role: body.role,
        image: body.image,
        projectId: body.projectId || null,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error: any) {
    // console.error("Error creating testimonial:", error);
    if (error.code === 'P2031') {
      return NextResponse.json({ 
        error: "MongoDB Replica Set Required", 
        details: "Prisma requires MongoDB to run as a replica set for transactions." 
      }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
