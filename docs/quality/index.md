---
title: Quality is part of the build
description: Treat accessibility, resilience, debugging, maintainability, compatibility, and performance as acceptance criteria rather than final polish.
---

# Quality is not a cleanup phase

<p class="lesson-lead">A page is complete when people can use it, requirements survive change, defects can be diagnosed, and another developer can understand the decisions.</p>

<div class="lesson-meta">
  <span>Engineering</span>
  <span>30 minutes</span>
  <span>Quality model</span>
</div>

## Six lenses for every page

<div class="concept-grid">
  <div class="concept-card">
    <h3>Correctness</h3>
    <p>Content, links, form data, states, and layout satisfy the explicit requirement.</p>
  </div>
  <div class="concept-card">
    <h3>Accessibility</h3>
    <p>Meaning, keyboard use, focus, names, labels, contrast, zoom, and motion support a broad range of users.</p>
  </div>
  <div class="concept-card">
    <h3>Resilience</h3>
    <p>Long content, narrow space, missing media, slow loading, and preference changes do not destroy the experience.</p>
  </div>
  <div class="concept-card">
    <h3>Maintainability</h3>
    <p>Selectors, tokens, component boundaries, and comments make future changes local and understandable.</p>
  </div>
  <div class="concept-card">
    <h3>Performance</h3>
    <p>The page avoids unnecessary bytes, rendering work, layout shifts, and blocking resources.</p>
  </div>
  <div class="concept-card">
    <h3>Evidence</h3>
    <p>Important claims are supported by inspection, tests, standards, or requirement checks.</p>
  </div>
</div>

## Define quality before implementation

Turn vague goals into observable criteria:

| Vague statement | Testable criterion |
| --- | --- |
| “Mobile friendly” | No horizontal page scroll at 320px; controls remain readable and operable |
| “Accessible form” | Visible labels, logical keyboard order, clear focus, associated errors, usable zoom |
| “Fast image” | Correct source candidate loads; dimensions reserve space; no unnecessary oversized transfer |
| “Clean CSS” | No unexplained important rules; shared decisions use tokens; change stays inside the component |
| “AI checked it” | Suggestion, browser evidence, decision, and reason are recorded |

Acceptance criteria guide both human and AI assistance. Without them, generated polish can distract from missing behavior.

## Test throughout the build

Use small, frequent checks:

- after HTML structure: heading outline, labels, links, validation;
- after base CSS: cascade trace, zoom, focus, contrast;
- after layout: narrow/wide widths, long content, intrinsic sizing;
- after motion: reduced-motion mode and keyboard state;
- after media: transfer size, alt purpose, layout stability;
- after refactor: unchanged appearance and behavior plus a simpler rule system.

## Defects are curriculum

Do not hide every mistake behind a finished solution. Capture a minimal example, the evidence that exposed the defect, and the smallest fix. A class library of real bugs is more valuable than a gallery of perfect screenshots.

<div class="ai-brief">
  <h3>AI task: convert adjectives to checks</h3>
  <p>Give a model a short design brief and ask it to convert every quality adjective into observable acceptance criteria. Review for criteria the browser can actually demonstrate and remove invented product requirements.</p>
</div>

## Continue

Use [Accessibility by default](/quality/accessibility) as the first lens, then practice [Systematic debugging](/quality/debugging). The remaining pages turn maintainability, modern CSS, performance, and AI collaboration into repeatable decisions.

