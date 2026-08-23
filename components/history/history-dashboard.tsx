import Link from "next/link";
import { CalendarDays, ChartNoAxesColumnIncreasing, Clock3, FileText, Plus } from "lucide-react";
import { interviewHistory } from "@/lib/history-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function formatDuration(totalSeconds: number) {
  if (totalSeconds === 0) return "Not started";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export function HistoryDashboard() {
  const completed = interviewHistory.filter((item) => item.status === "completed");
  const average =
    completed.reduce((sum, item) => sum + (item.averageScore ?? 0), 0) / Math.max(1, completed.length);

  return (
    <div className="space-y-5">
      <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card className="glass-panel animate-slideUp">
          <CardHeader>
            <Badge tone="indigo">Saved interviews</Badge>
            <CardTitle className="mt-3 text-2xl">Your practice history</CardTitle>
            <CardDescription>
              Track previous sessions, compare score movement, and continue draft interview setups.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: FileText, label: "Sessions", value: interviewHistory.length },
              { icon: ChartNoAxesColumnIncreasing, label: "Avg score", value: Math.round(average) },
              { icon: Clock3, label: "Completed", value: completed.length }
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
            <CardDescription>Use the latest setup flow for a new practice session.</CardDescription>
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
        {interviewHistory.map((item, index) => (
          <Card key={item.id} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.06}s` }}>
            <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_180px_180px_120px] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={item.status === "draft" ? "slate" : "blue"}>{item.status}</Badge>
                  <Badge tone="indigo">{item.region.replaceAll("-", " ")}</Badge>
                </div>
                <h2 className="mt-3 text-lg font-semibold">{item.roleTitle}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.companyStyle}</p>
              </div>
              <div className="text-sm">
                <p className="mb-1 flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Date
                </p>
                <p>{new Date(item.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Duration</p>
                <p className="mt-1">{formatDuration(item.durationSeconds)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.transcriptTurnCount} transcript turns</p>
              </div>
              <div>
                {typeof item.averageScore === "number" ? (
                  <>
                    <p className="text-right text-2xl font-semibold">{item.averageScore}</p>
                    <Progress value={item.averageScore} className="mt-2" />
                  </>
                ) : (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/setup">Continue</Link>
                  </Button>
                )}
              </div>
              <div className="lg:col-span-4">
                {item.reportId ? (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/report/${item.reportId}`}>Open report</Link>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
