import { db } from "@/db";
import { users } from "@/db/schema";
import { UserRegistrationData } from "@/types/user";
import { eq } from "drizzle-orm";
import { hash } from "bcrypt";

export async function getUserByEmail(email: string) {
    const results = await db.select().from(users).where(eq(users.email, email));
    return results[0]
}

export async function getUserByUsername(username: string) {
    const results = await db.select().from(users).where(eq(users.username, username));
    return results[0]
}

export async function registerUser(data: UserRegistrationData) {
    const hashedPassword = await hash(data.password, 10);
    
    return db.insert(users).values({
        username: data.username,
        email: data.email,
        hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning({
        id: users.id,
        username: users.username,
        email: users.email,
        createdAt: users.createdAt,
    })
}