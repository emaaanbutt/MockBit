"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  FileText,
  Languages,
  Link2,
  MapPin,
  SlidersHorizontal
} from "lucide-react";
import { saveInterview } from "@/app/interview/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SavedInterview } from "@/lib/interviews";

const scenarios = [
  "Technical round",
  "Screening call",
  "Final HR discussion",
  "Client-facing interview",
  "Portfolio walkthrough",
  "Behavioral interview"
];

type SetupFormProps = {
  initialInterview?: SavedInterview | null;
  error?: string;
  message?: string;
};

function getDatePart(value?: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function getTimePart(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function SetupForm({ initialInterview, error, message }: SetupFormProps) {
  const [accent, setAccent] = useState<string>(initialInterview?.accentModel ?? "pakistani-english");
  const [scenario, setScenario] = useState(initialInterview?.companyStyle ?? "");
  const [region, setRegion] = useState(initialInterview?.region ?? "");
  const [difficulty, setDifficulty] = useState(initialInterview?.difficulty ?? 60);
  const [roleTitle, setRoleTitle] = useState(initialInterview?.roleTitle ?? "");
  const [company, setCompany] = useState(initialInterview?.companyName ?? "");
  const [interviewDate, setInterviewDate] = useState(getDatePart(initialInterview?.scheduledAt));
  const [interviewTime, setInterviewTime] = useState(getTimePart(initialInterview?.scheduledAt));
  const [meetingOrLocation, setMeetingOrLocation] = useState(
    initialInterview?.meetingLink ?? initialInterview?.locationNote ?? ""
  );
  const [mode, setMode] = useState(initialInterview?.interviewMode ?? "");
  const [jobDescription, setJobDescription] = useState(initialInterview?.jobDescription ?? "");

  const readiness = useMemo(() => {
    let score = 0;
    if (roleTitle.trim()) score += 15;
    if (company.trim()) score += 10;
    if (scenario) score += 10;
    if (region) score += 10;
    if (interviewDate) score += 15;
    if (meetingOrLocation.trim()) score += 10;
    score += Math.min(30, Math.round(jobDescription.length / 12));
    return Math.min(100, score);
  }, [company, interviewDate, jobDescription, meetingOrLocation, region, roleTitle, scenario]);

  return (
    <div className="relative grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <form action={saveInterview}>
        <input type="hidden" name="id" value={initialInterview?.id ?? ""} />
        <Card className="glass-panel animate-slideUp">
        <CardHeader>
          <Badge tone="indigo">{initialInterview ? "Edit interview" : "New interview"}</Badge>
          <CardTitle className="text-2xl">
            {initialInterview ? "Update your interview details." : "Add your real interview details."}
          </CardTitle>
          <CardDescription>
            Save the role, schedule, meeting link, and job context. Then start a practice session built around this interview.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error ? (
            <div className="rounded-md border border-rose-300/20 bg-rose-300/10 p-3 text-sm text-rose-50">{error}</div>
          ) : null}
          {message ? (
            <div className="rounded-md border border-sky-300/20 bg-sky-300/10 p-3 text-sm text-sky-50">{message}</div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <BriefcaseBusiness className="h-4 w-4 text-rose-200" />
                Role title
              </span>
              <input
                name="roleTitle"
                value={roleTitle}
                onChange={(event) => setRoleTitle(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
                placeholder="e.g. Frontend Engineer, AI Intern, Product Designer"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-sky-200" />
                Company or interview source
              </span>
              <input
                name="companyName"
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
                name="scheduledDate"
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
                name="scheduledTime"
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
                name="interviewMode"
                value={mode}
                onChange={(event) => setMode(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              >
                <option value="">Select mode</option>
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Phone call">Phone call</option>
                <option value="In person">In person</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Link2 className="h-4 w-4 text-sky-200" />
              Meeting link or location
            </span>
            <input
              name="meetingOrLocation"
              value={meetingOrLocation}
              onChange={(event) => setMeetingOrLocation(event.target.value)}
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
              name="jobDescription"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              className="min-h-44 w-full resize-none rounded-md border border-input bg-slate-950/55 p-4 text-sm leading-6 outline-none transition placeholder:text-muted-foreground focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              placeholder="Paste JD, responsibilities, tech stack, company style, or expected interview questions..."
              required
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Languages className="h-4 w-4 text-indigo-200" />
                Accent and language model
              </span>
              <select
                name="accentModel"
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
                name="companyStyle"
                value={scenario}
                onChange={(event) => setScenario(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
                required
              >
                <option value="">Select style</option>
                {scenarios.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-sky-200" />
              Interview region
            </span>
            <select
              name="region"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              required
            >
              <option value="">Select region</option>
              <option value="pakistan">Pakistan</option>
              <option value="india">India</option>
              <option value="remote-south-asia">Remote South Asia</option>
              <option value="global">Global</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="h-4 w-4 text-sky-200" />
              Difficulty
              <span className="text-muted-foreground">{difficulty}%</span>
            </span>
            <input
              name="difficulty"
              type="range"
              min="20"
              max="95"
              value={difficulty}
              onChange={(event) => setDifficulty(Number(event.target.value))}
              className="w-full accent-indigo-300"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" name="intent" value="practice" size="lg">
              Save and Practice
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button type="submit" name="intent" value="save" variant="outline" size="lg">
              Save for Later
            </Button>
          </div>
        </CardContent>
        </Card>
      </form>

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
              <p className="mt-1 text-xs text-muted-foreground">{mode || "Mode not selected"}{meetingOrLocation ? ` · ${meetingOrLocation}` : ""}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <p className="text-muted-foreground">Accent model</p>
              <p className="mt-1 font-medium">{accent.replace("-", " ")}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <p className="text-muted-foreground">Scenario</p>
              <p className="mt-1 font-medium">{scenario || "Choose a style"}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <p className="text-muted-foreground">Setup readiness</p>
              <p className="mt-1 text-3xl font-semibold">{readiness}%</p>
              <p className="mt-2 text-muted-foreground">Enough detail for realistic questions and local feedback.</p>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
