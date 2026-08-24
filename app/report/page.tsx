import { AppShell } from "@/components/app/app-shell";
import { ReportPicker } from "@/components/report/report-picker";

export default function ReportsPage() {
  return (
    <AppShell active="report" title="Reports" subtitle="Choose the completed practice session you want to review.">
      <ReportPicker />
    </AppShell>
  );
}
