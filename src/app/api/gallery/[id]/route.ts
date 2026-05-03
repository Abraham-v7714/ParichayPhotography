import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import GalleryImage from "@/models/GalleryImage";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const img = await GalleryImage.findById(params.id);
    if (!img) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Remove from Cloudinary
    await cloudinary.uploader.destroy(img.cloudinaryId);
    await GalleryImage.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
