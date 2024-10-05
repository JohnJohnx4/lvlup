import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import connectDB from "./config/database";
import typeDefs from "./schemas";
import userResolvers from "./resolvers/userResolvers";
import moduleResolvers from "./resolvers/moduleResolvers";
import mediaResolvers from "./resolvers/mediaResolvers";
import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";
import { json } from "body-parser";
import mongoose from "mongoose";
import axios from "axios";

export interface GQLBaseContext {
  user?: any; // Make user optional to match the expected type
}

dotenv.config();

const app = express();
app.use(express.json());

connectDB(); // Connect to MongoDB

// Auth0 middleware
const jwtMiddleware = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as GetVerificationKey, // Use 'as any' if you're facing typing issues
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
}).unless({ path: ["/graphql", "/health", "/get-token"] }); // Public access to /graphql

app.use(jwtMiddleware);

// Initialize Apollo Server
const server = new ApolloServer<GQLBaseContext>({
  typeDefs,
  resolvers: [userResolvers, moduleResolvers, mediaResolvers],
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

if (process.env.ENVIRONMENT === "dev") {
  app.post("/get-token", jwtMiddleware, async (req, res) => {
    console.log("Request body: ", req.body);
    const { username, password } = req.body; // Assuming you send username and password

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const url = `${process.env.AUTH0_DOMAIN}oauth/token`;

    return axios
      .post(url, {
        grant_type: "password",
        username,
        password,
        audience: "your-api-audience", // Your API's audience
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
      })
      .then((response) => {
        console.log("Response: ", response.data);
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
}

// Start the server
async function startServer() {
  await server.start();
  app.use("/graphql", json(), expressMiddleware(server));

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
