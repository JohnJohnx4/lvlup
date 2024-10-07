import { Module } from "../models/module";

const moduleResolvers = {
  Query: {
    modules: async () => await Module.find().populate("createdBy"),
  },
  Mutation: {
    createModule: async (
      _: any,
      { title, description, type, pointValue, createdBy }: any
    ) => {
      const newModule = new Module({
        title,
        description,
        type,
        pointValue,
        createdBy,
      });
      return await newModule.save();
    },
  },
};

export default moduleResolvers;
