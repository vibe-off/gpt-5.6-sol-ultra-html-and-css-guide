<script setup lang="ts">
const steps = [
  {
    number: '01',
    verb: 'Predict',
    detail: 'Write down what you expect the browser to do before you run the code.'
  },
  {
    number: '02',
    verb: 'Ask',
    detail: 'Use AI for a focused explanation, critique, or ranked set of hypotheses.'
  },
  {
    number: '03',
    verb: 'Verify',
    detail: 'Check the DOM, computed styles, keyboard behavior, and acceptance criteria.'
  },
  {
    number: '04',
    verb: 'Explain',
    detail: 'State why the final result works and what evidence ruled out alternatives.'
  }
]
</script>

<template>
  <section class="pave" aria-labelledby="pave-title">
    <div class="pave__intro">
      <p class="eyebrow">The course operating system</p>
      <h2 id="pave-title">PAVE every solution with evidence.</h2>
      <p>
        AI output is a hypothesis. The browser, standards, tests, and your explanation are the evidence.
      </p>
    </div>
    <ol class="pave__steps">
      <li v-for="step in steps" :key="step.verb" class="pave__step">
        <span class="pave__number">{{ step.number }}</span>
        <div>
          <strong>{{ step.verb }}</strong>
          <p>{{ step.detail }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

