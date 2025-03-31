import jwt from "jsonwebtoken";
import { db } from "@/db";
import { tokens } from "@/db/schema";
import { eq, gt, and } from "drizzle-orm";

// hash the token for storage
async function hashToken(token: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function createAuthToken(
  userId: string,
  userAgent?: string,
  ipAddress?: string
) {
  // Generate a new token with jwt
  const jwtSecret = process.env.JWT_SECRET!;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET enviornment variable is not set");
  }

  // Create a payload for token with userId
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Token expires in 1 day
  };

  const token = jwt.sign(payload, jwtSecret);

  // Hash the token for storage
  const hashedToken = await hashToken(token);

  // Store the token in the database
  await db.insert(tokens).values({
    userId,
    token: hashedToken,
    userAgent,
    ipAddress,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  });

  return token;
}

export async function verifyAuthToken(token: string) {
  try {
    // Verity jwt signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Extract userId from the decoded token
    const userId = (decoded as { sub: string }).sub;

    // Hash the token for database lookup
    // Note: You should use the same hashing algorithm and secret as used in createAuthToken
    const hashedToken = await hashToken(token);

    // Check if the token exists in the database
    const tokenRecord = await db
      .select()
      .from(tokens)
      .where(
        and(
          eq(tokens.token, await hashedToken),
          eq(tokens.userId, userId),
          eq(tokens.isRevoked, false),
          gt(tokens.expiresAt, new Date()) // Check if the token is not expired
        )
      )
      .limit(1);

    if (tokenRecord.length === 0) {
      throw new Error("Token not found or expired");
    }
    return {
      userId,
      token: tokenRecord[0].token,
      createdAt: tokenRecord[0].createdAt,
    };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
