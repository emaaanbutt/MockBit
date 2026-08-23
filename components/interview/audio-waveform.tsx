import { cn } from "@/lib/utils";

type AudioWaveformProps = {
  mode: "listening" | "ai-speaking" | "idle" | "muted";
};

export function AudioWaveform({ mode }: AudioWaveformProps) {
  const active = mode === "listening" || mode === "ai-speaking";
  const color = mode === "ai-speaking" ? "bg-sky-200" : mode === "muted" ? "bg-rose-200/60" : "bg-indigo-200";

  return (
    <div className="flex h-52 items-center justify-center gap-2 rounded-md border border-white/10 bg-slate-950/55 px-4">
      {Array.from({ length: 42 }).map((_, index) => (
        <span
          key={index}
          className={cn("w-1.5 origin-center rounded-full transition", color, active ? "h-28" : "h-8 opacity-40")}
          style={
            active
              ? {
                  animation: `wave ${0.7 + (index % 11) * 0.055}s ease-in-out infinite`,
                  animationDelay: `${index * 0.025}s`
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}
