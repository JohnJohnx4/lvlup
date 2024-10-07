import mongoose, { Schema, Document } from "mongoose";

export interface IModule extends Document {
  title: string;
  description: string;
  courseId: string;
  type: "text" | "file" | "image" | "video";
  pointValue: number;
  createdAt: Date;
}

const ModuleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    type: {
      type: String,
      enum: ["text", "file", "image", "video"],
      required: true,
    },
    pointValue: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Module = mongoose.model<IModule>("Module", ModuleSchema);
