import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const faq = await prisma.faq.create({
      data: {
        question: body.question,
        answer: body.answer,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(faq);
  } catch (error: any) {
    // console.error("Error creating FAQ:", error);
    if (error.code === 'P2031') {
      return NextResponse.json({ 
        error: "MongoDB Replica Set Required", 
        details: "Prisma requires MongoDB to run as a replica set for transactions." 
      }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
