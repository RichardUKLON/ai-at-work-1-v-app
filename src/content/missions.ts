import type { Mission } from "../types";

// Missions 1–5 — learner-facing copy transcribed from the content pack.
// Mission 6 (the Friday Review finale) lives in finale.ts.
// ~term~ markers become in-context glossary links at render time.

export const missions: Mission[] = [
  // =====================================================================
  // MISSION 1 — Monday: Meet Ava
  // =====================================================================
  {
    id: "m1",
    day: "Monday",
    title: "Meet Ava",
    themeIcon: "Handshake",
    durationMins: 3,
    hero: "assets/illustrations/H1-meet-ava-hero.png",
    badge: "first-steps",
    openingVideo: {
      videoSrc: "assets/videos/m1-opening.mp4",
      posterSrc: "assets/videos/m1-opening-poster.jpg",
    },
    brief:
      "It is your first day at Brightway. Your manager, Sam, has one task for you before lunch: draft a short welcome email to a new client, Halden Group. The company ~AI~ assistant, Ava, is ready to help — once you know how it actually works.",
    steps: [
      {
        id: "m1s1",
        kind: "decision",
        label: "Decision 1 of 4 — What is Ava?",
        situation:
          "Before you start, Ava introduces itself. One of these descriptions is accurate. Which one?",
        options: [
          {
            id: "a",
            text: "“I look up verified facts in a database and report them back to you.”",
            verdict: "risky",
            trustDelta: 1,
            feedback:
              "Not quite. Ava does not look anything up by default — it generates text. There is no fact database behind its answers, which is why it can be wrong while sounding right.",
          },
          {
            id: "b",
            text: "“I predict the most likely next words based on patterns in my training data. I am often right, but I do not truly know things.”",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "Exactly. Ava produces plausible text, not guaranteed truth. That one idea explains almost everything else this week — including why Ava can be confidently wrong.",
          },
          {
            id: "c",
            text: "“I think and understand like a person, just much faster.”",
            verdict: "risky",
            trustDelta: 1,
            feedback:
              "Ava is good at sounding human, but it does not understand or intend anything. Treating it like a fast colleague leads people to trust it in ways it has not earned.",
          },
        ],
      },
      {
        id: "m1s2",
        kind: "decision",
        label: "Decision 2 of 4 — The first prompt",
        situation: "Time to draft the welcome email. How do you ask?",
        options: [
          {
            id: "a",
            text: "“Write an email.”",
            verdict: "acceptable",
            trustDelta: 0,
            feedback:
              "Ava will produce something — long, generic and addressed to nobody in particular. Vague ~prompt~ in, vague answer out. You will spend longer fixing it than you saved.",
          },
          {
            id: "b",
            text: "“Write a short, friendly welcome email to Halden Group, a new client. Three paragraphs maximum. Mention that Sam Reyes is their main contact and that a kick-off call follows next week.”",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "This is how you brief a person, and it works the same way here: background, the task, a length limit, the key facts to include. Notice how much better the draft is.",
          },
          {
            id: "c",
            text: "Skip Ava and write the whole thing yourself. AI cannot be trusted with anything.",
            verdict: "acceptable",
            trustDelta: -2,
            feedback:
              "Caution is healthy, but drafting routine emails is one of the safest and most useful things AI does — you review everything before it goes anywhere. Save your scepticism for higher-stakes moments.",
          },
        ],
      },
      {
        id: "m1s3",
        kind: "decision",
        label: "Decision 3 of 4 — The invented detail",
        situation:
          "Ava's draft looks good — but one line reads: “We look forward to our kick-off call on Thursday.” Sam never said which day the call would be.",
        artefact: {
          kind: "email",
          from: "Draft · Ava",
          subject: "Welcome to Brightway",
          body: [
            "Dear Halden Group,",
            "Welcome aboard — we are delighted to be working with you. Your main contact here is Sam Reyes, who will be in touch shortly.",
            "**We look forward to our kick-off call on Thursday.**",
            "Warm regards,",
            "The Brightway team",
          ],
        },
        options: [
          {
            id: "a",
            text: "Send it. Thursday is probably right.",
            verdict: "unsafe",
            trustDelta: 2,
            feedback:
              "The client books Thursday. The call was meant for Tuesday. Your first email to them contained an invented fact — Ava filled a gap with something plausible, and “plausible” is all it ever offers.",
            allowRetry: true,
          },
          {
            id: "b",
            text: "Check the actual day with Sam before sending.",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "Right. Ava filled a gap in its instructions with a plausible guess — this is a small ~hallucination~. You caught it because you knew what information was missing.",
          },
          {
            id: "c",
            text: "Delete the sentence and send without a date.",
            verdict: "acceptable",
            trustDelta: 0,
            feedback:
              "Safe, and sensible under time pressure. Checking with Sam would have been slightly better — the client does want to know about the call.",
          },
        ],
      },
      {
        id: "m1s3b",
        kind: "video",
        label: "Video Break",
        videoSrc: "assets/videos/m1-post-hallucination.mp4?v=2",
        posterSrc: "assets/videos/m1-post-hallucination-poster.jpg",
      },
      {
        id: "m1s4",
        kind: "decision",
        label: "Decision 4 of 4 — Warm-down check",
        situation:
          "Sam asks how the new assistant performed. Which summary is fair?",
        options: [
          {
            id: "a",
            text: "“Brilliant — it did the whole thing for me.”",
            verdict: "risky",
            trustDelta: 2,
            feedback:
              "It drafted; you decided. The email only became safe to send after your review. Keep that distinction — it is the difference between using AI and being used by it.",
          },
          {
            id: "b",
            text: "“Useful — it saved me time on the draft, and I caught one invented detail before sending.”",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "That is the honest picture: real time saved, real error caught, human responsible throughout.",
          },
          {
            id: "c",
            text: "“Risky — it made an error, so I will not use it again.”",
            verdict: "acceptable",
            trustDelta: -2,
            feedback:
              "One caught error is the system working, not failing. The draft saved you ten minutes; the review took one. Refusing all AI help costs more than it protects.",
          },
        ],
      },
    ],
    reflection: {
      question:
        "Ava invented a detail that sounded completely natural. What would have happened if you had sent it?",
      modelAnswer:
        "The client would have planned around a day nobody agreed. Small invented details are dangerous precisely because they are unremarkable — nothing about “Thursday” looks wrong. The only reliable defence is knowing what information you actually gave the AI, and checking anything it added on its own.",
    },
    takeaways: [
      "AI predicts likely text — it does not know things.",
      "Routine drafting is a safe, high-value use, with review.",
      "You are always the sender. Nothing leaves your hands unchecked.",
    ],
    glossaryEchoes: ["ai", "prompt", "hallucination"],
  },

  // =====================================================================
  // MISSION 2 — Tuesday: The Confident Mistake
  // =====================================================================
  {
    id: "m2",
    day: "Tuesday",
    title: "The Confident Mistake",
    themeIcon: "Search",
    durationMins: 4,
    hero: "assets/illustrations/H2-confident-mistake-hero.png",
    badge: "fact-checker",
    brief:
      "Sam is preparing for a meeting with Halden Group and needs background fast: a summary of their industry plus two supporting statistics. Ava replies in seconds — polished, confident, complete with figures and a named source.",
    steps: [
      {
        id: "m2s0",
        kind: "recall",
        label: "Warm-up recall",
        question:
          "Yesterday you learned the one idea that explains most AI errors. Which was it?",
        options: [
          {
            id: "a",
            text: "AI tools are usually out of date.",
            verdict: "risky",
            feedback: "Sometimes true, but not the core idea.",
          },
          {
            id: "b",
            text: "AI predicts plausible text rather than knowing facts.",
            verdict: "strong",
            feedback: "That is the key. Hold onto it — today it gets tested.",
          },
          {
            id: "c",
            text: "AI is biased against new users.",
            verdict: "risky",
            feedback:
              "Bias is real and comes later this week — but it is not the core idea from Monday.",
          },
        ],
      },
      {
        id: "m2s0b",
        kind: "video",
        label: "Pattern Primer",
        videoSrc: "assets/videos/m2-pattern-primer.mp4",
        posterSrc: "assets/videos/m2-pattern-primer-poster.jpg",
      },
      {
        id: "m2s1",
        kind: "spotTheRisk",
        label: "Decision 1 of 4 — Spot the Risk",
        situation:
          "Read Ava's answer. Select everything you would want to check before this goes anywhere near the meeting.",
        artefact: {
          kind: "aiReply",
          title: "Ava · Industry background for Halden Group",
          body: "The logistics sector is undergoing rapid change. Demand for faster delivery has grown steadily in recent years. The sector grew by 47.3% in 2025, driven largely by automation. According to the 2025 Meridian Industry Review, mid-sized firms like Halden Group are best placed to benefit. It is well established that most firms now use AI-based route planning. Many companies are investing in staff retraining.",
        },
        flaggables: [
          {
            id: "stat",
            label: "“grew by 47.3% in 2025”",
            risky: true,
            feedback:
              "Suspiciously precise. Specific numbers are where AI ~hallucination~ is most convincing — a made-up figure looks identical to a real one.",
          },
          {
            id: "source",
            label: "“the 2025 Meridian Industry Review”",
            risky: true,
            feedback:
              "A named source is not a real source until you find it yourself. AI frequently invents plausible-sounding reports, papers and authors.",
          },
          {
            id: "framing",
            label: "“It is well established that”",
            risky: true,
            feedback:
              "Confidence language with nothing behind it. ~Overconfidence~ is a feature of how these tools write, not a sign of reliability.",
          },
          {
            id: "general1",
            label: "“Demand for faster delivery has grown steadily”",
            risky: false,
            feedback:
              "A broad, low-stakes claim you could comfortably soften to “reportedly” — low priority for checking.",
          },
          {
            id: "general2",
            label: "“Many companies are investing in staff retraining”",
            risky: false,
            feedback:
              "Another general statement. Low stakes, low priority — flag the specifics first.",
          },
        ],
        wrap: "You accepted at least one claim that deserved a check, or you flagged everything. The three classic warning signs are numbers, named sources and confident framing — flag those, leave the broad statements.",
      },
      {
        id: "m2s2",
        kind: "decision",
        label: "Decision 2 of 4 — The named report",
        situation: "What do you do about the “2025 Meridian Industry Review”?",
        options: [
          {
            id: "a",
            text: "Cite it. It sounds authoritative, and checking takes time.",
            verdict: "unsafe",
            trustDelta: 2,
            feedback:
              "Sam quotes the review in the meeting. The client's analyst, intrigued, asks for a copy. It cannot be found, because it does not exist.",
            consequence: {
              title: "Consequence — “The meeting”",
              scene:
                "Sam quotes the review. The client's analyst, intrigued, asks for a copy. It cannot be found, because it does not exist. Sam handles it gracefully — “we'll double-check that reference” — but the client's confidence has taken a small, avoidable dent.",
              spot: "S3-meeting-gone-quiet-spot",
            },
            allowRetry: true,
          },
          {
            id: "b",
            text: "Search for the report independently to confirm it exists before citing it.",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "You search. There is no Meridian Industry Review — Ava assembled a plausible name from fragments of its training data. You have just caught a fabricated source first-hand. This is what ~verification~ looks like: independent, outside the tool.",
          },
          {
            id: "c",
            text: "Ask Ava: “Are you sure that report is real?”",
            verdict: "risky",
            trustDelta: 1,
            feedback:
              "Ava replies, politely and confidently, that it is. Asking a model to verify itself is not verification — it generates a plausible answer about its own plausible answer. Check independently.",
          },
        ],
      },
      {
        id: "m2s2b",
        kind: "video",
        label: "Credibility Break",
        videoSrc: "assets/videos/m2-credibility-break.mp4",
        posterSrc: "assets/videos/m2-credibility-break-poster.jpg",
      },
      {
        id: "m2s3",
        kind: "sort",
        label: "Decision 3 of 4 — Trust or Verify?",
        situation:
          "Four outputs, ten seconds of judgement each. Sort each into Use it, Verify first, or Stop — escalate.",
        cards: [
          {
            id: "reword",
            text: "Ava rewords a clumsy paragraph you wrote yourself.",
            correct: "use",
            feedback:
              "Your facts, Ava's phrasing. You can see at a glance whether the meaning survived. Lowest-risk use there is.",
          },
          {
            id: "summary",
            text: "Ava summarises a 30-page document you have already read.",
            correct: "verify",
            feedback:
              "Skim the summary against the original. You know the source, so checking is quick — but summaries can drop the one caveat that mattered.",
          },
          {
            id: "contract",
            text: "Ava states what a clause in a client contract “means in practice”.",
            correct: "escalate",
            feedback:
              "Interpreting contracts is legal advice. A plausible-sounding wrong answer here costs real money. This goes to someone qualified.",
          },
          {
            id: "agenda",
            text: "Ava lists ten possible agenda items for a team workshop.",
            correct: "use",
            feedback:
              "Brainstorming is judgement-free raw material. You will discard half — that is the point.",
          },
        ],
        wrap: "Notice the pattern: the more a mistake would cost, and the harder it is for you to spot one, the more checking the output deserves.",
      },
      {
        id: "m2s4",
        kind: "decision",
        label: "Decision 4 of 4 — Calibration check",
        situation:
          "A colleague watches you check Ava's claims and says: “If you have to verify everything, what is the point of using it at all?”",
        options: [
          {
            id: "a",
            text: "“Fair point — checking everything defeats the purpose. I will trust it for speed.”",
            verdict: "risky",
            trustDelta: 2,
            feedback:
              "Speed that ships errors is not speed. The Meridian Review was thirty seconds from being in front of a client.",
          },
          {
            id: "b",
            text: "“Verification scales with stakes. Reworded paragraph: glance. Statistic for a client: check it properly.”",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "That is calibrated trust. The draft saved twenty minutes; the check cost two. The economics work because you check selectively, not exhaustively.",
          },
          {
            id: "c",
            text: "“Honestly, it is easier not to use AI for research at all.”",
            verdict: "acceptable",
            trustDelta: -2,
            feedback:
              "Understandable — but AI research support with verification is still faster than starting from nothing. The skill you are building this week is exactly the one that makes it safe.",
          },
        ],
      },
    ],
    reflection: {
      question:
        "What clue suggested Ava's output might be unreliable — and what clue was missing that you would normally expect from a trustworthy source?",
      modelAnswer:
        "The warning signs were precision and confidence without provenance: an exact figure, a named report, “it is well established”. What was missing was anything you could follow — a link, a date you could check, a way to trace the claim. Human experts show their working; AI generates the style of expertise along with the content.",
    },
    takeaways: [
      "Confidence is not accuracy — Ava sounds identical when right and when wrong.",
      "Verify facts, figures, names and sources independently, outside the tool.",
      "The higher the stakes, the deeper the check.",
    ],
    glossaryEchoes: ["hallucination", "overconfidence", "verification"],
  },

  // =====================================================================
  // MISSION 3 — Wednesday: The Better Brief
  // =====================================================================
  {
    id: "m3",
    day: "Wednesday",
    title: "The Better Brief",
    themeIcon: "ClipboardList",
    durationMins: 4,
    hero: "assets/illustrations/H3-better-brief-hero.png",
    badge: "brief-master",
    brief:
      "Fourteen pages of project meeting notes have landed in your inbox. Sam wants the key decisions and action points by 14:00. Ava can do this well — if you brief it properly.",
    steps: [
      {
        id: "m3s0",
        kind: "recall",
        label: "Warm-up recall",
        question:
          "Yesterday, Ava cited a report that did not exist. What was the only reliable way to find that out?",
        options: [
          {
            id: "a",
            text: "Ask Ava to confirm the report was real.",
            verdict: "risky",
            feedback:
              "Ava confirmed it confidently. Self-checking is not checking.",
          },
          {
            id: "b",
            text: "Search for the report independently.",
            verdict: "strong",
            feedback: "Verification happens outside the tool.",
          },
          {
            id: "c",
            text: "Judge by how confident the answer sounded.",
            verdict: "risky",
            feedback: "Tone tells you nothing — that was the whole lesson.",
          },
        ],
      },
      {
        id: "m3s1",
        kind: "betterPrompt",
        label: "Decision 1 of 4 — Choose the Better Prompt",
        question: "Which prompt will produce the more useful result?",
        promptA: "Summarise these meeting notes.",
        promptB:
          "These are notes from a project status meeting about a client website launch. Extract every decision made and every action point with its owner. Use only what is in the notes — if an owner is not named, write “owner unclear” rather than guessing. Present it as a two-column table: item, owner.",
        correct: "b",
        reasons: [
          {
            id: "a",
            text: "It is longer, and longer prompts always work better.",
            correct: false,
            feedback:
              "Length is a side effect, not the cause. A long rambling prompt is worse than a short clear one.",
          },
          {
            id: "b",
            text: "It gives context, defines the task precisely, sets constraints, and asks for a format.",
            correct: true,
            feedback:
              "Those four parts — ~Context, Task, Constraints, Format~ — are the anatomy of a good brief. You would give a colleague the same things.",
          },
          {
            id: "c",
            text: "It uses more formal language, which AI responds to better.",
            correct: false,
            feedback:
              "Ava does not care about formality. It cares about being told clearly what you actually want.",
          },
        ],
      },
      {
        id: "m3s1b",
        kind: "video",
        label: "Briefing Mindset",
        videoSrc: "assets/videos/m3-briefing-mindset.mp4",
        posterSrc: "assets/videos/m3-briefing-mindset-poster.jpg",
      },
      {
        id: "m3s2",
        kind: "promptBuilder",
        label: "Decision 2 of 4 — Build the brief",
        situation: "Now assemble your own four-part brief. Pick one option per slot.",
        slots: [
          {
            id: "context",
            label: "Context",
            options: [
              {
                id: "best",
                text: "“These are notes from a project status meeting for a client website launch.”",
                best: true,
                feedback:
                  "Enough background for Ava to interpret ambiguous shorthand in the notes.",
              },
              {
                id: "w1",
                text: "“Here are some notes.”",
                best: false,
                feedback:
                  "Ava cannot tell a project meeting from a brainstorm. Context shapes everything downstream.",
              },
              {
                id: "w2",
                text: "“I work at Brightway, which was founded to deliver excellence…”",
                best: false,
                feedback:
                  "That is background about you, not about the document. Context means what the AI needs, not everything you know.",
              },
            ],
          },
          {
            id: "task",
            label: "Task",
            options: [
              {
                id: "best",
                text: "“Extract every decision made and every action point with its owner.”",
                best: true,
                feedback:
                  "Precise verbs, precise objects. Ava knows exactly what counts as success.",
              },
              {
                id: "w1",
                text: "“Summarise this.”",
                best: false,
                feedback:
                  "A summary might bury the action points in prose. Say what you actually need.",
              },
              {
                id: "w2",
                text: "“Tell me what you think is important.”",
                best: false,
                feedback:
                  "You have just delegated your judgement to a text predictor. You define important.",
              },
            ],
          },
          {
            id: "constraints",
            label: "Constraints",
            options: [
              {
                id: "best",
                text: "“Use only what is in the notes. If an owner is not named, write ‘owner unclear’ rather than guessing.”",
                best: true,
                feedback:
                  "Permitting “unclear” is one of the simplest ~hallucination~ defences there is — you have made honesty an allowed answer.",
              },
              {
                id: "w1",
                text: "“Make it sound impressive.”",
                best: false,
                feedback:
                  "You are asking for polish on top of possible guesswork. Style constraints do not prevent invention.",
              },
              {
                id: "w2",
                text: "“Be accurate.”",
                best: false,
                feedback:
                  "Ava always tries to be plausible. “Be accurate” gives it nothing actionable; “only use the notes” does.",
              },
            ],
          },
          {
            id: "format",
            label: "Format",
            options: [
              {
                id: "best",
                text: "“A two-column table: item, owner.”",
                best: true,
                feedback:
                  "You can scan a table against the notes in seconds — format choices make verification easier too.",
              },
              {
                id: "w1",
                text: "“Whatever format seems best.”",
                best: false,
                feedback:
                  "You will get prose. Then you will reformat it by hand at 13:50.",
              },
              {
                id: "w2",
                text: "“A detailed multi-page report.”",
                best: false,
                feedback:
                  "Sam asked for key decisions by 14:00, not a document longer than the notes.",
              },
            ],
          },
        ],
        success:
          "Strong assembly. Ava returns a clean, accurate two-column table — and you can see exactly why: context, task, constraints and format, each doing its job.",
      },
      {
        id: "m3s3",
        kind: "decision",
        label: "Decision 3 of 4 — The invented owner",
        situation:
          "Ava's table looks excellent. One row reads: “Update privacy policy — Priya.” You check the notes: that action point has no name next to it anywhere.",
        artefact: {
          kind: "table",
          columns: ["Item", "Owner"],
          rows: [
            ["Confirm launch date with client", "Sam"],
            ["Update privacy policy", "Priya"],
            ["Book accessibility review", "Owner unclear"],
          ],
        },
        options: [
          {
            id: "a",
            text: "Keep it. Priya is on the project; it is probably her.",
            verdict: "risky",
            trustDelta: 2,
            feedback:
              "“Probably” is how invented facts get laundered into real documents. If this table circulates, Priya owns a task nobody gave her — and the real owner does nothing.",
          },
          {
            id: "b",
            text: "Change it to “owner unclear” and check who actually owns it.",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "Yesterday's lesson, applied: you verified against the source. Even with a good constraint in the prompt, output still gets checked — the constraint reduces invention, it does not eliminate it.",
          },
          {
            id: "c",
            text: "Delete the row entirely.",
            verdict: "acceptable",
            trustDelta: 0,
            feedback:
              "The fabrication is gone, but so is a real action point from the meeting. Flagging “unclear” preserves the work and the honesty.",
          },
        ],
      },
      {
        id: "m3s3b",
        kind: "video",
        label: "Drafts Are Not Decisions",
        videoSrc: "assets/videos/m3-drafts-not-decisions.mp4",
        posterSrc: "assets/videos/m3-drafts-not-decisions-poster.jpg",
      },
      {
        id: "m3s4",
        kind: "decision",
        label: "Decision 4 of 4 — Iterate",
        situation:
          "The output is accurate but too long — Sam wants one page. Best next move?",
        options: [
          {
            id: "a",
            text: "Rewrite the whole prompt from scratch and start again.",
            verdict: "acceptable",
            trustDelta: 0,
            feedback:
              "It works, but you are discarding a conversation that is already on track. Refining is usually faster than restarting.",
          },
          {
            id: "b",
            text: "Reply: “Shorter — decisions only, keep the table format.”",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "Iteration is the normal workflow, not a sign your prompt failed. First output as draft, short corrections to refine: that is how experienced users work.",
          },
          {
            id: "c",
            text: "Give up and edit it down by hand.",
            verdict: "acceptable",
            trustDelta: -1,
            feedback:
              "Fine for tiny fixes — but a ten-second instruction would do this edit for you. Let the tool do tool work.",
          },
        ],
      },
    ],
    reflection: {
      question:
        "Which of the four slots — context, task, constraints, format — do you most often leave out when you ask an AI (or a colleague) for something?",
      modelAnswer:
        "Most people state the task and skip the rest. Missing context produces generic answers; missing constraints invites guessing; missing format creates rework. The brief pattern is really a habit of deciding what you want before you ask — which improves delegation to humans, too.",
    },
    takeaways: [
      "Brief AI like a colleague: context, task, constraints, format.",
      "Permit “I don't know” — it is your cheapest defence against guessing.",
      "Iterate. The first output is a draft, not a verdict.",
    ],
    glossaryEchoes: ["prompt", "hallucination", "verification"],
  },

  // =====================================================================
  // MISSION 4 — Thursday: Behind Closed Doors
  // =====================================================================
  {
    id: "m4",
    day: "Thursday",
    title: "Behind Closed Doors",
    themeIcon: "ShieldHalf",
    durationMins: 4,
    hero: "assets/illustrations/H4-behind-closed-doors-hero.png",
    badge: "gatekeeper",
    brief:
      "A message from your colleague Jonas: “I'm drowning — can you ask Ava to tidy up this client financial summary for me?” Attached: a spreadsheet with Halden Group's name, their revenue figures, and the personal contact details of their staff.",
    steps: [
      {
        id: "m4s0",
        kind: "recall",
        label: "Warm-up recall",
        question:
          "On Wednesday you added one constraint that cut down invented answers. Which was it?",
        options: [
          {
            id: "a",
            text: "“Be accurate.”",
            verdict: "risky",
            feedback: "Well-meant, but not actionable.",
          },
          {
            id: "b",
            text: "“If an owner is not named, write ‘owner unclear’ rather than guessing.”",
            verdict: "strong",
            feedback: "Permitting “I don't know” removes the pressure to invent.",
          },
          {
            id: "c",
            text: "“Make it sound professional.”",
            verdict: "risky",
            feedback:
              "Style instructions do not prevent guessing — they just dress it better.",
          },
        ],
      },
      {
        id: "m4s0b",
        kind: "video",
        label: "The Point of No Return",
        videoSrc: "assets/videos/m4-point-of-no-return.mp4",
        posterSrc: "assets/videos/m4-point-of-no-return-poster.jpg",
      },
      {
        id: "m4s1",
        kind: "decision",
        label: "Decision 1 of 4 — The paste moment",
        situation: "Jonas is waiting. What do you do with his file?",
        artefact: {
          kind: "spreadsheet",
          columns: ["Contact name", "Email", "Mobile", "Revenue 2025", "Notes"],
          rows: [
            ["A. Okafor", "a.okafor@halden.example", "07••• ••••21", "£4.2m", "prefers morning calls"],
            ["L. Bianchi", "l.bianchi@halden.example", "07••• ••••88", "£3.7m", "key decision-maker"],
          ],
        },
        options: [
          {
            id: "a",
            text: "Paste it all into Ava. It is only tidying — the data is not going anywhere.",
            verdict: "unsafe",
            trustDelta: 2,
            feedback:
              "It is going somewhere: into a system whose data handling you have not checked. The question is never “is the task innocent?” — it is “is this tool approved for this class of data?” ~Confidential information~ plus ~personal data~ is the highest bar there is.",
            allowRetry: true,
          },
          {
            id: "b",
            text: "Check whether Ava is approved for confidential client data — and if you are not sure, ask before pasting anything.",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "Right instinct, right order. “When unsure, ask first” costs minutes. The alternative can be unrecallable — you cannot unpaste data.",
          },
          {
            id: "c",
            text: "Delete the client's name from the file, then paste the rest.",
            verdict: "risky",
            trustDelta: 1,
            feedback:
              "Names are not the only identifying element. Revenue figures, contact details and context can identify a client on their own — and the personal data is still personal with the company name removed.",
          },
        ],
      },
      {
        id: "m4s2",
        kind: "spotTheRisk",
        label: "Decision 2 of 4 — Spot the Risk: the team chat",
        situation:
          "While you wait for an answer, you scroll the team channel. Five colleagues describe how they used AI this week. Flag the risky ones.",
        artefact: {
          kind: "chatThread",
          messages: [
            {
              author: "Devin",
              text: "Pasted our unannounced product roadmap into my personal AI account to make a nice summary — so quick!",
            },
            {
              author: "Mara",
              text: "Used Ava to brainstorm twenty ideas for the team away-day.",
            },
            {
              author: "Tomas",
              text: "Asked Ava to summarise that industry article from the news this morning.",
            },
            {
              author: "Priya",
              text: "Got Ava to draft Marco's performance review and sent it straight off — saved an hour!",
            },
            {
              author: "Joon",
              text: "Translated our published press release for the regional office.",
            },
          ],
        },
        flaggables: [
          {
            id: "roadmap",
            label: "Devin — unannounced roadmap into a personal AI account",
            risky: true,
            feedback:
              "Two problems: unannounced plans are confidential, and a personal account sits outside every control the company has. This is the single most common real-world AI data leak.",
          },
          {
            id: "awayday",
            label: "Mara — brainstorming away-day ideas",
            risky: false,
            feedback:
              "Brainstorming with no sensitive input — exactly what these tools are for.",
          },
          {
            id: "article",
            label: "Tomas — summarising a public news article",
            risky: false,
            feedback: "Public information in, summary out. Low stakes, high usefulness.",
          },
          {
            id: "review",
            label: "Priya — drafting a performance review and sending unread",
            risky: true,
            feedback:
              "Risky twice over: performance reviews involve sensitive personal judgements, and nobody read it before sending. An unreviewed AI judgement about a person went into his record.",
          },
          {
            id: "translate",
            label: "Joon — translating a published press release",
            risky: false,
            feedback: "Already-public text, routine task. Fine.",
          },
        ],
        wrap: "The pattern: it is never the task that is risky — summarising, drafting and translating are all fine. It is the data that goes in, and whether a human reviews what comes out.",
      },
      {
        id: "m4s2b",
        kind: "video",
        label: "The Boundary Test",
        videoSrc: "assets/videos/m4-boundary-test.mp4",
        posterSrc: "assets/videos/m4-boundary-test-poster.jpg",
      },
      {
        id: "m4s3",
        kind: "decision",
        label: "Decision 3 of 4 — “Everyone does it”",
        situation:
          "You tell Jonas you want to check first. He pushes back: “Everyone does it. It saves hours. Don't make this a thing.”",
        options: [
          {
            id: "a",
            text: "Agree, just this once. He is clearly under pressure.",
            verdict: "unsafe",
            trustDelta: 2,
            feedback:
              "Three weeks later, a routine review finds client personal data in an unapproved system. “Just this once” turns out to be the phrase everyone used.",
            consequence: {
              title: "Consequence — “The audit”",
              scene:
                "Three weeks later, a routine review of tool usage finds client personal data in an unapproved system. Nobody is fired — but the client must be told, the team's AI access is suspended during the investigation, and “just this once” turns out to be the phrase everyone used.",
              spot: "S4-audit-finding-spot",
            },
            allowRetry: true,
          },
          {
            id: "b",
            text: "Explain the risk briefly and offer the alternative: the approved route, or an anonymised version of the data.",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "You said no to the risk, not to the colleague. Offering a workable alternative is what makes the “no” stick — Jonas gets his hour back and the data stays safe.",
          },
          {
            id: "c",
            text: "Report Jonas to your manager immediately.",
            verdict: "acceptable",
            trustDelta: 0,
            feedback:
              "Escalation is right if this continues or has already happened. As a first move, a direct and kind conversation usually fixes it faster and keeps trust. Escalate when the conversation fails.",
          },
        ],
      },
      {
        id: "m4s4",
        kind: "spotTheRisk",
        label: "Decision 4 of 4 — Anonymise in practice",
        situation:
          "Ava is approved for general drafting, but not for client personal data. Jonas agrees to strip the file first. Select everything that must be removed or replaced before any AI use.",
        artefact: {
          kind: "spreadsheet",
          columns: ["Contact name", "Email", "Mobile", "Revenue 2025", "Notes"],
          rows: [
            ["A. Okafor", "a.okafor@halden.example", "07••• ••••21", "£4.2m", "prefers morning calls"],
            ["L. Bianchi", "l.bianchi@halden.example", "07••• ••••88", "£3.7m", "key decision-maker"],
          ],
        },
        flaggables: [
          {
            id: "company",
            label: "Client company name (Halden Group)",
            risky: true,
            feedback:
              "Replace with “Client A”. The structure of the task survives; the identity does not.",
          },
          {
            id: "contacts",
            label: "Contact names, emails, mobile numbers",
            risky: true,
            feedback:
              "Personal data — the clearest red line in the file. The tidying task does not need it.",
          },
          {
            id: "revenue",
            label: "Exact revenue figures",
            risky: true,
            feedback:
              "Commercially confidential, and precise figures can identify the client even unnamed. Use rounded placeholders if structure matters.",
          },
          {
            id: "headings",
            label: "Column headings and table layout",
            risky: false,
            feedback:
              "Generic structure is exactly what Ava needs to do the formatting job. Keep it.",
          },
          {
            id: "note",
            label: "The note “prefers morning calls”",
            risky: true,
            feedback:
              "Small, but it is a detail about an identifiable person. When in doubt, it comes out.",
          },
        ],
        wrap: "Notice the task survived intact. Anonymising rarely costs capability — Ava tidies “Client A” spreadsheets exactly as well.",
      },
    ],
    reflection: {
      question:
        "Before you paste anything into an AI tool, what single question could you ask yourself every time?",
      modelAnswer:
        "A good one: “Would I be comfortable if this exact text appeared outside the company?” If the answer is no — client data, personal details, unannounced plans, financials — it does not go into an unapproved tool. The thirty-second pause is the entire control.",
    },
    takeaways: [
      "Confidential in, confidential out — you cannot unpaste data.",
      "Approved tools for work data; when unsure, ask first.",
      "“Everyone does it” is not a control. Offer alternatives, escalate if needed.",
    ],
    glossaryEchoes: [
      "confidential-information",
      "personal-data",
      "approved-tool",
      "escalation",
    ],
  },

  // =====================================================================
  // MISSION 5 — Friday: The Unfair Shortlist
  // =====================================================================
  {
    id: "m5",
    day: "Friday",
    title: "The Unfair Shortlist",
    themeIcon: "Scale",
    durationMins: 4,
    hero: "assets/illustrations/H5-unfair-shortlist-hero.png",
    badge: "fair-judge",
    brief:
      "Sam is overloaded and asks you to use Ava to shortlist five of the twenty internal applicants for a project lead role. You paste in the (anonymised, role-relevant) applications. Ava returns a ranked shortlist in nine seconds.",
    steps: [
      {
        id: "m5s0",
        kind: "recall",
        label: "Warm-up recall",
        question: "Yesterday's rule of thumb: what makes an AI use risky?",
        options: [
          {
            id: "a",
            text: "The task — some tasks are inherently unsafe for AI.",
            verdict: "risky",
            feedback:
              "Closer than you might think for decisions (today's topic), but yesterday's lesson was about something else.",
          },
          {
            id: "b",
            text: "The data going in, and whether a human reviews what comes out.",
            verdict: "strong",
            feedback:
              "Innocent tasks become incidents through sensitive input or absent review.",
          },
          {
            id: "c",
            text: "The time of day — tools are less reliable under heavy load.",
            verdict: "risky",
            feedback: "Ava is equally confident at all hours. Unfortunately.",
          },
        ],
      },
      {
        id: "m5s0b",
        kind: "video",
        label: "Fast Decisions",
        videoSrc: "assets/videos/m5-fast-decisions.mp4",
        posterSrc: "assets/videos/m5-fast-decisions-poster.jpg",
      },
      {
        id: "m5s1",
        kind: "decision",
        label: "Decision 1 of 4 — The instant shortlist",
        situation: "Ava returns a ranked top five in nine seconds. Your move?",
        options: [
          {
            id: "a",
            text: "Forward Ava's top five to Sam. Nine seconds — incredible.",
            verdict: "unsafe",
            trustDelta: 3,
            feedback:
              "Five careers were just shaped by a text predictor, and nobody can explain why. Decisions about people are where AI ~bias~ does its most serious harm — and where responsibility cannot be delegated.",
            allowRetry: true,
          },
          {
            id: "b",
            text: "Treat it as a rough first pass, then review all twenty yourself against the published criteria.",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "AI as structuring support, human as decision-maker. The ranking may still be useful as a cross-check — after your own review, not instead of it.",
          },
          {
            id: "c",
            text: "Ask Ava to explain its ranking before deciding anything.",
            verdict: "acceptable",
            trustDelta: 1,
            feedback:
              "A reasonable instinct, with a catch: an AI's explanation of its own reasoning is a plausible reconstruction, not a reliable audit. It will give you fluent reasons that may have nothing to do with what drove the ranking.",
          },
        ],
      },
      {
        id: "m5s2",
        kind: "decision",
        label: "Decision 2 of 4 — Seeing the pattern",
        situation:
          "You review the list yourself. Ava's top five all have a similar profile: same type of university, unbroken career history. Application #15 meets every published criterion — strong delivery record, exactly relevant experience — but has a four-year career gap and an unconventional background. What best explains the ranking?",
        options: [
          {
            id: "a",
            text: "Ava found subtle quality signals humans miss. The top five probably are the best.",
            verdict: "risky",
            trustDelta: 3,
            feedback:
              "This is the most dangerous belief in this entire course: that fluency implies insight. There is no hidden wisdom here — there is pattern-matching against historical data.",
          },
          {
            id: "b",
            text: "The model has learned patterns from historical data — and historical patterns carry historical bias. It ranks “looks like past successful profiles”, not “meets the criteria”.",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "Exactly. Career gaps, unconventional paths and minority backgrounds are exactly what historical data under-represents. The model is not malicious — it is a mirror. Mirrors reflect old patterns onto new people.",
          },
          {
            id: "c",
            text: "Random noise. Run it again and average the results.",
            verdict: "risky",
            trustDelta: 1,
            feedback:
              "Re-running may shuffle the order, but it samples from the same learned patterns. You cannot average your way out of a biased mirror.",
          },
        ],
      },
      {
        id: "m5s2b",
        kind: "video",
        label: "Ownership",
        videoSrc: "assets/videos/m5-ownership.mp4",
        posterSrc: "assets/videos/m5-ownership-poster.jpg",
      },
      {
        id: "m5s3",
        kind: "spotTheRisk",
        label: "Decision 3 of 4 — Drawing the boundary",
        situation:
          "Which uses of AI in this task are acceptable? Select the ones that are NOT acceptable — the lines AI must not cross.",
        artefact: {
          kind: "notes",
          title: "Ways you could use Ava on this task",
          lines: [
            "Extract each application's qualifications into a comparison table against the published criteria.",
            "Draft the role description for Sam to review.",
            "Make the final shortlist decision.",
            "Write rejection feedback and send it without human review.",
          ],
        },
        flaggables: [
          {
            id: "extract",
            label: "Extracting qualifications into a comparison table",
            risky: false,
            feedback:
              "Structuring support: it makes your judgement faster and more consistent, and you can verify every cell against the source. Acceptable.",
          },
          {
            id: "draft",
            label: "Drafting the role description for Sam to review",
            risky: false,
            feedback:
              "Routine drafting with human review — Monday's lesson, still true on Friday. Acceptable.",
          },
          {
            id: "decide",
            label: "Making the final shortlist decision",
            risky: true,
            feedback:
              "The line itself: AI may inform a decision about people; it must not make one.",
          },
          {
            id: "reject",
            label: "Sending rejection feedback without human review",
            risky: true,
            feedback:
              "Unreviewed AI output, about people, leaving the building — three of this week's red lines in one move.",
          },
        ],
        wrap: "The rule that holds it together: ~human oversight~ means a person stays responsible for any judgement that affects people. “The AI suggested it” never transfers that responsibility.",
      },
      {
        id: "m5s4",
        kind: "sort",
        label: "Decision 4 of 4 — Trust or Verify: the week in four cards",
        situation:
          "One last round, mixing the whole week. Sort each into Use it, Verify first, or Stop — escalate.",
        cards: [
          {
            id: "thanks",
            text: "Ava drafts a thank-you note to a supplier from points you provided.",
            correct: "use",
            feedback:
              "Monday: routine drafting, your facts, quick review as you read it.",
          },
          {
            id: "cite",
            text: "Ava cites “a 2025 sector report” in a client-facing summary.",
            correct: "verify",
            feedback:
              "Tuesday: named sources get confirmed independently — you have personally watched one dissolve.",
          },
          {
            id: "grievance",
            text: "Jonas asks you to run a colleague's grievance letter through Ava “to improve the tone”.",
            correct: "escalate",
            feedback:
              "Thursday: highly sensitive personal content. This is an HR matter, not a formatting task.",
          },
          {
            id: "suppliers",
            text: "Ava ranks suppliers and recommends terminating the lowest.",
            correct: "escalate",
            feedback:
              "Today: a recommendation affecting livelihoods is a human decision. Use the analysis as input; make the call yourself, with the right people.",
          },
        ],
        wrap: "Use it, verify first, or stop and escalate — the whole week distilled into three buckets.",
      },
    ],
    reflection: {
      question:
        "Where in your own role could an AI suggestion quietly become a decision if nobody checked?",
      modelAnswer:
        "The drift is rarely announced. A “draft” shortlist gets forwarded; a “suggested” reply gets sent; a “preliminary” ranking becomes the agenda. The suggestion becomes the decision at the moment a human stops looking. Naming where that could happen in your own work is the best protection against it.",
    },
    takeaways: [
      "AI learns patterns — and patterns carry bias.",
      "Decisions about people stay with people. AI informs; humans decide.",
      "“The AI suggested it” never transfers responsibility.",
    ],
    glossaryEchoes: ["bias", "human-oversight", "training-data"],
  },
];

export const missionById = Object.fromEntries(
  missions.map((m) => [m.id, m])
) as Record<string, Mission>;
