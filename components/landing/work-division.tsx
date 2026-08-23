import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const divisions = [
  {
    owner: "Member A",
    title: "Live Voice Session",
    route: "/interview",
    focus: "Realtime audio pipeline, turn-taking, waveform states, and provider integration.",
    stack: ["WebRTC", "WebSocket", "Vapi", "Deepgram", "OpenAI Realtime"],
    deliverables: [
      "Mic permission and device state handling",
      "Streaming speech-to-text and AI text-to-speech hooks",
      "Interruptions, mute state, timers, and audio-level events",
      "Provider-safe service boundary in /lib/realtime-voice.ts"
    ]
  },
  {
    owner: "Member B",
    title: "AI Report Generator",
    route: "/report/[id]",
    focus: "Transcript analysis, scoring, STAR answer rewriting, and structured LLM outputs.",
    stack: ["Next API Route", "Server Actions", "Zod", "LLM JSON mode", "Prompt evals"],
    deliverables: [
      "Transcript schema validation and report JSON contract",
      "Confidence, technical, and delivery score calculation",
      "What You Said vs What They Heard comparison engine",
      "Regional English, local slang, and job-market feedback prompts"
    ]
  }
];

export function WorkDivision() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-3xl">
        <Badge tone="blue">Parallel build plan</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal">Two independent modules, one shared foundation.</h2>
        <p className="mt-3 text-muted-foreground">
          The frontend is complete enough for both teammates to integrate their AI APIs later. Shared types keep the
          handoff predictable, while each module has its own route, UI, and integration surface.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {divisions.map((item) => (
          <Card key={item.owner} className="glass-panel">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={item.owner === "Member A" ? "indigo" : "rose"}>{item.owner}</Badge>
                <Badge>{item.route}</Badge>
              </div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription>{item.focus}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-5 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span key={tech} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-300" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
