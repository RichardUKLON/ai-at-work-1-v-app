// UI microcopy — content pack "UI MICROCOPY" section. Single source of truth
// for all chrome strings so the experience reads consistently and can be
// localised later.

export const microcopy = {
  welcome: {
    headline: "Five days. One AI assistant. Your judgement.",
    sub: "Learn to use AI at work — what it does brilliantly, where it goes wrong, and how to stay in charge. Six short missions, about 25 minutes in total.",
    howItWorks: [
      "Make real workplace choices",
      "See the consequences",
      "Build judgement you can use today",
    ],
    cta: "Start Monday",
    resume: "Continue where you left off",
  },
  map: {
    lockedPrefix: "Unlocks after",
    completedReplay: "Replay",
    bestPoints: "Best",
    meterLabel: "Calibrated trust",
  },
  meterStates: {
    avoidant: {
      label: "Avoidant",
      help: "You may be leaving easy wins unused.",
    },
    calibrated: {
      label: "Calibrated",
      help: "The ideal zone — trusting where it is earned, checking where it is not.",
    },
    overreliant: {
      label: "Over-reliant",
      help: "You may be trusting outputs that have not earned it.",
    },
  },
  verdicts: {
    strong: "Strong choice",
    acceptable: "Acceptable — here is what would be stronger",
    risky: "Risky — here is why",
    unsafe: "Unsafe — here is what happens",
  },
  retry: "Try this decision again (partial points)",
  continue: "Continue",
  reflection: {
    heading: "Thirty seconds here makes the rest stick.",
    placeholder:
      "A sentence or two — for you, not for us. This stays on your device.",
    skip: "Skip for now",
    afterLabel: "Here is one way to think about it:",
  },
  debrief: {
    titlePrefix: "What",
    titleSuffix: "was really about",
    pointsLine: (n: number) => `+${n} Judgement points`,
    nextPrefix: "On to",
    finalCta: "Take the Friday Review",
    backToMap: "Back to the map",
  },
  empty: {
    resume: (mission: string, x: number, y: number) =>
      `Welcome back — you were on ${mission}, decision ${x} of ${y}. Pick up where you left off?`,
    resetConfirm:
      "This deletes all progress, scores and reflections stored in this browser. Nothing was ever sent anywhere — there is nothing to delete elsewhere.",
    glossaryEmpty:
      "No matches. Try a shorter word, or browse the A–Z list below.",
  },
  results: {
    high: {
      title: "AI-Ready.",
      body: "You used Ava for what it is good at, checked what needed checking, and kept the human decisions human. That is the whole skill.",
    },
    mid: {
      title: "Nearly there.",
      body: "Your judgement held up well. Revisit your weakest area and try the review again — it re-draws different questions each time.",
    },
    low: {
      title: "Worth a second pass.",
      body: "The missions are short. Replay the ones that gave you trouble; the review will be here, with fresh questions.",
    },
  },
} as const;
