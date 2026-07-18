---
title: Systematic debugging
description: Reproduce, reduce, inspect, hypothesize, patch, and check regressions using browser evidence instead of random CSS edits.
---

# Debug from evidence, not momentum

<p class="lesson-lead">A debugging method should make the search space smaller after every step. The goal is not to try many fixes; it is to learn which explanation survives contact with the browser.</p>

<div class="lesson-meta">
  <span>Quality core</span>
  <span>90 minutes</span>
  <span>Browser evidence</span>
</div>

## The six-step loop

1. **Reproduce** the problem with exact steps, viewport, content, and state.
2. **Reduce** the case to the smallest HTML, CSS, and condition that still fails.
3. **Inspect** the DOM, matched rules, computed styles, box model, and relevant accessibility state.
4. **Hypothesize** one cause that predicts an observable result.
5. **Patch** the smallest variable that tests the hypothesis.
6. **Regress** — recheck the original requirement and nearby states, widths, inputs, and content.

A patch that makes the symptom disappear but cannot be explained is not yet a diagnosis.

## Write a reproduction statement

Weak:

> The cards are broken on mobile.

Useful:

> At viewport widths from 340px to 386px, the page has 92px of horizontal overflow. DevTools shows the image at a computed width of 420px inside a 328px card. Removing the image's fixed width eliminates the overflow.

The second statement identifies conditions, measure, element, and a useful experiment.

## Follow the rendering pipeline

### Content or structure problem

Check source, parsed DOM, validity, missing closing tags, unexpected nesting, duplicate IDs, and hidden attributes.

### Stylesheet or selector problem

Check the Network panel, file path, syntax, selector matching, shadow or scoped boundaries when applicable, and condition relevance.

### Cascade problem

Trace active and crossed-out declarations, origin, importance, layer, specificity, inheritance, and source order.

### Sizing or layout problem

Inspect parent and child computed sizes, display mode, available space, intrinsic minimums, box sizing, containing block, overflow, and layout overlay.

### Visual layer problem

Inspect stacking contexts, clipping, opacity, transforms, and whether a pseudo-element covers the target.

### Interaction or accessibility problem

Inspect native element choice, focusability, order, accessible name, semantic state, hidden behavior, and event assumptions.

## Common clinics

| Symptom | High-value evidence |
| --- | --- |
| Rule “does nothing” | Does it match? Is value valid? Which declaration wins? |
| Flex child overflows | Automatic minimum size, long content, basis, shrink |
| Sticky does not stick | Scroll container, inset, available scroll range, ancestor overflow |
| z-index keeps losing | Stacking-context tree, not larger numbers |
| Grid has unexpected width | Track minimums, intrinsic content, gap, `minmax(0, 1fr)` |
| Form label does not activate input | Matching `for` and unique `id` |
| Focus disappears | Outline reset, clipping, offscreen or hidden state |
| Mobile page scrolls sideways | Widest element, fixed/intrinsic width, transforms, `100vw` |

## Reduce without destroying the cause

Copy the failing component. Remove unrelated siblings, properties, and states in small batches. After each removal, confirm the bug remains. Keep the smallest example that still demonstrates the violated rule.

Reduction helps humans and models. A 20-line case gives a debugging partner more signal than a 2,000-line page with unrelated components.

## Use temporary DevTools edits as experiments

Disable one declaration. Change one value. Force a state. Add a temporary outline to boxes. Toggle Grid or Flex overlays. These changes are experiments, not the final source. Once the cause is confirmed, implement the intentional patch in the stylesheet and retest from a reload.

<div class="predict-box">
You add <code>z-index: 9999</code> to a menu, but it remains under a sibling panel. What evidence would distinguish “z-index not applied” from “menu trapped in a lower stacking context”?</div>

Inspect the menu's computed `z-index`, position, and ancestor stacking contexts, then compare the ancestor context with the sibling panel's context.

## Ask AI for ranked hypotheses

Provide:

```text
Reproduction:
Expected:
Observed:
Relevant DOM:
Matched/computed CSS:
Parent constraints:
Experiments already run:
```

Then request three ranked hypotheses, the evidence each predicts, and the smallest experiment to distinguish them. This keeps the model in diagnostic mode.

<div class="misconception">
  <h3>A rewrite can erase the lesson</h3>
  <p>Replacing the whole component may fix the screenshot while introducing new semantics, specificity, or edge cases. Prefer a minimal patch after identifying the violated relationship.</p>
</div>

## Regression matrix

After a fix, retest:

- the original failing state;
- one narrower and one wider width;
- keyboard focus and hover;
- short and long content;
- light/dark or preference states when present;
- neighboring components using shared styles; and
- a fresh reload, not only temporary DevTools edits.

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>What makes a hypothesis falsifiable in frontend debugging? Write one example with a predicted DevTools observation.</p>
</div>

