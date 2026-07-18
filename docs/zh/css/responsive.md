---
title: 响应式设计
description: 使用固有尺寸、媒体查询、容器查询、响应式媒体和用户偏好查询，构建流动且以内容为中心的布局。
---

# 响应可用空间与用户需求

<p class="lesson-lead">响应式设计不是把桌面页面硬塞进手机断点。先从灵活内容开始，添加约束，只有当布局确实需要新规则时才引入查询。</p>

<div class="lesson-meta">
  <span>CSS 核心</span>
  <span>90 分钟</span>
  <span>多宽度测试</span>
</div>

## 从流动基础开始

HTML 文本本来就会自然重排。请保留这个优势：

```css
.page-shell {
  inline-size: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

img,
video {
  max-inline-size: 100%;
  block-size: auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
}
```

在使用任何媒体查询前，这个布局已经具有边距、最大宽度、流动媒体和固有卡片列。

## 断点属于内容

从窄屏开始，在内容能够受益时添加规则：

```css
.course-layout {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .course-layout {
    grid-template-columns: minmax(0, 1fr) 18rem;
    align-items: start;
  }
}
```

`48rem` 并不普遍等同于“平板”。它只是这份内容有足够空间排成两个实用列的临界点。缓慢调整窗口，在布局失效点附近选择断点，并测试相邻宽度。

如果整页共享断点，请使用一致的单位和少量断点。不要用当前设备名称为断点命名。

## 容器查询响应组件空间

```css
.event-card-wrapper {
  container-type: inline-size;
}

@container (min-width: 32rem) {
  .event-card {
    display: grid;
    grid-template-columns: 10rem 1fr;
  }
}
```

无论卡片放在侧边栏还是全宽区域，它都根据自己的容器调整。容器查询很适合可复用组件。请确认项目的浏览器基线，并保留易读的单列默认布局。

## 使用带边界的流动值

```css
h1 {
  font-size: clamp(2.25rem, 1.2rem + 4vw, 4.75rem);
}

.section {
  padding-block: clamp(3rem, 8vw, 7rem);
}
```

`clamp()` 可以防止值变得过大或过小。也要测试中间宽度，因为数学上连续变化的值仍可能产生尴尬换行。

## 响应式媒体同时需要 HTML 和 CSS

CSS 控制渲染尺寸；HTML 的 `srcset` 和 `sizes` 帮助浏览器选择合适文件。只有画面构图确实需要不同裁切时，才使用艺术指导。

不要仅因为 CSS 缩小了巨大源文件，就把它称作“响应式”。请先复习[图像与媒体](/zh/html/media)。

## 响应用户偏好

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-canvas: #111723;
    --color-text: #f8f1e7;
  }
}
```

偏好查询只是输入，并不能证明最终主题易读。请在每种模式下测试对比度、焦点、媒体和组件状态。

## 测试矩阵，而不是两张截图

至少测试：

- 约 320 CSS 像素的窄视口；
- 常见中等宽度；
- 宽视口；
- 浏览器缩放 200%；
- 长标题和不可断行字符串；
- 导航打开与关闭时的键盘焦点；
- 减少动态效果偏好；
- 适用时的横屏和竖屏；
- 真实内容，而不是只有简短占位文本。

<div class="predict-box">
一个三列网格在 740px 时失效。断点应该命名为“平板”吗？哪些证据能帮助你在两列、固有换行或水平滚动之间做选择？</div>

决定因素应是内容、交互、卡片最小可用宽度和阅读顺序，而不是设备标签。

## 常见失效模式

- 固定宽度超过容器；
- 用全局 `overflow-x: hidden` 隐藏症状；
- 导航只能通过悬停操作；
- 断点规则相互撤销；
- 视口高度区域的内容被移动浏览器界面遮住；
- 窄屏上的触摸目标太小；
- 视觉重排与 DOM 及焦点顺序冲突；
- 只测试预设设备模拟器。

<div class="build-brief">
  <h3>引导构建：响应式落地页</h3>
  <p>构建首屏、卡片集合、行动号召和页脚。在出现真实内容问题前不要使用查询。记录问题、选用的断点或固有布局修复，以及修改后的证据。</p>
</div>

<div class="ai-brief">
  <h3>AI 任务：索取边界用例</h3>
  <p>提供布局约束，让模型给出五个对抗性内容用例，而不是重写方案。测试这些用例，保留真正暴露弱点的部分，并记录修复方法。</p>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>视口媒体查询与容器查询有何区别？在什么情况下，它们各自能表达更准确的依赖关系？</p>
</div>
