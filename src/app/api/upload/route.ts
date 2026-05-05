import { access, mkdir, writeFile } from "fs/promises";
import { constants as fsConstants } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").replace(/-+/g, "-");
    const filename = `${Date.now()}-${safeName}`;

    const configuredUploadDir = process.env.UPLOAD_DIR?.trim();
    const uploadDir = configuredUploadDir
      ? path.resolve(configuredUploadDir)
      : path.join(process.cwd(), "public", "uploads");

    const filePath = path.join(uploadDir, filename);
    console.log(`[Upload Debug] Attempting to save file to absolute path: ${filePath}`);

    await mkdir(uploadDir, { recursive: true });

    try {
      await access(uploadDir, fsConstants.W_OK);
    } catch (permissionError) {
      console.error("[Upload Error] Upload directory is not writable", {
        uploadDir,
        permissionError,
      });
      return NextResponse.json(
        { error: "Upload directory is not writable. Check server folder permissions." },
        { status: 500 }
      );
    }

    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("[Upload Error] Failed to process file upload", error);
    return NextResponse.json(
      { error: "Failed to upload file due to an internal server error." },
      { status: 500 }
    );
  }
}
