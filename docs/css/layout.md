---
title: Flexbox and Grid
description: Choose one-dimensional Flexbox or two-dimensional Grid from layout relationships, and debug sizing, wrapping, alignment, and overflow.
---

# Choose layout from relationships

<p class="lesson-lead">Flexbox distributes items along one primary axis. Grid coordinates tracks across rows and columns. Both work best when you can state which relationships the container owns.</p>

<div class="lesson-meta">
  <span>CSS core</span>
  <span>100 minutes</span>
  <span>Interactive lab</span>
</div>

## Flexbox: one-dimensional distribution

```css
.site-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
}
```

The container establishes a main axis and a cross axis. In a row, the main axis is inline by default. `justify-content` distributes free space on the main axis; `align-items` aligns items on the cross axis.

`gap` expresses space between items without adding outer edge margins.

<FlexLab />

### Understand the flexible size

```css
.card {
  flex: 1 1 16rem;
}
```

This is shorthand for grow, shrink, and basis. Each card starts from a `16rem` basis, may grow to share free space, and may shrink when necessary.

Flex items have automatic minimum-size behavior based on content. If text refuses to shrink and overflows, inspect intrinsic content and try the intentional constraint:

```css
.card__body {
  min-inline-size: 0;
}
```

Do not add it everywhere. Add it where the flex child is allowed to become narrower than its content's default minimum.

### Automatic margins absorb free space

```css
.site-nav__account {
  margin-inline-start: auto;
}
```

In a row, the automatic inline-start margin takes available space and pushes that item to the far end. This can be clearer than a distribution mode when one item is the separator.

## Grid: two-dimensional tracks

```css
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.25rem;
}
```

Grid creates columns that repeat as space allows. Each track is at least the smaller of `100%` and `16rem`, then shares remaining space up to `1fr`. The pattern can collapse to one column without a media query.

### Page-region grid

```css
.course-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 20rem);
  grid-template-areas: "main aside";
  gap: clamp(1.5rem, 4vw, 4rem);
}

.course-page__main { grid-area: main; }
.course-page__aside { grid-area: aside; }
```

Named areas can make page relationships readable. For a small component, direct line placement may be simpler.

### `fr` distributes leftover space

`1fr` is a share of available space after non-flexible sizes and gaps are considered. It does not mean a guaranteed fraction of the container under every intrinsic constraint. Use `minmax(0, 1fr)` when a track is allowed to shrink below its content-based minimum.

## Flex or Grid?

| Relationship | First choice |
| --- | --- |
| Navigation items in one row that may wrap | Flexbox |
| Button icon and label | Flexbox or inline flow |
| Card collection with aligned columns | Grid |
| Dashboard with named page regions | Grid |
| One item pushed to the far edge | Flexbox with auto margin |
| Content should simply stack | Normal flow |

Nested layout systems are normal. A Grid card collection can contain Flexbox card headers. Choose independently at each component boundary.

## Alignment vocabulary

- `justify-*` usually acts along the inline or main axis, depending on layout.
- `align-*` usually acts along the block or cross axis.
- `place-*` combines align and justify variants in Grid and some other contexts.
- `*-content` distributes tracks or groups when there is extra container space.
- `*-items` sets the default alignment for items.
- `*-self` adjusts one item.

Always identify the container, axis, and available free space before changing alignment.

<div class="predict-box">
Three flex items use <code>justify-content: space-between</code>, but no gap appears. DevTools shows the items already consume the full main-axis width. Is the property broken? Explain the role of free space.
</div>

## Layout debugging sequence

1. Confirm the intended element is the flex or grid container.
2. Inspect direct children; grandchildren are not layout items of that container.
3. Identify the main/cross axis or grid tracks.
4. Inspect container size and available free space.
5. Check item minimum sizes and intrinsic content.
6. Toggle the browser's Flexbox or Grid overlay.
7. Reduce to one problematic item and one constraint.

<div class="build-brief">
  <h3>Guided build: course dashboard</h3>
  <p>Use Grid for the main page regions and course-card collection. Use Flexbox inside the header, filter row, and card metadata. For every container, write one sentence naming the relationship it owns.</p>
</div>

<div class="ai-brief">
  <h3>AI task: defend the layout choice</h3>
  <p>Give the model the desired relationships, not a screenshot alone. Ask for a Flexbox and Grid option with tradeoffs. Implement the smaller one, then verify overflow, wrapping, and content order.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Give one example where Grid outside and Flexbox inside is clearer than using the same system everywhere.</p>
</div>

