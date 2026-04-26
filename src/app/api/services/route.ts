import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    // console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, shortDesc, description, image, features, isVisible, metaTitle, metaDescription, metaKeywords } = body;

    // Check if slug already exists
    const existing = await prisma.service.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        shortDesc,
        description,
        image,
        features,
        isVisible,
        metaTitle,
        metaDescription,
        metaKeywords,
      },
    });

    return NextResponse.json(service);
  } catch (error: any) {
    // console.error("CRITICAL ERROR creating service:", error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug must be unique" }, { status: 400 });
    }

    if (error.code === 'P2031') {
      return NextResponse.json({ 
        error: "MongoDB Replica Set Required", 
        details: "Prisma requires MongoDB to run as a replica set for transactions. See: https://pris.ly/d/mongodb-replica-set" 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      error: "Failed to create service",
      details: error.message 
    }, { status: 500 });
  }
}
