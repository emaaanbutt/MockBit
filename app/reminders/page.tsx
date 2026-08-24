import { AppShell } from "@/components/app/app-shell";
import { RemindersDashboard } from "@/components/reminders/reminders-dashboard";

export default function RemindersPage() {
  return (
    <AppShell
      active="reminders"
      title="Reminders"
      subtitle="Manage interview reminders, email nudges, and final prep checklists."
    >
      <RemindersDashboard />
    </AppShell>
  );
}
