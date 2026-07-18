---
title: Debugging clinic
description: Diagnose a set of unfamiliar HTML and CSS defects using reproduction statements, browser evidence, minimal patches, and regression checks.
---

# Debugging clinic: seven evidence cases

<p class="lesson-lead">The clinic does not reward the fastest visual patch. It rewards a reproducible symptom, a supported cause, the smallest intentional fix, and a regression check.</p>

<div class="lesson-meta">
  <span>Practicum</span>
  <span>2 hours</span>
  <span>Unknown code</span>
</div>

## Clinic protocol

For each case, submit:

```text
Reproduction:
Expected:
Observed:
Evidence:
Hypothesis:
Experiment:
Patch:
Regression checks:
```

Do not use `!important`, page-level overflow clipping, fixed heights for text, or whole-file rewrites unless the case explicitly proves that they express the requirement.

<div class="build-brief">
  <h3>Open the runnable clinic</h3>
  <p><a href="/starters/debugging-clinic/">Launch the seven starter cases</a>. Each standalone page contains one intentional defect and can be saved with the rest of the public starter folder for local editing.</p>
</div>

## Case 1: The invisible stylesheet

**Symptom:** The page displays browser defaults even though `styles.css` contains rules.

**Seed clues:** The HTML file lives in `pages/`; the stylesheet lives in `assets/css/`; the current `href` is `assets/css/styles.css`.

**Evidence target:** Network request URL and status, then the correct relative path from the HTML file.

[Open runnable case 1](/starters/debugging-clinic/case-1/pages/)

## Case 2: The rule that never matched

**Symptom:** Card headings stay gray. A `.event-card > h2` rule exists.

**Seed clues:** The DOM contains `.event-card > .event-card__body > h2`.

**Evidence target:** Matched-rule list and direct-child relationship.

[Open runnable case 2](/starters/debugging-clinic/case-2/)

## Case 3: The specificity escalation

**Symptom:** A component state class cannot change the border color.

```css
#events .card { border-color: gray; }
.card.is-selected { border-color: teal; }
```

**Evidence target:** Computed trace and a refactor that reduces the base selector's specificity rather than escalating the state.

[Open runnable case 3](/starters/debugging-clinic/case-3/)

## Case 4: The content-box overflow

**Symptom:** A form creates horizontal page scroll on narrow screens.

```css
.registration-form {
  width: 100%;
  padding-inline: 1rem;
}
```

**Seed clue:** Default box sizing remains active.

**Evidence target:** Content and border-box arithmetic; project-wide or component-level `border-box` decision.

[Open runnable case 4](/starters/debugging-clinic/case-4/)

## Case 5: The unshrinkable flex child

**Symptom:** A long course title pushes a toolbar past its container.

**Seed clues:** The title is a flex child; its content includes a long unbroken code; shrinking is enabled.

**Evidence target:** Automatic minimum size and content wrapping. The final patch should preserve the code's readability.

[Open runnable case 5](/starters/debugging-clinic/case-5/)

## Case 6: The menu below everything

**Symptom:** A menu with `z-index: 9999` remains behind the next section.

**Seed clues:** Its parent has `transform: translateZ(0)` and `z-index: 1`; the sibling section belongs to a higher stacking context.

**Evidence target:** Stacking-context ancestor tree and a small layer-contract fix.

[Open runnable case 6](/starters/debugging-clinic/case-6/)

## Case 7: The inaccessible “fix”

**Symptom:** A custom dropdown looks correct and opens by mouse, but cannot be operated by keyboard.

**Seed clues:** The trigger is a `div` with a click handler and an ARIA role; no keyboard behavior or focus management exists.

**Evidence target:** Native element alternative, accessible name/state, focus order, and keyboard activation. CSS alone is not the whole fix.

[Open runnable case 7](/starters/debugging-clinic/case-7/)

<div class="ai-brief">
  <h3>AI rule for the clinic</h3>
  <p>You may ask for ranked hypotheses only after writing the reproduction and collecting one piece of browser evidence. The response must predict a second observation before you request a patch.</p>
</div>

## Scoring

| Dimension | Points per case |
| --- | ---: |
| Reproduction is precise | 2 |
| Evidence supports the cause | 3 |
| Hypothesis predicts an observation | 2 |
| Patch is minimal and intentional | 2 |
| Regression check covers a nearby risk | 1 |

The final score values diagnosis more than visual speed.

## Exit interview

Choose one case and explain:

1. the first tempting fix;
2. why it was incomplete or risky;
3. the browser evidence that changed your mind; and
4. one other defect with a similar symptom but a different cause.
