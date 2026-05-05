import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename, aggressively stripping special characters and commas
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").replace(/-+/g, "-");
    const filename = `${Date.now()}-${safeName}`;
    
    // Use UPLOAD_DIR env var if present, otherwise fallback to process.cwd()/public/uploads
    // This fixes issues where PM2 or Next.js infers the wrong root directory
    const uploadDir = process.env.UPLOAD_DIR 
      ? process.env.UPLOAD_DIR 
      : path.join(process.cwd(), "public", "uploads");
    
    console.log(`[Upload Debug] Attempting to save file to absolute path: ${uploadDir}/${filename}`);
    
    // Ensure directory exists with robust error handling
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
      } catch (err) {
        console.error("Error creating upload directory:", err);
        return NextResponse.json({ error: "Failed to create upload directory. Check server folder permissions." }, { status: 500 });
      }
    }

    const filePath = path.join(uploadDir, filename);
    
    try {
      await writeFile(filePath, buffer);
    } catch (err) {
      console.error("Error writing file:", err);
      return NextResponse.json({ error: "Failed to save file. Check server folder permissions." }, { status: 500 });
    }
    
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file due to an internal server error." }, { status: 500 });
  }
}
