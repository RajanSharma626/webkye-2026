import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        content: body.content,
        author: body.author,
        role: body.role,
        image: body.image,
        projectId: body.projectId || null,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ message: "Testimonial deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
