---
title: Tables and forms
description: Mark up data tables and usable forms with captions, headers, labels, names, native input types, grouping, help text, and validation.
---

# Structure data and collect input

<p class="lesson-lead">Tables express relationships in data. Forms create a conversation with the user. Both become fragile when visual layout is allowed to replace structure.</p>

<div class="lesson-meta">
  <span>HTML core</span>
  <span>75 minutes</span>
  <span>Build + keyboard test</span>
</div>

## Tables are for tabular relationships

Use a table when values gain meaning from their row and column headers.

```html
<table>
  <caption>Open studio sessions, autumn term</caption>
  <thead>
    <tr>
      <th scope="col">Studio</th>
      <th scope="col">Day</th>
      <th scope="col">Seats</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Printmaking</th>
      <td>Tuesday</td>
      <td>12</td>
    </tr>
    <tr>
      <th scope="row">Photography</th>
      <td>Thursday</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
```

The caption identifies the data set. `scope` makes simple header relationships explicit. Do not use tables for page layout.

For narrow screens, preserve the table relationships and allow a containing region to scroll when necessary. Do not turn cells into unlabelled blocks.

## Every form control needs a name in three systems

A useful control often needs:

1. a **visible label** for people;
2. an **accessible name** exposed to assistive technology; and
3. a `name` attribute used when form data is submitted.

```html
<form action="/registrations" method="post">
  <div class="field">
    <label for="student-email">College email</label>
    <p id="email-help">Use the address ending in @college.example.</p>
    <input
      id="student-email"
      name="email"
      type="email"
      autocomplete="email"
      aria-describedby="email-help"
      required
    >
  </div>

  <button type="submit">Register for the workshop</button>
</form>
```

The explicit label connects through `for` and `id`. The help text is an additional description, not a replacement for the label. The button says what submission will do.

## Choose input types for behavior

Relevant input types can provide better keyboards, built-in validation, and meaningful controls:

- `email` for email addresses;
- `tel` for telephone numbers without imposing a universal format;
- `url` for URLs;
- `date` when a date control fits the task and locale testing is adequate;
- `number` for quantities that users genuinely increment or calculate—not IDs or postal codes;
- `search` for search fields.

Native validation is a baseline, not a complete error experience. Server-side validation remains required because client input cannot be trusted.

## Group related choices

```html
<fieldset>
  <legend>Preferred session</legend>

  <label>
    <input type="radio" name="session" value="morning" required>
    Morning, 09:00–11:00
  </label>

  <label>
    <input type="radio" name="session" value="afternoon">
    Afternoon, 14:00–16:00
  </label>
</fieldset>
```

The legend names the group; individual labels name the choices. Matching `name` values make radio buttons one exclusive group.

## Placeholder is not a label

Placeholder text disappears after input and often has weak contrast. Use it only for a short example when the visible label and instructions already exist.

```html
<label for="portfolio-url">Portfolio URL</label>
<input id="portfolio-url" name="portfolio" type="url" placeholder="https://example.com">
```

## Error communication needs a recovery path

A useful error should:

- identify the control;
- explain the problem in plain language;
- say how to fix it;
- remain available to assistive technology; and
- not rely on color alone.

Focus behavior depends on the form. For a failed submission with several errors, provide an error summary linked to each invalid field and move focus deliberately only when it improves orientation.

<div class="predict-box">
What data is submitted if an input has an <code>id</code> but no <code>name</code>? What relationship breaks if a label's <code>for</code> value does not match the input's <code>id</code>?
</div>

The unnamed input is not included under a form-data key. A mismatched label no longer labels or focuses that control through the explicit association.

## Buttons need an explicit type

Inside a form, a button defaults to submit in HTML. Write the intent:

```html
<button type="button">Add another attendee</button>
<button type="submit">Submit registration</button>
```

This avoids accidental submission when a new interface action is added later.

## Guided build: event registration

Include:

- name and college email;
- one required session choice;
- optional accessibility or dietary notes;
- agreement to clear, specific terms when genuinely required;
- a submit button with a precise label; and
- a confirmation state described in the project requirements.

Test by keyboard only. Activate every label. Submit empty, malformed, and valid states. Zoom text. Inspect names and descriptions.

<div class="ai-brief">
  <h3>AI task: review without redesigning</h3>
  <p>Ask for a table of each control's visible label, accessible name, submitted name, expected type, and validation rule. Require the model to mark uncertainty instead of inventing product requirements.</p>
</div>

<div class="verification-card">
  <h3>Verification checklist</h3>
  <ul class="checklist">
    <li>Every control has a persistent visible label.</li>
    <li>Labels focus or activate their controls.</li>
    <li>Related choices have a fieldset and legend.</li>
    <li>Keyboard order matches the visible order.</li>
    <li>Errors identify both the problem and recovery action.</li>
    <li>Submitted names and values match the requirement.</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>Explain it back</h3>
  <p>Describe the different jobs performed by <code>label</code>, <code>id</code>, and <code>name</code> in a form.</p>
</div>

