---
title: Maintainable CSS
description: Organize styles with component boundaries, low specificity, custom properties, naming strategies, cascade layers, and reason-focused comments.
---

# Make change local and predictable

<p class="lesson-lead">Maintainable CSS is not one naming convention. It is a set of boundaries and precedence rules that let a developer predict where a change belongs and what else it can affect.</p>

<div class="lesson-meta">
  <span>Engineering</span>
  <span>75 minutes</span>
  <span>Refactor practice</span>
</div>

## Define a component's surface

```html
<article class="event-card event-card--featured">
  <p class="event-card__date">…</p>
  <h2 class="event-card__title">…</h2>
  <p class="event-card__summary">…</p>
</article>
```

```css
.event-card { … }
.event-card__date { … }
.event-card__title { … }
.event-card__summary { … }
.event-card--featured { … }
```

This BEM-like pattern makes component ownership explicit. It is one option, not a law. A small site may use simpler class names. A utility system may express reusable single responsibilities. A framework may scope styles per component. Choose a consistent model that fits the project.

## Keep selectors shallow and specificity low

Fragile:

```css
.events-page main section article > div h2 a { … }
```

More local:

```css
.event-card__title-link { … }
```

The first encodes page location and wrapper structure. The second names the actual styling responsibility. Low specificity makes legitimate state and context adjustments easier.

Avoid styling primarily by IDs. Avoid selectors that depend on exact child indexes when content order may change.

## Separate decisions from mechanics

```css
:root {
  --color-text: #182032;
  --color-surface: #fffdf8;
  --color-accent: #b83d29;
  --space-card: 1.25rem;
  --radius-card: 1rem;
}

.event-card {
  padding: var(--space-card);
  border-radius: var(--radius-card);
  color: var(--color-text);
  background: var(--color-surface);
}
```

Tokens centralize real shared decisions. Do not turn every one-off value into a global variable. A token should represent a system choice or a component input.

## Organize the cascade

```css
@layer reset, base, objects, components, utilities;
```

One possible contract:

- `reset`: normalize inconsistent defaults;
- `base`: document typography and native elements;
- `objects`: layout patterns without visual identity;
- `components`: product-specific interfaces;
- `utilities`: narrow, explicit overrides.

Layers do not replace good selectors. They make broad precedence visible. Document how unlayered third-party CSS interacts with the stack.

## Choose a strategy with tradeoffs

| Strategy | Strength | Risk |
| --- | --- | --- |
| Semantic component classes | Clear ownership and readable markup | Naming discipline required |
| BEM-like names | Explicit block/element/modifier relationships | Can become verbose or overly literal |
| Utilities | Small reusable declarations, predictable specificity | Markup can become visually dense |
| Scoped component CSS | Locality near implementation | Shared tokens and global states still need architecture |
| CSS-in-JS or generated styles | Dynamic integration and tooling | Runtime/build cost and portability vary |

Students should learn to evaluate strategies rather than declare one universally superior.

## Comments explain reasons and hazards

Useful:

```css
/* Allow long course titles to shrink inside the toolbar instead of forcing overflow. */
.toolbar__title {
  min-inline-size: 0;
}
```

Not useful:

```css
/* Set min width to zero. */
.toolbar__title { min-inline-size: 0; }
```

Delete dead code instead of commenting it out; version control preserves history.

## Refactor safely

1. Capture acceptance criteria and current screenshots or computed values when useful.
2. Find duplication and high-specificity hotspots.
3. Choose one boundary or token change.
4. Refactor without changing behavior.
5. Test shared states and viewport conditions.
6. Remove old rules only after proving they are unused.

<div class="predict-box">
Two unrelated components use the same <code>12px</code> gap today. Should they share one global token? What evidence would show that the value represents one design decision rather than coincidence?</div>

## Code review questions

- Which component owns this rule?
- What DOM change would break the selector?
- Why does this declaration need its specificity?
- Is this value a reusable decision or a local detail?
- Can the state be expressed by an existing semantic attribute?
- What acceptance test protects the refactor?

<div class="ai-brief">
  <h3>AI task: propose, then constrain</h3>
  <p>Ask for a duplication and specificity report without code changes. Choose one verified hotspot and request a minimal refactor that preserves selectors outside the component. Compare before and after computed styles.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>What does it mean for a CSS change to be “local”? Give one selector and one token example.</p>
</div>
