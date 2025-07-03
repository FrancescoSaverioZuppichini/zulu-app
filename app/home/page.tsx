import { AppGrid } from "@/components/phone/app-grid";
import { PhoneContainer } from "@/components/phone/phone-container";
import { StatusBar } from "@/components/phone/status-bar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const runtime = "edge";

export default async function HomePage() {
  const session = await auth();

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
