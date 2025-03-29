import jwt from "jsonwebtoken";
import { db } from "@/db";
import { tokens } from "@/db/schema";
// import { eq } from "drizzle-orm";
import { createHash } from "crypto";

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
  const hashedToken = createHash("sha256").update(token).digest("hex");

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

// export async function verifyAuthToken(token: string) {
//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//     );
//     const userId = (decoded as { userId: string }).userId;

//     // Check if the token exists in the database
//     const tokenRecord = await db
//       .select()
//       .from(tokens)
//       .where(
//         eq(tokens.token, token) &&
//           eq(tokens.userId, userId) &&
//           eq(tokens.isRevoked, false) &&
//           eq(tokens.expiresAt, new Date(Date.now() + 1000 * 60 * 60 * 24))
//       )
//       .limit(1);
//     if (tokenRecord.length === 0) {
//       throw new Error("Token not found or expired");
//     }
//     return {
//       userId,
//       token: tokenRecord[0].token,
//       createdAt: tokenRecord[0].createdAt,
//     };
//   } catch (error) {
//     console.error("Token verification error:", error);
//     return null;
//   }
// }
