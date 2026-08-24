"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bot, Clock3, MessageCircle, Mic, MicOff, PhoneOff, Send, Volume2, X } from "lucide-react";
import { AudioWaveform } from "@/components/interview/audio-waveform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { upcomingInterviews } from "@/lib/dashboard-data";

type InterviewConsoleProps = {
  interview: (typeof upcomingInterviews)[number];
};

export function InterviewConsole({ interview }: InterviewConsoleProps) {
  const [status, setStatus] = useState<"listening" | "ai-speaking" | "muted" | "idle">("idle");
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [started]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  }, [seconds]);

  function toggleMute() {
    setMuted((value) => !value);
    setStatus(muted ? "listening" : "muted");
  }

  function startSession() {
    setStarted(true);
    setStatus("listening");
  }

  return (
    <div className="relative grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="min-w-0 space-y-5">
        <Card className="glass-panel animate-slideUp">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge tone={status === "muted" ? "rose" : status === "ai-speaking" ? "blue" : "indigo"}>
                {!started ? "Ready when you are" : status === "muted" ? "Muted" : status === "ai-speaking" ? "AI Speaking..." : "Listening..."}
              </Badge>
              <CardTitle className="mt-4 text-2xl">{interview.role} practice</CardTitle>
              <CardDescription>
                Tailored for {interview.company}. Start the session only when you are ready to answer out loud.
              </CardDescription>
            </div>
            <div className="w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-left sm:w-auto sm:text-right">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                Session
              </div>
              <p className="mt-1 text-2xl font-semibold">{formattedTime}</p>
            </div>
          </CardHeader>
          <CardContent>
            {!started ? (
              <div className="rounded-md border border-white/10 bg-slate-950/45 p-6">
                <p className="text-sm text-muted-foreground">Before you begin</p>
                <h2 className="mt-2 text-2xl font-semibold">Are you ready to start this practice interview?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  Sit somewhere quiet, keep the job description in mind, and answer naturally. The AI interviewer will
                  begin after you press start.
                </p>
                <Button onClick={startSession} size="lg" className="mt-6">
                  <Mic className="h-4 w-4" />
                  Start Interview
                </Button>
              </div>
            ) : (
              <AudioWaveform mode={status} />
            )}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex h-11 items-center justify-center gap-2 rounded-md border border-indigo-200/25 bg-indigo-300/15 px-4 text-sm font-medium text-indigo-50">
                <Mic className="h-4 w-4" />
                Listening
              </div>
              <div className="flex h-11 items-center justify-center gap-2 rounded-md border border-sky-200/20 bg-white/[0.035] px-4 text-sm font-medium text-slate-200">
                <Volume2 className="h-4 w-4" />
                AI Speaking
              </div>
              <Button onClick={toggleMute} variant={muted ? "danger" : "secondary"} disabled={!started}>
                {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {muted ? "Unmute" : "Mute"}
              </Button>
              <Button asChild variant="outline" className={!started ? "pointer-events-none opacity-50" : ""}>
                <Link href="/report/demo">
                  <PhoneOff className="h-4 w-4" />
                  End and Analyze
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {started ? (
          <Card className="glass-panel animate-slideUp stagger-1">
            <CardHeader>
              <CardTitle>Live transcript</CardTitle>
              <CardDescription>The transcript will fill automatically after the voice engine is connected.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs text-muted-foreground">AI interviewer</p>
                <p className="mt-1 text-sm">Session started. The first question will appear here once live AI is connected.</p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </section>

      <aside className="min-w-0 space-y-5">
        <Card className="glass-panel animate-slideUp stagger-2">
          <CardHeader>
            <CardTitle>Interview context</CardTitle>
            <CardDescription>Everything here is specific to this practice room.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
              <p className="text-muted-foreground">Company</p>
              <p className="mt-1 font-medium">{interview.company}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
              <p className="text-muted-foreground">Role focus</p>
              <p className="mt-1 leading-6">{interview.description}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
              <p className="text-muted-foreground">Schedule</p>
              <p className="mt-1 font-medium">{interview.date} at {interview.time}</p>
            </div>
          </CardContent>
        </Card>
      </aside>

      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-md border border-indigo-200/30 bg-indigo-300 text-slate-950 shadow-2xl shadow-black/30 transition hover:-translate-y-1"
        aria-label="Open interview helper"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {chatOpen ? (
        <div className="fixed bottom-20 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-lg border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-sky-200" />
                <h2 className="font-semibold">Interview helper</h2>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Ask about {interview.role}, the JD, likely questions, or topics to revise before this session.
              </p>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label="Close helper">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-slate-300">
            I can help you revise role-specific topics before or during practice. Backend chat memory will connect later.
          </div>
          <div className="mt-3 flex gap-2">
            <input
              className="h-10 min-w-0 flex-1 rounded-md border border-input bg-slate-950/70 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              placeholder="Ask about this interview..."
            />
            <Button size="icon" aria-label="Send helper message">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
