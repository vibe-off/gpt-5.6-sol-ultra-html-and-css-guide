---
title: Semantic page structure
description: Choose landmarks and sectioning elements from content meaning, and distinguish links, buttons, sections, articles, and generic containers.
---

# Give every region a reason to exist

<p class="lesson-lead">Semantic structure is not about replacing every div. It is about expressing the page's important regions, sections, and interactions with the most accurate native element.</p>

<div class="lesson-meta">
  <span>HTML core</span>
  <span>60 minutes</span>
  <span>Decision practice</span>
</div>

## Start with landmarks

Landmarks help users and tools move around a page.

```html
<body>
  <header class="site-header">
    <a href="/">North Campus Arts</a>
    <nav aria-label="Primary">…</nav>
  </header>

  <main>
    <h1>Upcoming exhibitions</h1>
    …
  </main>

  <footer>
    <p>North Campus Arts, Building C</p>
  </footer>
</body>
```

`header` and `footer` are contextual: they can belong to the whole page or to an article or section. `main` represents the unique primary content. `nav` is for major navigation blocks and benefits from a label when more than one navigation region exists.

## Section, article, aside, or div?

| Question | Likely element |
| --- | --- |
| Is this a thematic region that needs a heading? | `section` |
| Could this item stand alone or be reused independently? | `article` |
| Is this supporting content tangential to the main flow? | `aside` |
| Is this only a styling or scripting group? | `div` |

These are judgments, not automatic conversions. A wrapper around two controls may simply be a `div`. A list of news cards can be a `ul` whose items contain `article` elements. Use the content model that makes the relationships clearest.

## Link or button is a behavior decision

Use a link when the result is navigation to another resource or location:

```html
<a href="event-details.html">View event details</a>
```

Use a button when the result is an action in the current interface:

```html
<button type="button" aria-expanded="false" aria-controls="filters">
  Show filters
</button>
```

CSS is free to make them visually consistent. Do not swap their semantics to obtain a default appearance.

## The accessible name must survive the layout

```html
<button type="button">
  <span aria-hidden="true">×</span>
  <span class="visually-hidden">Close course details</span>
</button>
```

An icon-only control needs a meaningful accessible name. Visible text is often the strongest option. If text is visually hidden, the CSS must keep it available to assistive technology rather than using `display: none`.

## A semantic card pattern

```html
<article class="event-card">
  <p class="event-card__date">
    <time datetime="2026-09-18">September 18</time>
  </p>
  <h2>
    <a href="events/type-and-place.html">Type and Place</a>
  </h2>
  <p>A studio conversation about signs, maps, and public memory.</p>
  <p>Design Studio · 18:30</p>
</article>
```

The heading link names the card and provides one main target. Avoid wrapping every part of a complex card in one link when it contains other interactive controls.

<div class="predict-box">
A page contains a visually large sentence introducing a group of cards, but the sentence does not label a section and should not appear in heading navigation. Should it be an <code>h2</code>? Explain from purpose, not appearance.
</div>

## ARIA fills gaps; it does not repaint HTML

ARIA can communicate names, roles, states, and relationships when native HTML is insufficient. It does not add keyboard behavior, focus management, form submission, or styling.

Before adding a role, ask:

1. Is there a native element with this role and behavior?
2. Does the element already have the correct name?
3. Will a state such as `aria-expanded` be kept synchronized with the actual UI?
4. Have I tested the result with keyboard and accessibility inspection?

<div class="misconception">
  <h3>More semantics is not always better</h3>
  <p>Unnecessary landmarks, duplicate labels, and roles that conflict with native behavior create noise. The goal is accurate structure, not the highest count of semantic tags.</p>
</div>

## Guided repair

Take a page containing:

- a logo and primary links;
- one page title;
- a filter panel;
- six event cards;
- a newsletter form; and
- contact information.

Draw the region tree before editing. Assign elements based on purpose. For every `section`, write its heading. For every `nav`, write its label. For every button and link, describe its outcome.

<div class="ai-brief">
  <h3>AI task: require a semantic inventory</h3>
  <p>Ask the model for a table with “content purpose,” “recommended element,” and “reason.” Do not accept replacement markup until the inventory matches the actual behavior of the page.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Give one case where <code>div</code> is the correct choice and one case where replacing a native button with a clickable <code>div</code> creates additional work.</p>
</div>

