---
title: 排版、颜色与单位
description: 运用相对单位、行长、可扩展间距、颜色角色、对比度和自定义属性，构建易读的视觉系统。
---

# 将视觉决策组织成系统

<p class="lesson-lead">易读的界面不是一堆好看的数值。它应该由少量角色与约束构成，并能经受缩放、长内容、深色模式和组件复用。</p>

<div class="lesson-meta">
  <span>CSS 核心</span>
  <span>70 分钟</span>
  <span>视觉系统</span>
</div>

## 单位表达关系

| 单位 | 相对于 | 适合首先用于 |
| --- | --- | --- |
| `rem` | 根元素字号 | 字体、间距、控件尺寸 |
| `em` | 当前元素字号 | 相对于组件的细节 |
| `%` | 由属性决定的包含值 | 流动宽度和比例 |
| `ch` | 字符 `0` 的近似宽度 | 文本行长约束 |
| `vw`、`vh` | 视口尺寸 | 有谨慎边界的流动值 |
| `dvh` | 动态视口高度 | 需谨慎使用的移动端全高区域 |
| `px` | CSS 参考像素 | 边框、精细小部件，以及适用时的媒体查询 |

相对单位不会自动让设计具备无障碍性。它们只是把关系表达得更明确。请使用浏览器缩放和增大文字设置测试结果。

## 从阅读条件出发设计排版

```css
body {
  color: #182032;
  background: #fbf8f1;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

.prose {
  max-inline-size: 68ch;
}

h1 {
  font-size: clamp(2.25rem, 7vw, 4.5rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
}
```

正文要易读，需要足够的字号、行高和对比度，并控制行长。展示型标题行数较少，可以采用更紧凑的行高，但仍要承受长单词与翻译后的文本。

系统字体速度快且用户熟悉。自定义字体是一项产品决策，会带来加载、许可、语言覆盖、回退与性能方面的影响。

## 建立间距节奏

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
}
```

尺度系统可以减少随意决策，同时允许例外。当语义很重要时，按角色为令牌命名：

```css
:root {
  --page-gutter: clamp(1rem, 4vw, 3rem);
  --section-gap: clamp(3rem, 8vw, 7rem);
}
```

即使具体数值改变，按角色命名仍能保留设计意图。

## 按用途而不是色相命名颜色

```css
:root {
  --color-canvas: #fbf8f1;
  --color-surface: #fffdf8;
  --color-text: #182032;
  --color-muted: #5c6475;
  --color-border: #d9d2c6;
  --color-accent: #b83d29;
  --color-focus: #177f78;
}
```

`--color-accent` 即使从红色改成蓝色，名称依然准确；`--red` 则无法说明它为何存在。

对比度是前景与背景之间的关系。需要检查普通文本、大号文本、传达含义的图标、表单边框、焦点指示、禁用状态、悬停状态，以及图像上的文字。不要仅依赖颜色传达状态。

## 自定义属性也参与层叠

```css
.card {
  --card-accent: var(--color-accent);
  border-block-start: 0.3rem solid var(--card-accent);
}

.card--student {
  --card-accent: #177f78;
}
```

修饰类只改变一个局部决策。后代会使用更新后的自定义属性，无须复制整条卡片规则。

如果变量可能不存在，请提供回退值：

```css
color: var(--card-text, var(--color-text));
```

## 避免固定高度的文本容器

文字被翻译、缩放或由用户输入时，内容会增长。应优先设置最小尺寸，并让内容自然流动：

```css
.button {
  min-block-size: 2.75rem;
  padding: 0.65rem 1rem;
}
```

固定 `height` 可能裁掉换行后的标签。最小高度既能保障点击目标尺寸，又允许内容继续增长。

<div class="predict-box">
当组件的字号增大时，以 <code>em</code> 编写的内边距会怎样变化？如果改用 <code>rem</code>，结果有何不同？</div>

## 引导练习：建立系统

为画布、表面、文字、弱化文字、边框、强调色和焦点创建令牌，再定义三个间距角色、两个圆角和一个阴影。将它们应用到标题、文章卡片、链接、按钮和表单字段，然后只在一处修改强调色和基础间距。

<div class="ai-brief">
  <h3>AI 任务：审查角色</h3>
  <p>让模型找出重复值并提出角色名称。如果两个无关的值只是在今天碰巧相同，就不要为它们创建共同令牌。</p>
</div>

<div class="verification-card">
  <h3>验证清单</h3>
  <ul class="checklist">
    <li>浏览器缩放到 200% 时，正文仍然易读。</li>
    <li>长标题可以换行且不会被裁切。</li>
    <li>颜色不是唯一的状态提示。</li>
    <li>焦点在每种表面上都清晰可见。</li>
    <li>令牌描述可复用的决策，而不是偶然相同的值。</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>分别说出使用系统字体和自定义字体的一个理由，以及无论选哪种字体都必须进行的一项测试。</p>
</div>
