# MockBit

MockBit is a Next.js App Router frontend for a real-time voice AI interviewer. It is structured so two developers can work in parallel without blocking each other.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Shadcn-style UI primitives in `components/ui`
- Zod for shared contracts and API validation
- Lucide React icons
- Future integrations: Vapi, Deepgram, OpenAI Realtime, or any custom LLM route

## Ownership Split

### Member A: Live Voice Session

Primary route: `/interview`

Owned files:

- `components/interview/*`
- `lib/realtime-voice.ts`
- Future secure provider routes under `app/api/voice/*`

Responsibilities:

- Mic permission and audio stream lifecycle
- WebSocket/WebRTC provider connection
- Realtime transcript events
- AI speaking/listening/interrupt state
- Mute, unmute, end session, and session timer behavior

### Member B: AI Report Generator

Primary route: `/report/[id]`

Owned files:

- `components/report/*`
- `app/api/analyze-transcript/route.ts`
- Evaluation prompts and model output parsing

Responsibilities:

- Transcript analysis request and response validation
- Confidence, technical, and delivery scoring
- What You Said vs What They Heard comparison
- Improved STAR answer generation
- Filler-word and tone analysis

## Shared Layer

Shared files:

- `app/page.tsx`
- `app/setup/page.tsx`
- `components/setup/*`
- `components/shared/*`
- `components/ui/*`
- `types/interview.ts`

Both modules should depend on `types/interview.ts` for Transcript, AudioSession, and EvaluationReport contracts.

## Local/Regional Context

The setup flow includes accent and scenario controls for Indian/Pakistani English, local tech slang, and regional job-market interview patterns such as service-based software houses, client-facing pressure, remote roles, and salary/HR discussion.
