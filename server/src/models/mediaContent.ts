import mongoose, { Schema, Document } from "mongoose";

export interface IMediaContent extends Document {
  url: string;
  moduleId: string;
  type: "file" | "image" | "video";
  pointValue: number;
  createdAt: Date;
}

const MediaContentSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    type: { type: String, enum: ["file", "image", "video"], required: true },
    pointValue: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMediaContent>(
  "MediaContent",
  MediaContentSchema
);
