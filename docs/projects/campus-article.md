---
title: Lab 2 — Campus article
description: Build an editorial page with semantic hierarchy, readable typography, figure and caption, related links, responsive layout, and print-aware decisions.
---

# Lab 2: Campus article

<p class="lesson-lead">Editorial content tests hierarchy, line length, figures, metadata, navigation, and the ability to keep the reading order intact while the layout changes.</p>

<div class="lesson-meta">
  <span>Project</span>
  <span>2–3 hours</span>
  <span>Responsive editorial</span>
</div>

## Brief

Build an article titled “The Night the Library Became a Studio.” It includes:

- site header and primary navigation;
- breadcrumb or clear return path;
- article title, deck, author, and publication date;
- four content sections with headings;
- one figure and caption;
- a pull quotation that remains a quotation in HTML;
- a related-events list; and
- a newsletter form in the footer region.

Write or use teacher-provided realistic copy. Paragraph lengths must vary, and one heading must be long enough to wrap.

## Content model

```text
site header
main
└─ article
   ├─ article header
   ├─ prose sections
   ├─ figure
   ├─ quotation
   └─ article footer / tags
related events
site footer / newsletter
```

Decide whether related events are inside or outside the article based on whether they are part of the authored piece or page-level recommendations.

## Visual direction

- warm reading surface and high-contrast text;
- article body near `60–72ch`;
- fluid title with bounded size;
- clear metadata that remains readable, not tiny;
- one wider media moment that does not cause overflow;
- related content that becomes a compact side region only when space allows; and
- deliberate print behavior that removes navigation and preserves the article.

## Layout constraints

Use normal flow for the reading sequence. Use Grid when the related region moves beside the article. Do not visually reorder content away from DOM order.

```css
.article-layout {
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
}

@media (min-width: 64rem) {
  .article-layout {
    grid-template-columns: minmax(0, 1fr) minmax(14rem, 18rem);
    align-items: start;
  }
}
```

This is a relationship example. Choose the breakpoint from your content.

## Print extension

```css
@media print {
  .site-header,
  .site-footer,
  .related-events {
    display: none;
  }

  body {
    color: black;
    background: white;
  }

  a[href]::after {
    content: " (" attr(href) ")";
  }
}
```

Review whether printing raw URLs is useful for internal fragments, email links, or very long destinations. Refine rather than copying blindly.

## Evidence tasks

1. Show the heading outline.
2. Measure the article's computed line length at narrow and wide widths.
3. Demonstrate the figure's reserved aspect ratio before its image loads.
4. Complete all navigation and form controls by keyboard.
5. Print-preview one page and record two rules you changed.
6. Test the longest heading at 200% zoom.

<div class="predict-box">
If the related-events region appears before the article in DOM order but is visually placed on the right, what will keyboard and reading order do? Should Grid placement be used to “fix” a content-order decision?</div>

## AI collaboration

Ask for a reading-quality review limited to hierarchy, line length, link naming, and print consequences. Do not ask the model to invent user research or claim that a line length is universally perfect.

## Live change

Add a second figure whose caption is three lines long and whose source image is portrait-oriented. The article must remain stable at narrow widths and in print.

<ul class="acceptance-list">
  <li>Semantic reading order works with CSS disabled.</li>
  <li>Article typography remains readable at narrow, wide, and zoomed views.</li>
  <li>Media has purposeful alternatives, captions, dimensions, and fluid sizing.</li>
  <li>Related content changes layout without changing logical order.</li>
  <li>Keyboard and print checks are documented.</li>
</ul>

