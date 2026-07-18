---
title: Debugging decision tree
description: Route a visible HTML or CSS problem toward resource loading, DOM structure, selector matching, cascade, sizing, positioning, stacking, or accessibility evidence.
---

# Debugging decision tree

<p class="lesson-lead">Start at the symptom, collect one piece of evidence, and move down one branch. Do not jump to a property before the branch supports it.</p>

## 1. Can you reproduce it?

- Record URL/file, viewport, zoom, content, input method, and state.
- Reload from the source, not only temporary DevTools edits.
- If inconsistent, identify timing, loading, or interaction conditions.

**No:** improve the reproduction before patching.  
**Yes:** continue.

## 2. Is the expected content in the DOM?

**No:** inspect HTML source, parsing, closing tags, conditional rendering, hidden attributes, and console errors. Validate the smallest fragment.

**Yes:** select the exact element and continue.

## 3. Did the required resource load?

Check Network and Sources.

**No:** verify path, base URL, filename case, status, content type, and server behavior.  
**Yes:** continue.

## 4. Does the expected selector match?

**No:** compare the selector with the parsed DOM.

- Class spelling?
- Element type?
- Direct child vs descendant?
- State or attribute present?
- Media/container condition active?
- Component or scope boundary?

**Yes:** continue.

## 5. Is the declaration valid and active?

**Invalid:** inspect spelling, value grammar, missing punctuation, unsupported feature, and variable substitution.  
**Crossed out:** trace origin, importance, layer, specificity, and source order.  
**Inherited when unexpected:** find the nearest element with its own winning value.  
**Active:** continue.

## 6. Does the computed value match the intention?

**No:** expand the computed-property trace and identify the winner.  
**Yes:** the problem is likely downstream in sizing, layout, paint, or interpretation.

## 7. Is it a size or overflow problem?

Inspect both the element and its containing block:

- content, padding, border, margin;
- `box-sizing`;
- width/min/max constraints;
- intrinsic content size;
- image dimensions;
- long unbroken content;
- flex/grid automatic minimums;
- viewport units and scrollbars; and
- transformed visual bounds.

Patch the violated constraint. Avoid page-level clipping as a default.

## 8. Is it an alignment or distribution problem?

- Confirm the layout container.
- Confirm the item is a direct child.
- Identify axis or grid tracks.
- Measure available free space.
- Inspect item minimum size and auto margins.
- Use the Flex/Grid overlay.

If no free space exists, distribution properties cannot create it.

## 9. Is it a position problem?

- Is the element in normal flow?
- What is its containing block?
- Which inset properties apply?
- Does an ancestor establish a scroll container?
- Is sticky given enough scroll range?
- Does fixed content cover useful viewport space?

Use Flexbox/Grid for relationships that should still influence surrounding layout.

## 10. Is it behind, clipped, or invisible?

- Check `display`, `visibility`, opacity, clipping, and overflow.
- Inspect stacking contexts on the ancestor chain.
- Compare ancestor contexts, not only child `z-index` values.
- Check pseudo-elements and overlays.
- Verify text and background colors in the actual theme.

## 11. Is it an interaction or accessibility problem?

- Is the native element appropriate?
- Can it receive focus?
- Is focus visible?
- Does keyboard activation work?
- Is the accessible name accurate?
- Are role, state, and value synchronized?
- Is hidden content also removed from focus order?
- Does visual order match DOM and focus order?

ARIA alone does not implement behavior.

## 12. Did the patch survive regression checks?

Retest:

- original state;
- nearby widths;
- short/long content;
- keyboard and pointer states;
- zoom;
- dark/reduced-motion states when present;
- components sharing the same rule; and
- a fresh load.

## Minimal report template

```text
Reproduction:
Expected:
Observed:
Evidence:
Hypothesis:
Experiment:
Patch:
Regression checks:
```

If the report cannot name evidence, return to the earliest uncertain branch.

