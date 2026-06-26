import type { GlossaryEntry } from "../types";

// Glossary content — specification §7.2 (14 entries). Definitions are taken
// verbatim from the spec; each entry adds a short "at work" example and links
// to related terms. Plain English, ≤25-word definitions.

export const glossary: GlossaryEntry[] = [
  {
    id: "ai",
    term: "AI (artificial intelligence)",
    group: "Basics",
    definition:
      "Software that performs tasks that normally need human thinking, such as writing, summarising, or answering questions.",
    atWork:
      "At work, an AI assistant can draft an email or summarise a long document in seconds — but it does not truly know things.",
    related: ["model", "generative-ai"],
  },
  {
    id: "model",
    term: "Model",
    group: "Basics",
    definition:
      "The underlying system an AI tool is built on. It learns patterns from very large amounts of text and data.",
    atWork:
      "When Ava writes a reply, the model is predicting likely words — it is not looking up verified facts.",
    related: ["ai", "training-data"],
  },
  {
    id: "prompt",
    term: "Prompt",
    group: "Basics",
    definition:
      "The instruction or question you give an AI tool. Better prompts give context, define the task, set constraints, and ask for a format.",
    atWork:
      "“Write an email” is a weak prompt; naming the audience, length, and key facts gets a far better draft.",
    related: ["hallucination", "verification"],
  },
  {
    id: "generative-ai",
    term: "Generative AI",
    group: "Basics",
    definition:
      "AI that creates new content — text, images, or code — rather than only finding existing information.",
    atWork:
      "Drafting, brainstorming, and rewording are all generative tasks: the tool produces something new each time.",
    related: ["ai", "model"],
  },
  {
    id: "training-data",
    term: "Training data",
    group: "Basics",
    definition:
      "The text and information a model learned from. It shapes what the model is good at — and what biases and gaps it carries.",
    atWork:
      "If past hiring data favoured certain backgrounds, a model trained on it can quietly repeat that pattern.",
    related: ["model", "bias"],
  },
  {
    id: "hallucination",
    term: "Hallucination",
    group: "Risks",
    definition:
      "When an AI produces information that sounds plausible but is false or invented — such as a statistic, quote, or source that does not exist.",
    atWork:
      "Ava once cited “the 2025 Meridian Industry Review”. It sounded authoritative. It did not exist.",
    related: ["overconfidence", "verification"],
  },
  {
    id: "overconfidence",
    term: "Overconfidence",
    group: "Risks",
    definition:
      "The way AI presents uncertain or wrong answers in the same assured tone as correct ones. Tone is not evidence.",
    atWork:
      "Ava sounds identical when it is right and when it is wrong — confidence tells you nothing about accuracy.",
    related: ["hallucination", "verification"],
  },
  {
    id: "bias",
    term: "Bias",
    group: "Risks",
    definition:
      "Unfair patterns in AI outputs, learned from patterns in its training data. It can disadvantage groups of people without anyone intending it.",
    atWork:
      "An AI shortlist that favours unbroken career histories is reflecting old patterns, not judging real merit.",
    related: ["training-data", "human-oversight"],
  },
  {
    id: "confidential-information",
    term: "Confidential information",
    group: "Risks",
    definition:
      "Information that must not be shared outside approved channels — for example client data, personal details, financial figures, or unannounced plans.",
    atWork:
      "Pasting a client financial summary into an unapproved tool puts confidential information outside the company's control.",
    related: ["personal-data", "approved-tool"],
  },
  {
    id: "personal-data",
    term: "Personal data",
    group: "Risks",
    definition:
      "Information about an identifiable person, such as names, contact details, or employment records. Usually protected by law.",
    atWork:
      "Staff names, emails, and mobile numbers in a spreadsheet are personal data — strip them before any AI use.",
    related: ["confidential-information", "escalation"],
  },
  {
    id: "approved-tool",
    term: "Approved tool",
    group: "Good Practice",
    definition:
      "An AI tool your organisation has checked and authorised for particular kinds of work and data. When unsure, ask before using one.",
    atWork:
      "Ava may be approved for general drafting but not for client personal data — the data class is what matters.",
    related: ["confidential-information", "escalation"],
  },
  {
    id: "human-oversight",
    term: "Human oversight",
    group: "Good Practice",
    definition:
      "A person staying responsible for reviewing, approving, and owning any work or decision that AI helped with.",
    atWork:
      "AI may inform a shortlist; a person makes the decision and owns it. “The AI suggested it” transfers nothing.",
    related: ["bias", "verification"],
  },
  {
    id: "verification",
    term: "Verification",
    group: "Good Practice",
    definition:
      "Checking AI output before relying on it: confirm facts and sources independently, compare against originals, and apply your own knowledge.",
    atWork:
      "Search for a cited report yourself. Asking the AI “are you sure?” is not verification.",
    related: ["hallucination", "escalation"],
  },
  {
    id: "escalation",
    term: "Escalation",
    group: "Good Practice",
    definition:
      "Passing a question or risk to someone with the right authority or expertise instead of deciding alone — or letting AI decide.",
    atWork:
      "A legal-sounding claim about a contract clause goes to someone qualified, not into a slide.",
    related: ["human-oversight", "verification"],
  },
];

export const glossaryById = Object.fromEntries(
  glossary.map((g) => [g.id, g])
) as Record<string, GlossaryEntry>;
