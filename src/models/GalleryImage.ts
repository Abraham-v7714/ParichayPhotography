import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryImage extends Document {
  title: string;
  category: "wedding" | "portrait" | "fashion" | "product" | "baby" | "candid";
  cloudinaryId: string;
  cloudinaryUrl: string;
  width: number;
  height: number;
  featured: boolean;
  order: number;
  createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["wedding", "portrait", "fashion", "product", "baby", "candid"],
    },
    cloudinaryId: { type: String, required: true },
    cloudinaryUrl: { type: String, required: true },
    width: { type: Number, default: 800 },
    height: { type: Number, default: 600 },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);

export default GalleryImage;
