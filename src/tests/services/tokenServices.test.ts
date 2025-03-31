import { describe, it, expect, vi, beforeEach } from "vitest";
import { createAuthToken } from "@/services/tokenServices";
import jwt from "jsonwebtoken";
import { db } from "@/db";
// import { tokens } from "@/db/schema";
// import { eq, and, gt } from "drizzle-orm";

/// Mock the dependencies
vi.mock("jsonwebtoken", () => ({
  sign: vi.fn(),
  verify: vi.fn(),
}));

vi.mock("@/db", () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => Promise.resolve()),
    })),
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve([])),
        })),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => Promise.resolve()),
      })),
    })),
  },
}));

describe("Token Services", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
});

describe("createAuthToken", () => {
  it("should create a JWT token and store it in the database", async () => {
    // Setup
    const userId = "user-123";
    const mockToken = "fake-jwt-token";
    vi.mocked(jwt.sign).mockReturnValue();

    // Execute
    const result = await createAuthToken(userId);

    // Assert
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({ sub: userId }),
      expect.any(String),
      expect.anything()
    );

    expect(db.insert).toHaveBeenCalled();
    expect(result).toBe(mockToken);
  });

  it("should throw if JWT_SECRET is not defined", async () => {
    // Setup
    const userId = "user-123";
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = undefined;

    // Execute & Assert
    await expect(createAuthToken(userId)).rejects.toThrow();

    // Cleanup
    process.env.JWT_SECRET = originalSecret;
  });
});
