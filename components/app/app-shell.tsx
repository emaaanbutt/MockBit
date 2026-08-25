import Link from "next/link";
import {
  CalendarClock,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Mic2,
  Plus,
  Settings
} from "lucide-react";
import { logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Interview", href: "/setup", icon: Plus },
  { label: "Upcoming", href: "/upcoming", icon: CalendarClock },
  { label: "Practice Room", href: "/interview", icon: Mic2 },
  { label: "History", href: "/history", icon: History },
  { label: "Reports", href: "/report", icon: FileText }
];

type AppShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  active: "dashboard" | "setup" | "upcoming" | "interview" | "history" | "report";
  showAddInterview?: boolean;
};

export function AppShell({ children, title, subtitle, active, showAddInterview = false }: AppShellProps) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1500px] gap-0 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-slate-950/70 px-4 py-4 backdrop-blur-xl lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-5 lg:pb-6">
          <div className="flex items-center justify-between gap-3 lg:block">
            <Link href="/dashboard" className="flex items-center gap-2" aria-label="MockBit dashboard">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-300 text-slate-950">
                <Mic2 className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold">MockBit</span>
            </Link>
            <form action={logout} className="lg:hidden">
              <Button type="submit" variant="outline" size="sm">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-6 lg:block lg:space-y-1.5 lg:overflow-visible lg:pb-0">
            {navItems.map((item) => {
              const selected =
                active === "dashboard"
                  ? item.href === "/dashboard"
                  : item.href.includes(active) || (active === "setup" && item.href === "/setup");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-w-fit items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition hover:-translate-y-0.5 hover:border-indigo-200/30 hover:bg-white/[0.055] lg:min-w-0 lg:py-2",
                    selected
                      ? "border-indigo-200/30 bg-indigo-300/15 text-indigo-50"
                      : "border-transparent text-slate-300"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 hidden rounded-lg border border-white/10 bg-white/[0.035] p-3 lg:block">
            <Settings className="mb-2 h-5 w-5 text-sky-200" />
            <p className="text-sm font-medium">Interview center</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Add interviews, practice, and review feedback.
            </p>
          </div>

          <form action={logout} className="mt-4 hidden lg:block">
            <Button type="submit" variant="outline" className="w-full">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </aside>

        <section className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">MockBit workspace</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-normal text-white">{title}</h1>
              {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{subtitle}</p> : null}
            </div>
            {showAddInterview ? (
              <Button asChild>
                <Link href="/setup">
                  <Plus className="h-4 w-4" />
                  Add Interview
                </Link>
              </Button>
            ) : null}
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
