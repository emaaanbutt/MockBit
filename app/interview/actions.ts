"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const InterviewFormSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  roleTitle: z.string().trim().min(1, "Please add a role title."),
  companyName: z.string().trim().optional(),
  scheduledDate: z.string().trim().optional(),
  scheduledTime: z.string().trim().optional(),
  interviewMode: z.string().trim().optional(),
  meetingOrLocation: z.string().trim().optional(),
  jobDescription: z.string().trim().min(1, "Please add the job description or target role details."),
  accentModel: z.enum(["pakistani-english", "indian-english", "neutral-global"]),
  companyStyle: z.string().trim().min(1, "Please choose an interview style."),
  region: z.enum(["pakistan", "india", "remote-south-asia", "global"]),
  difficulty: z.coerce.number().min(20).max(95),
  intent: z.enum(["save", "practice"]).default("save")
});

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(value: string) {
  return value.length ? value : null;
}

function buildScheduledAt(date: string | undefined, time: string | undefined) {
  if (!date) return null;
  const parsed = new Date(`${date}T${time || "09:00"}:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function splitMeetingOrLocation(value: string | undefined) {
  const cleanValue = value?.trim() ?? "";
  if (!cleanValue) return { meetingLink: null, locationNote: null };

  if (/^https?:\/\//i.test(cleanValue)) {
    return { meetingLink: cleanValue, locationNote: null };
  }

  return { meetingLink: null, locationNote: cleanValue };
}

function safeNext(next: string) {
  if (!next.startsWith("/") || next.startsWith("//")) return "/dashboard";
  if (next.startsWith("/login") || next.startsWith("/signup")) return "/dashboard";
  return next;
}

function revalidateInterviewViews() {
  ["/dashboard", "/setup", "/interview", "/history", "/report", "/upcoming", "/reminders"].forEach((path) => {
    revalidatePath(path);
  });
}

export async function saveInterview(formData: FormData) {
  const parsed = InterviewFormSchema.safeParse({
    id: getString(formData, "id"),
    roleTitle: getString(formData, "roleTitle"),
    companyName: getString(formData, "companyName"),
    scheduledDate: getString(formData, "scheduledDate"),
    scheduledTime: getString(formData, "scheduledTime"),
    interviewMode: getString(formData, "interviewMode"),
    meetingOrLocation: getString(formData, "meetingOrLocation"),
    jobDescription: getString(formData, "jobDescription"),
    accentModel: getString(formData, "accentModel"),
    companyStyle: getString(formData, "companyStyle"),
    region: getString(formData, "region"),
    difficulty: getString(formData, "difficulty"),
    intent: getString(formData, "intent") || "save"
  });

  const editId = getString(formData, "id");
  const setupPath = editId ? `/setup?interview=${editId}` : "/setup";

  if (!parsed.success) {
    const issue = parsed.error.issues[0]?.message ?? "Please check the interview details.";
    redirect(`${setupPath}&error=${encodeURIComponent(issue)}`.replace("/setup&", "/setup?"));
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=Please login to save interviews.");
  }

  const { meetingLink, locationNote } = splitMeetingOrLocation(parsed.data.meetingOrLocation);
  const payload = {
    role_title: parsed.data.roleTitle,
    company_name: getOptionalString(parsed.data.companyName ?? ""),
    company_style: parsed.data.companyStyle,
    job_description: parsed.data.jobDescription,
    region: parsed.data.region,
    accent_model: parsed.data.accentModel,
    interview_mode: getOptionalString(parsed.data.interviewMode ?? ""),
    meeting_link: meetingLink,
    location_note: locationNote,
    scheduled_at: buildScheduledAt(parsed.data.scheduledDate, parsed.data.scheduledTime),
    difficulty: parsed.data.difficulty,
    updated_at: new Date().toISOString()
  };

  let savedId = parsed.data.id || "";

  if (savedId) {
    const { error } = await supabase.from("interviews").update(payload).eq("id", savedId).eq("user_id", user.id);
    if (error) {
      redirect(`/setup?interview=${savedId}&error=${encodeURIComponent(error.message)}`);
    }
  } else {
    const { data, error } = await supabase
      .from("interviews")
      .insert({
        ...payload,
        user_id: user.id,
        status: "draft"
      })
      .select("id")
      .single();

    if (error || !data) {
      redirect(`/setup?error=${encodeURIComponent(error?.message ?? "Interview could not be saved.")}`);
    }

    savedId = data.id;
  }

  revalidateInterviewViews();

  if (parsed.data.intent === "practice") {
    redirect(`/interview/${savedId}`);
  }

  redirect("/dashboard?message=Interview saved.");
}

export async function deleteInterview(formData: FormData) {
  const id = getString(formData, "id");
  const next = safeNext(getString(formData, "next") || "/dashboard");

  if (!id) redirect(next);

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=Please login first.");
  }

  await supabase.from("interviews").delete().eq("id", id).eq("user_id", user.id);
  revalidateInterviewViews();
  redirect(`${next}${next.includes("?") ? "&" : "?"}message=Interview deleted.`);
}

export async function finishInterview(formData: FormData) {
  const id = getString(formData, "id");
  const durationSeconds = Math.max(1, Number(getString(formData, "durationSeconds")) || 1);

  if (!id) redirect("/interview");

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=Please login first.");
  }

  const endedAt = new Date().toISOString();
  await supabase
    .from("interviews")
    .update({
      status: "completed",
      started_at: endedAt,
      ended_at: endedAt,
      duration_seconds: durationSeconds,
      updated_at: endedAt
    })
    .eq("id", id)
    .eq("user_id", user.id);

  revalidateInterviewViews();
  redirect(`/report/${id}`);
}
