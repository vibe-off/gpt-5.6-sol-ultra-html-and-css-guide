---
title: Performance and resilience
description: Improve useful rendering with smaller media, stable dimensions, efficient fonts and CSS, progressive enhancement, and evidence from browser tools.
---

# Performance is part of usability

<p class="lesson-lead">A page that loads slowly, shifts while reading, or requires a large download excludes users on constrained devices and networks. Start with the biggest real costs and verify improvements.</p>

<div class="lesson-meta">
  <span>Engineering</span>
  <span>65 minutes</span>
  <span>Measure + improve</span>
</div>

## Optimize what users need first

Ask:

- When does meaningful content appear?
- Can the user read and operate the page while other resources load?
- Does content move unexpectedly?
- Is the main image appropriately sized and prioritized?
- Are fonts delaying text or causing large swaps?
- How much CSS is required before the first useful view?

Performance metrics can help, but connect them to an experience and a reproduction condition.

## Images are often the largest opportunity

1. Choose dimensions close to the rendered need.
2. Compress with an appropriate format and quality.
3. Provide `srcset` and `sizes` for responsive choices.
4. Include width and height to reserve aspect ratio.
5. Lazy-load below-the-fold media, not the primary content image by default.
6. Verify the chosen request and transfer size in the Network panel.

CSS shrinking a 4,000-pixel image does not reduce the downloaded bytes.

## Protect layout stability

Reserve space for images, video, ads, and dynamically inserted regions. Avoid injecting banners above the reader's current position without a deliberate reserved slot. Use stable font fallbacks and test loading states.

```css
.media-frame {
  aspect-ratio: 16 / 9;
  background: #e7e1d7;
}

.media-frame > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Use `object-fit: cover` only when cropping is acceptable. Content-critical diagrams may need `contain` or natural aspect ratio instead.

## Fonts are a product and performance choice

System fonts require no custom font download. If custom fonts are important:

- subset carefully while preserving required languages and symbols;
- choose only the weights actually used;
- preload only truly critical files;
- use an intentional `font-display` strategy;
- provide metric-compatible fallbacks when possible; and
- inspect text rendering during slow loading.

Do not trade readable Chinese, Arabic, or other script coverage for an aggressively small Latin-only subset without a planned fallback.

## Keep CSS understandable before making it tiny

Remove unused framework code when evidence shows it is unused. Avoid massive selector duplication and deeply nested generated rules. Build tools can minify production CSS; source should remain maintainable.

Critical CSS strategies can improve first rendering on large products, but add complexity and invalidation risks. A small course site may benefit more from simply shipping less CSS.

## Prefer progressive enhancement

Deliver content and native form behavior in HTML. Add CSS presentation. Add script only for interactions that require it. A network failure should not erase information that could have existed in the document.

This layering also helps debugging: each enhancement has a boundary and fallback.

## Measure under a repeatable condition

Record:

- page or component tested;
- device and browser class;
- viewport;
- network and CPU condition when simulated;
- cache state;
- metric or observation;
- change made; and
- before/after result.

One fast load on a developer machine is not representative evidence.

<div class="predict-box">
An image is displayed at 600×400 but downloaded at 3600×2400. Which layer should fix the transfer cost: HTML source selection, CSS display size, or both? Explain each responsibility.</div>

HTML responsive sources reduce transferred bytes; CSS controls layout. Both should express compatible intent.

## Resilience cases

Test:

- images disabled or slow;
- stylesheet delayed;
- custom font unavailable;
- long and translated content;
- offline return to an already cached static page when relevant;
- print or reader mode for content-heavy pages; and
- reduced data or constrained network where the product supports it.

<div class="ai-brief">
  <h3>AI task: prioritize by likely impact</h3>
  <p>Provide a real resource list with transfer sizes and loading positions. Ask the model to rank opportunities, state assumptions, and propose a measurement for each. Reject generic micro-optimizations unsupported by the evidence.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why can removing a readable source-code comment fail to create any meaningful user performance improvement?</p>
</div>

