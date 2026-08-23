import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "indigo" | "blue" | "rose" | "slate";
};

const tones = {
  indigo: "border-indigo-300/25 bg-indigo-300/10 text-indigo-100",
  blue: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  rose: "border-rose-300/25 bg-rose-300/10 text-rose-100",
  slate: "border-slate-300/20 bg-slate-300/10 text-slate-100"
};

export function Badge({ className, tone = "slate", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  );
}
