import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuthToken } from "../../services/tokenServices";
import { getUserById } from "../../services/userServices";
import { User } from "@/types/user";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/context/user-context";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the auth token from cookies
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  if (!authToken) {
    redirect("/auth/login");
  }

  // Verify the auth token
  try {
    const payload = await verifyAuthToken(authToken as string);
    if (!payload) {
      redirect("/auth/login");
    }

    // Fetch user data using the payload
    const userId = payload.userId;
    const userData = await getUserById(userId);
    const user: User = {
      ...userData,
      password: "",
      created_at: userData.createdAt,
      updated_at: userData.updatedAt,
    };

    if (!user) {
      redirect("/auth/login");
    }

    return (
      <UserProvider user={user}>
        <SidebarProvider>{children}</SidebarProvider>
      </UserProvider>
    );
  } catch (error) {
    console.error("Token verification failed:", error);
    redirect("/login");
  }
}
