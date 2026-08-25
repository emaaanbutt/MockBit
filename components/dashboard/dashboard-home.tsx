import Link from "next/link";
import { CalendarClock, Edit3, ExternalLink, Mic2, Plus, Trash2 } from "lucide-react";
import { deleteInterview } from "@/app/interview/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PendingSubmitButton } from "@/components/shared/pending-submit-button";
import {
  formatInterviewDate,
  formatInterviewTime,
  getPracticedInterviews,
  getPrepReadiness,
  getUpcomingInterviews,
  type SavedInterview
} from "@/lib/interviews";

type DashboardHomeProps = {
  interviews: SavedInterview[];
  message?: string;
};

export function DashboardHome({ interviews, message }: DashboardHomeProps) {
  const practiced = getPracticedInterviews(interviews);
  const upcoming = getUpcomingInterviews(interviews).slice(0, 4);
  const reports = interviews.flatMap((item) => (item.report ? [item.report] : []));
  const averageScore =
    reports.length > 0
      ? Math.round(reports.reduce((sum, item) => sum + item.averageScore, 0) / reports.length).toString()
      : "0";
  const nextInterview = upcoming[0]?.scheduledAt
    ? `${formatInterviewDate(upcoming[0].scheduledAt)} at ${formatInterviewTime(upcoming[0].scheduledAt)}`
    : "Nothing scheduled";
  const roleCounts = practiced.reduce<Map<string, number>>((counts, item) => {
    counts.set(item.roleTitle, (counts.get(item.roleTitle) ?? 0) + 1);
    return counts;
  }, new Map());
  const interviewTypes = Array.from(roleCounts.entries())
    .map(([role, count]) => ({ role, count }))
    .slice(0, 5);
  const trend = reports
    .slice()
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-7)
    .map((item) => ({
      label: new Date(item.createdAt).toLocaleDateString("en", { month: "short", day: "numeric" }),
      score: item.averageScore
    }));
  const dashboardStats = [
    { label: "Saved interviews", value: interviews.length.toString(), change: interviews.length ? "Ready to track" : "Add your first interview" },
    { label: "Practiced interviews", value: practiced.length.toString(), change: practiced.length ? "Saved in history" : "No practice yet" },
    { label: "Average score", value: averageScore, change: reports.length ? `${reports.length} report${reports.length === 1 ? "" : "s"}` : "Reports appear after analysis" },
    { label: "Upcoming interviews", value: upcoming.length.toString(), change: nextInterview }
  ];

  return (
    <div className="space-y-5">
      {message ? (
        <div className="rounded-md border border-sky-300/20 bg-sky-300/10 p-3 text-sm text-sky-50">{message}</div>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <Card key={stat.label} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.06}s` }}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-xs text-indigo-100">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <Card className="glass-panel animate-slideUp">
          <CardHeader>
            <CardTitle>Performance this week</CardTitle>
            <CardDescription>Confidence, delivery, and technical score average across practice sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            {trend.length === 0 ? (
              <div className="flex h-56 items-center justify-center rounded-md border border-white/10 bg-slate-950/45 p-4 text-center text-sm leading-6 text-muted-foreground">
                No analyzed practice reports yet. Complete a practice session with transcript analysis to see score movement.
              </div>
            ) : (
              <div className="flex h-56 items-end gap-3 rounded-md border border-white/10 bg-slate-950/45 p-4">
                {trend.map((item, index) => (
                  <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-40 w-full items-end">
                      <div
                        className="animated-sheen animate-shimmer w-full rounded-md bg-indigo-300/70 transition hover:bg-sky-200/80"
                        style={{ height: `${item.score}%`, animationDelay: `${index * 0.08}s` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel animate-slideUp stagger-1">
          <CardHeader>
            <CardTitle>Interview types</CardTitle>
            <CardDescription>What you practiced most recently.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {interviewTypes.length === 0 ? (
              <div className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-muted-foreground">
                No practiced interview types yet.
              </div>
            ) : null}
            {interviewTypes.map((item) => (
              <div key={item.role} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3">
                <Badge tone="blue">{item.role}</Badge>
                <span className="text-sm text-slate-300">{item.count} sessions</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="glass-panel animate-slideUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-sky-200" />
              <CardTitle>Upcoming interviews</CardTitle>
            </div>
            <CardDescription>Add real interview dates, links, and prep status before practice.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 ? (
              <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold">No upcoming interviews.</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Add an interview with a future date and it will show here automatically.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/setup">
                    <Plus className="h-4 w-4" />
                    Add Interview
                  </Link>
                </Button>
              </div>
            ) : null}
            {upcoming.map((item) => (
              <div key={item.id} className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-indigo-200/30 hover:bg-white/[0.055]">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="indigo">{formatInterviewDate(item.scheduledAt)}</Badge>
                      <Badge tone="blue">{formatInterviewTime(item.scheduledAt)}</Badge>
                      <Badge>{item.interviewMode ?? "Mode not added"}</Badge>
                    </div>
                    <Link
                      href={`/interview/${item.id}/preview?back=${encodeURIComponent("/dashboard")}`}
                      className="mt-3 block text-lg font-semibold transition hover:text-indigo-100"
                    >
                      {item.roleTitle}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.companyName ?? "No company added"}</p>
                    <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-300">{item.jobDescription}</p>
                  </div>
                  <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/interview/${item.id}/preview?back=${encodeURIComponent("/dashboard")}`}>
                        Details
                      </Link>
                    </Button>
                    {item.meetingLink ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={item.meetingLink} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Meet link
                        </Link>
                      </Button>
                    ) : null}
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/setup?interview=${item.id}`}>
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={`/interview/${item.id}`}>
                        <Mic2 className="h-4 w-4" />
                        Start Practicing
                      </Link>
                    </Button>
                    <form action={deleteInterview}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="next" value="/dashboard" />
                      <PendingSubmitButton type="submit" variant="danger" size="sm" pendingLabel="Deleting...">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </PendingSubmitButton>
                    </form>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>Prep readiness</span>
                    <span>{getPrepReadiness(item)}%</span>
                  </div>
                  <Progress value={getPrepReadiness(item)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
