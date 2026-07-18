---
title: Box model and sizing
description: Reason about content, padding, border, margin, box-sizing, intrinsic sizes, constraints, and overflow.
---

# Every element participates as a box

<p class="lesson-lead">Many “mysterious” layout bugs are arithmetic plus constraints. Learn which layers contribute to size, which dimension is intrinsic, and which ancestor limits the result.</p>

<div class="lesson-meta">
  <span>CSS core</span>
  <span>75 minutes</span>
  <span>Interactive model</span>
</div>

## The four layers

From inside out:

1. **Content box:** text, media, or child layout.
2. **Padding:** space inside the border.
3. **Border:** the visible edge included around padding.
4. **Margin:** separation outside the border.

With the default `content-box`, a declared width applies only to content. Padding and border add to the rendered outer size.

```css
.card {
  width: 300px;
  padding: 24px;
  border: 4px solid;
}
```

The border-box width becomes `300 + 48 + 8 = 356px`, before margins.

## Make declared sizes easier to reason about

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

With `border-box`, declared width and height include content, padding, and border. This often matches the intended constraint for components.

<BoxModelLab />

## Prefer constraints to fixed dimensions

```css
.article {
  inline-size: min(100% - 2rem, 68ch);
  margin-inline: auto;
}
```

This says: use the smaller of a gutter-aware available width and a readable maximum line length. It adapts without inventing a breakpoint.

Useful sizing tools:

- `min-inline-size` and `max-inline-size` set bounds;
- `min()` chooses the smallest candidate;
- `max()` chooses the largest candidate;
- `clamp(min, preferred, max)` creates a fluid value with limits;
- `min-content`, `max-content`, and `fit-content()` expose intrinsic sizing behavior.

Logical properties such as `inline-size`, `margin-inline`, and `padding-block` map to the writing mode instead of assuming horizontal English text.

## Inline and block boxes differ

Block boxes normally fill available inline space and stack in normal flow. Inline boxes flow within lines. Width and height do not affect a normal inline box in the same way as a block or inline-block box.

```css
.tag {
  display: inline-block;
  padding: 0.25rem 0.65rem;
}
```

`inline-block` lets the tag remain in the line while accepting box-like dimensions and padding.

## Overflow is evidence, not clutter

When content does not fit, find the cause before hiding it.

Common causes:

- a fixed child width larger than its container;
- an unbreakable URL or long token;
- default minimum sizing in a flex or grid item;
- replaced content such as an image without a fluid constraint;
- `100vw` including scrollbar space;
- absolute positioning removing an item from normal-flow sizing; or
- a parent with an unexpectedly narrow computed width.

Useful targeted fixes include:

```css
img {
  max-inline-size: 100%;
  block-size: auto;
}

.flex-child {
  min-inline-size: 0;
}

.long-token {
  overflow-wrap: anywhere;
}
```

Do not apply `overflow: hidden` to the page just to remove a horizontal scrollbar. That can clip focus indicators, menus, shadows, or real content while preserving the underlying defect.

## Margin collapse is contextual

Vertical margins of block boxes in normal flow can collapse in specific circumstances. If a child's top margin appears outside its parent, inspect the box model and formatting context. Adding random padding may change the symptom without explaining the relationship.

Flex and Grid containers do not collapse their children's margins in the same way. `display: flow-root` can create a new block formatting context when that behavior is actually needed.

<div class="predict-box">
A card uses <code>width: 100%</code>, <code>padding: 2rem</code>, and the default box sizing. Its parent is exactly 320px wide. Predict the card's border-box width before and after applying <code>box-sizing: border-box</code>.
</div>

## A box-model debugging sequence

1. Select the overflowing element and its parent.
2. Record computed content size, padding, border, and margin.
3. Inspect `box-sizing`, minimum sizes, and intrinsic content.
4. Disable fixed dimensions one at a time.
5. Test with long text and a narrow container.
6. Fix the violated constraint rather than clipping the result.

<div class="ai-brief">
  <h3>AI task: require arithmetic</h3>
  <p>Provide the parent's computed width and the child's content, padding, border, margin, and box sizing. Ask the model to calculate the expected border-box size before suggesting any property.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why can <code>width: 100%</code> still overflow? Give one box-model cause and one intrinsic-content cause.</p>
</div>
