import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Play, SkipForward } from "lucide-react";
import { useGame } from "../store";
import { missionById } from "../content/missions";
import type { BadgeId, Step } from "../types";
import type { StepResult } from "../components/steps/stepTypes";
import { trustZone } from "../lib/game";
import { RichText } from "../components/RichText";
import { getIcon } from "../lib/icons";

import { DecisionStep } from "../components/steps/DecisionStep";
import { RecallCard } from "../components/steps/RecallCard";
import { SpotTheRisk } from "../components/steps/SpotTheRisk";
import { SortStep } from "../components/steps/SortStep";
import { PromptBuilder } from "../components/steps/PromptBuilder";
import { BetterPrompt } from "../components/steps/BetterPrompt";
import { VideoStep } from "../components/steps/VideoStep";

type Phase = "openingVideo" | "brief" | "steps" | "reflection";

function StepRenderer({
  step,
  onComplete,
}: {
  step: Step;
  onComplete: (r: StepResult) => void;
}) {
  switch (step.kind) {
    case "decision":
      return <DecisionStep step={step} onComplete={onComplete} />;
    case "recall":
      return <RecallCard step={step} onComplete={onComplete} />;
    case "spotTheRisk":
      return <SpotTheRisk step={step} onComplete={onComplete} />;
    case "sort":
      return <SortStep step={step} onComplete={onComplete} />;
    case "promptBuilder":
      return <PromptBuilder step={step} onComplete={onComplete} />;
    case "betterPrompt":
      return <BetterPrompt step={step} onComplete={onComplete} />;
    case "video":
      return <VideoStep step={step} onComplete={onComplete} />;
  }
}

function computeBadge(
  badge: BadgeId,
  results: Record<string, StepResult>,
  trust: number
): boolean {
  switch (badge) {
    case "first-steps":
      return true;
    case "fact-checker":
      return (
        !!results["m2s1"]?.spotPerfect && !results["m2s2"]?.choseUnsafe
      );
    case "brief-master":
      return !!results["m3s2"]?.allBest;
    case "gatekeeper":
      return Object.values(results).every((r) => !r.riskyOrUnsafe);
    case "fair-judge":
      return trustZone(trust) === "calibrated";
    default:
      return false;
  }
}

export function MissionPlayer({ missionId }: { missionId: string }) {
  const mission = missionById[missionId];
  const navigate = useGame((s) => s.navigate);
  const completeMission = useGame((s) => s.completeMission);
  const earnBadge = useGame((s) => s.earnBadge);
  const saveResume = useGame((s) => s.saveResume);
  const trust = useGame((s) => s.trust);
  const resume = useGame((s) => s.resume);

  const initialIndex =
    resume?.missionId === missionId ? resume.stepIndex : 0;
  const [phase, setPhase] = useState<Phase>(
    initialIndex > 0 ? "steps" : mission.openingVideo ? "openingVideo" : "brief"
  );
  const [stepIndex, setStepIndex] = useState(initialIndex);
  const [results, setResults] = useState<Record<string, StepResult>>({});

  // Reset focus to top of player on each step.
  useEffect(() => {
    document.getElementById("main")?.focus();
    window.scrollTo({ top: 0 });
  }, [stepIndex, phase]);

  const maxPoints = useMemo(
    () => mission.steps.length * 3,
    [mission.steps.length]
  );

  if (!mission) {
    return <p>Mission not found.</p>;
  }

  const ThemeIcon = getIcon(mission.themeIcon);
  const step = mission.steps[stepIndex];

  function handleStepComplete(r: StepResult) {
    const newResults = { ...results, [step.id]: r };
    setResults(newResults);
    const nextIndex = stepIndex + 1;
    if (nextIndex < mission.steps.length) {
      setStepIndex(nextIndex);
      saveResume(missionId, nextIndex);
    } else if (mission.reflection) {
      setPhase("reflection");
    } else {
      finish(newResults);
    }
  }

  function finish(finalResults: Record<string, StepResult>) {
    const points = Object.values(finalResults).reduce(
      (sum, r) => sum + r.points,
      0
    );
    const badgeEarned = computeBadge(mission.badge, finalResults, trust);
    completeMission(missionId, points, maxPoints, badgeEarned);
    if (badgeEarned) earnBadge(mission.badge);
    navigate({ screen: "debrief", missionId });
  }

  return (
    <div>
      {/* Micro / macro orientation */}
      <div className="mb-4 flex items-center gap-2 text-sm text-ink/60">
        <button
          type="button"
          onClick={() => navigate({ screen: "map" })}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-surface hover:text-brand"
        >
          <ArrowLeft size={16} aria-hidden /> Exit to map
        </button>
        <span aria-hidden>·</span>
        <span className="font-medium text-ink/70">
          {mission.day} · {mission.title}
        </span>
      </div>

      {phase === "openingVideo" && mission.openingVideo && (
        <OpeningVideoPanel
          videoSrc={mission.openingVideo.videoSrc}
          posterSrc={mission.openingVideo.posterSrc}
          title={mission.title}
          onContinue={() => {
            setPhase("brief");
            saveResume(missionId, -1);
          }}
        />
      )}

      {phase === "brief" && (
        <div className="space-y-5">
          <img
            src={mission.hero}
            alt=""
            className="aspect-[16/9] w-full rounded-xl2 border border-hairline object-cover shadow-card"
          />
          <div className="flex items-center gap-2 text-brand">
            <ThemeIcon size={22} aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-wide">
              {mission.day}
            </span>
            <span className="ml-auto text-sm text-ink/60">
              {mission.durationMins} min
            </span>
          </div>
          <h1 className="text-h1">{mission.title}</h1>
          <p className="max-w-measure text-[1.1rem] leading-relaxed">
            <RichText text={mission.brief} />
          </p>
          <button
            type="button"
            onClick={() => {
              setPhase("steps");
              setStepIndex(0);
              saveResume(missionId, 0);
            }}
            className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
          >
            Begin
          </button>
        </div>
      )}

      {phase === "steps" && step && (
        <div className="space-y-5">
          {/* Progress bar */}
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-ink/60">
              <span>{step.label}</span>
              <span>
                {stepIndex + 1} of {mission.steps.length}
              </span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-hairline"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={mission.steps.length}
              aria-valuenow={stepIndex + 1}
            >
              <div
                className="h-full rounded-full bg-brand transition-all"
                style={{
                  width: `${((stepIndex + 1) / mission.steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <StepRenderer
            key={step.id}
            step={step}
            onComplete={handleStepComplete}
          />
        </div>
      )}

      {phase === "reflection" && mission.reflection && (
        <ReflectionPanel
          missionId={missionId}
          question={mission.reflection.question}
          modelAnswer={mission.reflection.modelAnswer}
          onContinue={() => finish(results)}
        />
      )}
    </div>
  );
}

function ReflectionPanel({
  missionId,
  question,
  modelAnswer,
  onContinue,
}: {
  missionId: string;
  question: string;
  modelAnswer: string;
  onContinue: () => void;
}) {
  const setReflection = useGame((s) => s.setReflection);
  const saved = useGame((s) => s.reflections[missionId] ?? "");
  const [text, setText] = useState(saved);
  const [revealed, setRevealed] = useState(false);

  function reveal() {
    setReflection(missionId, text);
    setRevealed(true);
  }

  return (
    <div className="space-y-4">
      <div className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
        Reflect
      </div>
      <p className="text-sm text-ink/70">
        Thirty seconds here makes the rest stick.
      </p>
      <h2 className="text-h3">
        <RichText text={question} />
      </h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={revealed}
        rows={4}
        placeholder="A sentence or two — for you, not for us. This stays on your device."
        className="w-full rounded-xl border border-hairline bg-surface p-3 text-[0.98rem] outline-none focus:border-brand"
      />

      {!revealed ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reveal}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Show a model reflection
          </button>
          <button
            type="button"
            onClick={reveal}
            className="rounded-lg border border-hairline bg-canvas px-4 py-2 text-sm font-medium text-ink hover:border-brand/40"
          >
            Skip for now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-brand/30 bg-brand/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              Here is one way to think about it:
            </p>
            <p className="mt-1 leading-relaxed">
              <RichText text={modelAnswer} />
            </p>
          </div>
          <button
            type="button"
            onClick={onContinue}
            className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
          >
            Continue to debrief
          </button>
        </div>
      )}
    </div>
  );
}

function OpeningVideoPanel({
  videoSrc,
  posterSrc,
  title,
  onContinue,
}: {
  videoSrc: string;
  posterSrc: string;
  title: string;
  onContinue: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

  function handlePlay() {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play();
    setPlaying(true);
  }

  function handleEnded() {
    setEnded(true);
  }

  return (
    <div className="space-y-5">
      <div className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
        <Play size={14} className="mr-1" aria-hidden /> Opening
      </div>
      <h2 className="text-h2">Before you begin — {title}</h2>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl2 border border-hairline shadow-card">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          preload="metadata"
          playsInline
          controls={playing}
          onEnded={handleEnded}
          className="h-full w-full object-cover"
        >
          Your browser does not support video playback.
        </video>
        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-ink/20"
          >
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/90 text-white shadow-pop transition-transform hover:scale-105">
              <Play size={32} aria-hidden className="ml-1" />
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
        >
          {ended ? "Continue to brief" : "Skip video"}
        </button>
        <p className="self-center text-sm text-ink/60">
          {ended ? "Watch again using controls above." : "Skip ahead if you have already watched this."}
        </p>
      </div>
    </div>
  );
}
