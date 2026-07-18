---
title: How projects work
description: A repeatable lab format with requirements, intentional constraints, browser evidence, AI disclosure, live changes, and explanation.
---

# Practice ends with evidence

<p class="lesson-lead">Projects combine concepts under realistic change. Every build includes an intentional constraint, an evidence record, and an explain-it-back moment.</p>

<div class="lesson-meta">
  <span>Projects</span>
  <span>Course-long</span>
  <span>Build + debug + defend</span>
</div>

## The project loop

1. **Read the brief.** Separate content, behavior, and quality requirements.
2. **Model the structure.** Draw regions, headings, interactions, and data relationships.
3. **Write acceptance criteria.** Make “good” observable.
4. **Build the smallest complete slice.** Start with semantic HTML, then CSS.
5. **Test the slice.** Use keyboard, widths, zoom, long content, and browser evidence.
6. **Invite critique.** Peer or AI review uses the same criteria.
7. **Apply a live change.** Modify the design without a whole-file rewrite.
8. **Explain decisions.** Show evidence, tradeoffs, and one rejected alternative.

## Submission bundle

Every project should include:

```text
project-name/
├─ index.html
├─ styles.css
├─ images/
└─ evidence.md
```

`evidence.md` contains:

```markdown
# Evidence

## Acceptance results
- [ ] …

## Browser observations
- …

## Accessibility checks
- …

## AI disclosure
- Suggestion:
- Verification:
- Decision:

## Live change
- What changed:
- Why this implementation:
```

The evidence file can be a classroom form or spoken walk-through when appropriate. The required thinking remains the same.

## Project sequence

<div class="lesson-grid">
  <div class="lesson-card">
    <h3>01 · Profile card</h3>
    <p>Box model, typography, media, intrinsic sizing, visible focus, and one responsive component.</p>
    <p><a href="/projects/profile-card">Open the lab →</a></p>
  </div>
  <div class="lesson-card">
    <h3>02 · Campus article</h3>
    <p>Semantic hierarchy, readable prose, figures, navigation, Grid/Flexbox, and responsive regions.</p>
    <p><a href="/projects/campus-article">Open the lab →</a></p>
  </div>
  <div class="lesson-card">
    <h3>03 · Debugging clinic</h3>
    <p>Unknown defects in paths, selectors, cascade, overflow, positioning, focus, and forms.</p>
    <p><a href="/projects/debugging-clinic">Enter the clinic →</a></p>
  </div>
  <div class="lesson-card">
    <h3>04 · Campus hub</h3>
    <p>A multi-page capstone with accessible navigation, content, events, registration, and a live change.</p>
    <p><a href="/projects/capstone">Read the capstone →</a></p>
  </div>
</div>

## AI policy for authentic work

AI is allowed when the learning goal is requirement interpretation, implementation, critique, debugging, and ownership. Students must disclose material use and verify it. Short prediction checks may be completed without AI when the goal is the student's unaided mental model.

AI may not fabricate test results, user feedback, citations, or browser evidence.

## Instructor pattern: surprise, not trick

A live change should reveal whether the structure is adaptable, not punish students with hidden requirements. Good changes include:

- a title becomes twice as long;
- a card gains a status and second action;
- navigation adds one item;
- a form gains a conditional help note;
- the color theme changes through tokens; or
- a two-column region must work inside a narrow parent.

The student should be able to trace the impact and implement a local change.

<div class="verification-card">
  <h3>Project-ready checklist</h3>
  <ul class="checklist">
    <li>I can turn the brief into observable criteria.</li>
    <li>I can explain the semantic structure before styling.</li>
    <li>I know which width, input, and content cases I will test.</li>
    <li>I will keep browser evidence and AI disclosure.</li>
    <li>I can apply a live change without replacing the entire solution.</li>
  </ul>
</div>

