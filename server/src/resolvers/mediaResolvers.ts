import { MediaFile } from "../models/MediaFile";

const mediaResolvers = {
  Query: {
    mediaFiles: async () => await MediaFile.find().populate("uploadedBy"),
  },
  Mutation: {
    createMediaFile: async (
      _: any,
      { url, type, pointValue, uploadedBy }: any
    ) => {
      const newMediaFile = new MediaFile({ url, type, pointValue, uploadedBy });
      return await newMediaFile.save();
    },
  },
};

export default mediaResolvers;
