import { NextResponse } from "next/server";
import * as z from "zod";
import { getUserByEmail } from "@/services/userServices";
import { validatePassword } from "@/services/userServices";
import { createAuthToken } from "@/services/tokenServices";

type LoginRequest = z.infer<typeof loginSchema>;

type LoginSuccessResponse = {
  success: true;
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
  };
  token: string;
};

type LoginErrorResponse = {
  success: false;
  message: string;
  errors?: z.ZodFormattedError<{ email: string; password: string }, string>;
};

// Define schema for login request
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export async function POST(
  req: Request
): Promise<NextResponse<LoginSuccessResponse | LoginErrorResponse>> {
  try {
    const body = await req.json();

    // Validate the request
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request",
          error: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { email, password }: LoginRequest = validationResult.data;

    // Check if user exists and password is correct
    const user = await getUserByEmail(email);
    // console.log("User", user);

    const validPassword = await validatePassword(password, user.hashedPassword);
    // console.log("Valid password", validPassword);

    if (!user || !validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or password incorrect",
        },
        { status: 401 }
      );
    }

    // Generate an authentication token
    const token = await createAuthToken(user.id);

    const response = NextResponse.json({
      success: true as const, // telling TypeScript that this is a literal value
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });

    // Set the token as an http-only cookie
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
