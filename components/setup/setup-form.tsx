"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileText, Languages, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const scenarios = [
  "Local software house technical round",
  "Remote product company screening",
  "Final HR and salary discussion",
  "Freelance client-facing interview"
];

export function SetupForm() {
  const [accent, setAccent] = useState("pakistani-english");
  const [scenario, setScenario] = useState(scenarios[0]);
  const [difficulty, setDifficulty] = useState(62);
  const [jobDescription, setJobDescription] = useState(
    "Frontend Engineer role with React, Next.js, API integration, performance optimization, and team collaboration."
  );

  const readiness = useMemo(() => {
    const lengthScore = Math.min(45, Math.round(jobDescription.length / 8));
    return Math.min(100, 35 + lengthScore + Math.round(difficulty / 5));
  }, [difficulty, jobDescription]);

  return (
    <div className="relative grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <div className="floating-strip -left-8 top-20 hidden h-10 w-40 animate-drift lg:block" />
      <Card className="glass-panel animate-slideUp">
        <CardHeader>
          <Badge tone="indigo">Interview setup</Badge>
          <CardTitle className="text-2xl">Shape the mock interview before the voice room starts.</CardTitle>
          <CardDescription>
            Add the role, company style, and regional context so your practice questions feel closer to the real round.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-sky-200" />
              Job description or target role
            </span>
            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              className="min-h-44 w-full resize-none rounded-md border border-input bg-slate-950/55 p-4 text-sm leading-6 outline-none transition placeholder:text-muted-foreground focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              placeholder="Paste JD, responsibilities, tech stack, company style, or expected interview questions..."
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Languages className="h-4 w-4 text-indigo-200" />
                Accent and language model
              </span>
              <select
                value={accent}
                onChange={(event) => setAccent(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              >
                <option value="pakistani-english">Pakistani English</option>
                <option value="indian-english">Indian English</option>
                <option value="neutral-global">Neutral global English</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <BriefcaseBusiness className="h-4 w-4 text-rose-200" />
                Interview scenario
              </span>
              <select
                value={scenario}
                onChange={(event) => setScenario(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              >
                {scenarios.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="h-4 w-4 text-sky-200" />
              Difficulty
              <span className="text-muted-foreground">{difficulty}%</span>
            </span>
            <input
              type="range"
              min="20"
              max="95"
              value={difficulty}
              onChange={(event) => setDifficulty(Number(event.target.value))}
              className="w-full accent-indigo-300"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/interview">
                Continue to Voice Room
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/report/demo">Skip to Demo Report</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <aside className="space-y-4">
        <Card className="glass-panel animate-slideUp stagger-1">
          <CardHeader>
            <CardTitle>Context packet</CardTitle>
            <CardDescription>Your interview room will use this setup to guide the session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <p className="text-muted-foreground">Accent model</p>
              <p className="mt-1 font-medium">{accent.replace("-", " ")}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <p className="text-muted-foreground">Scenario</p>
              <p className="mt-1 font-medium">{scenario}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <p className="text-muted-foreground">Setup readiness</p>
              <p className="mt-1 text-3xl font-semibold">{readiness}%</p>
              <p className="mt-2 text-muted-foreground">Enough detail for realistic questions and local feedback.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slideUp stagger-2 border-sky-200/15 bg-sky-300/10">
          <CardContent className="p-5 text-sm leading-6 text-sky-50">
            Add company-specific notes such as service-based agency culture, client communication, notice-period
            expectations, or local salary negotiation style.
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
