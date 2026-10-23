import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

// Load environment variables from .env
dotenv.config();

const prisma = new PrismaClient();

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

if (!blobToken) {
  console.error("❌ Error: Missing BLOB_READ_WRITE_TOKEN in environment variables.");
  console.error("Please ensure BLOB_READ_WRITE_TOKEN is set in your .env file or exported in your shell.");
  console.error("Example: BLOB_READ_WRITE_TOKEN=\"vercel_blob_rw_...\" npx tsx scripts/migrate-to-vercel-blob.ts");
  process.exit(1);
}

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

async function main() {
  console.log("==================================================");
  console.log("🚀 Starting Safe Migration: Local -> Vercel Blob");
  console.log("==================================================");

  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadsDir)) {
    console.log(`ℹ️ No local "public/uploads" directory found at ${uploadsDir}.`);
    return;
  }

  const files = fs.readdirSync(uploadsDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return !file.startsWith(".") && ext in MIME_MAP;
  });

  console.log(`📁 Found ${files.length} image files in public/uploads/`);

  // Map to store: "/uploads/filename" -> "https://...public.blob.vercel-storage.com/..."
  const urlMap = new Map<string, string>();

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const ext = path.extname(file).toLowerCase();
    const contentType = MIME_MAP[ext] || "application/octet-stream";
    const localUrl = `/uploads/${file}`;

    console.log(`\n⬆️  Uploading "${file}" (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)...`);

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const blob = await put(`uploads/${file}`, fileBuffer, {
        access: "public",
        contentType,
        token: blobToken,
        // We set addRandomSuffix: false to keep the filename clean and predictable,
        // or allow overwrite if re-running.
        addRandomSuffix: false,
      });

      urlMap.set(localUrl, blob.url);
      console.log(`   ✅ Blob URL: ${blob.url}`);
    } catch (err: any) {
      console.error(`   ❌ Failed to upload "${file}":`, err?.message || err);
    }
  }

  console.log("\n--------------------------------------------------");
  console.log("🔄 Updating database records with new Blob URLs...");
  console.log("--------------------------------------------------");

  let updatedCount = 0;

  // 1. Update Projects
  const projects = await prisma.project.findMany();
  for (const project of projects) {
    if (project.image && urlMap.has(project.image)) {
      const newUrl = urlMap.get(project.image)!;
      await prisma.project.update({
        where: { id: project.id },
        data: { image: newUrl },
      });
      console.log(`   [Project] "${project.title}": ${project.image} ➔ ${newUrl}`);
      updatedCount++;
    }
  }

  // 2. Update Blogs
  const blogs = await prisma.blog.findMany();
  for (const blog of blogs) {
    if (blog.image && urlMap.has(blog.image)) {
      const newUrl = urlMap.get(blog.image)!;
      await prisma.blog.update({
        where: { id: blog.id },
        data: { image: newUrl },
      });
      console.log(`   [Blog] "${blog.title}": ${blog.image} ➔ ${newUrl}`);
      updatedCount++;
    }
  }

  // 3. Update Testimonials
  const testimonials = await prisma.testimonial.findMany();
  for (const testimonial of testimonials) {
    if (testimonial.image && urlMap.has(testimonial.image)) {
      const newUrl = urlMap.get(testimonial.image)!;
      await prisma.testimonial.update({
        where: { id: testimonial.id },
        data: { image: newUrl },
      });
      console.log(`   [Testimonial] "${testimonial.author}": ${testimonial.image} ➔ ${newUrl}`);
      updatedCount++;
    }
  }

  // 4. Update Services
  const services = await prisma.service.findMany();
  for (const service of services) {
    if (service.image && urlMap.has(service.image)) {
      const newUrl = urlMap.get(service.image)!;
      await prisma.service.update({
        where: { id: service.id },
        data: { image: newUrl },
      });
      console.log(`   [Service] "${service.title}": ${service.image} ➔ ${newUrl}`);
      updatedCount++;
    }
  }

  console.log("\n==================================================");
  console.log(`🎉 Migration finished! Total database records updated: ${updatedCount}`);
  console.log("Note: Original files in public/uploads were NOT modified or deleted.");
  console.log("==================================================");
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
