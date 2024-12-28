
import { getServerSession } from "next-auth";
import Calendar from "./_components/calendar/calendar";

export default async function Home() {
  const session = await getServerSession();
  const isSignedIn = !!session;


  return (
    <main className="h-screen w-full flex flex-col">
      <Calendar isSignedIn={isSignedIn} />
    </main>
  );
}
