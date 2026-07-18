---
title: Responsive design
description: Build fluid, content-led layouts with intrinsic sizing, media queries, container queries, responsive media, and user preference queries.
---

# Respond to available space and user needs

<p class="lesson-lead">Responsive design is not a desktop page squeezed into phone breakpoints. Start with flexible content, add constraints, and introduce a query only where the layout actually needs a new rule.</p>

<div class="lesson-meta">
  <span>CSS core</span>
  <span>90 minutes</span>
  <span>Multi-width testing</span>
</div>

## Begin with a fluid foundation

HTML text naturally reflows. Preserve that strength:

```css
.page-shell {
  inline-size: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

img,
video {
  max-inline-size: 100%;
  block-size: auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
}
```

This layout has gutters, a maximum width, fluid media, and intrinsic card columns before any media query.

## Breakpoints belong to content

Start narrow, then add a rule where the content benefits:

```css
.course-layout {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .course-layout {
    grid-template-columns: minmax(0, 1fr) 18rem;
    align-items: start;
  }
}
```

`48rem` is not “tablet” as a universal truth. It is the point where this content has enough space for two useful columns. Resize slowly and choose a breakpoint around the failure, then test nearby widths.

Use a consistent unit and a small set of breakpoints when the whole page shares them. Avoid naming breakpoints after current devices.

## Container queries respond to component space

```css
.event-card-wrapper {
  container-type: inline-size;
}

@container (min-width: 32rem) {
  .event-card {
    display: grid;
    grid-template-columns: 10rem 1fr;
  }
}
```

The card adapts to its container, whether it appears in a sidebar or full-width region. Container queries are valuable for reusable components. Confirm the project's browser baseline, and keep a readable single-column default.

## Use fluid values with boundaries

```css
h1 {
  font-size: clamp(2.25rem, 1.2rem + 4vw, 4.75rem);
}

.section {
  padding-block: clamp(3rem, 8vw, 7rem);
}
```

`clamp()` prevents values from becoming too small or too large. Test intermediate widths; a mathematically fluid value can still produce awkward wrapping.

## Responsive media needs HTML and CSS

CSS controls rendered size. HTML `srcset` and `sizes` help the browser choose an appropriate file. Use art direction only when the composition genuinely needs a different crop.

Review [Images and media](/html/media) before treating a huge source file as “responsive” because CSS shrinks it.

## Respond to user preferences

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-canvas: #111723;
    --color-text: #f8f1e7;
  }
}
```

Preference queries are inputs, not proof that the resulting theme is readable. Test contrast, focus, media, and component states in each mode.

## Test a matrix, not two screenshots

At minimum, test:

- narrow viewport around 320 CSS pixels;
- a typical medium width;
- a wide viewport;
- browser zoom at 200%;
- long headings and unbroken strings;
- keyboard focus with navigation open and closed;
- reduced motion;
- landscape and portrait when relevant; and
- actual content rather than only short placeholders.

<div class="predict-box">
A three-column grid breaks at 740px. Should the breakpoint be named “tablet”? What evidence would help you decide between two columns, intrinsic wrapping, or a horizontal scroller?</div>

The content, interaction, minimum usable card width, and reading order should decide—not a device label.

## Common failure patterns

- fixed widths that exceed the container;
- global `overflow-x: hidden` hiding the symptom;
- navigation that only works on hover;
- breakpoint rules that undo one another;
- viewport-height sections hiding content behind mobile browser UI;
- tiny touch targets on narrow screens;
- visual reordering that conflicts with DOM and focus order; and
- testing only preset device emulators.

<div class="build-brief">
  <h3>Guided build: responsive landing page</h3>
  <p>Build a hero, card collection, call-to-action, and footer. Use no query until a real content failure appears. Record the failure, chosen breakpoint or intrinsic fix, and evidence after the change.</p>
</div>

<div class="ai-brief">
  <h3>AI task: request edge cases</h3>
  <p>Provide your layout constraints and ask for five adversarial content cases—not a rewrite. Test the cases, keep the ones that expose real weakness, and document the fix.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>What is the difference between a viewport media query and a container query, and when does each express the more accurate dependency?</p>
</div>

