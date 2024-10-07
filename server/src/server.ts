import express, { Request } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import connectDB from "./config/database";
import typeDefs from "./schemas";
import moduleResolvers from "./resolvers/moduleResolvers";
import mediaResolvers from "./resolvers/mediaContentResolvers";
import dotenv from "dotenv";
import { json } from "body-parser";
import mongoose from "mongoose";
import { auth } from "./middleware/auth";
import courseResolver from "./resolvers/courseResolver";
import cors from "cors";

export interface GQLBaseContext {
  userId?: any; // Make user optional to match the expected type
}

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // If you need to send cookies or authentication headers
  })
);

app.use(express.json());

connectDB(); // Connect to MongoDB

// Auth0 middleware
// app.use(jwtMiddleware);
app.use(json());
app.use(auth);

// Initialize Apollo Server
const server = new ApolloServer<GQLBaseContext>({
  typeDefs,
  resolvers: [courseResolver, moduleResolvers, mediaResolvers],
});

app.use("/health", async (_, res) => {
  try {
    // Check MongoDB connection
    if (!mongoose.connection.readyState) {
      throw new Error("MongoDB connection not established");
    }

    await mongoose.connection.db?.admin().ping(); // Ping the database

    res.status(200).json({
      status: "✅ OK",
      database: "✅ Connected",
      timestamp: new Date(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
      error: error?.message,
      timestamp: new Date(),
    });
  }
});

// Start the server
async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const userId = (req as any).userId; // Access the userId from the request
        return { userId }; // Return the context
      },
    })
  );

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🔍 Health check available at http://localhost:${PORT}/health`);
  });
}

// Call the start function
startServer().catch((err) => {
  console.error("Failed to start server", err);
});
