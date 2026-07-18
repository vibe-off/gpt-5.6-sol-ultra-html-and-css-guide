---
title: Modern CSS toolkit
description: Extend core CSS with nesting, :is(), :where(), :has(), cascade layers, container queries, subgrid, logical properties, and feature queries.
---

# Modern CSS should simplify a known problem

<p class="lesson-lead">New features are valuable when they express a relationship more directly, reduce brittle code, or improve adaptation. Learn their purpose and fallback—not just their syntax.</p>

<div class="lesson-meta">
  <span>Extension</span>
  <span>80 minutes</span>
  <span>Progressive enhancement</span>
</div>

## Logical properties support writing modes

```css
.notice {
  margin-inline: auto;
  padding-block: 1rem;
  padding-inline: 1.25rem;
  border-inline-start: 0.3rem solid var(--color-accent);
  max-inline-size: 42rem;
}
```

Logical properties describe inline and block directions rather than assuming left/right and top/bottom. They make components more adaptable to different writing modes and directionality.

Do not mechanically replace every physical property. An illustration may genuinely be pinned to the visual left. Choose the coordinate system that expresses the intent.

## `:is()` and `:where()` group selectors

```css
.prose :is(h2, h3, h4) {
  text-wrap: balance;
}

:where(.prose) :where(ul, ol) {
  padding-inline-start: 1.4em;
}
```

`:is()` takes the specificity of its most specific argument. `:where()` contributes zero specificity. The latter is useful for defaults designed to be easy to override.

## `:has()` styles based on a relative match

```css
.field:has(input:invalid:not(:placeholder-shown)) {
  border-color: var(--color-error);
}
```

`:has()` can select a parent-like element based on descendants or other relative relationships. Use it for a real state already present in the DOM. Do not make an invalid control appear valid by relying on CSS state alone; the underlying form semantics remain primary.

## Native nesting keeps related selectors close

```css
.event-card {
  padding: 1.25rem;

  & h2 {
    margin-block: 0;
  }

  &:hover {
    border-color: var(--color-accent);
  }
}
```

Nesting reduces repetition but can also hide deep coupling. Keep nesting shallow and inspect the resulting specificity. A flat component class may remain clearer than several nested DOM levels.

## Cascade layers document precedence

```css
@layer reset, base, components, utilities;

@layer base {
  :where(a) { color: var(--color-link); }
}

@layer components {
  .button { color: white; background: var(--color-accent); }
}
```

Layers provide architectural order before selectors compete. Review [Cascade and specificity](/css/cascade) before using them as a magic override mechanism.

## Container queries make components contextual

```css
.profile-shell {
  container: profile / inline-size;
}

@container profile (min-width: 30rem) {
  .profile-card {
    grid-template-columns: 8rem 1fr;
  }
}
```

The named container makes the dependency explicit. The component adapts to its assigned space instead of the entire viewport.

## Subgrid can align nested content

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}
```

Subgrid lets a nested grid use track sizing from its parent. It is useful when card headings, bodies, and actions need true cross-card alignment. Use normal independent card flow when that relationship is unnecessary.

## Feature queries protect enhancements

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
}

@supports (grid-template-columns: subgrid) {
  .card-grid {
    display: grid;
  }
}
```

Start with an acceptable baseline, then enhance. A fallback does not need to look identical; it must preserve content and function.

## Support decisions need current evidence

Browser support changes. For each modern feature:

1. define the actual audience and browser policy;
2. consult current compatibility data and specifications;
3. identify what happens when the rule is ignored;
4. build a baseline experience;
5. use `@supports` when feature detection clarifies the branch; and
6. test a representative unsupported or fallback environment when the risk matters.

<div class="predict-box">
A browser ignores an unsupported declaration but understands the next declaration. How can source order provide a simple fallback for a property value? Write a two-line example.</div>

```css
width: 90%;
width: min(90%, 60rem);
```

An older browser that rejects `min()` may retain the earlier valid width; modern browsers use the later value.

<div class="ai-brief">
  <h3>AI task: date-stamp compatibility claims</h3>
  <p>Ask for likely support concerns, then verify each claim with a current primary or maintained compatibility source. Record the date and project browser policy instead of copying a frozen global percentage.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Choose one modern feature and state the core problem it solves, an acceptable fallback, and the evidence needed before shipping it.</p>
</div>

