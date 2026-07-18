---
title: Rubrics and assessment
description: Assess semantic correctness, accessibility, layout resilience, maintainability, debugging evidence, requirement completion, and AI disclosure.
---

# Assess judgment, not typing speed

<p class="lesson-lead">The rubric rewards a result students can test, change, and explain. AI use is visible but not treated as proof of either quality or misconduct.</p>

<div class="lesson-meta">
  <span>Teacher guide</span>
  <span>100 points</span>
  <span>Evidence-based</span>
</div>

## Capstone rubric

| Dimension | Points | Full-credit evidence |
| --- | ---: | --- |
| Semantic structure and content | 15 | Accurate landmarks, hierarchy, element choices, links, media, data, and forms |
| Accessibility and form usability | 20 | Keyboard completion, visible focus, labels, names/states, contrast, zoom, motion |
| Layout and responsive resilience | 20 | Fluid/intrinsic design, purposeful Flex/Grid, long-content and multi-width tests |
| CSS reasoning and maintainability | 15 | Local selectors, clear tokens/boundaries, explainable cascade, minimal duplication |
| Debugging and verification | 15 | Reproducible evidence, testable hypothesis, minimal fix, regression checks |
| Requirements and edge cases | 10 | Complete journey, correct states, live change, no unexplained failures |
| AI disclosure and ownership | 5 | Material use disclosed, claims verified, accepted/rejected suggestion explained |

## Performance levels

### Exemplary

The student anticipates edge cases, connects decisions to browser evidence, chooses native and simple solutions, makes the live change locally, and explains tradeoffs without relying on the original prompt.

### Proficient

The primary task is correct and accessible, layouts are robust in tested conditions, CSS is understandable, evidence supports major decisions, and the student can explain and modify the work with minor prompting.

### Developing

The page works in the default view but has gaps in semantics, keyboard use, responsive cases, cascade reasoning, or evidence. The student can describe some decisions but relies on trial and error for changes.

### Beginning

The result is incomplete or fragile, important behavior depends on generated code the student cannot explain, and browser evidence or acceptance testing is missing.

## Non-negotiable caps

Instructors may cap the score when:

- the primary journey cannot be completed;
- navigation or form use is inaccessible by keyboard;
- submitted evidence is fabricated;
- the student cannot explain the source they submitted; or
- private data is handled against course policy.

Publish these caps before the project begins.

## Live-change scoring (10 points within relevant categories)

| Evidence | Points |
| --- | ---: |
| Restates the change as testable criteria | 2 |
| Identifies affected structure and styles | 2 |
| Implements a local, working change | 3 |
| Runs a relevant regression check | 2 |
| Explains one tradeoff | 1 |

## Debugging practicum rubric

For each case:

- reproduction precision: **20%**;
- browser evidence: **30%**;
- hypothesis and experiment: **20%**;
- minimal intentional patch: **20%**;
- regression check: **10%**.

This weighting discourages students from submitting a lucky property change without understanding the cause.

## Oral walk-through prompts

Choose two or three:

1. Show one semantic choice that improves native behavior.
2. Trace one final computed value through the cascade.
3. Explain one intrinsic size that affected your layout.
4. Demonstrate keyboard focus through the primary journey.
5. Show the fallback for one modern CSS feature.
6. Reproduce a defect and explain the evidence that isolated it.
7. Describe one AI suggestion you rejected.
8. Change one token and predict the affected surfaces before saving.

## Feedback language

Prefer feedback tied to evidence and next action:

- “The label is visible, but its `for` value does not match the input ID; verify activation by clicking the label.”
- “The grid works at 1440px and 375px; test the 620–760px range where the cards cross their minimum size.”
- “The state rule needs higher specificity because the base selector contains an ID; reduce the base selector rather than escalating.”

Avoid feedback such as “make it more professional” without observable criteria.

<div class="ai-brief">
  <h3>Using AI in assessment</h3>
  <p>AI can help generate comparable bug variants or suggest rubric-aligned questions. The instructor must verify every task, expected result, and score. Never let model confidence substitute for inspecting the submitted work.</p>
</div>

<div class="exit-ticket">
  <h3>Course reflection</h3>
  <p>Revise your orientation sentence: what is the difference between code generation and code ownership now?</p>
</div>

## Keep the reference desk open

Use the [HTML and CSS cheatsheet](/reference/cheatsheet), [debugging decision tree](/reference/debugging-tree), and [AI prompt patterns](/reference/prompt-patterns) during future builds. They are working references, not material to memorize once.
