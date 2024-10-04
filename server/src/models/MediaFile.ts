import mongoose from "mongoose";

const mediaFileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, required: true },
  pointValue: { type: Number, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const MediaFile = mongoose.model("MediaFile", mediaFileSchema);
