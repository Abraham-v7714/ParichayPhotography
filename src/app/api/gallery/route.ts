import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import GalleryImage from "@/models/GalleryImage";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, category, dataUri } = body;

    if (!title || !category || !dataUri) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "parichay-photography",
      resource_type: "image",
      quality: "auto",
      fetch_format: "auto",
    });

    const image = await GalleryImage.create({
      title,
      category,
      cloudinaryId: result.public_id,
      cloudinaryUrl: result.secure_url,
      width: result.width,
      height: result.height,
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (err) {
    console.error("Gallery upload error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const images = await GalleryImage.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ images });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
