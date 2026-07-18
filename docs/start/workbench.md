---
title: Set up your workbench
description: A minimal, local HTML and CSS workspace with browser DevTools, validation, and a repeatable file structure.
---

# Set up your workbench

<p class="lesson-lead">Keep the first environment boring: a folder, an HTML file, a CSS file, an editor, and a modern browser. Fewer moving parts make evidence easier to read.</p>

<div class="lesson-meta">
  <span>Setup</span>
  <span>30 minutes</span>
  <span>Local files</span>
</div>

## Create the smallest useful project

```text
campus-page/
├─ index.html
├─ styles.css
└─ images/
```

Use lowercase names, hyphens instead of spaces, and paths that describe the asset. Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Campus Page</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main>
      <h1>Campus Page</h1>
      <p>Your browser is reading a local HTML document.</p>
    </main>
  </body>
</html>
```

Create `styles.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

main {
  width: min(100% - 2rem, 42rem);
  margin-inline: auto;
  padding-block: 4rem;
}
```

Open `index.html` in a browser. For these first exercises, a local file is enough. If a later exercise uses modules, requests, or route-like paths, use a small local development server.

## Make DevTools part of the desk

Learn these five surfaces first:

- **Elements:** DOM, matched rules, computed styles, and box model.
- **Console:** parsing errors, failed resources, and messages from scripts.
- **Network:** whether files loaded and which status was returned.
- **Accessibility:** roles, names, and states exposed to assistive technology.
- **Device emulation:** a quick size check, not a replacement for real keyboard and zoom testing.

::: warning Do not “fix” by refreshing harder
If a style does not appear, first check whether `styles.css` loaded, whether the selector matches, and whether another declaration won. Repeated refreshing adds no evidence.
:::

## Use validation as a focused signal

The [Nu HTML Checker](https://validator.w3.org/nu/) can identify invalid nesting, missing required attributes, and other structural issues. The [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) can catch many syntax problems, but modern CSS evolves quickly; treat validator output as evidence to investigate, not as the sole definition of correctness.

When course policy or privacy requires local-only work, ask the instructor for an offline validator or use editor diagnostics instead of uploading private content.

## Establish a save-and-check loop

After each small change:

1. save the file;
2. reload or let the development server update;
3. reproduce the target behavior;
4. inspect one piece of evidence; and
5. record the next hypothesis.

This is faster than making five speculative edits and trying to remember which one mattered.

<div class="build-brief">
  <h3>Workbench check</h3>
  <p>Change the heading color, increase the main content's maximum width, and deliberately misspell one property. Find the ignored declaration in DevTools, then restore it.</p>
</div>

<div class="verification-card">
  <h3>Ready-to-learn checklist</h3>
  <ul class="checklist">
    <li>The HTML file opens and the stylesheet loads.</li>
    <li>I can inspect the heading in the Elements panel.</li>
    <li>I can find a computed font size and box dimension.</li>
    <li>I know where failed file requests appear.</li>
    <li>I can restore the project to a valid working state.</li>
  </ul>
</div>

## Optional: use version control early

Once you can edit local files comfortably, initialize a Git repository. Make a commit after each working milestone. Version control lets you compare, explain, and recover decisions; it is not just a publishing tool.

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>If an image is missing, what evidence would distinguish a wrong path from a CSS rule that hides the image?</p>
</div>

