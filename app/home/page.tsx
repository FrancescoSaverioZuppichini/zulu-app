import { AppGrid } from "@/components/phone/app-grid";
import { PhoneContainer } from "@/components/phone/phone-container";
import { StatusBar } from "@/components/phone/status-bar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="grid min-h-screen flex-col ">
      <div className="flex flex-col h-full">
        <StatusBar />
        <AppGrid />
      </div>
    </main>
  );
}
