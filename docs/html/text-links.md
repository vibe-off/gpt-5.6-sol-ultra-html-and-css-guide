---
title: Text, lists, and links
description: Express content hierarchy with headings, paragraphs, lists, emphasis, useful link text, and reliable file paths.
---

# Make content navigable before styling it

<p class="lesson-lead">Good text structure lets readers scan, assistive-technology users navigate, and maintainers understand a page without reverse-engineering font sizes.</p>

<div class="lesson-meta">
  <span>HTML core</span>
  <span>55 minutes</span>
  <span>Content hierarchy</span>
</div>

## Headings describe a hierarchy

Use headings to label sections, not to obtain a particular visual size.

```html
<main>
  <h1>Campus Sustainability Report</h1>

  <section>
    <h2>Energy use</h2>
    <h3>Teaching buildings</h3>
    <h3>Student residences</h3>
  </section>

  <section>
    <h2>Waste reduction</h2>
  </section>
</main>
```

A new heading level creates a subsection of the previous level. Avoid choosing `h4` because its default font looks convenient. CSS controls appearance.

## Choose text elements by purpose

| Content | Element | Note |
| --- | --- | --- |
| Paragraph | `p` | One coherent block of prose |
| Unordered collection | `ul` | Order does not change meaning |
| Sequence or ranking | `ol` | Order matters |
| Term and description | `dl`, `dt`, `dd` | Useful for metadata and glossaries |
| Stress emphasis | `em` | Changes the meaning or stress of a sentence |
| Strong importance | `strong` | Marks serious importance |
| Short code | `code` | Machine-readable or literal code text |
| Time or date | `time` | Can include machine-readable `datetime` |
| Quotation | `blockquote` or `q` | Choose by block or inline context |

Do not reach for `br` to create vertical spacing between paragraphs. Separate paragraphs with `p`, then control spacing in CSS.

## Links need a destination and a useful name

```html
<a href="workshops.html">Browse all workshops</a>
```

The destination comes from `href`. The link text should make sense when read out of context. “Browse all workshops” is more useful than “click here.”

Use fragments to link within a page:

```html
<a href="#fees">Jump to fees</a>

<section id="fees">
  <h2>Fees</h2>
</section>
```

IDs must be unique and stable enough to serve as link targets.

## Build a path model

Given this structure:

```text
site/
├─ index.html
├─ events/
│  └─ exhibition.html
└─ images/
   └─ poster.webp
```

From `index.html`, the event is `events/exhibition.html`. From `events/exhibition.html`, the image is `../images/poster.webp`: `..` moves up one folder before entering `images`.

| Path kind | Example | Meaning |
| --- | --- | --- |
| Same folder | `about.html` | Start beside the current file |
| Child folder | `events/talk.html` | Move down into `events` |
| Parent folder | `../index.html` | Move up one folder |
| Root-relative | `/images/logo.png` | Start at the site's URL root |
| Absolute URL | `https://example.edu/map` | Full external location |

Root-relative paths work from a web server but not always when opening a file directly. Know the environment you are testing.

<div class="predict-box">
From <code>events/exhibition.html</code>, what path links back to <code>index.html</code>? What path links to <code>images/poster.webp</code>? Draw the folder moves before answering.
</div>

## External links and new tabs

Opening new tabs without warning can disorient users. The safest default is normal navigation. If a genuine workflow requires `target="_blank"`, make the behavior clear in the link text or nearby context. Modern browsers protect many opener risks, but explicit `rel="noopener"` remains understandable defensive intent.

## Build a robust navigation list

```html
<nav aria-label="Primary">
  <ul>
    <li><a href="index.html" aria-current="page">Home</a></li>
    <li><a href="events.html">Events</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

The list expresses a set. The navigation landmark has a label. `aria-current="page"` communicates the current destination without disabling the link.

<div class="ai-brief">
  <h3>AI task: test link quality</h3>
  <p>Provide only the link texts from your page and ask whether each remains understandable without surrounding sentences. Reject suggestions that invent destinations or change the content's meaning.</p>
</div>

<div class="verification-card">
  <h3>Verification checklist</h3>
  <ul class="checklist">
    <li>The heading outline mirrors the content hierarchy.</li>
    <li>Lists are used for real collections or sequences.</li>
    <li>Every link reaches the intended target.</li>
    <li>Link text describes the destination or purpose.</li>
    <li>Focus order follows the visible reading order.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why is changing an <code>h2</code> to an <code>h4</code> for its smaller default style a content bug, even if the page still looks tidy?</p>
</div>

