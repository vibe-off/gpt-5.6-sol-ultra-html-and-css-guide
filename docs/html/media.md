---
title: Images and media
description: Add useful images, captions, responsive sources, dimensions, and alternative text based on the media's purpose.
---

# Make media useful in every mode

<p class="lesson-lead">An image is not just a file path. It has a purpose, intrinsic dimensions, an accessible alternative, loading cost, and a relationship to nearby content.</p>

<div class="lesson-meta">
  <span>HTML core</span>
  <span>55 minutes</span>
  <span>Content + performance</span>
</div>

## Start with the image's purpose

```html
<img
  src="images/print-studio.webp"
  alt="Two students pulling a blue ink print from a screen press"
  width="1200"
  height="800"
>
```

Good alternative text communicates what the image contributes in this context. Do not begin with “image of.” Do not copy the filename. Do not describe every pixel.

### Three common cases

1. **Informative:** describe the information or experience the image contributes.
2. **Functional:** describe the destination or action when an image is the content of a link or button.
3. **Decorative:** use `alt=""` when the image adds no information and nearby content already carries the meaning.

The same image can require different alternative text in different contexts.

## Width and height protect layout stability

The `width` and `height` attributes give the browser an aspect-ratio hint before the image downloads. CSS can still make the image fluid:

```css
img {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
}
```

This avoids overflow while preserving aspect ratio. The intrinsic dimensions also reduce unexpected layout shifts.

## Connect a caption with `figure`

```html
<figure>
  <img
    src="images/material-study.webp"
    alt="Six paper samples arranged from translucent to opaque"
    width="1000"
    height="700"
  >
  <figcaption>Material study by the second-year visual communication studio.</figcaption>
</figure>
```

Use `figure` when media and caption form a self-contained unit referenced from the main content. Not every image needs a figure.

## Offer the browser useful source choices

For resolution switching, provide candidates and explain their intended display sizes:

```html
<img
  src="images/campus-800.webp"
  srcset="
    images/campus-480.webp 480w,
    images/campus-800.webp 800w,
    images/campus-1400.webp 1400w
  "
  sizes="(min-width: 64rem) 50vw, 100vw"
  alt="Students crossing the central courtyard after class"
  width="1400"
  height="933"
>
```

`srcset` describes available files. `sizes` describes the image's expected rendered width under layout conditions. The browser chooses a suitable candidate based on layout and display density.

Use `picture` for art direction or format alternatives, not as decoration around every image:

```html
<picture>
  <source media="(max-width: 40rem)" srcset="images/exhibition-portrait.webp">
  <img
    src="images/exhibition-wide.webp"
    alt="Visitors reading student project labels in the exhibition hall"
    width="1400"
    height="800"
  >
</picture>
```

## Audio and video need equivalent access

Controls, captions, transcripts, and audio descriptions depend on the content and audience. Autoplay—especially with sound—can be disruptive and is often blocked. Start with user control.

```html
<video controls preload="metadata" width="960" poster="images/tour-poster.webp">
  <source src="media/studio-tour.webm" type="video/webm">
  <track
    kind="captions"
    src="media/studio-tour-en.vtt"
    srclang="en"
    label="English"
    default
  >
  <p>Your browser does not support embedded video.</p>
</video>
<p><a href="studio-tour-transcript.html">Read the studio tour transcript</a>.</p>
```

<div class="predict-box">
An image has <code>width="1200"</code>, <code>height="800"</code>, and CSS <code>max-inline-size: 100%; block-size: auto</code>. What happens in a 320-pixel-wide container? Which value protects the aspect ratio, and which rule prevents overflow?
</div>

## Loading choices

Images below the first screen may benefit from `loading="lazy"`. Do not lazily load the main image that users need immediately. Compress media, choose an appropriate format, and verify actual transfer size in the Network panel.

<div class="ai-brief">
  <h3>AI task: draft alt text from purpose</h3>
  <p>Describe the image, its surrounding text, and why it is present. Ask for three concise alternatives. Choose or rewrite one only after checking that it adds information without repeating the caption.</p>
</div>

<div class="verification-card">
  <h3>Verification checklist</h3>
  <ul class="checklist">
    <li>Every image has an intentional <code>alt</code> value.</li>
    <li>Intrinsic dimensions reserve the correct aspect ratio.</li>
    <li>Media does not overflow a narrow container.</li>
    <li>Captions and transcripts are connected to the right content.</li>
    <li>The Network panel shows appropriately sized files.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why can two pages use the same photograph but require different alternative text?</p>
</div>
