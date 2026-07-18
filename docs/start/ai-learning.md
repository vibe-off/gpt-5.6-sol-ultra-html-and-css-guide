---
title: Learn with AI, not from AI
description: A provider-neutral workflow for using LLMs to explain, critique, debug, and review frontend code without surrendering judgment.
---

# Learn with AI, not from AI

<p class="lesson-lead">A good AI workflow produces inspectable decisions. A weak workflow produces a large answer that nobody in the room can verify.</p>

<div class="lesson-meta">
  <span>AI literacy</span>
  <span>40 minutes</span>
  <span>Provider-neutral</span>
</div>

## Use AI for bounded roles

AI is useful as an:

- **explainer** — restate a concept at your current level;
- **critic** — identify risks in a small, complete example;
- **generator** — draft a constrained component or test case;
- **debugging partner** — rank hypotheses from observed evidence; and
- **reviewer** — look for accessibility, maintenance, or edge-case gaps.

It is not the browser, a validator, a product owner, or the person accountable for the result.

## The PAVE contract

| Step | Student action | Evidence produced |
| --- | --- | --- |
| Predict | State the expected result before asking | A falsifiable claim |
| Ask | Give context, evidence, constraints, and a narrow request | A candidate explanation or patch |
| Verify | Inspect, test, validate, and try edge cases | Browser or requirement evidence |
| Explain | Defend the final choice and record rejected ideas | A decision log |

### A reusable prompt shape

```text
Context:
Desired behavior:
Observed behavior:
Relevant HTML and CSS:
Browser evidence:
Constraints:
What I already tried:
Requested help:
```

“Requested help” should be precise: *rank three likely causes*, *explain this computed value*, *propose the smallest patch*, or *review only for keyboard accessibility*. Avoid “fix everything.”

## Weak prompt, stronger prompt

<div class="lesson-grid">
  <div class="lesson-card">
    <h3>Weak</h3>
    <p><em>My card is broken. Rewrite the CSS.</em></p>
    <p>This omits the intended behavior, observed behavior, viewport, relevant code, and constraints. A whole-file rewrite can hide the cause.</p>
  </div>
  <div class="lesson-card">
    <h3>Stronger</h3>
    <p><em>At 360px, the card creates horizontal scroll. DevTools shows the image at 420px and the card at 328px. Keep the markup and rank the three most likely CSS causes before suggesting a patch.</em></p>
    <p>This gives the model a testable symptom and keeps the solution space small.</p>
  </div>
</div>

## Audit generated code in passes

Do not review a large output as one impression. Use separate passes:

1. **Requirement pass:** does every requested behavior exist?
2. **Semantic pass:** are elements chosen by meaning and native behavior?
3. **Layout pass:** does the page survive narrow, wide, zoomed, and long-content cases?
4. **Accessibility pass:** keyboard, focus, names, labels, contrast, and motion.
5. **Maintenance pass:** duplication, specificity, naming, and unexplained complexity.
6. **Evidence pass:** can you demonstrate each important claim in the browser?

<div class="misconception">
  <h3>“It looks right” is only one test</h3>
  <p>A page can match a screenshot while using invalid structure, inaccessible controls, fragile fixed sizes, or a cascade no one can maintain.</p>
</div>

## Keep an AI decision log

For each substantial use, record four lines:

```text
Suggestion: Use overflow: hidden on the card.
Evidence: The child image is wider because of a fixed width.
Decision: Rejected overflow; made the image responsive instead.
Why: The content should resize, not be clipped.
```

The log is not paperwork for its own sake. It trains you to separate a plausible suggestion from a justified decision.

## No-AI alternatives

Every activity in this guide can use one of these instead:

- predict, then compare with a supplied candidate answer;
- exchange code reviews with a peer;
- use the [debugging decision tree](/reference/debugging-tree);
- request teacher feedback on a minimal reproduction; or
- consult the [trusted sources](/reference/sources).

<div class="build-brief">
  <h3>Practice: constrain the helper</h3>
  <p>Take a 20-line HTML/CSS example. Write one prompt that asks for an explanation only, one that asks for ranked hypotheses, and one that asks for a minimal patch. State what evidence you would collect after each response.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why is “show your browser evidence” a stronger assessment of AI-assisted work than “do not use AI”?</p>
</div>

