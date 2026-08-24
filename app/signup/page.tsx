import { AuthForm } from "@/components/auth/auth-form";
import { TopNav } from "@/components/shared/top-nav";

type AuthPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
  }>;
};

export default async function SignupPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;

  return (
    <main>
      <TopNav />
      <AuthForm mode="signup" error={params.error} message={params.message} next={params.next} />
    </main>
  );
}
