import { AuthForm } from "@/components/auth/auth-form";
import { TopNav } from "@/components/shared/top-nav";

export default function SignupPage() {
  return (
    <main>
      <TopNav />
      <AuthForm mode="signup" />
    </main>
  );
}
