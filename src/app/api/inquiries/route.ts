import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Inquiry from "@/models/Inquiry";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, phone, eventDate, serviceType, message } = body;

    if (!name || !email || !phone || !eventDate || !serviceType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const inquiry = await Inquiry.create({ name, email, phone, eventDate, serviceType, message });
    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (err) {
    console.error("Inquiry POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ inquiries });
  } catch (err) {
    console.error("Inquiry GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
