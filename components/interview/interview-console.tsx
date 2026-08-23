"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Clock3, Mic, MicOff, PhoneOff, Radio, Volume2 } from "lucide-react";
import { AudioWaveform } from "@/components/interview/audio-waveform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const questions = [
  "Tell me about a frontend project where you handled API integration under pressure.",
  "How would you optimize a Next.js page that feels slow on a local client demo?",
  "Describe a time you explained a technical tradeoff to a non-technical stakeholder."
];

export function InterviewConsole() {
  const [status, setStatus] = useState<"listening" | "ai-speaking" | "muted" | "idle">("listening");
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

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

  return (
    <div className="relative grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="floating-strip right-16 top-10 hidden h-11 w-52 animate-drift lg:block" />
      <section className="space-y-5">
        <Card className="glass-panel animate-slideUp">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <Badge tone={status === "muted" ? "rose" : status === "ai-speaking" ? "blue" : "indigo"}>
                {status === "muted" ? "Muted" : status === "ai-speaking" ? "AI Speaking..." : "Listening..."}
              </Badge>
              <CardTitle className="mt-4 text-2xl">Live voice interview</CardTitle>
              <CardDescription>
                Keep your answer natural. The room shows who is speaking, session time, and mic state.
              </CardDescription>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-right">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                Session
              </div>
              <p className="mt-1 text-2xl font-semibold">{formattedTime}</p>
            </div>
          </CardHeader>
          <CardContent>
            <AudioWaveform mode={status} />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button onClick={() => setStatus("listening")} variant={status === "listening" ? "default" : "outline"}>
                <Mic className="h-4 w-4" />
                Listening
              </Button>
              <Button onClick={() => setStatus("ai-speaking")} variant={status === "ai-speaking" ? "default" : "outline"}>
                <Volume2 className="h-4 w-4" />
                AI Speaking
              </Button>
              <Button onClick={toggleMute} variant={muted ? "danger" : "secondary"}>
                {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {muted ? "Unmute" : "Mute"}
              </Button>
              <Button asChild variant="outline">
                <Link href="/report/demo">
                  <PhoneOff className="h-4 w-4" />
                  End and Analyze
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel animate-slideUp stagger-1">
          <CardHeader>
            <CardTitle>Conversation prompt queue</CardTitle>
            <CardDescription>Upcoming prompts help you stay oriented during the practice round.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions.map((question, index) => (
              <div key={question} className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-indigo-200/30 hover:bg-white/[0.055]">
                <p className="text-xs text-muted-foreground">Question {index + 1}</p>
                <p className="mt-1 text-sm">{question}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-5">
        <Card className="glass-panel animate-slideUp stagger-2">
          <CardHeader>
            <CardTitle>Session checklist</CardTitle>
            <CardDescription>Small cues that keep your practice focused.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              "Answer out loud, not in your head",
              "Pause briefly before technical examples",
              "Use one clear project story per answer",
              "End with a result or measurable impact"
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 transition hover:border-indigo-200/30 hover:bg-white/[0.055]">
                <Radio className="mt-0.5 h-4 w-4 text-indigo-200" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="animate-slideUp stagger-3 border-rose-200/15 bg-rose-300/10">
          <CardContent className="p-5 text-sm leading-6 text-rose-50">
            You can switch states manually in this prototype. Later, the voice engine will update the room automatically.
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
