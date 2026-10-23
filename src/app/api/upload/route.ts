import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);

const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "svg",
  "avif",
]);

// Maximum file size: 4.5MB (fits comfortably within Vercel Serverless Function payload limits)
const MAX_FILE_SIZE = 4.5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. You must be logged in as an administrator to upload images." },
        { status: 401 }
      );
    }

    // 2. Environment check
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error(
        "[Upload Error] Missing BLOB_READ_WRITE_TOKEN in environment variables."
      );
      return NextResponse.json(
        {
          error:
            "Vercel Blob Storage is not configured. Please set the BLOB_READ_WRITE_TOKEN environment variable in your Vercel project settings or .env file.",
        },
        { status: 500 }
      );
    }

    // 3. Extract uploaded file from FormData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file was provided in the upload request." }, { status: 400 });
    }

    // 4. File size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds the 4.5MB limit (provided file is ${(file.size / (1024 * 1024)).toFixed(2)}MB). Please choose a smaller image.`,
        },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "Uploaded file is empty." }, { status: 400 });
    }

    // 5. MIME type & extension validation
    const mimeType = file.type?.toLowerCase();
    if (!mimeType || !ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        {
          error: `Unsupported file type (${mimeType || "unknown"}). Allowed types: JPG, PNG, WEBP, GIF, SVG, AVIF.`,
        },
        { status: 400 }
      );
    }

    const originalName = file.name || "image";
    const rawExtension = originalName.split(".").pop()?.toLowerCase() || "";
    const extension = ALLOWED_EXTENSIONS.has(rawExtension) ? rawExtension : "png";

    // 6. Generate sanitized unique filename to avoid collision or arbitrary path injection
    const sanitizedBase = originalName
      .replace(/\.[^/.]+$/, "") // strip extension
      .replace(/[^a-zA-Z0-9_-]/g, "-") // sanitize special chars
      .replace(/-+/g, "-")
      .slice(0, 60);

    const pathname = `uploads/${sanitizedBase}-${Date.now()}.${extension}`;

    // 7. Upload to Vercel Blob
    const blob = await put(pathname, file, {
      access: "public",
      contentType: mimeType,
      addRandomSuffix: true,
    });

    console.log(`[Upload Success] Uploaded image to Vercel Blob: ${blob.url}`);

    // 8. Return response expected by frontend (data.url)
    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
    });
  } catch (error: any) {
    console.error("[Upload Error] Failed to process image upload:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred while uploading the file." },
      { status: 500 }
    );
  }
}
