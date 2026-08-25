import { createClient } from "@/lib/supabase/server";
import type { HeardComparison } from "@/types/interview";

export type InterviewStatus = "draft" | "in-progress" | "completed" | "cancelled";

export type SavedReport = {
  id: string;
  interviewId: string;
  confidenceScore: number;
  technicalScore: number;
  deliveryScore: number;
  averageScore: number;
  comparisons: HeardComparison[];
  fillerWords: Array<{ word: string; count: number }>;
  nextPracticePlan: string[];
  createdAt: string;
  modelName: string | null;
};

export type SavedInterview = {
  id: string;
  roleTitle: string;
  companyName: string | null;
  companyStyle: string;
  jobDescription: string;
  region: "india" | "pakistan" | "remote-south-asia" | "global";
  accentModel: "indian-english" | "pakistani-english" | "neutral-global";
  interviewMode: string | null;
  meetingLink: string | null;
  locationNote: string | null;
  scheduledAt: string | null;
  status: InterviewStatus;
  provider: string | null;
  startedAt: string | null;
  endedAt: string | null;
  durationSeconds: number;
  difficulty: number;
  createdAt: string;
  updatedAt: string;
  transcriptTurnCount: number;
  report?: SavedReport;
};

type InterviewRow = {
  id: string;
  role_title: string;
  company_name: string | null;
  company_style: string;
  job_description: string;
  region: SavedInterview["region"];
  accent_model: SavedInterview["accentModel"];
  interview_mode: string | null;
  meeting_link: string | null;
  location_note: string | null;
  scheduled_at: string | null;
  status: InterviewStatus;
  provider: string | null;
  started_at: string | null;
  ended_at: string | null;
  duration_seconds: number | null;
  difficulty: number | null;
  created_at: string;
  updated_at: string;
};

type ReportRow = {
  id: string;
  interview_id: string;
  confidence_score: number;
  technical_score: number;
  delivery_score: number;
  average_score: number;
  comparisons: unknown;
  filler_words: unknown;
  next_practice_plan: unknown;
  model_name: string | null;
  created_at: string;
};

type TurnCountRow = {
  interview_id: string;
};

export async function getCurrentUserInterviews() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: interviewRows, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !interviewRows?.length) return [];

  const ids = interviewRows.map((item) => item.id);
  const [reportsResult, turnsResult] = await Promise.all([
    supabase.from("evaluation_reports").select("*").eq("user_id", user.id).in("interview_id", ids),
    supabase.from("transcript_turns").select("interview_id").eq("user_id", user.id).in("interview_id", ids)
  ]);

  const reportsByInterview = new Map<string, SavedReport>();
  (reportsResult.data as ReportRow[] | null)?.forEach((item) => {
    reportsByInterview.set(item.interview_id, mapReport(item));
  });

  const turnCounts = new Map<string, number>();
  (turnsResult.data as TurnCountRow[] | null)?.forEach((item) => {
    turnCounts.set(item.interview_id, (turnCounts.get(item.interview_id) ?? 0) + 1);
  });

  return (interviewRows as InterviewRow[]).map((item) =>
    mapInterview(item, reportsByInterview.get(item.id), turnCounts.get(item.id) ?? 0)
  );
}

export async function getCurrentUserInterview(id: string) {
  const interviews = await getCurrentUserInterviews();
  return interviews.find((item) => item.id === id) ?? null;
}

export function getUpcomingInterviews(interviews: SavedInterview[]) {
  const now = Date.now();
  return interviews
    .filter((item) => item.scheduledAt && new Date(item.scheduledAt).getTime() >= now)
    .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime());
}

export function getPracticedInterviews(interviews: SavedInterview[]) {
  return interviews.filter((item) => item.status === "completed" || item.durationSeconds > 0 || Boolean(item.report));
}

export function getPrepReadiness(interview: SavedInterview) {
  let score = 0;
  if (interview.roleTitle) score += 15;
  if (interview.companyName) score += 10;
  if (interview.companyStyle) score += 10;
  if (interview.scheduledAt) score += 20;
  if (interview.meetingLink || interview.locationNote) score += 10;
  score += Math.min(35, Math.round(interview.jobDescription.length / 12));
  return Math.min(100, score);
}

export function formatInterviewDate(value: string | null) {
  if (!value) return "No date set";
  return new Date(value).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function formatInterviewTime(value: string | null) {
  if (!value) return "No time set";
  return new Date(value).toLocaleTimeString("en", {
    hour: "numeric",
    minute: "2-digit"
  });
}

export function formatDuration(totalSeconds: number) {
  if (totalSeconds <= 0) return "Not practiced";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function mapInterview(row: InterviewRow, report: SavedReport | undefined, transcriptTurnCount: number): SavedInterview {
  return {
    id: row.id,
    roleTitle: row.role_title,
    companyName: row.company_name,
    companyStyle: row.company_style,
    jobDescription: row.job_description,
    region: row.region,
    accentModel: row.accent_model,
    interviewMode: row.interview_mode,
    meetingLink: row.meeting_link,
    locationNote: row.location_note,
    scheduledAt: row.scheduled_at,
    status: row.status,
    provider: row.provider,
    startedAt: row.started_at,
    endedAt: row.ended_at,
    durationSeconds: row.duration_seconds ?? 0,
    difficulty: row.difficulty ?? 60,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    transcriptTurnCount,
    report
  };
}

function mapReport(row: ReportRow): SavedReport {
  return {
    id: row.id,
    interviewId: row.interview_id,
    confidenceScore: row.confidence_score,
    technicalScore: row.technical_score,
    deliveryScore: row.delivery_score,
    averageScore: row.average_score,
    comparisons: Array.isArray(row.comparisons) ? (row.comparisons as HeardComparison[]) : [],
    fillerWords: Array.isArray(row.filler_words) ? (row.filler_words as Array<{ word: string; count: number }>) : [],
    nextPracticePlan: Array.isArray(row.next_practice_plan) ? (row.next_practice_plan as string[]) : [],
    modelName: row.model_name,
    createdAt: row.created_at
  };
}
