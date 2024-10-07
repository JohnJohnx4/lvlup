import Course from "../models/course";
import { Module } from "../models/module";
import MediaContent from "../models/mediaContent";
import UserCourseAssignment from "../models/courseAssignment";
import User from "../models/user";

const courseResolver = {
  Query: {
    courses: async () => {
      console.log("courses hit");
      return await Course.find();
      // return await Course.find().populate("modules");
    },
    course: async (_: any, { id }: { id: string }) => {
      console.log("course hit", id);
      return await Course.findById(id);
    },
    modules: async (_: any, { courseId }: { courseId: string }) => {
      return await Module.find({ courseId }).populate("media");
    },
    media: async (_: any, { moduleId }: { moduleId: string }) => {
      return await MediaContent.find({ moduleId });
    },
    users: async () => {
      return await User.find();
    },
    user: async (_: any, { id }: { id: string }) => {
      return await User.findById(id);
    },
    userCourseAssignments: async (_: any, { userId }: { userId: string }) => {
      return await UserCourseAssignment.find({ userId }).populate("courseId");
    },
  },
  Mutation: {
    createCourse: async (
      _: any,
      {
        title,
        description,
        isPublic,
      }: { title: string; description: string; isPublic: boolean },
      { userId }: { userId: string } // Access userId from context
    ) => {
      if (!userId) {
        throw new Error("Unauthorized");
      }
      const newCourse = new Course({
        title,
        description,
        createdBy: userId,
        isPublic,
      });
      return await newCourse.save();
    },
    createModule: async (
      _: any,
      {
        title,
        description,
        courseId,
        type,
        pointValue,
      }: {
        title: string;
        description: string;
        courseId: string;
        type: string;
        pointValue: number;
      }
    ) => {
      const newModule = new Module({
        title,
        description,
        courseId,
        type,
        pointValue,
      });
      return await newModule.save();
    },
    createMediaContent: async (
      _: any,
      {
        url,
        moduleId,
        type,
        pointValue,
      }: { url: string; moduleId: string; type: string; pointValue: number }
    ) => {
      const newMediaContent = new MediaContent({
        url,
        moduleId,
        type,
        pointValue,
      });
      return await newMediaContent.save();
    },
    assignCourseToUser: async (
      _: any,
      {
        userId,
        courseId,
        assignedBy,
      }: { userId: string; courseId: string; assignedBy: string }
    ) => {
      const assignment = new UserCourseAssignment({
        userId,
        courseId,
        assignedBy,
      });
      return await assignment.save();
    },
  },
};

export default courseResolver;
