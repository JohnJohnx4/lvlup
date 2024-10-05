import { User } from "../models/User";
import { GQLBaseContext } from "../server";

const userResolvers = {
  Query: {
    users: async (_: any, __: any, { user }: GQLBaseContext) => {
      if (!user) {
        console.error("[userResolvers]: No user found: ", { user });
        throw new Error("You must be logged in");
      }
      return await User.find();
    },
  },
  Mutation: {
    createUser: async (_: any, { username, passwordHash, email }: any) => {
      const newUser = new User({ username, passwordHash, email });
      return await newUser.save();
    },
  },
};

export default userResolvers;
