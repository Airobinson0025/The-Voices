import { User } from "@/types/user";

interface DashboardContentProps {
  user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div className="mx-6">
      <h1 className="text-2xl">Welcome back {user.username}</h1>
    </div>
  );
}
