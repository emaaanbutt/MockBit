import { notFound } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { InterviewConsole } from "@/components/interview/interview-console";
import { getCurrentUserInterview } from "@/lib/interviews";

type InterviewRoomPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterviewRoomPage({ params }: InterviewRoomPageProps) {
  const { id } = await params;
  const interview = await getCurrentUserInterview(id);

  if (!interview) {
    notFound();
  }

  return (
    <AppShell
      active="interview"
      title="Practice Room"
      subtitle={`${interview.roleTitle} at ${interview.companyName ?? "your saved interview"}. Start when you are ready.`}
    >
      <InterviewConsole interview={interview} />
    </AppShell>
  );
}
