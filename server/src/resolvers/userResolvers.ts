import { User } from "../models/User";

const userResolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    createUser: async (_: any, { username, passwordHash, email }: any) => {
      const newUser = new User({ username, passwordHash, email });
      return await newUser.save();
    },
  },
};

export default userResolvers;
