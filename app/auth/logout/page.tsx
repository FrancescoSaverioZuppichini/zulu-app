import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export const runtime = "edge";
export default function SignOutPage() {
  return (
    <div className="p-6 flex items-center w-full justify-center">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit" variant={"destructive"}>
          Sign Out
        </Button>
      </form>
    </div>
  );
}
