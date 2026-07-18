---
title: Document anatomy
description: Build a complete HTML document and understand doctype, language, head metadata, viewport, title, and body structure.
---

# Build a complete document

<p class="lesson-lead">A reliable page starts before the first visible heading. The document shell tells the browser which parsing mode, language, character encoding, title, and viewport assumptions to use.</p>

<div class="lesson-meta">
  <span>HTML core</span>
  <span>45 minutes</span>
  <span>Build + inspect</span>
</div>

## The minimum useful shell

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Student Design Exhibition</title>
    <meta
      name="description"
      content="Dates, venue, and visitor information for the student design exhibition."
    >
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>…</header>
    <main>…</main>
    <footer>…</footer>
  </body>
</html>
```

## Read the shell by responsibility

### `<!doctype html>`

The doctype asks modern browsers to use standards mode. It is a declaration, not an HTML element.

### `<html lang="en">`

The root element contains the document. Its `lang` value helps pronunciation, translation, spellchecking, and language-sensitive processing. Use the language of the page, and mark passages that switch languages:

```html
<p>The design principle <span lang="zh-CN">留白</span> can be translated as “white space.”</p>
```

### `<meta charset="utf-8">`

UTF-8 supports the characters needed by most written languages. Keep this declaration near the start of `head`.

### Viewport metadata

The viewport declaration tells mobile browsers to use the device width rather than presenting a desktop-sized canvas scaled down. It enables your responsive CSS to operate on the expected viewport.

### `<title>` and description

The title identifies the page in the browser tab, history, bookmarks, and often search results. Make it specific to the page. The description may be used by search or sharing surfaces; it should summarize the page rather than repeat the title.

### Stylesheet link

`href="styles.css"` is a path relative to the HTML file. If it is wrong, the Network panel shows a failed request and no rules from that file will match.

## The body needs one main content region

Use `main` for the page's primary content. A page should normally have one visible `main`. Repeated site navigation and footer material sit outside it.

```html
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header">…</header>

  <main id="main-content">
    <h1>Student Design Exhibition</h1>
    …
  </main>

  <footer class="site-footer">…</footer>
</body>
```

The skip link gives keyboard users a direct route past repeated navigation. It needs a real destination ID and a visible focus style.

<div class="predict-box">
What changes if you remove the viewport meta element? Predict the effect on a narrow phone, then use device emulation to compare. Do not change any CSS between tests.
</div>

## Syntax habits that prevent confusing DOMs

- Close elements that require closing tags.
- Nest children fully inside their parents.
- Quote attribute values consistently.
- Use unique `id` values.
- Escape literal special characters when needed: `&lt;`, `&gt;`, and `&amp;`.
- Indent to reveal hierarchy; indentation does not create hierarchy.
- Validate after structural edits.

<div class="misconception">
  <h3>The browser recovering is not proof of correctness</h3>
  <p>Browsers deliberately recover from malformed HTML. Different recovery from what you intended can change the DOM, styling, form behavior, or accessibility tree.</p>
</div>

## Guided build

Create a page for one campus event. Include:

1. a complete document shell;
2. a page-specific title and description;
3. a site header with short navigation;
4. one `main` region and one `h1`;
5. an event article with a heading, time, location, and summary; and
6. a footer with contact information.

Inspect the DOM and the document title. Resize to a narrow viewport. Confirm the stylesheet request succeeds.

<div class="ai-brief">
  <h3>AI task: review only the shell</h3>
  <p>Ask for a review limited to document metadata, language, landmark structure, and file paths. Require the response to separate errors from optional improvements. Verify each claimed error in the source or browser.</p>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Why can a page look normal on your laptop while still having a broken document shell? Name two consequences that a screenshot would not reveal.</p>
</div>

