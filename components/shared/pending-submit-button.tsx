"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";

type PendingSubmitButtonProps = ButtonProps & {
  pendingLabel?: string;
};

export function PendingSubmitButton({
  children,
  disabled,
  pendingLabel = "Saving...",
  ...props
}: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={disabled || pending} {...props}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? pendingLabel : children}
    </Button>
  );
}

export function FormPendingBar() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10" aria-label="Saving in progress">
      <div className="h-full w-1/2 animate-progressSlide rounded-full bg-indigo-300" />
    </div>
  );
}
