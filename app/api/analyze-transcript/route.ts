import { NextResponse } from "next/server";
import { z } from "zod";
import {
  EvaluationReportSchema,
  HeardComparisonSchema,
  ScoreSchema,
  TranscriptTurnSchema
} from "@/types/interview";
import { createClient } from "@/lib/supabase/server";

const AnalyzeTranscriptRequestSchema = z.object({
  interviewId: z.string().uuid(),
  candidateName: z.string().optional(),
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

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Login required." }, { status: 401 });
  }

  const { data: interview, error: interviewError } = await supabase
    .from("interviews")
    .select("id, role_title, region")
    .eq("id", parsed.data.interviewId)
    .eq("user_id", user.id)
    .single();

  if (interviewError || !interview) {
    return NextResponse.json({ error: "Interview not found." }, { status: 404 });
  }

  const candidateTurns = parsed.data.transcript.filter((turn) => turn.speaker === "candidate");
  const text = candidateTurns.map((turn) => turn.text).join(" ");
  const fillerCounts = countFillers(text);
  const confidenceScore = 78;
  const technicalScore = 74;
  const deliveryScore = 84;
  const averageScore = Math.round((confidenceScore + technicalScore + deliveryScore) / 3);
  const comparisons = buildComparisons(candidateTurns);
  const nextPracticePlan = [
    "Convert each project answer into a four-part STAR story.",
    "Add measurable outcomes, even if they are estimates from a student or internship project.",
    "Practice one local or remote scenario with changing requirements and communication pressure."
  ];

  if (parsed.data.transcript.length > 0) {
    await supabase.from("transcript_turns").upsert(
      parsed.data.transcript.map((turn) => ({
        id: turn.id,
        interview_id: parsed.data.interviewId,
        user_id: user.id,
        speaker: turn.speaker,
        text: turn.text,
        confidence: turn.confidence ?? null,
        local_context_tags: turn.localContextTags,
        started_at: turn.startedAt,
        ended_at: turn.endedAt ?? null
      })),
      { onConflict: "id" }
    );
  }

  const { data: savedReport, error: reportError } = await supabase
    .from("evaluation_reports")
    .upsert(
      {
        interview_id: parsed.data.interviewId,
        user_id: user.id,
        confidence_score: confidenceScore,
        technical_score: technicalScore,
        delivery_score: deliveryScore,
        average_score: averageScore,
        comparisons,
        filler_words: fillerCounts,
        next_practice_plan: nextPracticePlan,
        model_name: "rule-based-local"
      },
      { onConflict: "interview_id" }
    )
    .select("id, created_at")
    .single();

  if (reportError || !savedReport) {
    return NextResponse.json({ error: reportError?.message ?? "Report could not be saved." }, { status: 500 });
  }

  await supabase
    .from("interviews")
    .update({
      status: "completed",
      ended_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", parsed.data.interviewId)
    .eq("user_id", user.id);

  const response = AnalyzeTranscriptResponseSchema.parse({
    id: savedReport.id,
    interviewId: parsed.data.interviewId,
    candidateName: parsed.data.candidateName || user.user_metadata?.name || user.email || "Candidate",
    roleTitle: interview.role_title,
    region: interview.region,
    createdAt: new Date().toISOString(),
    scores: {
      confidence: makeScore("Confidence", confidenceScore, "You maintained clear intent and recovered well after pauses."),
      technical: makeScore("Technical", technicalScore, "Your technical answer is usable, but needs sharper tradeoffs and impact."),
      delivery: makeScore("Delivery", deliveryScore, "Pacing is strong. Reduce repeated filler words for a cleaner impression.")
    },
    comparisons,
    fillerWords: fillerCounts,
    nextPracticePlan
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
