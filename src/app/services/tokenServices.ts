import jwt from "jsonwebtoken";
import { db } from "@/db";
import { tokens } from "@/db/schema";

export async function createAuthToken(
  userId: string,
  userAgent?: string,
  ipAddress?: string
) {
  // Generate a new token with jwt
  const token = jwt.sign(
    { userId },
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { expiresIn: "1d" }
  );

  // Store the token in the database
  await db.insert(tokens).values({
    userId,
    token,
    userAgent,
    ipAddress,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  });

  return token;
}
