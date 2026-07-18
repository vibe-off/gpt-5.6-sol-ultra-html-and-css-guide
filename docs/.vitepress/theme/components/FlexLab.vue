<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCourseLocale } from '../course-locale'

const { isZh, text } = useCourseLocale({
  en: {
    eyebrow: 'Layout workbench', title: 'Move the items by changing the container.', badge: 'Flexbox',
    direction: 'Direction', justify: 'Justify content', align: 'Align items', gap: 'Gap'
  },
  zh: {
    eyebrow: '布局工作台', title: '通过修改容器来移动项目。', badge: 'Flexbox',
    direction: '方向', justify: '主轴分布', align: '交叉轴对齐', gap: '间距'
  }
})

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

const summary = computed(() => isZh.value
  ? `三个项目使用 ${direction.value} 方向、${justify.value} 主轴分布、${align.value} 交叉轴对齐、自动换行和 ${gap.value} 像素间距。`
  : `Three items use ${direction.value} direction, ${justify.value} main-axis distribution, ` +
    `${align.value} cross-axis alignment, wrapping, and a ${gap.value} pixel gap.`)
</script>

<template>
  <section class="lab-widget" aria-labelledby="flex-lab-title">
    <div class="lab-widget__header">
      <div>
        <p class="eyebrow">{{ text.eyebrow }}</p>
        <h3 id="flex-lab-title">{{ text.title }}</h3>
      </div>
      <span class="lab-widget__badge">{{ text.badge }}</span>
    </div>

    <div class="flex-controls">
      <label>
        <span>{{ text.direction }}</span>
        <select v-model="direction">
          <option value="row">row</option>
          <option value="column">column</option>
        </select>
      </label>
      <label>
        <span>{{ text.justify }}</span>
        <select v-model="justify">
          <option value="flex-start">flex-start</option>
          <option value="center">center</option>
          <option value="space-between">space-between</option>
          <option value="space-around">space-around</option>
        </select>
      </label>
      <label>
        <span>{{ text.align }}</span>
        <select v-model="align">
          <option value="stretch">stretch</option>
          <option value="flex-start">flex-start</option>
          <option value="center">center</option>
          <option value="flex-end">flex-end</option>
        </select>
      </label>
      <label>
        <span>{{ text.gap }} <output>{{ gap }}px</output></span>
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
