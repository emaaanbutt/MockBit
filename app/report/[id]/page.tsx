import { ReportDashboard } from "@/components/report/report-dashboard";
import { AppShell } from "@/components/app/app-shell";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;

  return (
    <AppShell active="report" title="Feedback Report" subtitle={`Report ${id}: transcript, scorecards, and improved answers.`}>
      <ReportDashboard />
    </AppShell>
  );
}
