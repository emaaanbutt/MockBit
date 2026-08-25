import Link from "next/link";
import { CalendarDays, ChartNoAxesColumnIncreasing, Clock3, Edit3, FileText, Plus, Trash2 } from "lucide-react";
import { deleteInterview } from "@/app/interview/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PendingSubmitButton } from "@/components/shared/pending-submit-button";
import { formatDuration, getPracticedInterviews, type SavedInterview } from "@/lib/interviews";

type HistoryDashboardProps = {
  interviews: SavedInterview[];
  message?: string;
};

export function HistoryDashboard({ interviews, message }: HistoryDashboardProps) {
  const practiced = getPracticedInterviews(interviews);
  const reports = interviews.flatMap((item) => (item.report ? [item.report] : []));
  const average =
    reports.length > 0 ? Math.round(reports.reduce((sum, item) => sum + item.averageScore, 0) / reports.length) : 0;

  return (
    <div className="space-y-5">
      {message ? (
        <div className="rounded-md border border-sky-300/20 bg-sky-300/10 p-3 text-sm text-sky-50">{message}</div>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card className="glass-panel animate-slideUp">
          <CardHeader>
            <Badge tone="indigo">Saved interviews</Badge>
            <CardTitle className="mt-3 text-2xl">Your interview history</CardTitle>
            <CardDescription>
              Track every saved interview, compare analyzed practice sessions, and continue anything you have not practiced yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: FileText, label: "Saved", value: interviews.length },
              { icon: ChartNoAxesColumnIncreasing, label: "Avg score", value: average },
              { icon: Clock3, label: "Practiced", value: practiced.length }
            ].map((item, index) => (
              <div
                key={item.label}
                className="animate-slideUp rounded-md border border-white/10 bg-white/[0.035] p-4"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <item.icon className="mb-4 h-5 w-5 text-sky-200" />
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-3xl font-semibold">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="glass-panel animate-slideUp stagger-1">
          <CardHeader>
            <CardTitle>Start fresh</CardTitle>
            <CardDescription>Use the setup flow for a new interview.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/setup">
                <Plus className="h-4 w-4" />
                New Interview
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        {interviews.length === 0 ? (
          <Card className="glass-panel animate-slideUp">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">No interview history yet.</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Save an interview and it will appear here, even before you practice it.
              </p>
              <Button asChild className="mt-5">
                <Link href="/setup">
                  <Plus className="h-4 w-4" />
                  Add Interview
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}

        {interviews.map((item, index) => (
          <Card key={item.id} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.06}s` }}>
            <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_180px_180px_140px] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={item.status === "draft" ? "slate" : "blue"}>{item.status}</Badge>
                  <Badge tone="indigo">{item.region.replaceAll("-", " ")}</Badge>
                </div>
                <h2 className="mt-3 text-lg font-semibold">{item.roleTitle}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.companyName ?? "No company added"} · {item.companyStyle}
                </p>
              </div>
              <div className="text-sm">
                <p className="mb-1 flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Added
                </p>
                <p>{new Date(item.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Duration</p>
                <p className="mt-1">{formatDuration(item.durationSeconds)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.transcriptTurnCount} transcript turns</p>
              </div>
              <div>
                {item.report ? (
                  <>
                    <p className="text-right text-2xl font-semibold">{item.report.averageScore}</p>
                    <Progress value={item.report.averageScore} className="mt-2" />
                  </>
                ) : (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/interview/${item.id}`}>Practice</Link>
                  </Button>
                )}
              </div>
              <div className="lg:col-span-4">
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/interview/${item.id}/preview?back=${encodeURIComponent("/history")}`}>
                      Details
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/setup?interview=${item.id}`}>
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  {item.status === "completed" || item.report ? (
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/report/${item.id}`}>Open report</Link>
                    </Button>
                  ) : null}
                  <form action={deleteInterview}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="next" value="/history" />
                    <PendingSubmitButton type="submit" variant="danger" size="sm" pendingLabel="Deleting...">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </PendingSubmitButton>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
