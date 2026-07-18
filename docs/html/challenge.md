---
title: HTML review challenge
description: Rebuild a campus event notice using semantic HTML, reliable paths, meaningful media, a data table, and an accessible form.
---

# HTML challenge: Campus open studio

<p class="lesson-lead">Build the complete content structure before writing custom CSS. Your submission should remain understandable with the stylesheet removed.</p>

<div class="lesson-meta">
  <span>Practice</span>
  <span>90–120 minutes</span>
  <span>HTML only</span>
</div>

## The brief

Create one page for a campus open-studio day. It needs:

- a site identity and primary navigation;
- one page title and short introduction;
- three workshop summaries;
- one informative image with a caption;
- a schedule expressed as data;
- a registration form; and
- contact and venue information.

You may use placeholder copy, but it must be realistic enough to make semantic choices possible. Do not use `lorem ipsum`.

## Required content relationships

1. Each workshop has a heading, description, time, location, and detail link.
2. The schedule has a caption plus clear row and column headers.
3. The form collects name, email, one workshop choice, and optional access notes.
4. Every control has a visible label and submitted name.
5. The image's alternative text and caption perform different jobs.
6. The venue address is machine-readable where appropriate and visible as text.
7. Navigation works using the actual folder structure.

## Constraints

- Use a complete document shell.
- Use no custom ARIA role when a native element already fits.
- Use no inline event handlers.
- Use no table for layout.
- Use no heading level for visual size alone.
- Use no placeholder as the only form label.
- Keep the source readable with consistent indentation.

## Suggested structure—not a solution

```text
body
├─ skip link
├─ site header
│  └─ primary navigation
├─ main
│  ├─ page introduction
│  ├─ workshop collection
│  ├─ studio figure
│  ├─ schedule table
│  └─ registration form
└─ site footer
```

Choose the exact elements by meaning. A tree diagram names responsibilities; it does not dictate that every line becomes a `section` or `div`.

<div class="predict-box">
Before building, draw the heading outline and link destinations. Predict the accessible name of every form control. Identify which content should still make sense if the image fails to load.
</div>

## Evidence to submit

Submit the page plus a short `evidence.md` or classroom note containing:

1. a heading outline;
2. a screenshot or written trace of one label/control association;
3. validation results and the fixes you made;
4. a keyboard-only completion note;
5. one semantic decision you rejected and why; and
6. any AI assistance, what it suggested, and how you verified it.

## Acceptance criteria

<ul class="acceptance-list">
  <li>The document has valid, intentional structure and one clear main content region.</li>
  <li>Heading hierarchy matches the content hierarchy.</li>
  <li>Links and file paths reach their intended targets.</li>
  <li>Image alternative text reflects purpose and does not duplicate the caption.</li>
  <li>The schedule preserves header relationships.</li>
  <li>The form works by keyboard and labels every control.</li>
  <li>The page remains understandable without custom CSS.</li>
</ul>

## Live change request

After the first review, make this change without rebuilding the whole file:

> Add a second registration session and a short notice that the photography workshop requires participants to bring a camera.

Explain which elements you added, which existing relationships changed, and why the form still submits one unambiguous session value.

<div class="ai-brief">
  <h3>AI boundary for this challenge</h3>
  <p>AI may critique or suggest a small fragment after you create the structure. It may not replace the evidence note. You are responsible for every element and attribute in the final document.</p>
</div>

## Review before CSS

Use the [HTML and CSS cheatsheet](/reference/cheatsheet) and [trusted sources](/reference/sources). Once the structure passes the acceptance criteria, continue to [CSS as a rule system](/css/).
