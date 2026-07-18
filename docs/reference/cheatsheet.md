---
title: HTML and CSS cheatsheet
description: A compact decision-oriented reference for document structure, semantic elements, forms, selectors, cascade, box model, layout, responsive design, and accessibility.
---

# HTML and CSS cheatsheet

<p class="lesson-lead">Use this page to recall a decision, then return to the full lesson when you need the mental model. A cheatsheet is a map, not the territory.</p>

## HTML document shell

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Specific page title</title>
    <meta name="description" content="Concise page summary.">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>…</header>
    <main id="main-content">…</main>
    <footer>…</footer>
  </body>
</html>
```

## Element decision guide

| Need | Start with |
| --- | --- |
| Page or section heading | `h1`–`h6` by hierarchy |
| Paragraph | `p` |
| Unordered / ordered collection | `ul` / `ol` |
| Major navigation | `nav` with a useful label when needed |
| Unique main content | `main` |
| Thematic region with heading | `section` |
| Standalone/reusable item | `article` |
| Tangential support content | `aside` |
| Navigation to a destination | `a href="…"` |
| Action in the current interface | `button type="button"` |
| Data with row/column relationships | `table` with caption and headers |
| Group of form choices | `fieldset` + `legend` |
| Styling-only group | `div` or `span` |

## Image baseline

```html
<img
  src="images/example.webp"
  alt="Purposeful alternative for this context"
  width="1200"
  height="800"
>
```

```css
img {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
}
```

- Informative: describe the contribution.
- Functional: describe the destination/action.
- Decorative: `alt=""`.
- Do not duplicate a nearby caption.

## Form baseline

```html
<label for="email">College email</label>
<p id="email-help">Use your college address.</p>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  aria-describedby="email-help"
  required
>
<button type="submit">Submit registration</button>
```

- `label` names the control for people and accessibility APIs.
- `id` connects the label, help, and fragment references.
- `name` identifies submitted form data.
- Placeholder is not a label.
- Client validation does not replace server validation.

## Selector quick reference

```css
article { }                 /* type */
.card { }                   /* class */
[aria-current="page"] { }  /* attribute */
.card > h2 { }              /* direct child */
.card h2 { }                /* descendant */
.field + .field { }         /* next sibling */
a:hover { }                 /* pseudo-class */
.card::before { }           /* pseudo-element */
```

Prefer selectors that describe stable component responsibilities. A harmless wrapper should not break unrelated styling.

## Cascade decision order

1. Selector and condition relevance
2. Origin and importance
3. Cascade layer
4. Specificity
5. Scoping proximity when applicable
6. Source order

Inheritance supplies some values only when the element has no winning declaration of its own.

## Box model

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Inside → outside: **content → padding → border → margin**.

For overflow, inspect parent size, child size, intrinsic minimums, fixed values, images, unbroken strings, and `box-sizing` before clipping.

## Fluid wrapper

```css
.wrapper {
  inline-size: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
```

## Flexbox

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
}

.toolbar__last {
  margin-inline-start: auto;
}
```

Use when one primary axis owns the relationship.

## Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.25rem;
}
```

Use when rows and columns or page regions need coordinated tracks.

## Responsive baseline

```css
.layout {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .layout {
    grid-template-columns: minmax(0, 1fr) 18rem;
  }
}
```

- Start fluid and narrow.
- Add a query where content needs a new relationship.
- Test between presets, at 200% zoom, with long content, and with keyboard focus.
- Use container queries when the dependency is component space.

## Focus and reduced motion

```css
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
```

## First debugging questions

1. Did the resource load?
2. Did the selector match?
3. Did the declaration win and parse?
4. Could layout honor the value?
5. What smallest experiment distinguishes the likely causes?

Open the full [debugging decision tree](/reference/debugging-tree) when the answer is not obvious.

