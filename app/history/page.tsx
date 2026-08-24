import { HistoryDashboard } from "@/components/history/history-dashboard";
import { AppShell } from "@/components/app/app-shell";

export default function HistoryPage() {
  return (
    <AppShell active="history" title="History" subtitle="Review previous practice sessions, scores, transcripts, and reports.">
      <HistoryDashboard />
    </AppShell>
  );
}
