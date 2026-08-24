import { AppShell } from "@/components/app/app-shell";
import { DashboardHome } from "@/components/dashboard/dashboard-home";

export default function DashboardPage() {
  return (
    <AppShell
      active="dashboard"
      title="Dashboard"
      subtitle="Plan your upcoming interviews, track practice progress, and jump into a tailored voice session."
      showAddInterview
    >
      <DashboardHome />
    </AppShell>
  );
}
