import Link from "next/link";
import { FileText, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDuration, type SavedInterview } from "@/lib/interviews";

type ReportPickerProps = {
  interviews: SavedInterview[];
};

export function ReportPicker({ interviews }: ReportPickerProps) {
  return (
    <div className="space-y-4">
      <Card className="glass-panel animate-slideUp">
        <CardHeader>
          <CardTitle>Select a feedback report</CardTitle>
          <CardDescription>Reports appear here after a practice session has ended and analysis is ready.</CardDescription>
        </CardHeader>
      </Card>

      {interviews.length === 0 ? (
        <Card className="glass-panel animate-slideUp">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">No practiced interviews yet.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Reports will show here after you finish a practice session.
            </p>
            <Button asChild className="mt-5">
              <Link href="/interview">
                <Plus className="h-4 w-4" />
                Start Practice
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {interviews.map((item, index) => (
        <Card key={item.id} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.06}s` }}>
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_170px_180px] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="blue">{new Date(item.endedAt ?? item.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</Badge>
                <Badge>{formatDuration(item.durationSeconds)}</Badge>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{item.roleTitle}</h2>
              <p className="text-sm text-muted-foreground">{item.companyName ?? "No company added"}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                {item.report
                  ? "Analysis is ready for this practice session."
                  : "Practice is saved. Analysis will appear after transcript analysis is available."}
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                Average score
              </div>
              <p className="mb-2 text-2xl font-semibold">{item.report?.averageScore ?? "Pending"}</p>
              <Progress value={item.report?.averageScore ?? 0} />
            </div>
            <Button asChild>
              <Link href={`/report/${item.id}`}>
                <Search className="h-4 w-4" />
                View Report
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
