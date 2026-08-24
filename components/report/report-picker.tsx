import Link from "next/link";
import { FileText, Search } from "lucide-react";
import { completedReports } from "@/lib/dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ReportPicker() {
  return (
    <div className="space-y-4">
      <Card className="glass-panel animate-slideUp">
        <CardHeader>
          <CardTitle>Select a feedback report</CardTitle>
          <CardDescription>Reports appear here after a practice session has ended and analysis is ready.</CardDescription>
        </CardHeader>
      </Card>

      {completedReports.map((item, index) => (
        <Card key={item.id} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.06}s` }}>
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_170px_180px] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="blue">{item.date}</Badge>
                <Badge>{item.duration}</Badge>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{item.role}</h2>
              <p className="text-sm text-muted-foreground">{item.company}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{item.summary}</p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                Average score
              </div>
              <p className="mb-2 text-2xl font-semibold">{item.averageScore}</p>
              <Progress value={item.averageScore} />
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
