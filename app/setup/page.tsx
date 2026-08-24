import { SetupForm } from "@/components/setup/setup-form";
import { AppShell } from "@/components/app/app-shell";

export default function SetupPage() {
  return (
    <AppShell
      active="setup"
      title="Add Interview"
      subtitle="Add the real interview details first. After that, start a tailored practice session for the same role."
    >
      <SetupForm />
    </AppShell>
  );
}
