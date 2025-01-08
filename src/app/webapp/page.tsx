import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Calendar from "@/app/_components/calendar/calendar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/auth";

export default async function WebApp() {
  const session = await getServerSession(authOptions);
  const isSignedIn = !!session;
  console.log("isSignedIn ", session);
  if (!isSignedIn) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar isSignedIn={isSignedIn} />
      <main className="h-screen w-full flex flex-col">
        <Calendar session={session} />
      </main>
    </SidebarProvider>
  );
}
