---
title: Trusted sources
description: Current primary references for HTML, CSS, accessibility, browser compatibility, validation, web performance, and VitePress.
---

# Trusted sources and how to use them

<p class="lesson-lead">Use primary standards and maintained references for exact syntax and behavior. Use the browser to confirm what your actual document, styles, and target environment do.</p>

## Core learning references

<div class="source-grid">
  <div class="source-card">
    <h3>MDN Curriculum</h3>
    <p>A structured map of baseline web-development skills, including semantic HTML, CSS fundamentals, layout, accessibility, design, and supporting practices.</p>
    <p><a href="https://developer.mozilla.org/en-US/curriculum/">Open the MDN Curriculum</a></p>
  </div>
  <div class="source-card">
    <h3>MDN Learn Web Development</h3>
    <p>Progressive explanations, skill tests, challenges, and extension modules for learners moving from beginner to comfortable.</p>
    <p><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development">Open MDN Learn</a></p>
  </div>
</div>

## Exact platform reference

- [MDN HTML reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference) — elements, attributes, guides, and related accessibility notes.
- [MDN CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) — properties, selectors, at-rules, values, concepts, and examples.
- [HTML Living Standard](https://html.spec.whatwg.org/) — the living HTML standard; exact and dense.
- [CSS specifications](https://www.w3.org/Style/CSS/specs.en.html) — module specifications maintained through W3C processes.

Start with MDN when learning or implementing. Consult a specification when exact normative behavior or an unresolved edge case matters.

## Accessibility

- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/) — standards, guidance, evaluation resources, and education material.
- [WAI curricula](https://www.w3.org/WAI/curricula/) — learning outcomes, teaching ideas, and assessment ideas.
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) — current standards and supporting documents.
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — patterns for custom widgets when native HTML is insufficient.

The ARIA patterns are not a reason to rebuild native controls. Start with semantic HTML and use custom widget guidance only when the requirement truly needs it.

## Compatibility

- [MDN browser compatibility data](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Compatibility_tables) — compatibility tables embedded in reference pages.
- [Can I use](https://caniuse.com/) — maintained feature-support summaries useful for project decisions.
- Browser release notes and vendor documentation — useful when a specific engine or new implementation detail matters.

Record the date, target-browser policy, fallback, and the user impact. Avoid copying a global support percentage without project context.

## Validation

- [Nu HTML Checker](https://validator.w3.org/nu/) — structural and conformance feedback for HTML.
- [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) — syntax and conformance feedback for many CSS rules.

Validators can lag new features or miss usability defects. Treat output as a focused signal, then inspect the actual rule and current specification.

## Performance

- [web.dev performance](https://web.dev/learn/performance/) — practical material from the Chrome team on loading and rendering performance.
- [MDN performance guides](https://developer.mozilla.org/en-US/docs/Web/Performance) — platform-focused performance concepts and APIs.
- Your browser's Network and Performance tools — evidence for the actual page under recorded conditions.

Vendor guidance may emphasize that vendor's tooling or engine. Test in the project's supported environments.

## This guide's platform

- [VitePress stable documentation](https://vuejs.github.io/vitepress/v1/) — the stable 1.x documentation used by this guide.
- [VitePress getting started](https://vuejs.github.io/vitepress/v1/guide/getting-started) — setup, scripts, and project structure.
- [VitePress Markdown extensions](https://vuejs.github.io/vitepress/v1/guide/markdown) — callouts, code groups, highlighting, and other authoring features.

This project pins stable VitePress 1.6.4 rather than the VitePress 2 alpha line. Dependency versions live in `package.json`, which is the source of truth for the project build.

## Source-checking habit

For an exact or time-sensitive claim:

1. define what decision depends on the answer;
2. consult a current maintained reference or primary standard;
3. confirm the target-browser or project context;
4. build the smallest relevant example;
5. inspect the real browser result; and
6. record the source date and fallback when the decision may age.

AI can help locate terminology or summarize a dense passage. It should not be the final authority for a changing compatibility claim or a browser result it did not observe.
