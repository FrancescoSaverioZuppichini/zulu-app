import { LoginForm } from "@/components/auth/login-form";
import { PhoneContainer } from "@/components/phone/phone-container";

export default function Home() {
  return (
    <main className="grid min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <LoginForm />
    </main>
  );
}
