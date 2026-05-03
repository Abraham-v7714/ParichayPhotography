import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  serviceType: string;
  message?: string;
  createdAt: Date;
  status: "new" | "contacted" | "booked" | "closed";
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    eventDate: { type: String, required: true },
    serviceType: { type: String, required: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "booked", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
