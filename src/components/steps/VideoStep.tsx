import { useState, useRef } from "react";
import { Play, SkipForward } from "lucide-react";
import type { Step } from "../../types";
import type { StepResult } from "./stepTypes";

export function VideoStep({
  step,
  onComplete,
}: {
  step: Step & { kind: "video" };
  onComplete: (r: StepResult) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  function handleEnded() {
    setEnded(true);
  }

  function handleSkip() {
    onComplete({ stepId: step.id, points: 0, skipped: true });
  }

  function handleContinue() {
    onComplete({ stepId: step.id, points: 0, skipped: true });
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl2 border border-hairline bg-ink">
        {!playing ? (
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          >
            {step.posterSrc ? (
              <img
                src={step.posterSrc}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
            ) : null}
            <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/90 text-white shadow-pop transition-transform hover:scale-110">
              <Play size={28} fill="currentColor" />
            </span>
            <span className="relative z-10 text-sm font-medium text-white/80">
              Watch (55 sec)
            </span>
          </button>
        ) : (
          <video
            ref={videoRef}
            src={step.videoSrc}
            poster={step.posterSrc}
            className="h-full w-full object-cover"
            controls
            onEnded={handleEnded}
            controlsList="nodownload"
            onError={() => {
              // If the video file doesn't exist, show a graceful fallback
              setEnded(true);
            }}
          >
            <track kind="captions" src="" label="English" />
          </video>
        )}
      </div>

      {!ended && playing && (
        <button
          type="button"
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-canvas px-4 py-2 text-sm font-medium text-ink/70 hover:border-brand/40"
        >
          <SkipForward size={16} aria-hidden />
          Skip video
        </button>
      )}

      {ended && (
        <button
          type="button"
          onClick={handleContinue}
          className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
        >
          Continue
        </button>
      )}
    </div>
  );
}
