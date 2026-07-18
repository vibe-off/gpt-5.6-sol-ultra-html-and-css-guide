---
title: Lab 1 — Profile card
description: Build a resilient student profile card using semantic HTML, responsive media, box-model constraints, typography, focus states, and intrinsic sizing.
---

# Lab 1: Profile card

<p class="lesson-lead">A small component exposes large ideas: intrinsic image size, text wrapping, box sizing, interactive states, and the difference between visual grouping and semantic structure.</p>

<div class="lesson-meta">
  <span>Guided lab</span>
  <span>90 minutes</span>
  <span>HTML + CSS</span>
</div>

## Brief

Build a card for a student exhibition contributor. It contains:

- portrait or project image;
- name and program;
- short biography;
- two topic tags;
- a link to the student's project; and
- an optional “student choice” status.

Use a portrait or project image you have permission to use, place it at the path shown in your own project, and update the filename and alternative text. The sample path below is intentionally a placeholder for the student's chosen class asset.

The card must work from a 280-pixel container to a 720-pixel container and must not depend on a page-level media query.

## Starter HTML

```html
<article class="profile-card">
  <img
    class="profile-card__image"
    src="images/lin-portrait.webp"
    alt="Lin standing beside a modular paper sculpture"
    width="800"
    height="800"
  >

  <div class="profile-card__body">
    <p class="profile-card__status">Student choice</p>
    <h2 class="profile-card__name">Lin Chen</h2>
    <p class="profile-card__program">Visual Communication · Year 2</p>
    <p class="profile-card__bio">
      Lin explores how folded paper can make public information easier to notice and remember.
    </p>
    <ul class="profile-card__tags" aria-label="Project topics">
      <li>Information design</li>
      <li>Paper systems</li>
    </ul>
    <a class="profile-card__link" href="projects/lin-chen.html">View Lin's project</a>
  </div>
</article>
```

## Starter CSS

```css
* { box-sizing: border-box; }

:root {
  --card-accent: #b83d29;
  --card-surface: #fffdf8;
  --card-text: #182032;
  --card-muted: #5c6475;
}

body {
  margin: 0;
  color: var(--card-text);
  background: #f3eee4;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

.profile-card {
  /* Build the resilient component here. */
}
```

## Requirements

### Structure

- The image has purposeful alternative text and intrinsic dimensions.
- The name is a heading at the correct level for the page context.
- Topics are a real list.
- The primary action is a descriptive link.

### Layout

- Narrow: image above text.
- When the card's own container has enough space: image and text can sit side by side.
- Long names and bios wrap without clipping.
- The image remains square and may crop with `object-fit: cover`.
- No horizontal overflow occurs.

### Interaction

- The link has visible default, hover, visited, and focus-visible states.
- Focus is not clipped by the card.
- The optional status remains understandable without color.

## Suggested component query

```css
.profile-card-shell {
  container-type: inline-size;
}

@container (min-width: 34rem) {
  .profile-card {
    display: grid;
    grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1.2fr);
  }
}
```

Wrap the card in `.profile-card-shell`. This suggestion is a starting relationship, not a complete solution. Decide whether the card still works acceptably in browsers that ignore the enhancement.

<div class="predict-box">
If the bio contains one 70-character unbroken project code, which box is most likely to force overflow? What property would you inspect before hiding the overflow?</div>

## Intentional bug

After the first version works, add this rule:

```css
.profile-card__body {
  min-width: max-content;
}
```

Reproduce the narrow overflow. Record the computed size and explain why the grid or flex container cannot simply shrink the body. Remove or replace the constraint with an intentional one.

## AI collaboration

Ask for a review limited to intrinsic sizing and focus visibility. Provide actual computed widths. Record one suggestion, the evidence you used, and your decision.

## Live change

The program line becomes:

> Interdisciplinary Visual Communication and Community Information Systems · Year 2

You may not reduce the font size solely to make it fit. Adapt spacing or layout while preserving readable wrapping.

<ul class="acceptance-list">
  <li>The component works from 280px through 720px without page-level assumptions.</li>
  <li>Media, text, and focus stay within the component without clipping.</li>
  <li>Structure remains meaningful without CSS.</li>
  <li>The card has an acceptable baseline before its container-query enhancement.</li>
  <li>The evidence note explains one intrinsic-sizing decision.</li>
</ul>
