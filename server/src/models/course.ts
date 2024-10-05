import mongoose, { Schema, Document } from "mongoose";

// Define the Course interface, extending mongoose's Document
export interface ICourse extends Document {
  title: string;
  description: string;
  createdBy: string; // Admin who created the course
  isPublic: boolean; // Indicates if the course is public
  createdAt: Date; // Timestamp for when the course was created
  updatedAt: Date; // Timestamp for when the course was last updated
}

// Define the Course schema
const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true }, // Reference to the admin
    isPublic: { type: Boolean, default: false }, // Default is not public
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the Course model
export default mongoose.model<ICourse>("Course", CourseSchema);
