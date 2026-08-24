import { notFound } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { InterviewConsole } from "@/components/interview/interview-console";
import { upcomingInterviews } from "@/lib/dashboard-data";

type InterviewRoomPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterviewRoomPage({ params }: InterviewRoomPageProps) {
  const { id } = await params;
  const interview = upcomingInterviews.find((item) => item.id === id);

  if (!interview) {
    notFound();
  }

  return (
    <AppShell
      active="interview"
      title="Practice Room"
      subtitle={`${interview.role} at ${interview.company}. Start when you are ready.`}
    >
      <InterviewConsole interview={interview} />
    </AppShell>
  );
}
