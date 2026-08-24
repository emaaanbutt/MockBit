import { BellRing, CalendarClock, Mail, MonitorCheck } from "lucide-react";
import { reminders, upcomingInterviews } from "@/lib/dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RemindersDashboard() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <Card className="glass-panel animate-slideUp">
        <CardHeader>
          <CardTitle>Scheduled reminders</CardTitle>
          <CardDescription>Email and in-app reminders will be tailored to each interview.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingInterviews.map((item, index) => (
            <div key={item.id} className="rounded-md border border-white/10 bg-white/[0.035] p-4" style={{ animationDelay: `${index * 0.06}s` }}>
              <div className="flex flex-wrap gap-2">
                <Badge tone="indigo">{item.date}</Badge>
                <Badge tone="blue">{item.time}</Badge>
                <Badge>{item.mode}</Badge>
              </div>
              <h2 className="mt-3 font-semibold">{item.role}</h2>
              <p className="text-sm text-muted-foreground">{item.company}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-white/10 bg-slate-950/35 p-3 text-sm">
                  <Mail className="mb-2 h-4 w-4 text-sky-200" />
                  Email reminder: 24 hours before
                </div>
                <div className="rounded-md border border-white/10 bg-slate-950/35 p-3 text-sm">
                  <MonitorCheck className="mb-2 h-4 w-4 text-indigo-200" />
                  In-app checklist: 2 hours before
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-panel animate-slideUp stagger-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-rose-200" />
            <CardTitle>Reminder content</CardTitle>
          </div>
          <CardDescription>These will move into email/in-app reminders once the backend is connected.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reminders.map((item) => (
            <div key={item} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-slate-300">
              <CalendarClock className="mt-1 h-4 w-4 shrink-0 text-indigo-200" />
              <span>{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
