import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("usename", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

  // Profile optionals
  displayName: varchar("display_name", { length: 50 }),
  bio: text("bio"),
});

export const tokens = pgTable("tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(), // Optional: store hashed tokens for verification
  type: varchar("type", { length: 50 }).notNull().default("access"), // 'access', 'refresh', etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isRevoked: boolean("is_revoked").default(false).notNull(),
  revokedAt: timestamp("revoked_at"),
  lastUsedAt: timestamp("last_used_at"),
  userAgent: text("user_agent"), // Store info about the client that requested the token
  ipAddress: varchar("ip_address", { length: 45 }), // Store the IP address that requested the token
});

// token relations
export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));

// In your schema.ts file
export const journalEntries = pgTable("journal_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: uuid("author_id")
    .references(() => users.id)
    .notNull(),

  // Content
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  excerpt: varchar("excerpt", { length: 280 }), // Auto-generated preview

  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  // Publication status
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),

  // Privacy & visibility
  isAnonymous: boolean("is_anonymous").default(true).notNull(), // Whether to show author name
  visibility: varchar("visibility", { length: 20 }).default("public").notNull(), // 'public', 'followers', 'private'

  // AI-generated fields
  mood: varchar("mood", { length: 50 }), // Detected mood/emotion
  aiSummary: text("ai_summary"), // AI-generated summary

  // Engagement metrics
  viewCount: integer("view_count").default(0).notNull(),
  likeCount: integer("like_count").default(0).notNull(),
  commentCount: integer("comment_count").default(0).notNull(),
  bookmarkCount: integer("bookmark_count").default(0).notNull(),
});

// Tags for categorization
export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
});

// Junction table for entry-tag relationship
export const entryTags = pgTable("entry_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  entryId: uuid("entry_id")
    .references(() => journalEntries.id)
    .notNull(),
  tagId: uuid("tag_id")
    .references(() => tags.id)
    .notNull(),
});

// Comments on entries
export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  entryId: uuid("entry_id")
    .references(() => journalEntries.id)
    .notNull(),
  authorId: uuid("author_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isAnonymous: boolean("is_anonymous").default(true).notNull(),
});

// Likes/reactions
export const entryLikes = pgTable("entry_likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  entryId: uuid("entry_id")
    .references(() => journalEntries.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Bookmarks
export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  entryId: uuid("entry_id")
    .references(() => journalEntries.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// jounral entry relations
export const journalEntriesRelations = relations(
  journalEntries,
  ({ one, many }) => ({
    author: one(users, {
      fields: [journalEntries.authorId],
      references: [users.id],
    }),
    tags: many(entryTags),
    comments: many(comments),
    likes: many(entryLikes),
    bookmarks: many(bookmarks),
  })
);
