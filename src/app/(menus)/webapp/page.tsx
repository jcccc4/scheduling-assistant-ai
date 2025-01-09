import { getServerSession } from "next-auth";
import Calendar from "@/app/_components/calendar/calendar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function WebApp() {
  const session = await getServerSession(authOptions);
  const isSignedIn = !!session;

  if (!isSignedIn) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <main className="h-screen w-full flex flex-col">
        <Calendar session={session} />
      </main>
    </SidebarProvider>
  );
}
