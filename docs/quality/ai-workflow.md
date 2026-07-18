---
title: AI-assisted workflow
description: Use LLMs across planning, generation, debugging, review, and learning while preserving small changes, evidence, disclosure, and ownership.
---

# Put AI inside an engineering loop

<p class="lesson-lead">The best prompt is not the longest prompt. It is the one that gives the model the right evidence, constrains the task, and produces an answer you can test.</p>

<div class="lesson-meta">
  <span>AI literacy</span>
  <span>75 minutes</span>
  <span>Plan → verify → own</span>
</div>

## Match the request to the stage

### Planning

Ask for a requirement inventory, semantic content outline, edge cases, or acceptance criteria. Do not ask for final code before the page's content and behavior are understood.

### Learning

Ask for one mental model, a contrast between two concepts, or a prediction exercise. Follow by inspecting the behavior in a small example.

### Generation

Request one bounded component or rule set with explicit HTML semantics, CSS constraints, supported-browser baseline, and acceptance criteria. Keep generated changes reviewable.

### Debugging

Provide reproduction steps and browser evidence. Ask for ranked hypotheses and discriminating experiments, not a whole-file rewrite.

### Review

Run separate passes for requirements, semantics, accessibility, layout resilience, cascade complexity, performance, and unnecessary code.

## A high-signal request

```text
Role: Act as a debugging partner, not a code generator.

Context:
This is a plain HTML/CSS event card inside a 328px container.

Desired behavior:
The image and text must stay inside the card down to 320px viewport width.

Observed behavior:
The page has 92px horizontal overflow.

Browser evidence:
The image computes to 420px wide. Its parent computes to 328px.
The image matches `.event-card img { width: 420px; }`.

Constraints:
Keep the HTML. Do not clip content or hide page overflow.

Request:
Rank up to three causes. For each, state one browser observation that would confirm it.
Then propose the smallest patch for the confirmed cause.
```

This prompt narrows the model's role and gives it a falsifiable symptom.

## Ask for diffs, not replacement blobs

For existing code, ask the model to:

- quote only the lines that need to change;
- preserve class names and public structure;
- explain each change in one sentence;
- identify assumptions; and
- provide a regression checklist.

Then apply and test each logical change separately. A small diff can still be wrong, but it is easier to inspect.

## Defend against confident fabrication

Models may invent browser support, standards rules, accessibility requirements, file contents, or test results. Treat claims differently:

| Claim | Verification source |
| --- | --- |
| “This selector does not match” | Actual DOM and DevTools |
| “This value wins” | Computed-style trace |
| “This feature is widely supported” | Current compatibility source and project policy |
| “This form is accessible” | Semantic inspection plus keyboard/manual testing |
| “The build passes” | A real local build |
| “Users prefer this layout” | Research or user testing, not model confidence |

## Use a decision log

```text
Goal:
Model suggestion:
Evidence collected:
Decision:
Rejected alternative:
Regression checks:
```

The log can be five lines. Its purpose is to make authorship and reasoning visible.

## Protect private and proprietary data

Follow course and organization policy. Do not send private student information, credentials, unpublished code, or restricted documents to a model without explicit authorization and an approved service. Redact examples or use a local/no-AI workflow when required.

## A review prompt that resists scope creep

```text
Review only the supplied HTML and CSS against these five criteria:
1. Native element choice
2. Keyboard-visible states
3. Overflow from 320px to 1440px
4. Selector specificity and coupling
5. Reduced-motion behavior

Return a table with:
- evidence from the code,
- risk,
- smallest suggested test,
- confidence.

Do not rewrite the component. Do not invent JavaScript behavior.
```

## Know when not to ask AI

Use direct inspection when the answer is already in the DOM, computed styles, Network panel, or requirement. Use a trusted reference when exact current syntax or support matters. Use a human decision-maker when the question is product intent, policy, grading, or risk acceptance.

<div class="predict-box">
A model says “add <code>overflow: hidden</code> because it is standard for cards.” What evidence would you collect before deciding? What user-visible content or focus behavior could the suggestion hide?</div>

## Capstone AI disclosure

For the capstone, disclose:

- which tasks used AI;
- one suggestion you accepted and verified;
- one suggestion you rejected;
- one defect you diagnosed with browser evidence; and
- how you would complete the same verification without the model.

<div class="verification-card">
  <h3>Ownership checklist</h3>
  <ul class="checklist">
    <li>I can state the requirement before requesting code.</li>
    <li>I keep generated changes small enough to inspect.</li>
    <li>I verify browser and standards claims independently.</li>
    <li>I record accepted and rejected suggestions.</li>
    <li>I can modify and explain the final result without the original prompt.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>What information makes an AI debugging request falsifiable rather than merely detailed?</p>
</div>

## Put the workflow into practice

Continue to [How projects work](/projects/), where each build ends with browser evidence, an AI decision log, a live requirement change, and an explanation.
