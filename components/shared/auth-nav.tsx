"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrainCircuit, LogIn, UserPlus } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  function signOut() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      router.push("/login");
      router.refresh();
    });
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild size="sm">
          <Link href="/setup">
            <BrainCircuit className="h-4 w-4" />
            Start
          </Link>
        </Button>
        <Button onClick={signOut} disabled={isPending} variant="outline" size="sm" className="hidden sm:inline-flex">
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
        <Link href="/login">
          <LogIn className="h-4 w-4" />
          Login
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
        <Link href="/signup">
          <UserPlus className="h-4 w-4" />
          Sign up
        </Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/login?next=%2Fsetup">
          <BrainCircuit className="h-4 w-4" />
          Start
        </Link>
      </Button>
    </div>
  );
}
