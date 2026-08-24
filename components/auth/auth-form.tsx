import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail, Mic2, User } from "lucide-react";
import { login, signup } from "@/app/auth/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthFormProps = {
  mode: "login" | "signup";
  error?: string;
  message?: string;
  next?: string;
};

export function AuthForm({ mode, error, message, next = "/dashboard" }: AuthFormProps) {
  const isSignup = mode === "signup";

  return (
    <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
      <div className="floating-strip left-0 top-24 h-12 w-36 animate-floatPanel" />
      <div className="floating-strip bottom-20 right-8 h-10 w-48 animate-drift" />
      <section className="animate-slideUp">
        <Badge tone="indigo">{isSignup ? "Create your practice profile" : "Welcome back"}</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-normal sm:text-5xl">
          {isSignup ? "Save every mock interview in one calm workspace." : "Pick up where your last interview ended."}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
          Keep your practice sessions, feedback reports, and progress history in one account so each attempt builds on
          the last one.
        </p>
      </section>

      <Card className="glass-panel animate-slideUp stagger-1">
        <CardHeader>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-indigo-300 text-slate-950">
            <Mic2 className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl">{isSignup ? "Sign up" : "Login"}</CardTitle>
          <CardDescription>
            {isSignup ? "Create an account to keep your reports and progress." : "Access your saved interviews and reports."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="mb-4 rounded-md border border-rose-200/20 bg-rose-300/10 p-3 text-sm text-rose-50">
              {error}
            </div>
          ) : null}
          {message ? (
            <div className="mb-4 rounded-md border border-sky-200/20 bg-sky-300/10 p-3 text-sm text-sky-50">
              {message}
            </div>
          ) : null}
          <form action={isSignup ? signup : login} className="space-y-4">
            <input type="hidden" name="next" value={next} />
          {isSignup ? (
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-indigo-200" />
                Name
              </span>
              <input
                name="name"
                autoComplete="name"
                required
                className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
              />
            </label>
          ) : null}
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-sky-200" />
              Email
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
            />
          </label>
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium">
              <LockKeyhole className="h-4 w-4 text-rose-200" />
              Password
            </span>
            <input
              name="password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={6}
              className="h-11 w-full rounded-md border border-input bg-slate-950/55 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/20"
            />
          </label>
          <Button type="submit" className="w-full">
              {isSignup ? "Create Account" : "Login"}
              <ArrowRight className="h-4 w-4" />
          </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "New to MockBit?"}{" "}
            <Link
              href={`${isSignup ? "/login" : "/signup"}?next=${encodeURIComponent(next)}`}
              className="text-indigo-100 hover:text-white"
            >
              {isSignup ? "Login" : "Sign up"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
