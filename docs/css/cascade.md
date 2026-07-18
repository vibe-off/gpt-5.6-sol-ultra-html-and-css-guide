---
title: Cascade and specificity
description: Determine which CSS declaration wins using relevance, origin, importance, cascade layers, specificity, scoping, and source order.
---

# Find the winner without guessing

<p class="lesson-lead">Specificity is only one stage of the cascade. A stronger mental model follows the browser's decision order and uses DevTools to trace the winning declaration.</p>

<div class="lesson-meta">
  <span>CSS core</span>
  <span>75 minutes</span>
  <span>Major checkpoint</span>
</div>

## The practical cascade order

For declarations that could set the same property on the same element, ask:

1. **Relevance:** does the selector match, and does any condition such as a media query apply?
2. **Origin and importance:** browser, user, or author styles; normal or important declarations.
3. **Cascade layer:** for declarations placed in layers, which layer has precedence?
4. **Specificity:** which selector is more specific?
5. **Scoping proximity:** when CSS scoping is in use, which scope is closer?
6. **Source order:** if everything else ties, the later declaration wins.

For most beginner stylesheets, you will frequently use relevance, specificity, inheritance, and source order. Learn the full order so a future layer or important rule does not appear magical.

## Specificity compares selector weight

```css
p { color: slategray; }              /* type selector */
.notice { color: teal; }             /* class selector */
#deadline { color: navy; }           /* ID selector */
```

An ID selector outranks a class selector, which outranks a type selector within the same origin, importance, and layer. You do not need to treat specificity as a decimal number. Compare ID, then class/attribute/pseudo-class, then type/pseudo-element columns.

```css
.card .title { }      /* two classes */
.card-title { }       /* one class */
```

The first is more specific and more coupled to nesting. Prefer the least specificity that reliably expresses the component responsibility.

<CascadeLab />

## Inheritance is not the cascade

Some properties, such as `color` and `font-family`, normally inherit from the parent when the element has no winning declaration of its own. Many box and layout properties do not inherit.

```css
body {
  color: #182032;
  font-family: system-ui, sans-serif;
}
```

Most descendants receive those text values. If a link has a browser or author color rule, its own cascaded value replaces the inherited color.

Useful global keywords:

- `inherit` — take the parent's computed value;
- `initial` — use the property's initial value;
- `unset` — inherit when the property normally inherits, otherwise use initial;
- `revert` — roll back to an earlier origin or layer behavior;
- `revert-layer` — roll back within the layer stack.

## Layers organize precedence intentionally

```css
@layer reset, base, components, utilities;

@layer base {
  a { color: #9c321f; }
}

@layer components {
  .button { color: white; }
}

@layer utilities {
  .text-muted { color: #687083; }
}
```

Later named layers have higher priority for normal declarations in this order. Layers can make architectural precedence explicit and reduce specificity battles. Unlayered normal author styles outrank layered normal author styles, so introduce layers deliberately.

## `!important` is a diagnostic signal

An important declaration changes the origin and layer precedence calculation. It can be appropriate for narrow, documented requirements, but using it to “make CSS work” often hides a selector, load-order, or architecture problem.

Before adding it:

1. inspect the winning declaration;
2. identify why it wins;
3. reduce unnecessary specificity or move the rule to the correct layer;
4. confirm the component boundary; and
5. document the exceptional reason if importance remains necessary.

<div class="predict-box">
A later <code>.button</code> rule does not override an earlier <code>#checkout .button</code> rule. Is source order broken? Explain which cascade stage decides before source order.
</div>

## Trace a winner in DevTools

1. Select the exact element.
2. Find the property in the Styles panel.
3. Identify active and crossed-out declarations.
4. Open the Computed panel and expand the property trace.
5. Record selector, source file, line, and winning reason.
6. Disable one declaration temporarily to test your hypothesis.

<div class="ai-brief">
  <h3>AI task: explain the trace</h3>
  <p>Provide the matched declarations in their actual order, including layers and importance. Ask the model to explain the winner one cascade stage at a time. Compare with the browser trace before accepting the explanation.</p>
</div>

<div class="verification-card">
  <h3>Verification checklist</h3>
  <ul class="checklist">
    <li>I check selector relevance before specificity.</li>
    <li>I can distinguish cascade from inheritance.</li>
    <li>I can compare selector specificity without decimal folklore.</li>
    <li>I use source order only after earlier stages tie.</li>
    <li>I can show the winning declaration in DevTools.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Name two ways to solve a specificity conflict without adding a more specific selector.</p>
</div>

