<script setup lang="ts">
import { computed, ref } from 'vue'

const direction = ref('row')
const justify = ref('space-between')
const align = ref('center')
const gap = ref(12)

const previewStyle = computed(() => ({
  flexDirection: direction.value as 'row' | 'column',
  flexWrap: 'wrap' as const,
  justifyContent: justify.value,
  alignItems: align.value,
  gap: `${gap.value}px`
}))

const summary = computed(() =>
  `Three items use ${direction.value} direction, ${justify.value} main-axis distribution, ` +
  `${align.value} cross-axis alignment, wrapping, and a ${gap.value} pixel gap.`
)
</script>

<template>
  <section class="lab-widget" aria-labelledby="flex-lab-title">
    <div class="lab-widget__header">
      <div>
        <p class="eyebrow">Layout workbench</p>
        <h3 id="flex-lab-title">Move the items by changing the container.</h3>
      </div>
      <span class="lab-widget__badge">Flexbox</span>
    </div>

    <div class="flex-controls">
      <label>
        <span>Direction</span>
        <select v-model="direction">
          <option value="row">row</option>
          <option value="column">column</option>
        </select>
      </label>
      <label>
        <span>Justify content</span>
        <select v-model="justify">
          <option value="flex-start">flex-start</option>
          <option value="center">center</option>
          <option value="space-between">space-between</option>
          <option value="space-around">space-around</option>
        </select>
      </label>
      <label>
        <span>Align items</span>
        <select v-model="align">
          <option value="stretch">stretch</option>
          <option value="flex-start">flex-start</option>
          <option value="center">center</option>
          <option value="flex-end">flex-end</option>
        </select>
      </label>
      <label>
        <span>Gap <output>{{ gap }}px</output></span>
        <input v-model="gap" type="range" min="0" max="32" step="4">
      </label>
    </div>

    <div class="flex-stage" :style="previewStyle" role="img" aria-labelledby="flex-summary">
      <div>01</div>
      <div>02</div>
      <div>03</div>
    </div>

    <p id="flex-summary" class="lab-widget__summary">{{ summary }}</p>
    <pre class="lab-widget__code"><code>.container {
  display: flex;
  flex-direction: {{ direction }};
  flex-wrap: wrap;
  justify-content: {{ justify }};
  align-items: {{ align }};
  gap: {{ gap }}px;
}</code></pre>
  </section>
</template>
