import Link from "next/link";
import { BrainCircuit, LogIn, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="MockBit home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-300 text-slate-950">
            <Mic2 className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold">MockBit</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/history">History</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/setup">Setup</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/interview">Interview</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/report/demo">Report</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/setup">
              <BrainCircuit className="h-4 w-4" />
              Start
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
