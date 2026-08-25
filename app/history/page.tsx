import { HistoryDashboard } from "@/components/history/history-dashboard";
import { AppShell } from "@/components/app/app-shell";
import { getCurrentUserInterviews } from "@/lib/interviews";

type HistoryPageProps = {
  searchParams: Promise<{ message?: string }>;
};

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const [interviews, params] = await Promise.all([getCurrentUserInterviews(), searchParams]);

  return (
    <AppShell active="history" title="History" subtitle="Review every interview you added, including ones you have not practiced yet.">
      <HistoryDashboard interviews={interviews} message={params.message} />
    </AppShell>
  );
}
