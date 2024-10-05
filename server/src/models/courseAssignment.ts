import mongoose, { Schema, Document } from "mongoose";

export interface IUserCourseAssignment extends Document {
  userId: string;
  courseId: string;
  assignedBy: string;
  assignedAt: Date;
}

const UserCourseAssignmentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

export default mongoose.model<IUserCourseAssignment>(
  "UserCourseAssignment",
  UserCourseAssignmentSchema
);
