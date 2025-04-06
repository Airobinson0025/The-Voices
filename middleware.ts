// middleware.ts (at project root, NOT in src)
import { NextResponse } from "next/server";

export function middleware() {
  console.log("MIDDLEWARE EXECUTING FROM ROOT LEVEL");
  // Do something very obvious
  return NextResponse.redirect(
    new URL("/middleware-works", "http://localhost:3000")
  );
}

// Match homepage only for a clear test
export const config = {
  matcher: ["/"],
};
