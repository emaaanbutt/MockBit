export const dashboardStats = [
  { label: "Practice interviews", value: "12", change: "+4 this week" },
  { label: "Average score", value: "82", change: "+9 from last month" },
  { label: "Upcoming interviews", value: "3", change: "Next one tomorrow" },
  { label: "Prep streak", value: "6 days", change: "Keep it steady" }
];

export const scoreTrend = [
  { label: "Mon", score: 68 },
  { label: "Tue", score: 74 },
  { label: "Wed", score: 71 },
  { label: "Thu", score: 79 },
  { label: "Fri", score: 82 },
  { label: "Sat", score: 87 },
  { label: "Sun", score: 84 }
];

export const interviewTypes = [
  { role: "AI Engineer", count: 4, tone: "indigo" },
  { role: "Frontend Developer", count: 5, tone: "blue" },
  { role: "Graphic Designer", count: 2, tone: "rose" },
  { role: "HR / Behavioral", count: 1, tone: "slate" }
] as const;

export const upcomingInterviews = [
  {
    id: "systems-frontend",
    company: "Systems Limited",
    role: "Frontend Engineer",
    description: "React, Next.js, API integration, and client communication round.",
    date: "Tomorrow",
    time: "10:30 AM",
    mode: "Google Meet",
    meetingLink: "https://meet.google.com/mock-bit",
    readiness: 78
  },
  {
    id: "remote-ai",
    company: "Remote SaaS Team",
    role: "AI Engineer",
    description: "LLM workflows, vector search basics, and production tradeoffs.",
    date: "Aug 27",
    time: "7:00 PM",
    mode: "Online",
    meetingLink: "",
    readiness: 64
  },
  {
    id: "design-studio",
    company: "Design Studio",
    role: "Graphic Designer",
    description: "Portfolio walkthrough, client feedback, and collaboration style.",
    date: "Sep 02",
    time: "2:00 PM",
    mode: "In person",
    meetingLink: "",
    readiness: 52
  }
];

export const completedReports = [
  {
    id: "demo",
    company: "Systems Limited",
    role: "Frontend Engineer",
    date: "Aug 21",
    duration: "18m 40s",
    averageScore: 82,
    summary: "Strong delivery, good API explanation, STAR structure needs sharper results."
  },
  {
    id: "react-remote",
    company: "Remote SaaS Team",
    role: "React Developer",
    date: "Aug 18",
    duration: "15m 40s",
    averageScore: 76,
    summary: "Solid technical base. Add clearer tradeoffs and measurable impact."
  },
  {
    id: "fullstack-hr",
    company: "Product Studio",
    role: "Junior Full-Stack Developer",
    date: "Aug 13",
    duration: "12m 00s",
    averageScore: 71,
    summary: "Friendly tone. Needs tighter behavioral examples and confidence."
  }
];

export const reminders = [
  "Send a prep reminder 24 hours before the interview.",
  "Show final checklist 2 hours before: documents, outfit, meeting link, calm breathing.",
  "For online interviews: test mic, camera, internet, and Google Meet link.",
  "For in-person interviews: leave early, carry ID/CV, and confirm office location."
];

export const practiceTips = [
  "Prepare one technical story with exact impact.",
  "Prepare one conflict or pressure story using STAR.",
  "Keep answers under 90 seconds unless asked for detail.",
  "End every project answer with a result."
];
