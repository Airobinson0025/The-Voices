import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { verifyAuthToken } from "@/services/tokenServices";
import { createJournalEntry } from "@/services/journalServices";

// Validate schema for journal entry
const journalEntrySchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  isPublished: z.boolean().optional().default(false),
  isAnonymous: z.boolean().optional().default(true),
  visibility: z
    .enum(["public", "followers", "private"])
    .optional()
    .default("public"),
  mood: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      return NextResponse.json(
        { message: "Authenticatin required" },
        { status: 401 }
      );
    }

    //Verify token and get userId
    const payload = await verifyAuthToken(authToken as string);
    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const result = journalEntrySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid journal entry data",
          error: result.error.format(),
        },
        { status: 400 }
      );
    }

    // Create journal entry
    const data = result.data;
    const newEntry = await createJournalEntry({
      authorId: payload.userId,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      isPublished: data.isPublished,
      isAnonymous: data.isAnonymous,
      visibility: data.visibility,
      mood: data.mood,
    });

    return NextResponse.json(
      {
        message: "Journal entry created successfully",
        entry: newEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json(
      {
        message: "Failed to create journal entry",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
