import type { Badge } from "../types";

// Six badges — specification §2.3 and content pack badge toasts.
// Icons are Lucide marks (per prompt sheet §5, badge medallions are
// hand-built rather than generated, so the build uses crisp icons).

export const badges: Badge[] = [
  {
    id: "first-steps",
    name: "First Steps",
    earnedHow: "Complete Mission 1.",
    toast: "Day one done. Ava is a tool; you are the judgement.",
    icon: "Footprints",
  },
  {
    id: "fact-checker",
    name: "Fact Checker",
    earnedHow:
      "Flag every risky element in Mission 2 and avoid the Unsafe branch.",
    toast: "You caught every fabrication. Confidence never fooled you.",
    icon: "SearchCheck",
  },
  {
    id: "brief-master",
    name: "Brief Master",
    earnedHow: "Assemble all four prompt slots correctly in Mission 3.",
    toast: "Context, task, constraints, format. You brief like a pro.",
    icon: "Blocks",
  },
  {
    id: "gatekeeper",
    name: "Gatekeeper",
    earnedHow: "No Risky or Unsafe choices in Mission 4.",
    toast: "Nothing confidential crossed the line on your watch.",
    icon: "ShieldCheck",
  },
  {
    id: "fair-judge",
    name: "Fair Judge",
    earnedHow: "Finish Mission 5 with the Trust Meter in the calibrated zone.",
    toast: "Calibrated all the way through the hardest mission.",
    icon: "Scale",
  },
  {
    id: "ai-ready",
    name: "AI-Ready",
    earnedHow: "Score 80%+ in the Friday Review.",
    toast: "Trusted where it is earned. Checked where it is not. Decided like a human.",
    icon: "Compass",
  },
];

export const badgeById = Object.fromEntries(
  badges.map((b) => [b.id, b])
) as Record<string, Badge>;
