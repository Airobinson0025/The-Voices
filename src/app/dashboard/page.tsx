"use client";

import { useUser } from "@/context/user-context";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col pt-24 w-full px-6 lg:px-12">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl tracking-tight">
          Welcome to Your Journal
        </h1>
        <h1 className="text-3xl lg:text-4xl tracking-tight text-indigo-500">
          {user?.username}
        </h1>
        <p className="text-lg text-muted-foreground">
          No one sees your entries until you choose to share them.
        </p>
      </div>
    </div>
  );
}
