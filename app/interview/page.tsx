import { InterviewPicker } from "@/components/interview/interview-picker";
import { AppShell } from "@/components/app/app-shell";

export default function InterviewPage() {
  return (
    <AppShell
      active="interview"
      title="Practice Room"
      subtitle="Choose an upcoming interview first. Each practice room is tailored to that role, company, and job description."
    >
      <InterviewPicker />
    </AppShell>
  );
}
