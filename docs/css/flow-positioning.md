---
title: Normal flow and positioning
description: Use normal flow first, understand display modes and formatting contexts, then apply relative, absolute, sticky, or fixed positioning intentionally.
---

# Let the document flow before forcing it

<p class="lesson-lead">Normal flow gives content an order, size contribution, and resilient response to change. Positioning is powerful when it expresses a real overlay or attachment—not when it replaces layout.</p>

<div class="lesson-meta">
  <span>CSS core</span>
  <span>70 minutes</span>
  <span>Layout reasoning</span>
</div>

## Normal flow is the baseline layout

Block-level boxes stack in the block direction. Inline content flows into line boxes. Each box normally contributes to the size and position of what follows.

```html
<article>
  <h2>Open studio</h2>
  <p>Meet the students and see work in progress.</p>
  <a href="details.html">View details</a>
</article>
```

Without custom layout, the heading and paragraph stack while the link participates in inline flow. The page is plain but readable and naturally adapts to width.

## `display` changes the formatting context

```css
.tag { display: inline-block; }
.navigation { display: flex; }
.dashboard { display: grid; }
.isolated-section { display: flow-root; }
```

- `block` and `inline` affect outer and inner participation.
- `inline-block` remains inline outside while forming a box inside.
- `flex` creates a flex formatting context for direct children.
- `grid` creates a grid formatting context for direct children.
- `flow-root` creates a new block formatting context without inventing a layout axis.

Choose the display mode based on relationships among children.

## Relative positioning preserves the original space

```css
.badge {
  position: relative;
  inset-block-start: -0.15rem;
}
```

The element remains in normal flow, then is visually offset. Its original space is preserved. Relative positioning also establishes a containing block for many absolutely positioned descendants.

## Absolute positioning removes the box from flow

```css
.card {
  position: relative;
}

.card__status {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
}
```

The status is positioned against its containing block and no longer contributes to the card's normal-flow size. This is appropriate for a small overlay when the card reserves enough space. It is fragile for the card's main content.

If an absolute element appears in the wrong place, identify its containing block before changing offsets.

## Sticky and fixed have environmental constraints

```css
.section-nav {
  position: sticky;
  inset-block-start: 1rem;
}
```

Sticky positioning behaves in flow until a scroll threshold, then remains within its scroll container. An ancestor's overflow and the available scroll range can prevent the expected effect.

Fixed positioning attaches to a viewport-like containing block and removes the element from normal flow. Reserve space, avoid covering content, and test zoom, virtual keyboards, and small screens.

## Stacking contexts explain many z-index failures

`z-index` compares boxes within stacking contexts, not every element globally. New stacking contexts can be created by positioned elements with `z-index`, transforms, opacity below `1`, isolation, and other properties.

A child with `z-index: 9999` cannot escape its parent's lower stacking context to outrank a sibling context. Inspect the ancestor chain and stacking contexts instead of escalating numbers.

```css
.site-header {
  position: sticky;
  z-index: 10;
  isolation: isolate;
}
```

Use a small documented layer scale for real interface layers: base, raised content, navigation, overlay, modal. The exact numbers matter less than the relationships.

<div class="predict-box">
An absolutely positioned badge overlaps the card title when the title wraps to three lines. Why did the card not grow to reserve space for the badge? Name two robust fixes that do not depend on a larger fixed height.
</div>

Possible fixes include reserving logical padding where the badge lives, or keeping the badge in normal flow and using Grid/Flexbox to align it.

## Positioning decision guide

| Need | Prefer |
| --- | --- |
| Content should push later content | Normal flow |
| Items align on one axis | Flexbox |
| Items align across rows and columns | Grid |
| Small overlay anchored to a component | Absolute inside a positioned container |
| Element follows until scroll threshold | Sticky |
| Interface attaches to viewport | Fixed, with overlap and mobile testing |

<div class="ai-brief">
  <h3>AI task: ask for the containing block</h3>
  <p>When debugging an offset, provide the ancestor styles and ask the model to identify the containing block and stacking context before it proposes new inset or z-index values.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why is absolute positioning a poor default for a page layout that contains variable text?</p>
</div>

