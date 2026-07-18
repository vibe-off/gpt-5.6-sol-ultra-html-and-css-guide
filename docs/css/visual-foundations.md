---
title: Type, color, and units
description: Build readable visual systems with relative units, line length, scalable spacing, color roles, contrast, and custom properties.
---

# Make visual decisions into a system

<p class="lesson-lead">Readable interfaces are not a pile of attractive values. They use a small set of roles and constraints that survive zoom, long content, dark mode, and component reuse.</p>

<div class="lesson-meta">
  <span>CSS core</span>
  <span>70 minutes</span>
  <span>Visual system</span>
</div>

## Units express relationships

| Unit | Relative to | Good first uses |
| --- | --- | --- |
| `rem` | Root font size | Type, spacing, control sizes |
| `em` | Current element's font size | Component-relative detail |
| `%` | Property-specific containing value | Fluid widths and ratios |
| `ch` | Approximate width of the `0` glyph | Text line-length constraints |
| `vw`, `vh` | Viewport dimensions | Carefully bounded fluid values |
| `dvh` | Dynamic viewport height | Mobile full-height regions with caution |
| `px` | CSS reference pixel | Borders, precise small details, media queries when appropriate |

Relative units do not automatically make a design accessible. They make relationships explicit. Test the result with browser zoom and increased text size.

## Start typography with reading conditions

```css
body {
  color: #182032;
  background: #fbf8f1;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

.prose {
  max-inline-size: 68ch;
}

h1 {
  font-size: clamp(2.25rem, 7vw, 4.5rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
}
```

Readable body copy needs sufficient size, line height, contrast, and a controlled line length. Display headings can use tighter line height because they occupy fewer lines, but must survive long words and translated text.

System fonts are fast and familiar. A custom font is a product choice with loading, licensing, language coverage, fallback, and performance consequences.

## Create a spacing rhythm

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
}
```

A scale reduces arbitrary decisions while leaving room for exceptions. Name tokens by role when the meaning matters:

```css
:root {
  --page-gutter: clamp(1rem, 4vw, 3rem);
  --section-gap: clamp(3rem, 8vw, 7rem);
}
```

Role-based names preserve intent when the exact value changes.

## Name color by job, not pigment

```css
:root {
  --color-canvas: #fbf8f1;
  --color-surface: #fffdf8;
  --color-text: #182032;
  --color-muted: #5c6475;
  --color-border: #d9d2c6;
  --color-accent: #b83d29;
  --color-focus: #177f78;
}
```

`--color-accent` can change from red to blue without lying. `--red` cannot describe why it exists.

Contrast is a relationship between foreground and background. Check normal text, large text, icons that communicate meaning, form borders, focus indicators, disabled states, hover states, and text over imagery. Do not rely on color alone to communicate status.

## Custom properties participate in the cascade

```css
.card {
  --card-accent: var(--color-accent);
  border-block-start: 0.3rem solid var(--card-accent);
}

.card--student {
  --card-accent: #177f78;
}
```

The modifier changes one local decision. Descendants use the updated custom property without duplicating the full card rule.

Provide a fallback when a variable may be absent:

```css
color: var(--card-text, var(--color-text));
```

## Avoid fixed-height text containers

Content grows when text is translated, zoomed, or entered by users. Prefer minimum size plus content flow:

```css
.button {
  min-block-size: 2.75rem;
  padding: 0.65rem 1rem;
}
```

A fixed `height` can clip wrapped labels. A minimum protects the target size and still allows growth.

<div class="predict-box">
What happens to a component whose padding is written in <code>em</code> when that component's font size increases? How would the result differ with <code>rem</code> padding?</div>

## Guided system

Create tokens for canvas, surface, text, muted text, border, accent, focus, three spacing roles, two radii, and one shadow. Apply them to a heading, article card, link, button, and form field. Then change the accent and base spacing in one place.

<div class="ai-brief">
  <h3>AI task: audit roles</h3>
  <p>Ask the model to identify duplicated values and propose role names. Reject any token that exists only because two unrelated values happen to match today.</p>
</div>

<div class="verification-card">
  <h3>Verification checklist</h3>
  <ul class="checklist">
    <li>Body text remains readable at 200% zoom.</li>
    <li>Long headings wrap without clipping.</li>
    <li>Color is not the only status cue.</li>
    <li>Focus remains visible against every surface.</li>
    <li>Tokens describe reusable decisions rather than accidental values.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Give one reason to use a system font, one reason to use a custom font, and one test required either way.</p>
</div>

