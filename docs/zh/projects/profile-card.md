---
title: 实验 1 — 个人资料卡
description: 使用语义化 HTML、响应式媒体、盒模型约束、排版、焦点状态和内在尺寸，构建一个稳健的学生个人资料卡。
---

# 实验 1：个人资料卡

<p class="lesson-lead">一个小组件可以揭示许多重要概念：图片的内在尺寸、文本换行、盒尺寸、交互状态，以及视觉分组与语义结构之间的区别。</p>

<div class="lesson-meta">
  <span>引导式实验</span>
  <span>90 分钟</span>
  <span>HTML + CSS</span>
</div>

## 任务说明

为学生展览的一位参展者制作一张卡片，其中包含：

- 肖像或项目图片；
- 姓名和专业；
- 简短个人介绍；
- 两个主题标签；
- 指向学生项目的链接；以及
- 可选的“学生之选”状态。

请使用你有权使用的肖像或项目图片，把它放在自己项目中对应的路径下，并更新文件名和替代文本。下方示例路径刻意使用了占位内容，应由学生替换为自己选择的课堂素材。

卡片必须能在 280 像素到 720 像素宽的容器中正常工作，且不能依赖页面级媒体查询。

## 起始 HTML

```html
<article class="profile-card">
  <img
    class="profile-card__image"
    src="images/lin-portrait.webp"
    alt="陈琳站在一件模块化纸艺雕塑旁"
    width="800"
    height="800"
  >

  <div class="profile-card__body">
    <p class="profile-card__status">学生之选</p>
    <h2 class="profile-card__name">陈琳</h2>
    <p class="profile-card__program">视觉传达 · 二年级</p>
    <p class="profile-card__bio">
      陈琳探索折纸如何让公共信息更容易被注意和记住。
    </p>
    <ul class="profile-card__tags" aria-label="项目主题">
      <li>信息设计</li>
      <li>纸艺系统</li>
    </ul>
    <a class="profile-card__link" href="projects/lin-chen.html">查看陈琳的项目</a>
  </div>
</article>
```

## 起始 CSS

```css
* { box-sizing: border-box; }

:root {
  --card-accent: #b83d29;
  --card-surface: #fffdf8;
  --card-text: #182032;
  --card-muted: #5c6475;
}

body {
  margin: 0;
  color: var(--card-text);
  background: #f3eee4;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

.profile-card {
  /* 在这里构建稳健的组件。 */
}
```

## 要求

### 结构

- 图片具有符合用途的替代文本和内在尺寸。
- 姓名使用与页面上下文层级相符的标题元素。
- 主题使用真正的列表。
- 主要操作使用描述清晰的链接。

### 布局

- 窄容器：图片位于文本上方。
- 当卡片自身的容器有足够空间时：图片和文本可以并排。
- 长姓名和长个人介绍能够换行而不被裁剪。
- 图片保持正方形，并可通过 `object-fit: cover` 裁剪。
- 不出现横向溢出。

### 交互

- 链接的默认、悬停、已访问和焦点可见状态都清晰可见。
- 焦点轮廓不会被卡片裁剪。
- 可选状态在没有颜色时仍能被理解。

## 建议的容器查询

```css
.profile-card-shell {
  container-type: inline-size;
}

@container (min-width: 34rem) {
  .profile-card {
    display: grid;
    grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1.2fr);
  }
}
```

请用 `.profile-card-shell` 包裹卡片。这个建议只提供一种起始关系，并不是完整方案。你还需要判断：在忽略这一增强功能的浏览器中，卡片的基础表现是否仍可接受。

<div class="predict-box">
如果个人介绍中包含一个由 70 个字符组成且无法断行的项目代码，哪个盒子最可能迫使布局溢出？在隐藏溢出之前，你会先检查哪个属性？</div>

## 刻意设置的缺陷

第一个版本正常工作后，加入以下规则：

```css
.profile-card__body {
  min-width: max-content;
}
```

重现窄容器中的溢出。记录计算尺寸，并解释为什么 Grid 或 Flex 容器不能直接把内容区域缩小。删除这项约束，或用一项有明确意图的约束替换它。

## 与 AI 协作

请 AI 只评审内在尺寸和焦点可见性，并提供真实的计算宽度。记录一条建议、你采用的证据和最终决策。

## 现场变更

专业信息改为：

> 跨学科视觉传达与社区信息系统 · 二年级

你不能仅仅为了让它放得下就减小字号。请调整间距或布局，同时保留易读的换行。

<ul class="acceptance-list">
  <li>组件在 280px 到 720px 的容器中都能工作，不依赖页面级假设。</li>
  <li>媒体、文本和焦点都保留在组件内，不被裁剪。</li>
  <li>没有 CSS 时，结构仍然具有明确意义。</li>
  <li>应用容器查询增强前，卡片已有可接受的基础表现。</li>
  <li>证据记录解释了一项内在尺寸决策。</li>
</ul>
