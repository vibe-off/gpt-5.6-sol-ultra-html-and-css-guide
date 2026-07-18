<script setup lang="ts">
import { computed, ref } from 'vue'

type Scenario = 'order' | 'specificity' | 'important' | 'inline'

const scenario = ref<Scenario>('order')

const scenarios: Record<Scenario, { code: string; winner: string; reason: string; tone: string }> = {
  order: {
    code: `.note { color: coral; }\n.note { color: teal; }`,
    winner: 'teal',
    reason: 'Both declarations have the same origin, importance, layer, and specificity. The later one wins.',
    tone: 'teal'
  },
  specificity: {
    code: `#status { color: navy; }\n.note { color: coral; }`,
    winner: 'navy',
    reason: 'The earlier ID selector is more specific than the later class selector, so source order is never reached.',
    tone: 'navy'
  },
  important: {
    code: `.note { color: coral !important; }\n#status { color: navy; }`,
    winner: 'coral',
    reason: 'An important author declaration outranks a normal author declaration. Use this escape hatch sparingly.',
    tone: 'coral'
  },
  inline: {
    code: `.note { color: coral; }\n<p class="note" style="color: purple">`,
    winner: 'purple',
    reason: 'A normal inline declaration outranks normal selector-based author declarations.',
    tone: 'purple'
  }
}

const active = computed(() => scenarios[scenario.value])
</script>

<template>
  <section class="lab-widget" aria-labelledby="cascade-lab-title">
    <div class="lab-widget__header">
      <div>
        <p class="eyebrow">Cascade simulator</p>
        <h3 id="cascade-lab-title">Change the contest. Explain the winner.</h3>
      </div>
      <span class="lab-widget__badge">Rule comparison</span>
    </div>

    <fieldset class="segmented-control">
      <legend class="visually-hidden">Choose a cascade scenario</legend>
      <button
        v-for="(_, key) in scenarios"
        :key="key"
        type="button"
        :aria-pressed="scenario === key"
        @click="scenario = key as Scenario"
      >
        {{ key === 'order' ? 'Source order' : key === 'specificity' ? 'Specificity' : key === 'important' ? '!important' : 'Inline style' }}
      </button>
    </fieldset>

    <div class="cascade-result">
      <pre class="lab-widget__code"><code>{{ active.code }}</code></pre>
      <div class="cascade-result__answer" role="status" aria-live="polite" aria-atomic="true">
        <span>Expected winner</span>
        <strong :class="`cascade-tone--${active.tone}`">{{ active.winner }}</strong>
        <p>{{ active.reason }}</p>
      </div>
    </div>
  </section>
</template>
