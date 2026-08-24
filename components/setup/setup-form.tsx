"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BriefcaseBusiness,
  CalendarClock,
  FileText,
  Languages,
  Link2,
  MapPin,
  SlidersHorizontal
} from "lucide-react";
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
  const [roleTitle, setRoleTitle] = useState("Frontend Engineer");
  const [company, setCompany] = useState("Local software house");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [mode, setMode] = useState("Google Meet");
  const [jobDescription, setJobDescription] = useState(
    "Frontend Engineer role with React, Next.js, API integration, performance optimization, and team collaboration."
  );

  const readiness = useMemo(() => {
    const lengthScore = Math.min(45, Math.round(jobDescription.length / 8));
    return Math.min(100, 35 + lengthScore + Math.round(difficulty / 5));
  }, [difficulty, jobDescription]);

  return (
    <div className="relative grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <Card className="glass-panel animate-slideUp">
        <CardHeader>
          <Badge tone="indigo">New interview</Badge>
          <CardTitle className="text-2xl">Add your real interview details.</CardTitle>
          <CardDescription>
            Save the role, schedule, meeting link, and job context. Then start a practice session built around this interview.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <BriefcaseBusiness className="h-4 w-4 text-rose-200" />
                Role title
              </span>
              <input
                value={roleTitle}
                onChange={(event) => setRoleTitle(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
                placeholder="AI Engineer, Graphic Designer, HR round..."
              />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-sky-200" />
                Company or interview source
              </span>
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
                placeholder="Company name, recruiter, freelance client..."
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <CalendarClock className="h-4 w-4 text-indigo-200" />
                Date
              </span>
              <input
                type="date"
                value={interviewDate}
                onChange={(event) => setInterviewDate(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <CalendarClock className="h-4 w-4 text-indigo-200" />
                Time
              </span>
              <input
                type="time"
                value={interviewTime}
                onChange={(event) => setInterviewTime(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-rose-200" />
                Mode
              </span>
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              >
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Phone call</option>
                <option>In person</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Link2 className="h-4 w-4 text-sky-200" />
              Meeting link or location
            </span>
            <input
              value={meetingLink}
              onChange={(event) => setMeetingLink(event.target.value)}
              className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              placeholder="Google Meet link, Zoom link, office address, or recruiter call note..."
            />
          </label>

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
                Interview style
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
                Start Practicing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">Save for Later</Link>
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
              <p className="text-muted-foreground">Interview</p>
              <p className="mt-1 font-medium">{roleTitle || "Role title"}</p>
              <p className="mt-1 text-xs text-muted-foreground">{company || "Company"}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <p className="text-muted-foreground">Schedule</p>
              <p className="mt-1 font-medium">{interviewDate || "Pick a date"} {interviewTime ? `at ${interviewTime}` : ""}</p>
              <p className="mt-1 text-xs text-muted-foreground">{mode}{meetingLink ? ` · ${meetingLink}` : ""}</p>
            </div>
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
            <div className="mb-3 flex items-center gap-2 font-medium">
              <BellRing className="h-4 w-4" />
              Reminder plan
            </div>
            You will be able to receive in-app and email reminders before the interview, plus final tips for online or
            in-person rounds.
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
