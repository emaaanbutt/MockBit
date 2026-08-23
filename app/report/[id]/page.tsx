import { ReportDashboard } from "@/components/report/report-dashboard";
import { TopNav } from "@/components/shared/top-nav";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;

  return (
    <main>
      <TopNav />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Report ID</p>
          <h1 className="text-3xl font-semibold tracking-normal">{id}</h1>
        </div>
        <ReportDashboard />
      </section>
    </main>
  );
}
