import { useState } from "react";
import type { Step } from "../../types";
import type { StepProps } from "./stepTypes";
import { RichText } from "../RichText";
import { FeedbackCard } from "../FeedbackCard";

type BetterT = Extract<Step, { kind: "betterPrompt" }>;

export function BetterPrompt({ step, onComplete }: StepProps<BetterT>) {
  const [phase, setPhase] = useState<"pick" | "reason" | "done">("pick");
  const [pickedPrompt, setPickedPrompt] = useState<"a" | "b" | null>(null);
  const [reasonId, setReasonId] = useState<string | null>(null);

  const promptCorrect = pickedPrompt === step.correct;
  const reason = step.reasons.find((r) => r.id === reasonId) ?? null;
  const reasonCorrect = reason?.correct ?? false;

  function pick(which: "a" | "b") {
    setPickedPrompt(which);
    // Whether right or wrong about the prompt, move on to reasoning to teach why.
    setPhase("reason");
  }

  function chooseReason(id: string) {
    setReasonId(id);
    setPhase("done");
  }

  function finish() {
    const points = promptCorrect ? (reasonCorrect ? 3 : 2) : 0;
    onComplete({ points });
  }

  const PromptCard = ({
    which,
    text,
  }: {
    which: "a" | "b";
    text: string;
  }) => (
    <button
      type="button"
      onClick={() => pick(which)}
      className="w-full rounded-xl border border-hairline bg-surface p-4 text-left shadow-card transition hover:border-brand/50 hover:bg-brand/5"
    >
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-brand">
        Prompt {which.toUpperCase()}
      </span>
      <span className="text-[0.95rem] leading-relaxed">
        <RichText text={text} />
      </span>
    </button>
  );

  return (
    <div className="space-y-4">
      <p className="text-[1.05rem] font-medium leading-relaxed">
        <RichText text={step.question} />
      </p>

      {phase === "pick" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <PromptCard which="a" text={step.promptA} />
          <PromptCard which="b" text={step.promptB} />
        </div>
      )}

      {phase !== "pick" && pickedPrompt && (
        <div
          className={
            "rounded-lg border px-3 py-2 text-sm font-medium " +
            (promptCorrect
              ? "border-verdict-strong/50 bg-verdict-strong/5 text-verdict-strong"
              : "border-verdict-risky/50 bg-verdict-risky/5 text-verdict-risky")
          }
        >
          {promptCorrect
            ? `You picked Prompt ${pickedPrompt.toUpperCase()} — the stronger brief. Now, why?`
            : `Prompt ${step.correct.toUpperCase()} is actually the stronger brief. Let's see why.`}
        </div>
      )}

      {phase === "reason" && (
        <ul className="space-y-3" role="list">
          {step.reasons.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => chooseReason(r.id)}
                className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-left text-[0.95rem] shadow-card transition hover:border-brand/50 hover:bg-brand/5"
              >
                <RichText text={r.text} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {phase === "done" && reason && (
        <FeedbackCard
          tone={reasonCorrect ? "correct" : "incorrect"}
          heading={reasonCorrect ? "That's the reason" : "Not the core reason"}
          body={reason.feedback}
          onContinue={finish}
        />
      )}
    </div>
  );
}
