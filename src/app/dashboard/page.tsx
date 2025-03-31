import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuthToken } from "../services/tokenServices";
import { getUserById } from "../services/userServices";

export default async function DashboardPage() {
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
    const user = await getUserById(userId);
    if (!user) {
      redirect("/auth/login");
    }
    // Render the dashboard with user data
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>Welcome to your dashboard, {user.username}!</h1>
      </div>
    );
  } catch (error) {
    console.error("Token verification failed:", error);
    redirect("/login");
  }
}
