import { notFound } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { InterviewPreview } from "@/components/interview/interview-preview";
import { getCurrentUserInterview } from "@/lib/interviews";

type InterviewPreviewPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ back?: string }>;
};

function safeBackHref(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/upcoming";
  if (value.startsWith("/login") || value.startsWith("/signup")) return "/upcoming";
  return value;
}

function getActive(backHref: string): "dashboard" | "setup" | "upcoming" | "interview" | "history" | "report" {
  if (backHref.startsWith("/dashboard")) return "dashboard";
  if (backHref.startsWith("/upcoming")) return "upcoming";
  if (backHref.startsWith("/history")) return "history";
  if (backHref.startsWith("/report")) return "report";
  return "interview";
}

export default async function InterviewPreviewPage({ params, searchParams }: InterviewPreviewPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const interview = await getCurrentUserInterview(id);

  if (!interview) {
    notFound();
  }

  const backHref = safeBackHref(query.back);

  return (
    <AppShell
      active={getActive(backHref)}
      title="Interview Preview"
      subtitle="Review the saved interview details before editing or practicing."
    >
      <InterviewPreview interview={interview} backHref={backHref} />
    </AppShell>
  );
}
