---
title: States and motion
description: Design complete interaction states and use transitions, transforms, animations, and reduced-motion preferences without hiding meaning.
---

# Design every state, not only the resting screenshot

<p class="lesson-lead">Interactive CSS must communicate what can be used, what currently has focus, what changed, and what failed. Motion should clarify those changes without becoming a requirement for understanding them.</p>

<div class="lesson-meta">
  <span>CSS extension</span>
  <span>65 minutes</span>
  <span>Interaction quality</span>
</div>

## Build a state inventory

For an interactive component, consider:

- default;
- hover, when a pointing device supports it;
- keyboard focus and `:focus-visible`;
- active or pressed;
- current or selected;
- disabled, when the action genuinely cannot run;
- loading;
- success;
- warning or error; and
- reduced-motion behavior.

Not every component needs every state. Every real state needs more than color alone.

## Preserve visible focus

```css
.button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
```

An outline does not consume layout space and survives many component shapes. If a component sits against multiple backgrounds, use a two-color ring or sufficient contrast against each surface.

Avoid global `outline: none`. `:focus-visible` allows a browser to show the enhanced indicator for keyboard-like focus without forcing the same appearance after every pointer click.

## Transition properties with clear endpoints

```css
.card {
  border-color: transparent;
  transform: translateY(0);
  transition:
    transform 180ms ease,
    border-color 180ms ease;
}

.card:hover {
  border-color: var(--color-accent);
  transform: translateY(-0.2rem);
}
```

List properties instead of `transition: all`. Unexpected properties can otherwise animate, and changes to layout-heavy properties may feel sluggish.

Transforms and opacity are often efficient to animate because they can avoid full layout. Performance is only one criterion: readability, motion sensitivity, and interaction feedback matter too.

## Keyframes are for multi-stage motion

```css
@keyframes status-pulse {
  0%, 100% { opacity: 0.65; }
  50% { opacity: 1; }
}

.status[aria-busy="true"] {
  animation: status-pulse 1.2s ease-in-out infinite;
}
```

Do not use animation as the only sign that content is busy. The semantic state, visible text, and any live announcement must remain accurate.

## Respect reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .card,
  .status[aria-busy="true"] {
    transition: none;
    animation: none;
  }
}
```

Reduced motion does not always mean “remove every visual change.” Replace large movement and repeated animation with immediate state changes or subtle non-motion cues.

## Disabled is not a universal hiding state

A disabled control may be difficult to discover or understand. When possible, keep the action available and explain what input is missing. If disabling is required, use the native `disabled` attribute for supported form controls and ensure the visual state remains readable.

`aria-disabled="true"` communicates a state but does not prevent activation or remove the item from focus order; application behavior must enforce the state.

<div class="predict-box">
A card moves upward on <code>:hover</code> but provides no keyboard focus style. Which users receive the feedback? What equivalent information should exist without motion?</div>

## Motion review

For each animation, answer:

1. What change does it explain?
2. Can the interface be understood if it does not run?
3. Does it repeat, cover a large area, flash, or move unexpectedly?
4. Is there a reduced-motion alternative?
5. Can keyboard focus become detached from the apparent location?

<div class="ai-brief">
  <h3>AI task: state completeness review</h3>
  <p>Give the model the component's interaction requirements and CSS. Ask for a missing-state inventory. Verify each claimed state in the actual HTML before adding styles.</p>
</div>

<div class="verification-card">
  <h3>Verification checklist</h3>
  <ul class="checklist">
    <li>Keyboard focus is always visible.</li>
    <li>Hover is not the only way to discover an action.</li>
    <li>Selected, error, and success states use more than color.</li>
    <li>Motion has a clear purpose and bounded duration.</li>
    <li>Reduced-motion mode remains understandable.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why is <code>transition: all</code> harder to maintain than listing the properties that intentionally animate?</p>
</div>

## Continue into quality engineering

You now have the full HTML and CSS foundation. Continue with [Quality is part of the build](/quality/) to integrate accessibility, debugging, maintainability, compatibility, and performance into every implementation.
