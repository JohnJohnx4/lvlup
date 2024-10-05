import MediaContent from "../models/mediaContent";
import { Module } from "../models/mmodule";
import { IMediaContent } from "../models/mediaContent";

const mediaContentResolver = {
  Query: {
    media: async (_: any, { moduleId }: { moduleId: string }) => {
      return await MediaContent.find({ moduleId });
    },
    mediaContent: async (_: any, { id }: { id: string }) => {
      return await MediaContent.findById(id);
    },
  },
  Mutation: {
    createMediaContent: async (
      _: any,
      {
        url,
        moduleId,
        type,
        pointValue,
      }: { url: string; moduleId: string; type: string; pointValue: number }
    ): Promise<IMediaContent> => {
      const newMediaContent = new MediaContent({
        url,
        moduleId,
        type,
        pointValue,
      });
      return await newMediaContent.save();
    },
    updateMediaContent: async (
      _: any,
      {
        id,
        url,
        type,
        pointValue,
      }: { id: string; url?: string; type?: string; pointValue?: number }
    ): Promise<IMediaContent | null> => {
      return await MediaContent.findByIdAndUpdate(
        id,
        { url, type, pointValue },
        { new: true } // Return the updated document
      );
    },
    deleteMediaContent: async (_: any, { id }: { id: string }) => {
      return await MediaContent.findByIdAndDelete(id);
    },
  },
};

export default mediaContentResolver;
