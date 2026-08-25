import { z } from "zod";

export const TranscriptTurnSchema = z.object({
  id: z.string(),
  speaker: z.enum(["candidate", "ai"]),
  text: z.string().min(1),
  startedAt: z.string(),
  endedAt: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  localContextTags: z.array(z.string()).default([])
});

export const AudioSessionSchema = z.object({
  id: z.string(),
  status: z.enum(["idle", "connecting", "listening", "ai-speaking", "muted", "ended"]),
  startedAt: z.string().optional(),
  endedAt: z.string().optional(),
  selectedAccentModel: z.enum(["indian-english", "pakistani-english", "neutral-global"]),
  provider: z.enum(["vapi", "deepgram", "openai-realtime", "custom"]),
  transcript: z.array(TranscriptTurnSchema)
});

export const ScoreSchema = z.object({
  label: z.string(),
  score: z.number().min(0).max(100),
  summary: z.string(),
  evidence: z.array(z.string())
});

export const StarAnswerSchema = z.object({
  situation: z.string(),
  task: z.string(),
  action: z.string(),
  result: z.string()
});

export const HeardComparisonSchema = z.object({
  id: z.string(),
  question: z.string(),
  whatYouSaid: z.string(),
  whatTheyHeard: z.string(),
  improvedStarAnswer: StarAnswerSchema,
  localMarketNote: z.string()
});

export const EvaluationReportSchema = z.object({
  id: z.string(),
  interviewId: z.string(),
  candidateName: z.string(),
  roleTitle: z.string(),
  region: z.enum(["india", "pakistan", "remote-south-asia", "global"]),
  scores: z.object({
    confidence: ScoreSchema,
    technical: ScoreSchema,
    delivery: ScoreSchema
  }),
  comparisons: z.array(HeardComparisonSchema),
  fillerWords: z.array(z.object({ word: z.string(), count: z.number() })),
  nextPracticePlan: z.array(z.string()),
  createdAt: z.string()
});

export const InterviewHistoryItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  roleTitle: z.string(),
  companyStyle: z.string(),
  region: z.enum(["india", "pakistan", "remote-south-asia", "global"]),
  status: z.enum(["completed", "in-progress", "draft"]),
  durationSeconds: z.number().nonnegative(),
  transcriptTurnCount: z.number().nonnegative(),
  averageScore: z.number().min(0).max(100).optional(),
  createdAt: z.string(),
  reportId: z.string().optional()
});

export type TranscriptTurn = z.infer<typeof TranscriptTurnSchema>;
export type AudioSession = z.infer<typeof AudioSessionSchema>;
export type EvaluationReport = z.infer<typeof EvaluationReportSchema>;
export type InterviewHistoryItem = z.infer<typeof InterviewHistoryItemSchema>;
export type HeardComparison = z.infer<typeof HeardComparisonSchema>;
export type StarAnswer = z.infer<typeof StarAnswerSchema>;
