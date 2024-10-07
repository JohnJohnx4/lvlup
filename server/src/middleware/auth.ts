import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";

interface AuthRequest extends Request {
  userId?: string; // Attach userId to the request
}

const jwksClient = jwksRsa({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey = (header: any, callback: any) => {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else if (key) {
      callback(null, key.getPublicKey());
    }
  });
};

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  req.userId = "";

  if (!req.headers.authorization) {
    console.log("No authorization header on call");
  }
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (token) {
    jwt.verify(
      token,
      getKey,
      {
        // audience: process.env.CLIENT_AUTH0_AUDIENCE,
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          console.error("Error: ", JSON.stringify(err, null, 2));
          res.status(403).json({ message: "Failed to authenticate token" });
          return;
        }

        const userId = (decoded as { sub: string }).sub;

        req.userId = userId;
        next();
      }
    );
  } else {
    console.log("Proceeding without token");
    next();
  }
};

export const jwtMiddleware = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as GetVerificationKey, // Use 'as any' if you're facing typing issues
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
}).unless({ path: ["/graphql", "/health"] }); // Public access to /graphql
