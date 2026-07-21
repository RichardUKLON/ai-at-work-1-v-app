import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { useGame } from "../store";
import { selectFinaleItems } from "../lib/finaleSelect";
import { finaleBrief } from "../content/finale";
import type { Bucket, FinaleItem } from "../types";
import { RichText } from "../components/RichText";
import { ArtefactRenderer } from "../components/ArtefactRenderer";
import { FeedbackCard } from "../components/FeedbackCard";
import { spotScore } from "../lib/game";
import { Flag } from "lucide-react";

const BUCKETS: { id: Bucket; label: string }[] = [
  { id: "use", label: "Use it" },
  { id: "verify", label: "Verify first" },
  { id: "escalate", label: "Stop — escalate" },
];

export function FinalePlayer() {
  const navigate = useGame((s) => s.navigate);
  const seed = useGame((s) => s.finaleSeed);
  const recordFinale = useGame((s) => s.recordFinale);

  const items = useMemo(() => selectFinaleItems(seed, 10), [seed]);
  const [phase, setPhase] = useState<"openingVideo" | "brief" | "play">("openingVideo");
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [midVideoDone, setMidVideoDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [video1Ended, setVideo1Ended] = useState(false);
  const [video2Ended, setVideo2Ended] = useState(false);

  const item = items[index];

  function next(wasCorrect: boolean) {
    const newCorrect = correctCount + (wasCorrect ? 1 : 0);
    const nextIndex = index + 1;
    if (nextIndex === 5 && !midVideoDone) {
      // Insert Video 2 halfway through
      setCorrectCount(newCorrect);
      setMidVideoDone(true);
      setVideo2Ended(false);
      return;
    }
    if (nextIndex < items.length) {
      setCorrectCount(newCorrect);
      setIndex(nextIndex);
      document.getElementById("main")?.focus();
      window.scrollTo({ top: 0 });
    } else {
      const pct = Math.round((newCorrect / items.length) * 100);
      recordFinale(pct, newCorrect, pct >= 80);
      navigate({ screen: "results" });
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm text-ink/60">
        <button
          type="button"
          onClick={() => navigate({ screen: "map" })}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-surface hover:text-brand"
        >
          <ArrowLeft size={16} aria-hidden /> Exit to map
        </button>
        <span aria-hidden>·</span>
        <span className="font-medium text-ink/70">The Friday Review</span>
      </div>

      {phase === "openingVideo" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-brand">
            <span className="text-sm font-semibold uppercase tracking-wide">
              The Friday Review · The Calibration Mindset
            </span>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl2 border border-hairline bg-ink/5 shadow-card">
            {!video1Ended ? (
              <>
                <video
                  ref={videoRef}
                  src="assets/videos/m6-calibration-mindset.mp4"
                  poster="assets/videos/m6-calibration-mindset-poster.jpg"
                  className="h-full w-full object-contain"
                  onEnded={() => setVideo1Ended(true)}
                  controls
                />
                <button
                  type="button"
                  onClick={() => setVideo1Ended(true)}
                  className="absolute right-3 top-3 rounded-lg bg-ink/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-ink"
                >
                  Skip video
                </button>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <Play size={48} className="text-ink/20" />
                <p className="text-sm text-ink/50">Video complete</p>
                <button
                  type="button"
                  onClick={() => setPhase("brief")}
                  className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
                >
                  Continue to the review
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {phase === "brief" ? (
        <div className="space-y-5">
          <img
            src="assets/illustrations/H6-friday-review-hero.png"
            alt=""
            className="aspect-[16/9] w-full rounded-xl2 border border-hairline object-cover shadow-card"
          />
          <h1 className="text-h1">The Friday Review</h1>
          <p className="max-w-measure text-[1.1rem] leading-relaxed">
            <RichText text={finaleBrief} />
          </p>
          <button
            type="button"
            onClick={() => setPhase("play")}
            className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
          >
            Begin the review
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-ink/60">
              <span>Challenge {index + 1}</span>
              <span>
                {index + 1} of {items.length}
              </span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-hairline"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={items.length}
              aria-valuenow={index + 1}
            >
              <div
                className="h-full rounded-full bg-brand transition-all"
                style={{ width: `${((index + 1) / items.length) * 100}%` }}
              />
            </div>
          </div>

          {midVideoDone && !video2Ended ? (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-brand">
                <span className="text-sm font-semibold uppercase tracking-wide">
                  The Middle Ground
                </span>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl2 border border-hairline bg-ink/5 shadow-card">
                <video
                  src="assets/videos/m6-middle-ground.mp4"
                  poster="assets/videos/m6-middle-ground-poster.jpg"
                  className="h-full w-full object-contain"
                  onEnded={() => setVideo2Ended(true)}
                  controls
                />
                <button
                  type="button"
                  onClick={() => setVideo2Ended(true)}
                  className="absolute right-3 top-3 rounded-lg bg-ink/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-ink"
                >
                  Skip video
                </button>
              </div>
              {video2Ended && (
                <button
                  type="button"
                  onClick={() => {
                    setIndex(5);
                    document.getElementById("main")?.focus();
                    window.scrollTo({ top: 0 });
                  }}
                  className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
                >
                  Continue
                </button>
              )}
            </div>
          ) : (
            <FinaleItemView key={item.id} item={item} onDone={next} />
          )}
        </div>
      )}
    </div>
  );
}

function FinaleItemView({
  item,
  onDone,
}: {
  item: FinaleItem;
  onDone: (correct: boolean) => void;
}) {
  if (item.kind === "mc") return <FinaleMC item={item} onDone={onDone} />;
  if (item.kind === "sort") return <FinaleSort item={item} onDone={onDone} />;
  return <FinaleSpot item={item} onDone={onDone} />;
}

function FinaleMC({
  item,
  onDone,
}: {
  item: Extract<FinaleItem, { kind: "mc" }>;
  onDone: (c: boolean) => void;
}) {
  const [chosen, setChosen] = useState<string | null>(null);
  const opt = item.options.find((o) => o.id === chosen) ?? null;
  return (
    <div className="space-y-4">
      <p className="text-[1.05rem] font-medium leading-relaxed">
        <RichText text={item.prompt} />
      </p>
      {!opt && (
        <ul className="space-y-3" role="list">
          {item.options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => setChosen(o.id)}
                className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-left text-[0.98rem] shadow-card transition hover:border-brand/50 hover:bg-brand/5"
              >
                <RichText text={o.text} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {opt && (
        <FeedbackCard
          tone={opt.correct ? "correct" : "incorrect"}
          heading={opt.correct ? "Correct" : "Not quite"}
          body={item.feedback}
          onContinue={() => onDone(opt.correct)}
        />
      )}
    </div>
  );
}

function FinaleSort({
  item,
  onDone,
}: {
  item: Extract<FinaleItem, { kind: "sort" }>;
  onDone: (c: boolean) => void;
}) {
  const [picked, setPicked] = useState<Bucket | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = picked === item.card.correct;
  return (
    <div className="space-y-4">
      <p className="text-[1.05rem] leading-relaxed">
        <RichText text={item.situation} />
      </p>
      <div className="rounded-xl border border-hairline bg-surface p-3 shadow-card">
        <p className="text-[0.95rem]">
          <RichText text={item.card.text} />
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {BUCKETS.map((b) => (
            <button
              key={b.id}
              type="button"
              disabled={checked}
              aria-pressed={picked === b.id}
              onClick={() => setPicked(b.id)}
              className={
                "rounded-lg border px-3 py-1.5 text-sm font-medium transition " +
                (picked === b.id
                  ? "border-brand bg-brand text-white"
                  : "border-hairline bg-canvas hover:border-brand/40")
              }
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      {!checked ? (
        <button
          type="button"
          disabled={!picked}
          onClick={() => setChecked(true)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-50"
        >
          Check
        </button>
      ) : (
        <FeedbackCard
          tone={correct ? "correct" : "incorrect"}
          heading={correct ? "Correct" : "Not quite"}
          body={item.feedback}
          onContinue={() => onDone(correct)}
        />
      )}
    </div>
  );
}

function FinaleSpot({
  item,
  onDone,
}: {
  item: Extract<FinaleItem, { kind: "spotTheRisk" }>;
  onDone: (c: boolean) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);
  const result = spotScore(selected, item.flaggables);

  function toggle(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-[1.05rem] leading-relaxed">
        <RichText text={item.situation} />
      </p>
      <ArtefactRenderer artefact={item.artefact} />
      <fieldset className="space-y-2" disabled={checked}>
        <legend className="mb-1 text-sm font-semibold text-ink/70">
          Flag the elements that deserve a check
        </legend>
        {item.flaggables.map((f) => {
          const on = selected.has(f.id);
          const showResult = checked;
          const isRight = on === f.risky;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(f.id)}
              className={
                "flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-[0.95rem] transition " +
                (showResult
                  ? isRight
                    ? "border-verdict-strong/50 bg-verdict-strong/5"
                    : "border-verdict-unsafe/50 bg-verdict-unsafe/5"
                  : on
                  ? "border-brand bg-brand/10"
                  : "border-hairline bg-surface hover:border-brand/40")
              }
            >
              <span
                className={
                  "mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded border " +
                  (on
                    ? "border-brand bg-brand text-white"
                    : "border-hairline bg-canvas text-transparent")
                }
              >
                <Flag size={12} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block">
                  <RichText text={f.label} />
                </span>
                {showResult && (
                  <span className="mt-1 block text-sm text-ink/80">
                    <RichText text={f.feedback} />
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </fieldset>
      {!checked ? (
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Check my flags
        </button>
      ) : (
        <FeedbackCard
          tone={result.perfect ? "correct" : "incorrect"}
          heading={result.perfect ? "Correct" : "Not quite"}
          body={item.feedback}
          onContinue={() => onDone(result.perfect)}
        />
      )}
    </div>
  );
}
