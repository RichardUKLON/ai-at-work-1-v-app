# Reusable SCORM Onboarding Tutorial Pattern

Use this guide to add a first-run, guided tutorial to another React-based SCORM course. The pattern ships in AI at Work 1 and guides learners through the first interactive scenario without blocking later course content.

## Behaviour to preserve

- Run the tour only in the selected first scenario and only after its interactive controls render.
- Use a sequence of concise callouts, each attached to a real page element.
- Give learners Next, Skip tutorial, close, and **Don't show this tutorial again** controls.
- Closing, skipping, or completing the tour does not suppress future replays unless the learner selects the checkbox.
- Keep a small **Start tutorial** button at the top of the guided scenario so learners can restart it after opting out.
- Use anchored callouts on desktop and a bottom-sheet tutorial card on screens below 768px.
- Do not introduce controls that are absent or irrelevant at that point in the course. In AI at Work 1, the Trust Meter is deliberately excluded from the opening tour.

## Files changed in AI at Work 1

| File | Role |
| --- | --- |
| `src/components/WarmupTutorial.tsx` | Owns tour steps, state, persistence, highlight management, positioning, responsive dialog, restart control. |
| `src/components/AppShell.tsx` | Adds `data-tour` anchors to Mission Map, Glossary, My Progress, and About buttons. |
| `src/components/steps/DecisionStep.tsx` | Adds one compact `choice-example` anchor to the first answer card. Do not highlight a whole answer list. |
| `src/screens/MissionPlayer.tsx` | Mounts the tutorial above the progress bar only for Mission 1, step 1. |
| `src/index.css` | Supplies highlight, header stacking, desktop arrow, and mobile sizing rules. |

## 1. Choose the correct launch point

Mount the tutorial inside the view that renders the first real learner interaction. Do not mount it on a video, mission brief, or loading screen: its target elements must exist before the first callout opens.

AI at Work 1 uses this condition:

```tsx
<WarmupTutorial active={missionId === "m1" && stepIndex === 0} />
```

Put the component above the scenario progress bar. When the tour is dismissed, the component renders its small **Start tutorial** button in that same location.

For another course, replace `m1` and `stepIndex === 0` with the equivalent identifier for its first interactive screen.

## 2. Add stable anchors to genuine controls

Use `data-tour` attributes instead of CSS selectors tied to visual classes. The tutorial should reference controls by their learner purpose.

```tsx
<button data-tour="mission-map" aria-label="Mission map">...</button>
<button data-tour="glossary" aria-label="Open glossary">...</button>
<div data-tour="progress">...</div>
<li data-tour="choice-example">...</li>
```

Use a compact representative element for a repeated control. AI at Work 1 marks only the first answer card, then tells learners to read every option. Highlighting the whole list caused the visual target to run behind the dialog.

## 3. Define the tour content as data

Keep the callouts in a small ordered array. Each entry needs a target, a heading, learner-facing copy, and a desktop placement.

```ts
const steps = [
  {
    target: "[data-tour='mission-map']",
    title: "Mission Map",
    body: "This takes you back to the course route.",
    placement: "bottom",
  },
  {
    target: "[data-tour='choice-example']",
    title: "Make your call",
    body: "Read every option, then choose the response you would use.",
    placement: "top",
  },
] as const;
```

Keep the opening tour to about five to seven steps. Use later scenarios to introduce controls that only become meaningful after the learner has made a choice.

## 4. Persistence and learner control

Use a namespaced localStorage key per course and tour revision:

```ts
const STORAGE_KEY = "course-slug-first-scenario-tour-v1";
```

Open automatically only when the key is absent. The close function must write the key only if the learner selects **Don't show this tutorial again**.

```ts
function close() {
  if (dontShowAgain) {
    localStorage.setItem(STORAGE_KEY, "complete");
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  setIndex(null);
}
```

The restart button clears that key and sets the first callout:

```ts
onClick={() => {
  localStorage.removeItem(STORAGE_KEY);
  setDontShowAgain(false);
  setIndex(0);
}}
```

Do not automatically mark the tour complete after its final step. That prevents learners from seeing it when they replay the scenario.

## 5. Responsive positioning and stacking

On desktop, calculate the dialog position from the target's bounding rectangle. Use the dialog's measured height when placing it above an element, otherwise a taller dialog can collide with the highlighted control.

```ts
function positionFor(target: Element | null, placement: "top" | "bottom", cardHeight: number) {
  if (!target || window.innerWidth < 768) return undefined;
  const rect = target.getBoundingClientRect();
  const width = Math.min(360, window.innerWidth - 32);
  return {
    left: Math.max(16, Math.min(rect.left, window.innerWidth - width - 16)),
    top: placement === "bottom"
      ? rect.bottom + 12
      : Math.max(16, rect.top - cardHeight - 18),
    width,
  };
}
```

Update the position on scroll and resize. On mobile, return no inline position and let the dialog sit as a bottom sheet.

Use three visual layers:

| Layer | z-index | Purpose |
| --- | ---: | --- |
| Page dimmer | 50 | Dims the rest of the screen. |
| Highlighted target | 51 | Keeps the referenced control visible above the dimmer. |
| Tutorial dialog | 60 | Keeps all callout text and controls above the target. |

Do not put the dimmer and dialog inside one stacking context with the same z-index. The target can otherwise overlap and obscure the dialog text.

Use these CSS rules as the baseline:

```css
.warmup-tour-target {
  position: relative;
  z-index: 51;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 4px #faf8f5, 0 0 0 7px #0f6e66;
}

.warmup-tour-header { z-index: 51 !important; }

.warmup-tutorial { max-height: calc(100dvh - 1rem); }

@media (min-width: 768px) {
  .warmup-tutorial { bottom: auto; right: auto; }
}
```

If an anchor sits inside a sticky header, raise the header itself while the tour highlights that child. Remove the extra class during cleanup.

## 6. Accessibility requirements

- Use `role="dialog"`, `aria-modal="true"`, and a labelled heading.
- Move focus to the Next button when each callout opens.
- Keep visible close, skip, next, and opt-out controls.
- Register cleanup for scroll and resize listeners.
- Respect the course's existing reduced-motion rules.
- Keep the mobile dialog within `100dvh` so browser chrome does not hide its controls.

## 7. Build and SCORM deployment

AI at Work 1 separates the course build from the LMS server. Do not restart the LMS service to update a course package.

1. Build the course:

   ```bash
   bun run build
   ```

2. Create a staging directory containing:

   ```text
   imsmanifest.xml
   scormcontent/index.html
   scormcontent/assets/
   ```

3. Copy the new Vite `dist/assets/` into `scormcontent/assets/`.
4. Preserve the existing SCORM bridge in `scormcontent/index.html`. Change only its hashed JavaScript and CSS asset references to match the new build.
5. Zip `imsmanifest.xml` and `scormcontent/` at the root of the archive.
6. Validate the archive with `unzip -t`.
7. Back up the previous package and `scormcontent/index.html`.
8. Copy new assets into the LMS extracted course directory first. Replace `scormcontent/index.html` last, then replace the stored ZIP.
9. Verify the live launch HTML references the new hashed JavaScript file and request that file directly. Both must return HTTP 200.

For the current LMS, the relevant targets are:

```text
/home/workspace/lms/lms-data/packages/<course-slug>.zip
/home/workspace/lms/lms-data/courses/<course-slug>/scormcontent/
```

Keep previous hashed assets in the extracted course directory. Learners who launched before the update can still request their original JavaScript, styles, or media while the new launch page loads the new assets.

## Acceptance checklist

- The tour opens at the intended first interactive scene.
- Each callout points to a visible and meaningful element.
- Desktop callouts do not overlap their target or hide their own text.
- Mobile uses the bottom sheet without off-screen controls.
- The learner can skip, close, opt out permanently, and restart after opting out.
- Replaying the first scenario reopens the tour unless the learner selected the opt-out checkbox.
- The course build passes.
- The SCORM ZIP passes `unzip -t`.
- The LMS launch page and the new asset URL return HTTP 200.
- The LMS server remains running throughout the package update.
