<script setup lang="ts">
import { useCourseLocale } from '../course-locale'

const { text } = useCourseLocale({
  en: {
    eyebrow: 'The course operating system',
    title: 'PAVE every solution with evidence.',
    intro: 'AI output is a hypothesis. The browser, standards, tests, and your explanation are the evidence.',
    steps: [
      { number: '01', verb: 'Predict', detail: 'Write down what you expect the browser to do before you run the code.' },
      { number: '02', verb: 'Ask', detail: 'Use AI for a focused explanation, critique, or ranked set of hypotheses.' },
      { number: '03', verb: 'Verify', detail: 'Check the DOM, computed styles, keyboard behavior, and acceptance criteria.' },
      { number: '04', verb: 'Explain', detail: 'State why the final result works and what evidence ruled out alternatives.' }
    ]
  },
  zh: {
    eyebrow: '课程运行方法',
    title: '用证据完成每一次 PAVE 循环。',
    intro: 'AI 输出只是待验证的假设；浏览器、标准、测试和你的解释才是证据。',
    steps: [
      { number: '01', verb: '预测', detail: '运行代码之前，先写下你认为浏览器会怎样处理以及原因。' },
      { number: '02', verb: '提问', detail: '让 AI 针对证据提供解释、评审或按可能性排序的假设。' },
      { number: '03', verb: '验证', detail: '检查 DOM、计算样式、键盘操作和验收标准。' },
      { number: '04', verb: '解释', detail: '说明最终结果为何成立，以及哪些证据排除了其他答案。' }
    ]
  }
})
</script>

<template>
  <section class="pave" aria-labelledby="pave-title">
    <div class="pave__intro">
      <p class="eyebrow">{{ text.eyebrow }}</p>
      <h2 id="pave-title">{{ text.title }}</h2>
      <p>{{ text.intro }}</p>
    </div>
    <ol class="pave__steps">
      <li v-for="step in text.steps" :key="step.verb" class="pave__step">
        <span class="pave__number">{{ step.number }}</span>
        <div>
          <strong>{{ step.verb }}</strong>
          <p>{{ step.detail }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
