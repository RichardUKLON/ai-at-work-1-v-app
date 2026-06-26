// Content model for AI at Work: The Judgement Game.
// Mirrors specification §8.2. All learner-facing copy lives in src/content/*,
// fully separated from components so writers (and translators) can edit it
// without touching code.

/** Plain string that may contain ~glossary-term~ markers and **bold** spans. */
export type RichText = string;

export type Verdict = "strong" | "acceptable" | "risky" | "unsafe";

export type GlossaryId = string;

// ---------------------------------------------------------------------------
// Artefacts — realistic in-world documents rendered by ArtefactRenderer.
// ---------------------------------------------------------------------------

export type Artefact =
  | { kind: "email"; from: string; subject: string; body: RichText[] }
  | { kind: "chatThread"; messages: { author: string; text: RichText }[] }
  | { kind: "aiReply"; title?: string; body: RichText }
  | { kind: "spreadsheet"; columns: string[]; rows: string[][] }
  | { kind: "notes"; title?: string; lines: RichText[] }
  | { kind: "table"; columns: string[]; rows: string[][] };

// ---------------------------------------------------------------------------
// Options shared by decision / recall / multiple-choice steps.
// ---------------------------------------------------------------------------

export interface Option {
  id: string;
  text: RichText;
  verdict: Verdict;
  feedback: RichText;
  /** Movement on the Trust Meter (−5…+5). Positive = towards Over-reliant. */
  trustDelta?: number;
  /** Consequence scene shown for Unsafe/Risky branches. */
  consequence?: { title: string; scene: RichText; spot?: string };
  allowRetry?: boolean;
}

/** A flaggable span inside a Spot the Risk artefact. */
export interface Flaggable {
  id: string;
  label: string;
  risky: boolean;
  feedback: RichText;
}

/** A card to sort in a Trust or Verify step. */
export type Bucket = "use" | "verify" | "escalate";
export interface SortCard {
  id: string;
  text: RichText;
  correct: Bucket;
  feedback: RichText;
}

/** One slot of the four-part prompt builder. */
export interface PromptSlot {
  id: string;
  label: string; // Context / Task / Constraints / Format
  options: { id: string; text: RichText; best: boolean; feedback: RichText }[];
}

export interface ReasonOption {
  id: string;
  text: RichText;
  correct: boolean;
  feedback: RichText;
}

// ---------------------------------------------------------------------------
// Steps — discriminated union.
// ---------------------------------------------------------------------------

interface StepBase {
  id: string;
  label: string; // short title, e.g. "Decision 1 of 4 — What is Ava?"
}

export type Step =
  | (StepBase & {
      kind: "decision";
      situation: RichText;
      artefact?: Artefact;
      options: Option[];
    })
  | (StepBase & {
      kind: "recall";
      question: RichText;
      options: Option[]; // verdict carries correctness via "strong" = correct
    })
  | (StepBase & {
      kind: "spotTheRisk";
      situation: RichText;
      artefact: Artefact;
      flaggables: Flaggable[];
      wrap: RichText;
    })
  | (StepBase & {
      kind: "sort";
      situation: RichText;
      cards: SortCard[];
      wrap?: RichText;
    })
  | (StepBase & {
      kind: "promptBuilder";
      situation: RichText;
      slots: PromptSlot[];
      success?: RichText;
    })
  | (StepBase & {
      kind: "betterPrompt";
      promptA: RichText;
      promptB: RichText;
      question: RichText;
      correct: "a" | "b";
      reasons: ReasonOption[];
    })
  | (StepBase & {
      kind: "video";
      videoSrc: string;
      posterSrc?: string;
    });

export type StepKind = Step["kind"];

// ---------------------------------------------------------------------------
// Missions.
// ---------------------------------------------------------------------------

export interface BadgeRule {
  id: BadgeId;
}

export interface Mission {
  id: string; // "m1" … "m6"
  day: string; // "Monday"
  title: string;
  themeIcon: string; // lucide icon name
  durationMins: number;
  hero: string; // path under /assets/illustrations
  badge: BadgeId;
  brief: RichText;
  openingVideo?: { videoSrc: string; posterSrc?: string };
  steps: Step[];
  reflection?: { question: RichText; modelAnswer: RichText };
  takeaways: string[];
  glossaryEchoes: GlossaryId[];
}

// ---------------------------------------------------------------------------
// Finale.
// ---------------------------------------------------------------------------

export type ConceptTag =
  | "what-AI-is"
  | "hallucination"
  | "verification"
  | "confidentiality"
  | "prompting"
  | "bias"
  | "human-oversight";

export type FinaleItem =
  | {
      id: string;
      tags: ConceptTag[];
      kind: "mc";
      prompt: RichText;
      options: { id: string; text: RichText; correct: boolean }[];
      feedback: RichText;
    }
  | {
      id: string;
      tags: ConceptTag[];
      kind: "spotTheRisk";
      situation: RichText;
      artefact: Artefact;
      flaggables: Flaggable[];
      feedback: RichText;
    }
  | {
      id: string;
      tags: ConceptTag[];
      kind: "sort";
      situation: RichText;
      card: SortCard;
      feedback: RichText;
    };

// ---------------------------------------------------------------------------
// Glossary & badges.
// ---------------------------------------------------------------------------

export interface GlossaryEntry {
  id: GlossaryId;
  term: string;
  group: "Basics" | "Risks" | "Good Practice";
  definition: string;
  atWork: string;
  related: GlossaryId[];
}

export type BadgeId =
  | "first-steps"
  | "fact-checker"
  | "brief-master"
  | "gatekeeper"
  | "fair-judge"
  | "ai-ready";

export interface Badge {
  id: BadgeId;
  name: string;
  earnedHow: string;
  toast: string;
  icon: string; // lucide icon name (badges hand-built per prompt sheet §5)
}
