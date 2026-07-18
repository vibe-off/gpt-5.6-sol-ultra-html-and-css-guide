<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCourseLocale } from '../course-locale'

const { isZh, text } = useCourseLocale({
  en: {
    eyebrow: 'Cascade simulator', title: 'Change the contest. Explain the winner.', badge: 'Rule comparison',
    legend: 'Choose a cascade scenario', expected: 'Expected winner',
    labels: { order: 'Source order', specificity: 'Specificity', important: '!important', inline: 'Inline style' }
  },
  zh: {
    eyebrow: '层叠模拟器', title: '改变竞争条件，并解释胜出规则。', badge: '规则比较',
    legend: '选择一个层叠场景', expected: '预期胜出值',
    labels: { order: '源码顺序', specificity: '优先级', important: '!important', inline: '行内样式' }
  }
})

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
const activeReason = computed(() => {
  if (!isZh.value) return active.value.reason
  return {
    order: '两条声明的来源、重要性、层、优先级都相同，因此后出现的声明胜出。',
    specificity: '较早的 ID 选择器优先级高于较晚的类选择器，因此不会比较源码顺序。',
    important: '作者样式中的重要声明高于普通声明。请谨慎使用这个逃生口。',
    inline: '普通行内声明高于通过选择器定义的普通作者声明。'
  }[scenario.value]
})
</script>

<template>
  <section class="lab-widget" aria-labelledby="cascade-lab-title">
    <div class="lab-widget__header">
      <div>
        <p class="eyebrow">{{ text.eyebrow }}</p>
        <h3 id="cascade-lab-title">{{ text.title }}</h3>
      </div>
      <span class="lab-widget__badge">{{ text.badge }}</span>
    </div>

    <fieldset class="segmented-control">
      <legend class="visually-hidden">{{ text.legend }}</legend>
      <button
        v-for="(_, key) in scenarios"
        :key="key"
        type="button"
        :aria-pressed="scenario === key"
        @click="scenario = key as Scenario"
      >
        {{ text.labels[key] }}
      </button>
    </fieldset>

    <div class="cascade-result">
      <pre class="lab-widget__code"><code>{{ active.code }}</code></pre>
      <div class="cascade-result__answer" role="status" aria-live="polite" aria-atomic="true">
        <span>{{ text.expected }}</span>
        <strong :class="`cascade-tone--${active.tone}`">{{ active.winner }}</strong>
        <p>{{ activeReason }}</p>
      </div>
    </div>
  </section>
</template>
