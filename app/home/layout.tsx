import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex flex-col h-screen">
      {session?.user?.admin && (
        <div className="flex items-center justify-between p-2 bg-primary text-primary-foreground">
          <p>Welcome, {session.user.name} (Admin)</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit" variant="secondary">
              Sign Out
            </Button>
          </form>
        </div>
      )}
      <main className="flex-1">{children}</main>
      <Toaster />
    </div>
  );
}
