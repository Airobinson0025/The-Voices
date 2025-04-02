import { db } from "@/db";
import { eq } from "drizzle-orm";
import { journalEntries } from "@/db/schema";
import { JournalEntry } from "@/types/journal";

export function createJournalEntry(data: JournalEntry) {
  return db.insert(journalEntries).values({
    authorId: data.authorId,
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: data.isPublished,
    publishedAt: data.publishedAt,
    isAnonymous: data.isAnonymous,
    visibility: data.visibility,
    mood: data.mood,
    aiSummary: data.aiSummary,
  });
}

export async function getJournalEntryById(author_id: string) {
  const results = await db
    .select()
    .from(journalEntries)
    .where(eq(journalEntries.authorId, author_id));
  return results[0];
}
