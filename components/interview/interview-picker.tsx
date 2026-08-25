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
  getPrepReadiness,
  type SavedInterview
} from "@/lib/interviews";

type InterviewPickerProps = {
  interviews: SavedInterview[];
};

export function InterviewPicker({ interviews }: InterviewPickerProps) {
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

      {interviews.length === 0 ? (
        <Card className="glass-panel animate-slideUp">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">No interviews added yet.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Add your first real interview, then it will appear here for practice.
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
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_220px] lg:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge tone="indigo">{formatInterviewDate(item.scheduledAt)}</Badge>
                <Badge tone="blue">{formatInterviewTime(item.scheduledAt)}</Badge>
                <Badge>{item.interviewMode ?? "Mode not added"}</Badge>
              </div>
              <Link
                href={`/interview/${item.id}/preview?back=${encodeURIComponent("/interview")}`}
                className="mt-3 block text-xl font-semibold transition hover:text-indigo-100"
              >
                {item.roleTitle}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{item.companyName ?? "No company added"}</p>
              <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-300">{item.jobDescription}</p>
              <div className="mt-4 max-w-xl">
                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>Prep readiness</span>
                  <span>{getPrepReadiness(item)}%</span>
                </div>
                <Progress value={getPrepReadiness(item)} />
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:items-stretch">
              <Button asChild variant="outline">
                <Link href={`/interview/${item.id}/preview?back=${encodeURIComponent("/interview")}`}>
                  Details
                </Link>
              </Button>
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
              <Button asChild variant="outline">
                <Link href={`/setup?interview=${item.id}`}>
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/interview/${item.id}`}>
                  <Mic2 className="h-4 w-4" />
                  Practice This Interview
                </Link>
              </Button>
              <form action={deleteInterview}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="next" value="/interview" />
                <PendingSubmitButton type="submit" variant="danger" className="w-full" pendingLabel="Deleting...">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </PendingSubmitButton>
              </form>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
