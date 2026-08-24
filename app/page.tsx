import Link from "next/link";
import { ArrowRight, BarChart3, Clock3, Globe2, History, Mic2, ShieldCheck, Sparkles } from "lucide-react";
import { TopNav } from "@/components/shared/top-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Mic2,
    title: "Real-time voice practice",
    body: "A live interview room with waveform feedback, speaking states, mute controls, and timer-led session flow."
  },
  {
    icon: BarChart3,
    title: "Post-interview analytics",
    body: "Scorecards, transcript comparisons, improved STAR answers, filler-word checks, and action-focused feedback."
  },
  {
    icon: Globe2,
    title: "Local interview context",
    body: "Indian and Pakistani English accent support, regional tech slang, and software-house style interview scenarios."
  }
];

const journey = [
  "Paste your target role",
  "Practice a voice interview",
  "Review your AI report",
  "Track progress over time"
];

export default function HomePage() {
  return (
    <main>
      <TopNav />
      <section className="relative overflow-hidden">
        <div className="grid-fade absolute inset-0" />
        <div className="floating-strip right-[5%] top-28 hidden h-12 w-44 animate-floatPanel stagger-2 xl:block" />
        <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="animate-slideUp">
            <Badge tone="indigo">Real-Time Voice AI Interviewer</Badge>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              MockBit makes interview practice feel alive.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Practice voice interviews that feel closer to local hiring conversations, then turn the transcript into
              precise coaching for confidence, technical clarity, and delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/login?next=%2Fdashboard">
                  Start a Mock Interview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#flow">See how it works</Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {journey.map((step, index) => (
                <div
                  key={step}
                  className="animate-slideUp rounded-md border border-white/10 bg-white/[0.035] p-3 text-slate-300"
                  style={{ animationDelay: `${0.12 + index * 0.08}s` }}
                >
                  <span className="mb-2 block text-xs text-muted-foreground">0{index + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div className="calm-ring animate-floatPanel rounded-lg border border-white/10 bg-slate-950/45 p-4 backdrop-blur-xl">
            <div className="rounded-md border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Live room preview</p>
                  <h2 className="mt-1 text-xl font-semibold">Your interviewer is listening</h2>
                </div>
                <span className="rounded-md bg-indigo-300/15 px-3 py-1 text-sm text-indigo-100">Listening...</span>
              </div>
              <div className="mt-10 flex h-36 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4">
                {Array.from({ length: 34 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-20 w-1.5 origin-center rounded-full bg-indigo-200/80"
                    style={{
                      animation: `wave ${0.85 + (index % 9) * 0.05}s ease-in-out infinite`,
                      animationDelay: `${index * 0.035}s`
                    }}
                  />
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Confidence 82", "Technical 76", "Delivery 88"].map((metric) => (
                  <div key={metric} className="animated-sheen animate-shimmer rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm">
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto grid max-w-7xl scroll-mt-24 gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        {features.map((feature, index) => (
          <Card key={feature.title} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.08}s` }}>
            <CardHeader>
              <feature.icon className="h-5 w-5 text-sky-200" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">{feature.body}</CardContent>
          </Card>
        ))}
      </section>
      <section id="flow" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-lg border border-indigo-200/15 bg-indigo-300/10 p-6">
            <Sparkles className="mb-4 h-5 w-5 text-indigo-100" />
            <h2 className="text-3xl font-semibold tracking-normal">Built for repeat practice, not one-off demos.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              MockBit keeps your sessions, scores, transcripts, and improved answers together so you can see whether
              your delivery is getting sharper week by week.
            </p>
            <Button asChild className="mt-6" variant="secondary">
              <Link href="/signup?next=%2Fdashboard">Create Account</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: History, title: "Interview history", body: "Browse previous attempts, report scores, and transcript status." },
              { icon: Clock3, title: "Progress timeline", body: "See confidence, delivery, and technical scores across practice sessions." },
              { icon: ShieldCheck, title: "Private by design", body: "Your practice records stay tied to your account and progress timeline." }
            ].map((item, index) => (
              <Card key={item.title} className="glass-panel animate-slideUp" style={{ animationDelay: `${index * 0.08}s` }}>
                <CardHeader>
                  <item.icon className="h-5 w-5 text-indigo-100" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">{item.body}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-950/45">
          <div className="animated-sheen animate-shimmer h-1" />
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Ready to organize your next interview?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Create an account, add your interview date, and practice with role-specific voice sessions before the real day.
              </p>
            </div>
            <Button asChild>
              <Link href="/login?next=%2Fdashboard">
                Open MockBit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
