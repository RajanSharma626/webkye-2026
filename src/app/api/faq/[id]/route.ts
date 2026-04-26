import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const faq = await prisma.faq.findUnique({ where: { id } });
    if (!faq) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const faq = await prisma.faq.update({
      where: { id },
      data: {
        question: body.question,
        answer: body.answer,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.faq.delete({ where: { id } });
    return NextResponse.json({ message: "FAQ deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
