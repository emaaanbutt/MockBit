import { HistoryDashboard } from "@/components/history/history-dashboard";
import { TopNav } from "@/components/shared/top-nav";

export default function HistoryPage() {
  return (
    <main>
      <TopNav />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <HistoryDashboard />
      </section>
    </main>
  );
}
