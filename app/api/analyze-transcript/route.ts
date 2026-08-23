import { NextResponse } from "next/server";
import { z } from "zod";
import {
  EvaluationReportSchema,
  HeardComparisonSchema,
  ScoreSchema,
  TranscriptTurnSchema
} from "@/types/interview";

const AnalyzeTranscriptRequestSchema = z.object({
  interviewId: z.string().default("interview-demo"),
  candidateName: z.string().default("Candidate"),
  roleTitle: z.string().default("Frontend Engineer"),
  region: z.enum(["india", "pakistan", "remote-south-asia", "global"]).default("remote-south-asia"),
  transcript: z.array(TranscriptTurnSchema).min(1)
});

const AnalyzeTranscriptResponseSchema = EvaluationReportSchema;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = AnalyzeTranscriptRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid transcript payload",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const candidateTurns = parsed.data.transcript.filter((turn) => turn.speaker === "candidate");
  const text = candidateTurns.map((turn) => turn.text).join(" ");
  const fillerCounts = countFillers(text);

  const response = AnalyzeTranscriptResponseSchema.parse({
    id: `report-${parsed.data.interviewId}`,
    interviewId: parsed.data.interviewId,
    candidateName: parsed.data.candidateName,
    roleTitle: parsed.data.roleTitle,
    region: parsed.data.region,
    createdAt: new Date().toISOString(),
    scores: {
      confidence: makeScore("Confidence", 78, "You maintained clear intent and recovered well after pauses."),
      technical: makeScore("Technical", 74, "Your technical answer is usable, but needs sharper tradeoffs and impact."),
      delivery: makeScore("Delivery", 84, "Pacing is strong. Reduce repeated filler words for a cleaner impression.")
    },
    comparisons: buildComparisons(candidateTurns),
    fillerWords: fillerCounts,
    nextPracticePlan: [
      "Convert each project answer into a four-part STAR story.",
      "Add measurable outcomes, even if they are estimates from a student or internship project.",
      "Practice one local software-house scenario with changing requirements and client pressure."
    ]
  });

  return NextResponse.json(response);
}

function makeScore(label: string, score: number, summary: string): z.infer<typeof ScoreSchema> {
  return {
    label,
    score,
    summary,
    evidence: ["Transcript clarity", "Answer structure", "Regional context fit"]
  };
}

function buildComparisons(turns: Array<z.infer<typeof TranscriptTurnSchema>>): Array<z.infer<typeof HeardComparisonSchema>> {
  return turns.slice(0, 3).map((turn, index) => ({
    id: `comparison-${index + 1}`,
    question: `Candidate answer ${index + 1}`,
    whatYouSaid: turn.text,
    whatTheyHeard:
      "The answer communicates experience, but the interviewer may miss the exact challenge, ownership, and business result.",
    localMarketNote:
      "Mention practical constraints common in Indian/Pakistani software teams, such as client changes, handoff delays, deadlines, or coordination with backend.",
    improvedStarAnswer: {
      situation: "Set the scene with the project, team, deadline, and why it mattered.",
      task: "State your exact responsibility instead of saying the team handled it.",
      action: "Explain the technical decisions, collaboration steps, and how you handled blockers.",
      result: "Close with a measurable or clearly observable outcome."
    }
  }));
}

function countFillers(text: string) {
  const fillers = ["umm", "uh", "like", "basically", "actually", "you know"];
  const lower = text.toLowerCase();

  return fillers
    .map((word) => ({
      word,
      count: (lower.match(new RegExp(`\\b${word}\\b`, "g")) ?? []).length
    }))
    .filter((item) => item.count > 0);
}
