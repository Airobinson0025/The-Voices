"use client";

import { BoxReveal } from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();

  const firstLetterToUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const formattedUsername = firstLetterToUpperCase(user?.username || "");

  return (
    <div className="flex flex-col pt-44 w-full px-6 lg:px-12">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-[40px] tracking-tight">
          Welcome to Your Journal
        </h1>
        <BoxReveal boxColor={"#E78F8E"} duration={0.6}>
          <h1 className="text-3xl lg:text-[40px] text-[#E78F8E] tracking-tight">
            {formattedUsername}
          </h1>
        </BoxReveal>
        <p className="text-lg text-muted-foreground">
          No one sees your entries until you choose to share them.
        </p>
      </div>

      <div className="flex items-center mt-4">
        <Link href="journal/new">
          <Button size="lg" className="tracking-tight mr-2.5 cursor-pointer">
            New Entry
          </Button>
        </Link>
        <Link href="/dashboard/discover">
          <Button
            size="lg"
            className="tracking-tight cursor-pointer"
            variant="secondary"
          >
            Discover Voices
          </Button>
        </Link>
      </div>

      <div></div>
    </div>
  );
}
