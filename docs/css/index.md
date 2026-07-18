---
title: CSS as a rule system
description: Learn CSS as a system of matching, conflict resolution, values, and constraints rather than a catalog of visual properties.
---

# CSS is a rule system

<p class="lesson-lead">A declaration can be valid and still have no visible effect. To reason about CSS, ask four questions: did the file load, did the selector match, did the declaration win, and could layout honor the value?</p>

<div class="lesson-meta">
  <span>CSS core</span>
  <span>45 minutes</span>
  <span>Rules + evidence</span>
</div>

## Read a rule from outside in

```css
.event-card > h2 {
  margin-block: 0;
  color: #273967;
}
```

- `.event-card > h2` is the **selector**.
- The braces contain a **declaration block**.
- `margin-block` and `color` are **properties**.
- `0` and `#273967` are **values**.
- Each property-value pair is a **declaration**.

The selector means “an `h2` that is a direct child of an element with class `event-card`.” If your heading is nested inside another wrapper, the rule is valid but does not match.

## Connect CSS to HTML

An external stylesheet keeps responsibilities clear:

```html
<link rel="stylesheet" href="styles.css">
```

When styles are missing, confirm the request succeeded before changing selectors. A wrong path, a failed server response, or a stylesheet loaded after an overriding file are different problems.

## The four-question debugging ladder

1. **Loaded?** Is the stylesheet present in the Network and Sources panels?
2. **Matched?** Does the rule appear for the selected element?
3. **Won?** Is the declaration active or crossed out? Is its value valid?
4. **Honored?** Do parent size, display mode, intrinsic content, or another layout constraint affect the result?

This ladder prevents “specificity” from becoming a generic explanation for every CSS bug.

## Values carry types and context

```css
.card {
  inline-size: min(100%, 42rem);
  padding: clamp(1rem, 3vw, 2rem);
  color: hsl(222 35% 23%);
}
```

Values can be keywords, lengths, percentages, colors, functions, images, or combinations accepted by that property. Percentages resolve against a context. Relative units refer to font size, viewport, or another basis. Functions such as `min()` and `clamp()` let you express constraints rather than one fixed number.

If a value is invalid for a property, the browser ignores that declaration rather than stopping the whole stylesheet.

## Prefer classes for reusable styling

```html
<article class="event-card event-card--featured">…</article>
```

```css
.event-card { … }
.event-card--featured { … }
```

Classes create reusable hooks with moderate specificity. Element selectors are useful for broad defaults. IDs are usually better reserved for unique document relationships and fragment targets than everyday component styling.

<div class="predict-box">
The stylesheet loaded and <code>.card h2</code> appears in the file, but DevTools does not list it for the selected heading. Name two DOM reasons before considering specificity.
</div>

The element may not be inside an element with class `card`, or it may not be an `h2`. A class-name mismatch is another common cause.

## Comments should explain intent

```css
/* Keep a readable line length while allowing one gutter on narrow screens. */
.article {
  inline-size: min(100% - 2rem, 68ch);
  margin-inline: auto;
}
```

Avoid comments that merely repeat the declaration. Explain a constraint, workaround, or tradeoff future readers could not infer.

<div class="ai-brief">
  <h3>AI task: diagnose by rung</h3>
  <p>Give the model one symptom plus evidence for the four debugging questions. Ask it to stop at the first unsupported rung and request the missing evidence instead of rewriting the stylesheet.</p>
</div>

<div class="verification-card">
  <h3>Verification checklist</h3>
  <ul class="checklist">
    <li>I can identify selectors, properties, values, and declarations.</li>
    <li>I can prove a stylesheet loaded.</li>
    <li>I can prove whether a selector matched.</li>
    <li>I can trace which declaration won.</li>
    <li>I can distinguish an ignored value from a constrained layout.</li>
  </ul>
</div>

## Continue

Learn how selectors describe both structure and state in [Selectors and states](/css/selectors).

