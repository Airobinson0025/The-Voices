import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { mainNavItems } from "../config/navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "Voices - Anonymous Journaling with Connection",
  description:
    "Share your thoughts anonymously and connect through authentic stories. Voices is where journaling meets community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header navItems={mainNavItems} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
