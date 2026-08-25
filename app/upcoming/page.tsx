import { AppShell } from "@/components/app/app-shell";
import { UpcomingDashboard } from "@/components/upcoming/upcoming-dashboard";
import { getCurrentUserInterviews, getUpcomingInterviews } from "@/lib/interviews";

type UpcomingPageProps = {
  searchParams: Promise<{ message?: string }>;
};

export default async function UpcomingPage({ searchParams }: UpcomingPageProps) {
  const [interviews, params] = await Promise.all([getCurrentUserInterviews(), searchParams]);
  const upcoming = getUpcomingInterviews(interviews);

  return (
    <AppShell active="upcoming" title="Upcoming" subtitle="Track interviews that are still ahead, ordered by the closest date first.">
      <UpcomingDashboard interviews={upcoming} message={params.message} />
    </AppShell>
  );
}
