<script setup lang="ts">
import { withBase } from 'vitepress'

const stages = [
  {
    week: 'Weeks 1–2',
    title: 'Structure with intent',
    copy: 'Document anatomy, semantics, links, media, tables, and forms.',
    link: '/html/'
  },
  {
    week: 'Weeks 3–4',
    title: 'Reason about rules',
    copy: 'Selectors, cascade, specificity, inheritance, and the box model.',
    link: '/css/'
  },
  {
    week: 'Weeks 5–6',
    title: 'Build resilient layouts',
    copy: 'Normal flow, Flexbox, Grid, responsive design, states, and motion.',
    link: '/css/layout'
  },
  {
    week: 'Weeks 7–8',
    title: 'Verify and own the work',
    copy: 'Accessibility, debugging, maintainability, performance, and capstone.',
    link: '/quality/'
  }
]
</script>

<template>
  <section class="learning-path" aria-labelledby="path-title">
    <div class="learning-path__heading">
      <p class="eyebrow">Eight-week route</p>
      <h2 id="path-title">From source code to sound judgment.</h2>
      <p>Each stage adds a new layer without hiding the layer below it.</p>
    </div>
    <ol class="learning-path__list">
      <li v-for="(stage, index) in stages" :key="stage.title">
        <a :href="withBase(stage.link)" class="learning-path__card">
          <span class="learning-path__index">0{{ index + 1 }}</span>
          <span class="learning-path__week">{{ stage.week }}</span>
          <strong>{{ stage.title }}</strong>
          <span>{{ stage.copy }}</span>
          <span class="learning-path__action">Open this stage <span aria-hidden="true">→</span></span>
        </a>
      </li>
    </ol>
  </section>
</template>

