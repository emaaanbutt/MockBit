import { InterviewPicker } from "@/components/interview/interview-picker";
import { AppShell } from "@/components/app/app-shell";
import { getCurrentUserInterviews } from "@/lib/interviews";

export default async function InterviewPage() {
  const interviews = await getCurrentUserInterviews();

  return (
    <AppShell
      active="interview"
      title="Practice Room"
      subtitle="Choose a saved interview first. Each practice room is tailored to that role, company, and job description."
    >
      <InterviewPicker interviews={interviews} />
    </AppShell>
  );
}
