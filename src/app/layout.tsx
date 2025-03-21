import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voices - Anonymous Journaling with Connection",
  description: "Share your thoughts anonymously and connect through authentic stories. Voices is where journaling meets community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
