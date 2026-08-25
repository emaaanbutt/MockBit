"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, FileSearch, MessageSquareText, Mic2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SavedInterview } from "@/lib/interviews";
import { cn } from "@/lib/utils";

type ReportDashboardProps = {
  interview: SavedInterview;
};

export function ReportDashboard({ interview }: ReportDashboardProps) {
  const report = interview.report;
  const [expandedId, setExpandedId] = useState(report?.comparisons[0]?.id ?? "");

  if (!report) {
    return (
      <Card className="glass-panel animate-slideUp">
        <CardHeader>
          <Badge tone="slate">Analysis pending</Badge>
          <CardTitle className="mt-3 text-2xl">{interview.roleTitle} report is not ready yet.</CardTitle>
          <CardDescription>
            The practice session is saved. A feedback report will appear here after transcript analysis is available.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href={`/interview/${interview.id}`}>
              <Mic2 className="h-4 w-4" />
              Practice Again
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const scores = [
    {
      label: "Confidence",
      score: report.confidenceScore,
      summary: "Confidence score from the saved evaluation."
    },
    {
      label: "Technical",
      score: report.technicalScore,
      summary: "Technical clarity score from the saved evaluation."
    },
    {
      label: "Delivery",
      score: report.deliveryScore,
      summary: "Delivery and pacing score from the saved evaluation."
    }
  ];

  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <Card className="glass-panel animate-slideUp">
          <CardHeader>
            <Badge tone="blue">Post-interview analytics</Badge>
            <CardTitle className="mt-3 text-2xl">{interview.roleTitle} report</CardTitle>
            <CardDescription>
              Structured feedback for confidence, technical clarity, delivery, and local interview expectations.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {scores.map((score) => (
              <div key={score.label} className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-indigo-200/30 hover:bg-white/[0.055]">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{score.label}</p>
                  <p className="text-2xl font-semibold">{score.score}</p>
                </div>
                <Progress value={score.score} className="mt-4" />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{score.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-panel animate-slideUp stagger-1">
          <CardHeader>
            <CardTitle>Filler and tone</CardTitle>
            <CardDescription>Quick signals for delivery cleanup.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {report.fillerWords.length === 0 ? (
              <div className="rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-muted-foreground">
                No filler words were saved for this report.
              </div>
            ) : null}
            {report.fillerWords.map((item) => (
              <div key={item.word} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3 transition hover:border-indigo-200/30 hover:bg-white/[0.055]">
                <span className="text-sm">{item.word}</span>
                <Badge tone={item.count > 5 ? "rose" : "slate"}>{item.count} times</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="glass-panel animate-slideUp stagger-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquareText className="h-5 w-5 text-indigo-200" />
            <CardTitle>What You Said vs What They Heard</CardTitle>
          </div>
          <CardDescription>Expandable STAR rewrites help convert rough answers into interview-ready stories.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {report.comparisons.length === 0 ? (
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-muted-foreground">
              No answer comparisons were saved for this report.
            </div>
          ) : null}
          {report.comparisons.map((comparison) => {
            const expanded = expandedId === comparison.id;

            return (
              <div key={comparison.id} className="overflow-hidden rounded-md border border-white/10 bg-white/[0.035] transition hover:border-indigo-200/30">
                <button
                  onClick={() => setExpandedId(expanded ? "" : comparison.id)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <span>
                    <span className="text-xs text-muted-foreground">Question</span>
                    <span className="mt-1 block text-sm font-medium">{comparison.question}</span>
                  </span>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 transition", expanded && "rotate-180")} />
                </button>
                <div className="grid border-t border-white/10 md:grid-cols-2">
                  <div className="p-4">
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">What You Said</p>
                    <p className="text-sm leading-6">{comparison.whatYouSaid}</p>
                  </div>
                  <div className="border-t border-white/10 p-4 md:border-l md:border-t-0">
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">What They Heard</p>
                    <p className="text-sm leading-6">{comparison.whatTheyHeard}</p>
                  </div>
                </div>
                {expanded ? (
                  <div className="border-t border-white/10 bg-slate-950/35 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-200" />
                      <p className="text-sm font-medium">Improved STAR Answer</p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-4">
                      {Object.entries(comparison.improvedStarAnswer).map(([key, value]) => (
                        <div key={key} className="rounded-md border border-white/10 bg-white/[0.035] p-3 transition hover:border-sky-200/30 hover:bg-white/[0.055]">
                          <p className="text-xs font-medium capitalize text-indigo-100">{key}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{value}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 rounded-md border border-sky-200/15 bg-sky-300/10 p-3 text-sm leading-6 text-sky-50">
                      {comparison.localMarketNote}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="glass-panel animate-slideUp stagger-3">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-sky-200" />
            <CardTitle>Next practice plan</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {report.nextPracticePlan.length === 0 ? (
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-muted-foreground">
              No next practice plan was saved for this report.
            </div>
          ) : null}
          {report.nextPracticePlan.map((item) => (
            <div key={item} className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300 transition hover:border-indigo-200/30 hover:bg-white/[0.055]">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
