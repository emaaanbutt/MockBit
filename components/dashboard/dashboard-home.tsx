import Link from "next/link";
import { CalendarClock, ExternalLink, Mic2 } from "lucide-react";
import {
  dashboardStats,
  interviewTypes,
  scoreTrend,
  upcomingInterviews
} from "@/lib/dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DashboardHome() {
  return (
    <div className="space-y-5">
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
            <div className="flex h-56 items-end gap-3 rounded-md border border-white/10 bg-slate-950/45 p-4">
              {scoreTrend.map((item, index) => (
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
          </CardContent>
        </Card>

        <Card className="glass-panel animate-slideUp stagger-1">
          <CardHeader>
            <CardTitle>Interview types</CardTitle>
            <CardDescription>What you practiced most recently.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {interviewTypes.map((item) => (
              <div key={item.role} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3">
                <Badge tone={item.tone}>{item.role}</Badge>
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
            {upcomingInterviews.map((item) => (
              <div key={`${item.company}-${item.role}`} className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-indigo-200/30 hover:bg-white/[0.055]">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="indigo">{item.date}</Badge>
                      <Badge tone="blue">{item.time}</Badge>
                      <Badge>{item.mode}</Badge>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold">{item.role}</h2>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                  <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
                    {item.meetingLink ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={item.meetingLink} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Meet link
                        </Link>
                      </Button>
                    ) : null}
                    <Button asChild size="sm">
                      <Link href={`/interview/${item.id}`}>
                        <Mic2 className="h-4 w-4" />
                        Start Practicing
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>Prep readiness</span>
                    <span>{item.readiness}%</span>
                  </div>
                  <Progress value={item.readiness} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
