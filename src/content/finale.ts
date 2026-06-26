import type { FinaleItem } from "../types";

// Mission 6 — The Friday Review. Pool of 20 items (content pack). The app draws
// 10 at play time with at-least-one-per-concept coverage, order randomised.

export const finaleBrief =
  "End of week one. Sam wants to know whether Brightway can trust you with Ava unsupervised. Ten situations, drawn from your week. No new lessons — just your judgement.";

export const finalePool: FinaleItem[] = [
  {
    id: "FR-01",
    tags: ["what-AI-is"],
    kind: "mc",
    prompt:
      "A colleague says: “The AI checked it, so it's fine.” What is wrong with that sentence?",
    options: [
      {
        id: "a",
        text: "AI cannot check facts — it generates plausible text, so “the AI checked it” means nobody checked it.",
        correct: true,
      },
      { id: "b", text: "Nothing, if it is a recent model.", correct: false },
      {
        id: "c",
        text: "The colleague should have asked the AI twice.",
        correct: false,
      },
    ],
    feedback:
      "Verification is a human act done outside the tool. A model reviewing itself is plausibility judging plausibility.",
  },
  {
    id: "FR-02",
    tags: ["hallucination"],
    kind: "spotTheRisk",
    situation:
      "Ava's market summary. Flag what needs checking before it goes anywhere.",
    artefact: {
      kind: "aiReply",
      title: "Ava · Market summary",
      body: "The market expanded by 31.6% last year. According to the Hartwell Institute 2025 report, demand will double by 2027. Experts widely agree that this is the strongest segment to enter. Many firms are reviewing their supply chains. Investment in the region continues to rise.",
    },
    flaggables: [
      {
        id: "pct",
        label: "“expanded by 31.6% last year”",
        risky: true,
        feedback: "A precise number — verify it independently.",
      },
      {
        id: "report",
        label: "“the Hartwell Institute 2025 report”",
        risky: true,
        feedback: "A named source is not real until you find it yourself.",
      },
      {
        id: "agree",
        label: "“Experts widely agree”",
        risky: true,
        feedback: "Confident framing with nothing behind it.",
      },
      {
        id: "g1",
        label: "“Many firms are reviewing their supply chains”",
        risky: false,
        feedback: "Broad, low-stakes — low priority.",
      },
      {
        id: "g2",
        label: "“Investment in the region continues to rise”",
        risky: false,
        feedback: "General trend statement — low priority.",
      },
    ],
    feedback: "Numbers, named sources, confident framing — the Tuesday trio.",
  },
  {
    id: "FR-03",
    tags: ["verification"],
    kind: "sort",
    situation: "Sort this into Use it, Verify first, or Stop — escalate.",
    card: {
      id: "FR-03c",
      text: "Ava translated your published newsletter into Spanish for the regional office.",
      correct: "verify",
      feedback:
        "Have a Spanish speaker skim it — public content, but meaning can shift in translation.",
    },
    feedback:
      "Public content keeps it low-stakes, but a quick human check on the translation is worth it.",
  },
  {
    id: "FR-04",
    tags: ["confidentiality"],
    kind: "mc",
    prompt:
      "You want AI help preparing for a difficult conversation with a named team member about their performance. Best approach?",
    options: [
      {
        id: "a",
        text: "Describe the situation generically with no names or identifying details, and treat the output as a thinking aid.",
        correct: true,
      },
      {
        id: "b",
        text: "Paste your notes about them — it is internal anyway.",
        correct: false,
      },
      {
        id: "c",
        text: "Never think about difficult conversations with AI help.",
        correct: false,
      },
    ],
    feedback:
      "The thinking support is fine; the identifiable personal detail is not. Strip the identity, keep the help.",
  },
  {
    id: "FR-05",
    tags: ["prompting"],
    kind: "mc",
    prompt: "Which prompt is the stronger brief?",
    options: [
      {
        id: "a",
        text: "“Write something about our team meeting.”",
        correct: false,
      },
      {
        id: "b",
        text: "“Write a five-bullet summary of this team meeting for colleagues who missed it. Use only the notes below. Mark anything unclear as ‘to confirm’.”",
        correct: true,
      },
    ],
    feedback: "B gives context, task, constraints and format.",
  },
  {
    id: "FR-06",
    tags: ["bias"],
    kind: "mc",
    prompt:
      "Ava drafts interview questions, and you notice they assume the candidate has continuous full-time experience. Why might that happen?",
    options: [
      {
        id: "a",
        text: "The training data over-represents conventional career patterns, so the model defaults to them.",
        correct: true,
      },
      { id: "b", text: "Ava dislikes career changers.", correct: false },
      {
        id: "c",
        text: "Coincidence — regenerate until it stops.",
        correct: false,
      },
    ],
    feedback:
      "Not malice — mirrors. Spotting the default is your job; the model will not flag it.",
  },
  {
    id: "FR-07",
    tags: ["human-oversight"],
    kind: "sort",
    situation: "Sort this into Use it, Verify first, or Stop — escalate.",
    card: {
      id: "FR-07c",
      text: "Ava recommends which of three contractors to drop next quarter.",
      correct: "escalate",
      feedback:
        "Analysis as input, yes; a livelihood-affecting call is made by humans with context.",
    },
    feedback:
      "A recommendation that affects people's livelihoods is a human decision, not an output to act on.",
  },
  {
    id: "FR-08",
    tags: ["hallucination"],
    kind: "mc",
    prompt:
      "Ava gives you a quotation attributed to your CEO from “a recent interview”. It is perfect for your slide. What now?",
    options: [
      {
        id: "a",
        text: "Find the actual interview before using it — invented quotations are a classic fabrication.",
        correct: true,
      },
      {
        id: "b",
        text: "Use it; it sounds exactly like something they would say.",
        correct: false,
      },
      { id: "c", text: "Soften it to “reportedly said”.", correct: false },
    ],
    feedback:
      "“Sounds exactly right” is what generated text is optimised for. A quotation without a findable source is not a quotation.",
  },
  {
    id: "FR-09",
    tags: ["confidentiality"],
    kind: "spotTheRisk",
    situation: "Four colleagues describe their AI use. Flag the risky ones.",
    artefact: {
      kind: "chatThread",
      messages: [
        {
          author: "R. Vance",
          text: "Pasted a customer complaint email, including the customer's details, into a personal AI app to draft a reply.",
        },
        { author: "S. Idris", text: "Used Ava to outline a presentation." },
        { author: "T. Cole", text: "Summarised a public regulation with Ava." },
        {
          author: "M. Flynn",
          text: "Uploaded the unreleased pricing sheet to a free online “PDF summariser”.",
        },
      ],
    },
    flaggables: [
      {
        id: "complaint",
        label: "Customer complaint with details into a personal AI app",
        risky: true,
        feedback: "Personal data into an account outside every company control.",
      },
      {
        id: "outline",
        label: "Outlining a presentation with Ava",
        risky: false,
        feedback: "No sensitive input — fine.",
      },
      {
        id: "reg",
        label: "Summarising a public regulation",
        risky: false,
        feedback: "Public information — fine.",
      },
      {
        id: "pricing",
        label: "Unreleased pricing sheet to a free PDF summariser",
        risky: true,
        feedback: "Unannounced commercial data into an unknown free tool.",
      },
    ],
    feedback:
      "Personal accounts and random free tools are outside every control your organisation has. The task never makes it safe.",
  },
  {
    id: "FR-10",
    tags: ["prompting"],
    kind: "mc",
    prompt: "Ava's first draft is decent but too formal. Best move?",
    options: [
      {
        id: "a",
        text: "Reply with a short correction: “Same content, warmer and more direct.”",
        correct: true,
      },
      {
        id: "b",
        text: "Start a new chat and rebuild the prompt from scratch.",
        correct: false,
      },
      {
        id: "c",
        text: "Accept it — AI output does not really improve on iteration.",
        correct: false,
      },
    ],
    feedback:
      "Wednesday's habit: first output is a draft. Short corrections beat restarts.",
  },
  {
    id: "FR-11",
    tags: ["verification"],
    kind: "mc",
    prompt:
      "Ava summarises a contract clause as “standard and low-risk”. The contract is worth a year of revenue. You?",
    options: [
      {
        id: "a",
        text: "Treat the summary as orientation only and have the clause reviewed by someone qualified.",
        correct: true,
      },
      {
        id: "b",
        text: "Accept it — summarising is what AI is best at.",
        correct: false,
      },
      {
        id: "c",
        text: "Ask Ava a second time, phrased differently.",
        correct: false,
      },
    ],
    feedback:
      "Stakes set the depth of the check. Year-of-revenue stakes mean qualified human review, full stop.",
  },
  {
    id: "FR-12",
    tags: ["what-AI-is"],
    kind: "mc",
    prompt:
      "Why can Ava write a confident answer about a topic it has no reliable information on?",
    options: [
      {
        id: "a",
        text: "Because it generates likely-sounding text either way — confidence is a writing style, not a knowledge signal.",
        correct: true,
      },
      { id: "b", text: "Because it secretly searches the web.", correct: false },
      {
        id: "c",
        text: "It cannot — modern models decline when unsure.",
        correct: false,
      },
    ],
    feedback:
      "Some tools do search or decline sometimes; none of that is guaranteed. The default assumption stays: plausible, not verified.",
  },
  {
    id: "FR-13",
    tags: ["human-oversight"],
    kind: "mc",
    prompt:
      "Your AI-drafted report is going to the board. Which review is sufficient?",
    options: [
      {
        id: "a",
        text: "Full human review: facts verified, sources confirmed, judgements owned by you.",
        correct: true,
      },
      {
        id: "b",
        text: "A quick skim — the prompt was very thorough.",
        correct: false,
      },
      {
        id: "c",
        text: "Asking the AI to double-check its own work.",
        correct: false,
      },
    ],
    feedback:
      "Review effort scales with audience and stakes. Board-level output gets author-level ownership.",
  },
  {
    id: "FR-14",
    tags: ["bias"],
    kind: "mc",
    prompt:
      "You use AI to screen supplier proposals and notice it consistently scores proposals written in simpler English lower, including strong ones from non-native-speaking regions. What is happening, and what do you do?",
    options: [
      {
        id: "a",
        text: "The model is rewarding fluent style over substance — a bias. Score against your published criteria yourself, using AI only to extract and structure the content.",
        correct: true,
      },
      {
        id: "b",
        text: "Trust the scores; writing quality predicts delivery quality.",
        correct: false,
      },
      {
        id: "c",
        text: "Exclude non-English-origin proposals to keep things comparable.",
        correct: false,
      },
    ],
    feedback:
      "Fluency bias is real and quietly unfair in international business. Style is not substance — and your criteria, not the model's taste, define merit.",
  },
  {
    id: "FR-15",
    tags: ["confidentiality"],
    kind: "mc",
    prompt:
      "Quickest safe way to get AI help improving a confidential internal proposal?",
    options: [
      {
        id: "a",
        text: "Use the approved tool, or anonymise the content so nothing identifies clients, people or unannounced plans.",
        correct: true,
      },
      {
        id: "b",
        text: "Use any tool — drafting help is always low-risk.",
        correct: false,
      },
      {
        id: "c",
        text: "Retype it into a personal account so there is no file attachment.",
        correct: false,
      },
    ],
    feedback:
      "Thursday's pair of controls: approved tools, or stripped content. Retyping changes nothing — the data still leaves.",
  },
  {
    id: "FR-16",
    tags: ["prompting"],
    kind: "mc",
    prompt:
      "Which single addition most reduces invented details in an extraction task?",
    options: [
      {
        id: "a",
        text: "“If the information is not in the document, say ‘not stated’ rather than guessing.”",
        correct: true,
      },
      { id: "b", text: "“Be very accurate, please.”", correct: false },
      { id: "c", text: "“You are a world-class analyst.”", correct: false },
    ],
    feedback:
      "Permission to say “not stated” removes the pressure to invent. Politeness and personas do not.",
  },
  {
    id: "FR-17",
    tags: ["verification"],
    kind: "sort",
    situation: "Sort this into Use it, Verify first, or Stop — escalate.",
    card: {
      id: "FR-17c",
      text: "Ava reworded your own status update for clarity; you read it and the meaning is intact.",
      correct: "use",
      feedback: "Reading it was the verification. Your facts, your eyes, low stakes — go.",
    },
    feedback:
      "Your own content, reworded and read back by you — the lowest-risk use there is.",
  },
  {
    id: "FR-18",
    tags: ["human-oversight"],
    kind: "mc",
    prompt:
      "A teammate proposes auto-sending AI replies to routine customer emails, no review, to clear the backlog. Strongest objection?",
    options: [
      {
        id: "a",
        text: "Unreviewed output to customers means errors, invented promises or tone failures go straight out under the company's name.",
        correct: true,
      },
      { id: "b", text: "It would be too slow.", correct: false },
      {
        id: "c",
        text: "Customers can always tell AI wrote something.",
        correct: false,
      },
    ],
    feedback:
      "Speed is real; so is the risk. Drafts at scale with human send-approval gets most of the benefit with none of the unowned errors.",
  },
  {
    id: "FR-19",
    tags: ["hallucination"],
    kind: "mc",
    prompt:
      "You ask the same factual question twice and Ava gives two different, equally confident answers. What does this tell you?",
    options: [
      {
        id: "a",
        text: "At least one is wrong, and confidence carries no information — verify independently before using either.",
        correct: true,
      },
      {
        id: "b",
        text: "The second is right; models improve within a conversation.",
        correct: false,
      },
      { id: "c", text: "Average the two answers.", correct: false },
    ],
    feedback:
      "Two confident contradictions are a gift: the tool has just shown you exactly how much its tone is worth.",
  },
  {
    id: "FR-20",
    tags: ["bias", "human-oversight"],
    kind: "mc",
    prompt:
      "Sam asks for one sentence on when AI should NOT be used at work. Best answer?",
    options: [
      {
        id: "a",
        text: "“Where the input is confidential and the tool is not approved, or where the output is a judgement about people that nobody will review.”",
        correct: true,
      },
      { id: "b", text: "“Never for anything important.”", correct: false },
      {
        id: "c",
        text: "“Whenever it might make a mistake — so almost never.”",
        correct: false,
      },
    ],
    feedback:
      "The week in one sentence: it is about data in and judgement out — not about avoiding a useful tool.",
  },
];
