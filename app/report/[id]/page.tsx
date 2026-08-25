import { notFound } from "next/navigation";
import { ReportDashboard } from "@/components/report/report-dashboard";
import { AppShell } from "@/components/app/app-shell";
import { getCurrentUserInterview } from "@/lib/interviews";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const interview = await getCurrentUserInterview(id);

  if (!interview) {
    notFound();
  }

  return (
    <AppShell
      active="report"
      title="Feedback Report"
      subtitle={`${interview.roleTitle}: transcript, scorecards, and improved answers when analysis is ready.`}
    >
      <ReportDashboard interview={interview} />
    </AppShell>
  );
}
