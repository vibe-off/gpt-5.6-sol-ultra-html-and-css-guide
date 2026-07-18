---
title: Selectors and states
description: Match elements with classes, attributes, combinators, pseudo-classes, and pseudo-elements while keeping CSS resilient.
---

# Select the smallest meaningful surface

<p class="lesson-lead">A selector is a query against the DOM. Good selectors express a stable styling responsibility without encoding every accidental wrapper.</p>

<div class="lesson-meta">
  <span>CSS core</span>
  <span>60 minutes</span>
  <span>Matching practice</span>
</div>

## Core selector families

```css
article { }                    /* type */
.event-card { }                /* class */
[aria-current="page"] { }     /* attribute */
.card > h2 { }                 /* direct child */
.card p { }                    /* descendant */
.field + .field { }            /* next sibling */
a:hover { }                    /* user-action state */
input:invalid { }              /* form state */
.card::before { }              /* generated pseudo-element */
```

Selectors can be combined, but complexity creates coupling. `.page main .events article.card > div h2 a` depends on a long DOM route. `.event-card__title-link` gives the styling responsibility an explicit name.

## Descendant and child are different claims

```html
<article class="card">
  <div class="card__body">
    <h2>Workshop title</h2>
  </div>
</article>
```

`.card h2` matches because the heading is any descendant. `.card > h2` does not match because the direct child is a `div`.

Use the stricter combinator only when the direct relationship is part of the intended structure.

## Style states without removing clarity

```css
.action-link {
  color: #9c321f;
  text-decoration-thickness: 0.12em;
  text-underline-offset: 0.2em;
}

.action-link:hover {
  color: #d94d34;
}

.action-link:focus-visible {
  outline: 3px solid #177f78;
  outline-offset: 4px;
}

.action-link:visited {
  color: #7748a8;
}
```

Hover is not available to every input method. Preserve a clear default state and an obvious keyboard focus state. Do not remove outlines unless you replace them with an equally visible indicator.

## Attribute selectors connect to real state

```css
[aria-expanded="true"] .disclosure-icon {
  transform: rotate(180deg);
}

[aria-current="page"] {
  font-weight: 750;
  text-decoration: none;
}
```

When the attribute already describes a meaningful state, CSS can style that state without adding a duplicate “is-open” class. The interface logic must keep the attribute truthful.

## Structural pseudo-classes

```css
.card-list > :first-child { }
.card-list > :last-child { }
.card-list > :nth-child(odd) { }
.field:has(input:required) label::after { }
```

Use structural selectors when the relationship itself matters. A selector such as `:has()` is powerful; confirm the supported-browser baseline for the actual project and provide an acceptable fallback when needed.

## Pseudo-elements are generated presentation

```css
.external-link::after {
  content: " ↗";
}
```

Generated content is best for decoration or redundant cues. Do not place essential instructions only in `content`; they may be unavailable to some users, copy operations, translation systems, or reader modes.

<div class="predict-box">
Given <code>&lt;article class="card"&gt;&lt;header&gt;&lt;h2&gt;…</code>, which selectors match the heading: <code>.card h2</code>, <code>.card &gt; h2</code>, <code>.card header &gt; h2</code>, and <code>article.card h2:first-child</code>? Explain each DOM relationship.
</div>

## Selector quality test

For each selector, ask:

1. Does it match the intended elements now?
2. Could it accidentally match unrelated content?
3. Would a harmless wrapper break it?
4. Does it rely on content order that may change?
5. Does it create more specificity than the component needs?
6. Is the state expressed in HTML already?

<div class="misconception">
  <h3>Short is not automatically resilient</h3>
  <p>A global selector such as <code>a</code> is short but broad. A selector's quality depends on responsibility and expected scope, not character count.</p>
</div>

<div class="build-brief">
  <h3>Guided practice</h3>
  <p>Style primary navigation, an event-card title link, a required form field, the current page, and visible focus. For each rule, write the exact DOM or state relationship it claims.</p>
</div>

<div class="ai-brief">
  <h3>AI task: selector risk review</h3>
  <p>Ask the model to rank your selectors from least to most coupled. Require one concrete DOM change that would break each risky selector. Verify those claims by editing a copy of the markup.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why can a selector that matches today still be a maintenance problem? Give one example based on nesting and one based on state.</p>
</div>

