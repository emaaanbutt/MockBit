import Link from "next/link";
import { CalendarClock, ExternalLink, Mic2, Plus } from "lucide-react";
import { upcomingInterviews } from "@/lib/dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function InterviewPicker() {
  return (
    <div className="space-y-4">
      <Card className="glass-panel animate-slideUp">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Choose an interview to practice</CardTitle>
            <CardDescription>Pick the real upcoming interview first, then enter its tailored voice room.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/setup">
              <Plus className="h-4 w-4" />
              Add Interview
            </Link>
          </Button>
        </CardHeader>
      </Card>

      {upcomingInterviews.map((item, index) => (
        <Card key={item.id} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.06}s` }}>
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_220px] lg:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge tone="indigo">{item.date}</Badge>
                <Badge tone="blue">{item.time}</Badge>
                <Badge>{item.mode}</Badge>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{item.role}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.company}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{item.description}</p>
              <div className="mt-4 max-w-xl">
                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>Prep readiness</span>
                  <span>{item.readiness}%</span>
                </div>
                <Progress value={item.readiness} />
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:items-stretch">
              {item.meetingLink ? (
                <Button asChild variant="outline">
                  <Link href={item.meetingLink} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Open Meet Link
                  </Link>
                </Button>
              ) : (
                <div className="rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-muted-foreground">
                  <CalendarClock className="mb-2 h-4 w-4" />
                  Meeting link not added yet.
                </div>
              )}
              <Button asChild>
                <Link href={`/interview/${item.id}`}>
                  <Mic2 className="h-4 w-4" />
                  Practice This Interview
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
