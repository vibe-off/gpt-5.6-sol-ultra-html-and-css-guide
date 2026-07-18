---
title: How a page becomes pixels
description: A beginner-friendly mental model of HTML parsing, the DOM, CSS rules, layout, paint, and the accessibility tree.
---

# How a page becomes pixels

<p class="lesson-lead">The browser does not “show the code.” It parses two languages, builds internal models, resolves conflicts, calculates geometry, and paints a result.</p>

<div class="lesson-meta">
  <span>Core mental model</span>
  <span>35 minutes</span>
  <span>Inspect + explain</span>
</div>

## The short pipeline

Think of a first page load as a pipeline with connected stages:

1. The browser reads HTML and builds the **Document Object Model (DOM)**.
2. It reads CSS and gathers rules that could apply to each element.
3. The **cascade** decides which declared values win.
4. Inheritance and defaults fill in other values; the browser produces **computed styles**.
5. Layout calculates the size and position of boxes.
6. Paint turns those boxes into pixels; compositing combines visual layers.
7. In parallel, semantics contribute to an **accessibility tree** used by assistive technology.

This is a teaching model, not a complete browser-engine specification. It is detailed enough to locate most beginner bugs.

```html
<article class="notice">
  <h2>Studio moved to Room 204</h2>
  <p>Bring your sketchbook on Friday.</p>
</article>
```

```css
.notice {
  max-inline-size: 36rem;
  padding: 1.5rem;
  border: 2px solid tomato;
}
```

HTML supplies an `article` with a heading and paragraph. CSS supplies presentation rules. The browser connects them because the element matches `.notice`.

## Source, DOM, and pixels are different evidence

The **source** is what the file contains. The **DOM** is the browser's parsed tree and may differ when markup is invalid or scripts change it. The **rendered page** is the visual result after CSS and layout. A screenshot can tell you that something is wrong; it usually cannot tell you which stage caused it.

<div class="concept-grid">
  <div class="concept-card">
    <h3>Elements panel</h3>
    <p>Use it to inspect the parsed DOM, matched rules, computed values, box dimensions, and state such as <code>:hover</code>.</p>
  </div>
  <div class="concept-card">
    <h3>Accessibility view</h3>
    <p>Use it to inspect an element's role, accessible name, state, and relationship to other controls.</p>
  </div>
</div>

## A practical diagnosis map

| Symptom | First place to investigate |
| --- | --- |
| Content is missing or nested strangely | DOM and HTML validity |
| A rule is crossed out | Cascade, specificity, or invalid value |
| The right value still looks wrong | Computed style, parent constraints, or layout |
| Content is clipped | Size constraints and overflow |
| Keyboard focus cannot reach a control | Element choice, focus order, or hidden state |
| Screen reader naming is unclear | Semantic element, text, label, or accessible name |

<div class="predict-box">
Without running the example, predict what happens if the class is changed to <code>class="note"</code> in HTML but not in CSS. Which stages still succeed, and at which stage does the intended connection fail?
</div>

The HTML still parses and the DOM still contains the article. The `.notice` selector simply matches nothing, so those declarations never enter the element's cascade.

## The accessibility tree is not optional output

Meaningful HTML can provide roles and relationships before you add any ARIA. A `<button>` already has button behavior, keyboard activation, and a role. A clickable `<div>` does not gain those things just because CSS makes it look like a button.

That leads to a course-wide rule:

> Choose HTML for meaning and behavior. Use CSS for presentation. Add ARIA only when native HTML cannot express the needed semantics.

## Guided inspection

Open any article page and inspect one heading, one link, and one image.

For each element, record:

1. its parent and children in the DOM;
2. one matched CSS rule;
3. one computed value;
4. its box size; and
5. its role and accessible name, when available.

<div class="ai-brief">
  <h3>AI task: compare claim to evidence</h3>
  <p>Ask a model to explain why a selected element has its final font size. Then compare the answer with the browser's computed-style trace. Record one claim the evidence confirmed and one detail the model missed.</p>
</div>

<div class="verification-card">
  <h3>Verification checklist</h3>
  <ul class="checklist">
    <li>I can distinguish source HTML from the parsed DOM.</li>
    <li>I can find a matched rule and a computed value.</li>
    <li>I can explain why layout is downstream from the cascade.</li>
    <li>I can describe why semantic HTML affects more than appearance.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>A paragraph is visible but unexpectedly narrow. Name three different stages or constraints you would inspect before changing its width.</p>
</div>

