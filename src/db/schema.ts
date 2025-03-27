import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  boolean,
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

// Set up relations
export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
