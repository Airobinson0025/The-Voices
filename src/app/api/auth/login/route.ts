import { NextResponse } from "next/server";
import * as z from "zod";
import { getUserByEmail } from "@/app/services/userServices";
import { validatePassword } from "@/app/services/userServices";
import { createAuthToken } from "@/app/services/tokenServices";

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
          message: "Invalid login data",
          error: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { email, password }: LoginRequest = validationResult.data;

    // Check if user exists and password is correct
    const user = await getUserByEmail(email);
    console.log("User", user);

    const validPassword = await validatePassword(password, user.hashedPassword);
    console.log("Valid password", validPassword);

    if (!user || !validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    // Generate an authentication token
    const token = await createAuthToken(user.id);
    console.log("Token", token);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
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
