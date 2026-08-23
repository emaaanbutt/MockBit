import { AuthForm } from "@/components/auth/auth-form";
import { TopNav } from "@/components/shared/top-nav";

export default function LoginPage() {
  return (
    <main>
      <TopNav />
      <AuthForm mode="login" />
    </main>
  );
}
