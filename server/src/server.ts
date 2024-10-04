import express from "express";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import connectDB from "./config/database";
import typeDefs from "./schemas";
import userResolvers from "./resolvers/userResolvers";
import moduleResolvers from "./resolvers/moduleResolvers";
import mediaResolvers from "./resolvers/mediaResolvers";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolvers, moduleResolvers, mediaResolvers],
});

const main = async () => {
  await connectDB();

  await server.start();

  app.use(express.json());
  app.use("/graphql", expressMiddleware(server));
};

main().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
});
