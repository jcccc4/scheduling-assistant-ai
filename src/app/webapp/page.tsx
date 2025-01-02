import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Calendar from "@/app/_components/calendar/calendar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function WebApp() {
  const session = await getServerSession();
  const isSignedIn = !!session;

  if (!isSignedIn) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-full flex flex-col">
        <Calendar isSignedIn={isSignedIn} />
      </main>
    </SidebarProvider>
  );
}
