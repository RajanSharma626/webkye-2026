import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.setting.findFirst();
    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.setting.create({
        data: {
          email: "hello@webkye.com",
          phone: "+1 (555) 000-0000",
          address: "123 Innovation Way, Tech City, TC 12345",
          twitter: "#",
          facebook: "#",
          instagram: "#",
          linkedin: "#",
          whatsapp: "#",
          footerText: "Building the next generation of digital experiences. Innovative, fast, and professionally engineered for business growth.",
        },
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.setting.findFirst();

    let settings;
    if (existing) {
      settings = await prisma.setting.update({
        where: { id: existing.id },
        data: {
          email: body.email,
          phone: body.phone,
          address: body.address,
          twitter: body.twitter,
          facebook: body.facebook,
          instagram: body.instagram,
          linkedin: body.linkedin,
          whatsapp: body.whatsapp,
          footerText: body.footerText,
        },
      });
    } else {
      settings = await prisma.setting.create({
        data: {
          email: body.email,
          phone: body.phone,
          address: body.address,
          twitter: body.twitter,
          facebook: body.facebook,
          instagram: body.instagram,
          linkedin: body.linkedin,
          whatsapp: body.whatsapp,
          footerText: body.footerText,
        },
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
