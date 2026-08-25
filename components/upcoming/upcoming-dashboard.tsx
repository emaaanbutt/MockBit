import Link from "next/link";
import { CalendarClock, Edit3, ExternalLink, MapPin, Mic2, Plus, Trash2 } from "lucide-react";
import { deleteInterview } from "@/app/interview/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  formatInterviewDate,
  formatInterviewTime,
  getPrepReadiness,
  type SavedInterview
} from "@/lib/interviews";

type UpcomingDashboardProps = {
  interviews: SavedInterview[];
  message?: string;
};

export function UpcomingDashboard({ interviews, message }: UpcomingDashboardProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <section className="space-y-4">
        {message ? (
          <div className="rounded-md border border-sky-300/20 bg-sky-300/10 p-3 text-sm text-sky-50">{message}</div>
        ) : null}

        <Card className="glass-panel animate-slideUp">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Upcoming interviews</CardTitle>
              <CardDescription>Only future-dated saved interviews appear here.</CardDescription>
            </div>
            <Button asChild>
              <Link href="/setup">
                <Plus className="h-4 w-4" />
                Add Interview
              </Link>
            </Button>
          </CardHeader>
        </Card>

        {interviews.length === 0 ? (
          <Card className="glass-panel animate-slideUp">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">No upcoming interviews.</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Add a future date to an interview and it will show here automatically.
              </p>
            </CardContent>
          </Card>
        ) : null}

        {interviews.map((item, index) => (
          <Card key={item.id} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.06}s` }}>
            <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_220px] lg:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="indigo">{formatInterviewDate(item.scheduledAt)}</Badge>
                  <Badge tone="blue">{formatInterviewTime(item.scheduledAt)}</Badge>
                  <Badge>{item.interviewMode ?? "Mode not added"}</Badge>
                </div>
                <h2 className="mt-3 text-xl font-semibold">{item.roleTitle}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.companyName ?? "No company added"}</p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{item.jobDescription}</p>
                <div className="mt-4 max-w-xl">
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>Prep readiness</span>
                    <span>{getPrepReadiness(item)}%</span>
                  </div>
                  <Progress value={getPrepReadiness(item)} />
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:items-stretch">
                {item.meetingLink ? (
                  <Button asChild variant="outline">
                    <Link href={item.meetingLink} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Open Link
                    </Link>
                  </Button>
                ) : (
                  <div className="rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-muted-foreground">
                    <MapPin className="mb-2 h-4 w-4" />
                    {item.locationNote ?? "Location or meeting link not added yet."}
                  </div>
                )}
                <Button asChild>
                  <Link href={`/interview/${item.id}`}>
                    <Mic2 className="h-4 w-4" />
                    Practice
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/setup?interview=${item.id}`}>
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <form action={deleteInterview}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="next" value="/upcoming" />
                  <Button type="submit" variant="danger" className="w-full">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <aside className="space-y-4">
        <Card className="glass-panel animate-slideUp stagger-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-sky-200" />
              <CardTitle>Closest first</CardTitle>
            </div>
            <CardDescription>This view is sorted by scheduled date, so the next interview stays at the top.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
              Future-dated interviews are tracked here.
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
              Interviews without a date stay in History until you schedule them.
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
