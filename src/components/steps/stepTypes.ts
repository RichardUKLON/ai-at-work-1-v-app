import type { Verdict } from "../../types";

// Result emitted by every step renderer when the learner finishes it.
// MissionPlayer aggregates these for scoring and badge logic.
export interface StepResult {
  points: number;
  verdict?: Verdict;
  choseUnsafe?: boolean;
  riskyOrUnsafe?: boolean; // gatekeeper badge (Mission 4)
  spotPerfect?: boolean; // fact-checker badge (Mission 2)
  allBest?: boolean; // brief-master badge (Mission 3)
}

export interface StepProps<T> {
  step: T;
  onComplete: (result: StepResult) => void;
}
