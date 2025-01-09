// app/webapp/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isSignedIn = !!session;

  if (!isSignedIn) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar isSignedIn={isSignedIn} />
      <main className="h-screen w-full flex flex-col">{children}</main>
    </SidebarProvider>
  );
}
