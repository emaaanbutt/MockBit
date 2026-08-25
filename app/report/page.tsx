import { AppShell } from "@/components/app/app-shell";
import { ReportPicker } from "@/components/report/report-picker";
import { getCurrentUserInterviews, getPracticedInterviews } from "@/lib/interviews";

export default async function ReportsPage() {
  const interviews = getPracticedInterviews(await getCurrentUserInterviews());

  return (
    <AppShell active="report" title="Reports" subtitle="Choose the completed practice session you want to review.">
      <ReportPicker interviews={interviews} />
    </AppShell>
  );
}
