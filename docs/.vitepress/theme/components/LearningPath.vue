<script setup lang="ts">
import { withBase } from 'vitepress'
import { useCourseLocale } from '../course-locale'

const { localizePath, text } = useCourseLocale({
  en: {
    eyebrow: 'Eight-week route', title: 'From source code to sound judgment.',
    intro: 'Each stage adds a new layer without hiding the layer below it.', action: 'Open this stage',
    stages: [
      { week: 'Weeks 1–2', title: 'Structure with intent', copy: 'Document anatomy, semantics, links, media, tables, and forms.', link: '/html/' },
      { week: 'Weeks 3–4', title: 'Reason about rules', copy: 'Selectors, cascade, specificity, inheritance, and the box model.', link: '/css/' },
      { week: 'Weeks 5–6', title: 'Build resilient layouts', copy: 'Normal flow, Flexbox, Grid, responsive design, states, and motion.', link: '/css/layout' },
      { week: 'Weeks 7–8', title: 'Verify and own the work', copy: 'Accessibility, debugging, maintainability, performance, and capstone.', link: '/quality/' }
    ]
  },
  zh: {
    eyebrow: '八周学习路线', title: '从源代码走向可靠判断。',
    intro: '每个阶段都会增加一层能力，但不会隐藏下面的基础。', action: '进入本阶段',
    stages: [
      { week: '第 1–2 周', title: '用意图组织结构', copy: '文档结构、语义、链接、媒体、表格与表单。', link: '/html/' },
      { week: '第 3–4 周', title: '理解规则如何竞争', copy: '选择器、层叠、优先级、继承与盒模型。', link: '/css/' },
      { week: '第 5–6 周', title: '构建稳健布局', copy: '常规流、Flexbox、Grid、响应式设计、状态与动效。', link: '/css/layout' },
      { week: '第 7–8 周', title: '验证并掌握作品', copy: '无障碍、调试、可维护性、性能与综合项目。', link: '/quality/' }
    ]
  }
})
</script>

<template>
  <section class="learning-path" aria-labelledby="path-title">
    <div class="learning-path__heading">
      <p class="eyebrow">{{ text.eyebrow }}</p>
      <h2 id="path-title">{{ text.title }}</h2>
      <p>{{ text.intro }}</p>
    </div>
    <ol class="learning-path__list">
      <li v-for="(stage, index) in text.stages" :key="stage.title">
        <a :href="withBase(localizePath(stage.link))" class="learning-path__card">
          <span class="learning-path__index">0{{ index + 1 }}</span>
          <span class="learning-path__week">{{ stage.week }}</span>
          <strong>{{ stage.title }}</strong>
          <span>{{ stage.copy }}</span>
          <span class="learning-path__action">{{ text.action }} <span aria-hidden="true">→</span></span>
        </a>
      </li>
    </ol>
  </section>
</template>
