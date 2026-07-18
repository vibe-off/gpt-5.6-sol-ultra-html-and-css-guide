---
title: Accessibility by default
description: Integrate semantic structure, keyboard access, focus, names, labels, contrast, zoom, motion, and practical accessibility testing.
---

# Accessibility belongs in every lesson

<p class="lesson-lead">Accessibility is the quality of an experience across different bodies, senses, inputs, devices, environments, and temporary conditions. It starts with product choices and semantic HTML.</p>

<div class="lesson-meta">
  <span>Quality core</span>
  <span>90 minutes</span>
  <span>Manual testing</span>
</div>

## Build from four foundations

### 1. Perceivable

Content and status need alternatives people can perceive: meaningful text alternatives, captions, sufficient contrast, scalable text, and cues beyond color alone.

### 2. Operable

All functionality must work without requiring a precise pointer. Keyboard focus must be visible, order must make sense, targets must be usable, and motion or time limits must not create barriers.

### 3. Understandable

Navigation, labels, instructions, and errors should be clear and consistent. Unexpected context changes need strong justification and communication.

### 4. Robust

Use valid, semantic structures and accurate names, roles, states, and relationships so browsers and assistive technologies can interpret the interface.

These principles align with the W3C Web Content Accessibility Guidelines, but this page is a practical learning checklist, not a conformance audit.

## Use semantic HTML first

Native elements supply roles and behavior:

- headings create navigable structure;
- `nav`, `main`, and other landmarks create regions;
- links and buttons express different outcomes;
- labels and fieldsets create form relationships;
- table headers identify data relationships;
- `details` and `summary` provide a native disclosure pattern for suitable content.

ARIA is useful when native HTML cannot express the needed interface. It must remain synchronized with behavior.

## Keyboard test without shortcuts

Put the mouse aside and complete the actual task.

Check:

1. Can `Tab` and `Shift+Tab` reach every interactive control in a logical order?
2. Is focus always visible?
3. Do native controls activate with expected keys?
4. Can overlays be entered, understood, and exited without trapping focus?
5. Does focus move intentionally after major changes?
6. Is hidden content removed from both visual and focus interaction?

Do not add positive `tabindex` values to force visual order. Align DOM, reading, visual, and focus order whenever possible.

## Names, roles, states, values

Inspect an interactive element's accessibility information:

- **Name:** what is it called?
- **Role:** what kind of control or region is it?
- **State:** expanded, selected, disabled, checked, invalid?
- **Value:** what does a range or input currently contain?

A button labelled only “More” may have a button role but an ambiguous name. Fix the visible language or provide a context-specific name without creating a mismatch between spoken and visible labels.

## Focus indicators are a design token

```css
:root {
  --focus-ring: #177f78;
}

:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}
```

Test the ring against canvas, cards, imagery, dark mode, and error surfaces. Avoid clipping it with overflow. A focus indicator is not a browser defect to remove.

## Zoom, text, and reflow

At 200% browser zoom and increased text size:

- text should not clip or overlap;
- controls should grow with labels;
- content should reflow without two-dimensional scrolling except where necessary, such as large data tables;
- sticky or fixed regions should not consume the entire viewport; and
- reading and focus order should remain coherent.

Fixed heights, absolute text positioning, and viewport-sized panels commonly fail here.

## Contrast and non-color cues

Check text against its actual background in every state. Muted text still needs to be readable. For error fields, combine color with text and a visible structural cue. For selected navigation, combine color with weight, underline, shape, or `aria-current`.

Automated contrast tools can help measure pairs, but gradients, images, transparency, and component states require human inspection.

## Motion and sensory characteristics

Respect `prefers-reduced-motion`. Do not instruct users only by color, position, shape, or sound: “choose the green button on the right” fails when layout changes or color cannot be distinguished. Use the control's visible name.

## A 12-minute classroom audit

1. **2 min:** scan headings and landmarks.
2. **3 min:** complete the primary task by keyboard.
3. **2 min:** inspect three accessible names and states.
4. **2 min:** zoom to 200% and check reflow.
5. **1 min:** enable reduced motion.
6. **2 min:** review one form error and one color-dependent state.

This does not prove conformance. It builds habits and finds high-impact failures early.

<div class="predict-box">
A custom clickable card works with the mouse and has <code>role="button"</code>. What behavior is still missing unless the implementation adds it? Compare with a native <code>button</code>.</div>

Potential gaps include keyboard focus, Enter/Space activation, disabled behavior, and correct state management.

<div class="ai-brief">
  <h3>AI task: separate audit from proof</h3>
  <p>Ask for potential risks grouped by semantics, keyboard, names, visual presentation, and motion. Require the model to label each as “inspect” rather than “confirmed” unless your evidence proves it.</p>
</div>

<div class="verification-card">
  <h3>Baseline checklist</h3>
  <ul class="checklist">
    <li>Meaningful structure and native controls are used.</li>
    <li>The primary task works by keyboard.</li>
    <li>Focus is visible and follows a logical order.</li>
    <li>Controls have accurate names, roles, and states.</li>
    <li>Text and controls survive zoom and narrow widths.</li>
    <li>Color and motion are not required to understand the interface.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why can an automated accessibility scan be useful without being sufficient?</p>
</div>

