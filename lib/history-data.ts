import type { InterviewHistoryItem } from "@/types/interview";

export const interviewHistory: InterviewHistoryItem[] = [
  {
    id: "int-1032",
    userId: "demo-user",
    roleTitle: "Frontend Engineer",
    companyStyle: "Local software house technical round",
    region: "pakistan",
    status: "completed",
    durationSeconds: 1120,
    transcriptTurnCount: 31,
    averageScore: 82,
    createdAt: "2026-08-21T18:30:00.000Z",
    reportId: "demo"
  },
  {
    id: "int-1027",
    userId: "demo-user",
    roleTitle: "React Developer",
    companyStyle: "Remote product company screening",
    region: "remote-south-asia",
    status: "completed",
    durationSeconds: 940,
    transcriptTurnCount: 24,
    averageScore: 76,
    createdAt: "2026-08-18T15:10:00.000Z",
    reportId: "react-remote"
  },
  {
    id: "int-1018",
    userId: "demo-user",
    roleTitle: "Junior Full-Stack Developer",
    companyStyle: "Final HR and salary discussion",
    region: "india",
    status: "completed",
    durationSeconds: 720,
    transcriptTurnCount: 19,
    averageScore: 71,
    createdAt: "2026-08-13T11:45:00.000Z",
    reportId: "fullstack-hr"
  },
  {
    id: "int-draft",
    userId: "demo-user",
    roleTitle: "Next.js Intern",
    companyStyle: "Freelance client-facing interview",
    region: "pakistan",
    status: "draft",
    durationSeconds: 0,
    transcriptTurnCount: 0,
    createdAt: "2026-08-23T09:00:00.000Z"
  }
];
