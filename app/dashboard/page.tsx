import { AppShell } from "@/components/app/app-shell";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { getCurrentUserInterviews } from "@/lib/interviews";

type DashboardPageProps = {
  searchParams: Promise<{ message?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const [interviews, params] = await Promise.all([getCurrentUserInterviews(), searchParams]);

  return (
    <AppShell
      active="dashboard"
      title="Dashboard"
      subtitle="Plan your upcoming interviews, track practice progress, and jump into a tailored voice session."
      showAddInterview
    >
      <DashboardHome interviews={interviews} message={params.message} />
    </AppShell>
  );
}
