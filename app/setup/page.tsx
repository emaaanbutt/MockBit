import { SetupForm } from "@/components/setup/setup-form";
import { AppShell } from "@/components/app/app-shell";
import { getCurrentUserInterview } from "@/lib/interviews";

type SetupPageProps = {
  searchParams: Promise<{
    interview?: string;
    error?: string;
    message?: string;
  }>;
};

export default async function SetupPage({ searchParams }: SetupPageProps) {
  const params = await searchParams;
  const initialInterview = params.interview ? await getCurrentUserInterview(params.interview) : null;

  return (
    <AppShell
      active="setup"
      title={initialInterview ? "Edit Interview" : "Add Interview"}
      subtitle="Save the real interview details first. After that, start a tailored practice session for the same role."
    >
      <SetupForm initialInterview={initialInterview} error={params.error} message={params.message} />
    </AppShell>
  );
}
