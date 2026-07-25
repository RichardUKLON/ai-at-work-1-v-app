import { type CSSProperties, useEffect, useRef, useState } from "react";
import { CircleHelp, X } from "lucide-react";

const STORAGE_KEY = "ai-at-work-m1-warmup-tour-v3";

const steps = [
  {
    target: "[data-tour='mission-map']",
    title: "Mission Map",
    body: "This takes you back to the six-mission route. Use it when you want to see what you have finished or return later.",
    placement: "bottom",
  },
  {
    target: "[data-tour='glossary']",
    title: "Glossary",
    body: "Open the glossary whenever a course term needs a plain-English explanation. You can close it and return to the same place.",
    placement: "bottom",
  },
  {
    target: "[data-tour='my-progress']",
    title: "My Progress",
    body: "This page shows your points, completed missions, badges and reflections. The course saves this on the device you are using.",
    placement: "bottom",
  },
  {
    target: "[data-tour='about']",
    title: "About and help",
    body: "Use this for course guidance, accessibility information and the option to reset local progress.",
    placement: "bottom",
  },
  {
    target: "[data-tour='progress']",
    title: "Track the scenario",
    body: "This shows where you are in the current mission. Finish one decision to move to the next.",
    placement: "bottom",
  },
  {
    target: "[data-tour='choice-example']",
    title: "Make your call",
    body: "Each response uses a card like this. Read every option, then select the response you would use at work. There is no timer.",
    placement: "top",
  },
  {
    target: "[data-tour='choice-example']",
    title: "Learn from the result",
    body: "After each choice, you will see feedback and can continue. Some risky choices let you try again, so you can test the consequence safely.",
    placement: "top",
  },
] as const;

type Placement = (typeof steps)[number]["placement"];

function positionFor(
  target: Element | null,
  placement: Placement,
  cardHeight: number
) {
  if (!target || window.innerWidth < 768) return undefined;
  const rect = target.getBoundingClientRect();
  const cardWidth = Math.min(360, window.innerWidth - 32);
  const left = Math.max(16, Math.min(rect.left, window.innerWidth - cardWidth - 16));
  const top =
    placement === "bottom"
      ? rect.bottom + 12
      : Math.max(16, rect.top - cardHeight - 18);
  return { left, top, width: cardWidth };
}

export function WarmupTutorial({ active }: { active: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<CSSProperties>();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (active && !localStorage.getItem(STORAGE_KEY)) setIndex(0);
  }, [active]);

  useEffect(() => {
    if (index === null) return;
    const step = steps[index];
    const target = document.querySelector(step.target);
    const header = target?.closest("header");
    target?.classList.add("warmup-tour-target");
    header?.classList.add("warmup-tour-header");
    const updatePosition = () => {
      setPosition(
        positionFor(target, step.placement, cardRef.current?.offsetHeight ?? 280)
      );
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      target?.classList.remove("warmup-tour-target");
      header?.classList.remove("warmup-tour-header");
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [index]);

  useEffect(() => {
    if (index !== null) nextButtonRef.current?.focus();
  }, [index]);

  if (!active) return null;

  if (index === null) {
    return (
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem(STORAGE_KEY);
          setDontShowAgain(false);
          setIndex(0);
        }}
        className="inline-flex items-center gap-1.5 self-start rounded-md border border-hairline bg-canvas px-2.5 py-1.5 text-xs font-semibold text-ink/70 hover:border-brand/40 hover:text-brand"
      >
        <CircleHelp size={15} aria-hidden />
        Start tutorial
      </button>
    );
  }
  const step = steps[index];
  const isLast = index === steps.length - 1;

  function close() {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, "complete");
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIndex(null);
  }

  return (
    <div className="fixed inset-0" aria-live="polite">
      <div className="absolute inset-0 z-50 bg-ink/35" aria-hidden />
      <section
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="warmup-tutorial-title"
        className={`warmup-tutorial warmup-tutorial--${step.placement} fixed bottom-0 left-0 right-0 z-[60] rounded-t-2xl border border-hairline bg-canvas p-5 shadow-2xl md:rounded-xl`}
        style={position}
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              Quick tour · {index + 1} of {steps.length}
            </p>
            <h2 id="warmup-tutorial-title" className="mt-1 text-h3">
              {step.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1.5 text-ink/60 hover:bg-surface hover:text-ink"
            aria-label="Dismiss tutorial"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{step.body}</p>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-ink/75">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(event) => setDontShowAgain(event.target.checked)}
            className="h-4 w-4 rounded border-hairline accent-brand"
          />
          Don’t show this tutorial again
        </label>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={close}
            className="text-sm font-medium text-ink/70 underline underline-offset-4 hover:text-brand"
          >
            Skip tutorial
          </button>
          <button
            type="button"
            ref={nextButtonRef}
            onClick={() => (isLast ? close() : setIndex(index + 1))}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {isLast ? "Start scenario" : "Next"}
          </button>
        </div>
      </section>
    </div>
  );
}
