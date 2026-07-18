---
title: AI prompt patterns
description: Provider-neutral patterns for concept explanations, semantic reviews, ranked debugging hypotheses, minimal patches, edge cases, and decision logs.
---

# AI prompt patterns for frontend work

<p class="lesson-lead">Copy the structure, replace the evidence, and narrow the request. Never copy a model's confidence into your evidence log.</p>

## The base context block

```text
Context:
Desired behavior:
Observed behavior:
Relevant HTML/CSS:
Browser evidence:
Constraints:
What I already tried:
Requested help:
```

Remove fields that truly do not apply. Do not omit evidence merely to make the prompt shorter.

## Concept tutor

```text
Explain [concept] using:
1. one accurate mental model,
2. one 15-line HTML/CSS example,
3. one predict-before-running question,
4. one common misconception,
5. one DevTools observation that can verify the explanation.

Assume I understand [known concepts] but not [new concept].
Do not introduce a framework.
```

Verify the example and the claimed observation.

## Semantic inventory

```text
Review this content before writing markup.

Return a table with:
- content or action,
- purpose,
- recommended native HTML element,
- reason,
- uncertainty or missing requirement.

Distinguish links from buttons and sections from styling-only wrappers.
Do not add ARIA when native HTML already expresses the requirement.
```

Confirm the inventory with the actual product behavior.

## Ranked debugging hypotheses

```text
Act as a debugging partner, not a code rewriter.

[base context and evidence]

Return up to three ranked hypotheses.
For each include:
- why the current evidence supports it,
- one browser observation that would confirm it,
- one observation that would reject it,
- the smallest experiment to run.

Do not propose a patch until an observation confirms a cause.
```

## Cascade trace

```text
For this one property on this one element, explain the winning declaration.

Element and DOM context:
Matched declarations in source order:
Layers and importance:
Computed result:

Walk through relevance, origin/importance, layer, specificity, and source order.
Stop as soon as a stage determines the winner.
```

Compare against DevTools' computed trace.

## Minimal patch

```text
The cause has been confirmed by this evidence:
[evidence]

Propose the smallest patch that:
- preserves the HTML and public class names,
- does not clip content,
- does not add !important,
- does not introduce a fixed height for text,
- works under these acceptance criteria: [criteria].

Return only:
1. a small diff,
2. one-sentence reason per change,
3. three regression checks.
```

Constraints must match the real task; remove any that are irrelevant.

## Accessibility risk review

```text
Review the supplied HTML/CSS for potential issues in:
- native element choice,
- accessible names and states,
- keyboard order and visible focus,
- labels and form errors,
- contrast and non-color cues,
- zoom/reflow,
- reduced motion.

For every item, quote evidence from the code and label it:
- confirmed from code,
- needs browser inspection,
- needs product clarification.

Do not claim the component is accessible from source review alone.
```

## Adversarial content cases

```text
Given these layout constraints and content fields, propose five edge cases that could expose fragility.

Include at least:
- a long localized heading,
- an unbroken token,
- missing/slow media,
- a narrow container,
- 200% zoom.

Do not rewrite the component. State the expected resilient behavior for each case.
```

## CSS maintainability review

```text
Analyze only:
- selector coupling,
- specificity hotspots,
- duplicated design decisions,
- unclear component ownership,
- comments that explain mechanics instead of reasons.

Return evidence and risk first. Suggest no refactor until I select a verified hotspot.
```

## Decision log

```text
Goal:
Model suggestion:
Evidence collected:
Decision:
Rejected alternative:
Regression checks:
```

## Prompt anti-patterns

| Avoid | Replace with |
| --- | --- |
| “Make it better” | Acceptance criteria and one review lens |
| “Fix all CSS” | One reproducible symptom and ranked causes |
| “Is this accessible?” | Specific manual and source-review checks |
| “Use best practices” | Project browser, content, and maintenance constraints |
| “Give production-ready code” | Small diff plus tests and declared assumptions |
| Pasting a private project | Redacted minimal case or approved local workflow |

## Final rule

The prompt is not evidence. The response is not evidence. Your inspection, tests, standards, and requirement checks are evidence.

