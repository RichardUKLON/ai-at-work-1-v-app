import { useEffect, useRef } from "react";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  OctagonX,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { Verdict } from "../types";
import { RichText } from "./RichText";
import { microcopy } from "../content/microcopy";

export type Tone = Verdict | "correct" | "incorrect" | "info";

const toneConfig: Record<
  Tone,
  { icon: LucideIcon; ring: string; chip: string; text: string }
> = {
  strong: {
    icon: CheckCircle2,
    ring: "border-verdict-strong/40",
    chip: "bg-verdict-strong/10 text-verdict-strong",
    text: "text-verdict-strong",
  },
  correct: {
    icon: CheckCircle2,
    ring: "border-verdict-strong/40",
    chip: "bg-verdict-strong/10 text-verdict-strong",
    text: "text-verdict-strong",
  },
  acceptable: {
    icon: Info,
    ring: "border-verdict-acceptable/40",
    chip: "bg-verdict-acceptable/10 text-verdict-acceptable",
    text: "text-verdict-acceptable",
  },
  info: {
    icon: Info,
    ring: "border-verdict-acceptable/40",
    chip: "bg-verdict-acceptable/10 text-verdict-acceptable",
    text: "text-verdict-acceptable",
  },
  risky: {
    icon: AlertTriangle,
    ring: "border-verdict-risky/40",
    chip: "bg-verdict-risky/10 text-verdict-risky",
    text: "text-verdict-risky",
  },
  incorrect: {
    icon: XCircle,
    ring: "border-verdict-risky/40",
    chip: "bg-verdict-risky/10 text-verdict-risky",
    text: "text-verdict-risky",
  },
  unsafe: {
    icon: OctagonX,
    ring: "border-verdict-unsafe/40",
    chip: "bg-verdict-unsafe/10 text-verdict-unsafe",
    text: "text-verdict-unsafe",
  },
};

export function FeedbackCard({
  tone,
  heading,
  body,
  consequence,
  onRetry,
  onContinue,
  continueLabel = microcopy.continue,
}: {
  tone: Tone;
  heading: string;
  body: string;
  consequence?: { title: string; scene: string; spot?: string };
  onRetry?: () => void;
  onContinue: () => void;
  continueLabel?: string;
}) {
  const cfg = toneConfig[tone];
  const Icon = cfg.icon;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onContinue();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onContinue]);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="group"
      aria-live="polite"
      className={`animate-slideIn rounded-xl border ${cfg.ring} bg-surface p-4 shadow-card outline-none sm:p-5`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full ${cfg.chip}`}
        >
          <Icon size={18} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className={`font-semibold ${cfg.text}`}>{heading}</p>
          <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/90">
            <RichText text={body} />
          </p>

          {consequence && (
            <div className="mt-3 rounded-lg border border-verdict-unsafe/25 bg-verdict-unsafe/5 p-3">
              <p className="text-sm font-semibold text-verdict-unsafe">
                {consequence.title}
              </p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/90">
                <RichText text={consequence.scene} />
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onContinue}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {continueLabel}
            </button>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="rounded-lg border border-hairline bg-canvas px-4 py-2 text-sm font-medium text-ink hover:border-brand/40"
              >
                {microcopy.retry}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
