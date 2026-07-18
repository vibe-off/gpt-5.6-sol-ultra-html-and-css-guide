<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCourseLocale } from '../course-locale'

const { isZh, text } = useCourseLocale({
  en: {
    eyebrow: 'Interactive model', title: 'See every layer of the box.', badge: 'Live CSS',
    margin: 'Margin', border: 'Border', padding: 'Padding', content: 'content'
  },
  zh: {
    eyebrow: '交互模型', title: '看清盒模型的每一层。', badge: '实时 CSS',
    margin: '外边距', border: '边框', padding: '内边距', content: '内容'
  }
})

const margin = ref(18)
const border = ref(4)
const padding = ref(24)

const boxStyle = computed(() => ({
  boxSizing: 'border-box' as const,
  inlineSize: '180px',
  margin: `${margin.value}px`,
  borderWidth: `${border.value}px`,
  padding: `${padding.value}px`
}))

const css = computed(() => `.card {
  box-sizing: border-box;
  width: 180px;
  margin: ${margin.value}px;
  border: ${border.value}px solid #a93622;
  padding: ${padding.value}px;
}`)

const summary = computed(() => isZh.value
  ? `预览使用 ${margin.value} 像素外边距、${border.value} 像素边框、${padding.value} 像素内边距，以及 180 像素的 border-box 宽度。`
  : `The preview uses ${margin.value} pixels of margin, a ${border.value} pixel border, ` +
    `${padding.value} pixels of padding, and a 180 pixel border-box width.`)
</script>

<template>
  <section class="lab-widget" aria-labelledby="box-lab-title">
    <div class="lab-widget__header">
      <div>
        <p class="eyebrow">{{ text.eyebrow }}</p>
        <h3 id="box-lab-title">{{ text.title }}</h3>
      </div>
      <span class="lab-widget__badge">{{ text.badge }}</span>
    </div>

    <div class="lab-widget__grid">
      <div class="control-stack">
        <label>
          <span>{{ text.margin }} <output>{{ margin }}px</output></span>
          <input v-model="margin" type="range" min="0" max="40" step="2">
        </label>
        <label>
          <span>{{ text.border }} <output>{{ border }}px</output></span>
          <input v-model="border" type="range" min="0" max="12">
        </label>
        <label>
          <span>{{ text.padding }} <output>{{ padding }}px</output></span>
          <input v-model="padding" type="range" min="0" max="48" step="2">
        </label>
      </div>

      <div class="box-stage" role="img" aria-labelledby="box-summary">
        <div class="box-stage__margin">
          <div class="box-stage__box" :style="boxStyle">
            <span>{{ text.content }}</span>
          </div>
        </div>
      </div>
    </div>

    <p id="box-summary" class="lab-widget__summary">{{ summary }}</p>
    <pre class="lab-widget__code"><code>{{ css }}</code></pre>
  </section>
</template>
