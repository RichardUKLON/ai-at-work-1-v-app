import { useState } from "react";
import type { Step } from "../../types";
import type { StepProps } from "./stepTypes";
import { RichText } from "../RichText";
import { FeedbackCard } from "../FeedbackCard";

type BuilderT = Extract<Step, { kind: "promptBuilder" }>;

export function PromptBuilder({ step, onComplete }: StepProps<BuilderT>) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = step.slots.every((s) => picks[s.id]);
  const bestCount = step.slots.filter((s) => {
    const opt = s.options.find((o) => o.id === picks[s.id]);
    return opt?.best;
  }).length;
  const allBest = bestCount === step.slots.length;
  const points = allBest ? 3 : bestCount >= 3 ? 2 : bestCount >= 1 ? 1 : 0;

  return (
    <div className="space-y-4">
      <p className="text-[1.05rem] leading-relaxed">
        <RichText text={step.situation} />
      </p>

      <div className="space-y-4">
        {step.slots.map((slot) => {
          const picked = picks[slot.id];
          return (
            <fieldset
              key={slot.id}
              className="rounded-xl border border-hairline bg-surface p-3 shadow-card"
              disabled={checked}
            >
              <legend className="px-1 text-sm font-bold uppercase tracking-wide text-brand">
                {slot.label}
              </legend>
              <div className="space-y-2">
                {slot.options.map((o) => {
                  const isPicked = picked === o.id;
                  const showResult = checked && isPicked;
                  return (
                    <div key={o.id}>
                      <button
                        type="button"
                        aria-pressed={isPicked}
                        onClick={() =>
                          setPicks((p) => ({ ...p, [slot.id]: o.id }))
                        }
                        className={
                          "w-full rounded-lg border px-3 py-2 text-left text-[0.95rem] transition " +
                          (showResult
                            ? o.best
                              ? "border-verdict-strong/60 bg-verdict-strong/5"
                              : "border-verdict-risky/60 bg-verdict-risky/5"
                            : isPicked
                            ? "border-brand bg-brand/10"
                            : "border-hairline bg-canvas hover:border-brand/40")
                        }
                      >
                        <RichText text={o.text} />
                      </button>
                      {showResult && (
                        <p
                          className={
                            "mt-1 px-1 text-sm " +
                            (o.best
                              ? "text-verdict-strong"
                              : "text-verdict-risky")
                          }
                        >
                          <RichText text={o.feedback} />
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      {!checked ? (
        <button
          type="button"
          disabled={!allPicked}
          onClick={() => setChecked(true)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Assemble the brief
        </button>
      ) : (
        <FeedbackCard
          tone={allBest ? "strong" : points > 0 ? "acceptable" : "risky"}
          heading={
            allBest
              ? "A four-part brief, fully assembled"
              : `${bestCount} of 4 slots at their best`
          }
          body={
            allBest
              ? step.success ?? ""
              : "The slots marked in amber pulled the brief off course — each one shapes the output. Replay this mission any time to assemble a perfect four-part brief."
          }
          onContinue={() => onComplete({ points, allBest })}
        />
      )}
    </div>
  );
}
