import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, CalendarClock, Edit3, ExternalLink, FileText, MapPin, Mic2, Trash2 } from "lucide-react";
import { deleteInterview } from "@/app/interview/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PendingSubmitButton } from "@/components/shared/pending-submit-button";
import {
  formatDuration,
  formatInterviewDate,
  formatInterviewTime,
  getPrepReadiness,
  type SavedInterview
} from "@/lib/interviews";

type InterviewPreviewProps = {
  interview: SavedInterview;
  backHref: string;
};

function DetailBlock({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <div className="mt-2 text-sm leading-6 text-slate-200">{value}</div>
    </div>
  );
}

export function InterviewPreview({ interview, backHref }: InterviewPreviewProps) {
  const readiness = getPrepReadiness(interview);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/interview/${interview.id}`}>
            <Mic2 className="h-4 w-4" />
            Practice
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/setup?interview=${interview.id}`}>
            <Edit3 className="h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="glass-panel animate-slideUp">
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              <Badge tone="indigo">{formatInterviewDate(interview.scheduledAt)}</Badge>
              <Badge tone="blue">{formatInterviewTime(interview.scheduledAt)}</Badge>
              <Badge>{interview.interviewMode ?? "Mode not added"}</Badge>
              <Badge tone={interview.status === "completed" ? "blue" : "slate"}>{interview.status}</Badge>
            </div>
            <CardTitle className="mt-3 text-3xl">{interview.roleTitle}</CardTitle>
            <CardDescription>{interview.companyName ?? "No company added"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <DetailBlock label="Company / source" value={interview.companyName ?? "Not added"} />
              <DetailBlock label="Interview style" value={interview.companyStyle} />
              <DetailBlock label="Region" value={interview.region.replaceAll("-", " ")} />
              <DetailBlock label="Accent model" value={interview.accentModel.replaceAll("-", " ")} />
              <DetailBlock
                label="Schedule"
                value={
                  interview.scheduledAt
                    ? `${formatInterviewDate(interview.scheduledAt)} at ${formatInterviewTime(interview.scheduledAt)}`
                    : "No schedule added"
                }
              />
              <DetailBlock label="Practice duration" value={formatDuration(interview.durationSeconds)} />
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-sky-200" />
                <h2 className="font-semibold">Job description / interview notes</h2>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">{interview.jobDescription}</p>
            </div>
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card className="glass-panel animate-slideUp stagger-1">
            <CardHeader>
              <CardTitle>Access</CardTitle>
              <CardDescription>Meeting link, location, and quick actions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {interview.meetingLink ? (
                <Button asChild className="w-full" variant="outline">
                  <Link href={interview.meetingLink} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Open Meeting Link
                  </Link>
                </Button>
              ) : (
                <div className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-muted-foreground">
                  <MapPin className="mb-2 h-4 w-4" />
                  {interview.locationNote ?? "No meeting link or location added yet."}
                </div>
              )}

              <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>Prep readiness</span>
                  <span>{readiness}%</span>
                </div>
                <Progress value={readiness} />
              </div>

              <form action={deleteInterview}>
                <input type="hidden" name="id" value={interview.id} />
                <input type="hidden" name="next" value={backHref} />
                <PendingSubmitButton type="submit" variant="danger" className="w-full" pendingLabel="Deleting...">
                  <Trash2 className="h-4 w-4" />
                  Delete Interview
                </PendingSubmitButton>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-panel animate-slideUp stagger-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-sky-200" />
                <CardTitle>Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <DetailBlock label="Created" value={new Date(interview.createdAt).toLocaleString()} />
              <DetailBlock label="Last updated" value={new Date(interview.updatedAt).toLocaleString()} />
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}
