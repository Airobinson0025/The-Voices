import CreateEntry from "@/components/create/CreateEntry";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewJournalEntryPage() {
  // Get the auth token from cookies
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  if (!authToken) {
    redirect("/auth/login");
  }

  return (
    <div className="px-6 lg:px-10 pt-40">
      {/* <h1 className="text-2xl lg:text-3xl">Create New Journal Entry</h1>
      <div className="my-10"></div> */}
      <CreateEntry />
    </div>
  );
}
