"use client";

import { useState } from "react";
import { ChevronDown, FileSearch, MessageSquareText, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { EvaluationReport } from "@/types/interview";
import { cn } from "@/lib/utils";

const report: EvaluationReport = {
  id: "report-demo",
  interviewId: "demo",
  candidateName: "Candidate",
  roleTitle: "Frontend Engineer",
  region: "pakistan",
  createdAt: new Date().toISOString(),
  scores: {
    confidence: {
      label: "Confidence",
      score: 82,
      summary: "You sounded steady and clear, especially when describing ownership and deadlines.",
      evidence: ["Direct opening answers", "Good recovery after pauses", "Clearer tone in project examples"]
    },
    technical: {
      label: "Technical",
      score: 76,
      summary: "Good React and API explanation, but system-design depth needs more structure.",
      evidence: ["Mentioned caching", "Explained component state", "Missed tradeoffs for SSR vs CSR"]
    },
    delivery: {
      label: "Delivery",
      score: 88,
      summary: "Strong pacing with only a few filler words. STAR structure can make answers sharper.",
      evidence: ["Good pauses", "Low filler count", "Result section sometimes too short"]
    }
  },
  fillerWords: [
    { word: "basically", count: 4 },
    { word: "like", count: 6 },
    { word: "umm", count: 3 }
  ],
  nextPracticePlan: [
    "Prepare two STAR stories for client-pressure and production-bug scenarios.",
    "Add exact impact numbers: page speed, conversion, ticket reduction, or delivery time saved.",
    "Practice one local software-house scenario with client communication and changing requirements."
  ],
  comparisons: [
    {
      id: "c1",
      question: "Tell me about a frontend project where you handled API integration under pressure.",
      whatYouSaid:
        "I integrated APIs in Next.js and handled loading states. There were some deadline issues but I managed them and coordinated with backend.",
      whatTheyHeard:
        "You can integrate APIs, but the answer needs clearer stakes, ownership, and measurable result.",
      localMarketNote:
        "For local software-house interviews, mention client deadline, backend coordination, and how you handled unclear requirements.",
      improvedStarAnswer: {
        situation:
          "In my final-semester project, our team had to demo a Next.js dashboard while backend endpoints were still changing.",
        task:
          "I owned the frontend API layer, loading states, error handling, and making sure the demo did not break during client-style review.",
        action:
          "I created typed service functions, mocked unstable responses, added retry and empty states, and synced daily with the backend member.",
        result:
          "The demo ran smoothly, the UI handled API delays gracefully, and our team reduced last-minute bugs before submission."
      }
    },
    {
      id: "c2",
      question: "How would you optimize a slow Next.js page?",
      whatYouSaid:
        "I would check images, lazy load components, and use caching. I would also look at Lighthouse and reduce bundle size.",
      whatTheyHeard:
        "Solid checklist, but it needs diagnosis order and reasons behind each optimization.",
      localMarketNote:
        "Interviewers often ask this to see practical debugging maturity, not only names of tools.",
      improvedStarAnswer: {
        situation: "A product listing page felt slow on mid-range laptops during a stakeholder review.",
        task: "I had to identify the bottleneck and improve perceived load time without changing the whole architecture.",
        action:
          "I profiled the route, optimized images, moved non-critical widgets behind dynamic imports, cached repeated API calls, and tightened loading skeletons.",
        result: "The page became visibly faster and the review team could navigate without awkward waiting between filters."
      }
    }
  ]
};

export function ReportDashboard() {
  const [expandedId, setExpandedId] = useState(report.comparisons[0]?.id);

  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <Card className="glass-panel animate-slideUp">
          <CardHeader>
            <Badge tone="blue">Post-interview analytics</Badge>
            <CardTitle className="mt-3 text-2xl">{report.roleTitle} report</CardTitle>
            <CardDescription>
              Structured feedback for confidence, technical clarity, delivery, and local interview expectations.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {Object.values(report.scores).map((score) => (
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
