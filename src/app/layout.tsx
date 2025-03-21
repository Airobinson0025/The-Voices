import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { mainNavItems } from "./config/navigation";

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
      <Header navItems={mainNavItems} />
        {children}
      </body>
    </html>
  );
}
