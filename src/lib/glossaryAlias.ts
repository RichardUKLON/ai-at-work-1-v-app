// Maps the display text inside ~…~ markers to a glossary entry id.
// Keeps content readable (~hallucination~) while the panel opens the right entry.

const alias: Record<string, string> = {
  ai: "ai",
  model: "model",
  prompt: "prompt",
  "generative ai": "generative-ai",
  "training data": "training-data",
  hallucination: "hallucination",
  overconfidence: "overconfidence",
  bias: "bias",
  "confidential information": "confidential-information",
  "personal data": "personal-data",
  "approved tool": "approved-tool",
  "human oversight": "human-oversight",
  verification: "verification",
  escalation: "escalation",
  "context, task, constraints, format": "prompt",
};

export function termToId(display: string): string | null {
  const key = display.trim().toLowerCase().replace(/\s+/g, " ");
  return alias[key] ?? null;
}
