import { AppGrid } from "@/components/phone/app-grid";
import { StatusBar } from "@/components/phone/status-bar";

export default function HomePage() {
  return (
    <main className="grid h-full flex-col">
      <div className="flex flex-col h-full">
        <StatusBar />
        <AppGrid />
      </div>
    </main>
  );
}
