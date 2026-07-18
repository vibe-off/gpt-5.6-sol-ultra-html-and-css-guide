---
title: 常规流与定位
description: 优先使用常规流，理解显示模式与格式化上下文，再有意图地使用相对、绝对、粘性或固定定位。
---

# 先让文档自然流动，再考虑强制定位

<p class="lesson-lead">常规流为内容提供顺序和尺寸贡献，并能稳健响应变化。定位适合表达真正的覆盖或附着关系，而不应代替布局。</p>

<div class="lesson-meta">
  <span>CSS 核心</span>
  <span>70 分钟</span>
  <span>布局推理</span>
</div>

## 常规流是布局基线

块级盒沿块方向堆叠，行内内容流入行盒。每个盒子通常都会影响后续内容的尺寸和位置。

```html
<article>
  <h2>开放工作室</h2>
  <p>认识学生，并查看正在进行的作品。</p>
  <a href="details.html">查看详情</a>
</article>
```

没有自定义布局时，标题和段落依次堆叠，链接参与行内流。页面虽然朴素，却易读且能自然适应宽度。

## `display` 改变格式化上下文

```css
.tag { display: inline-block; }
.navigation { display: flex; }
.dashboard { display: grid; }
.isolated-section { display: flow-root; }
```

- `block` 和 `inline` 影响元素在内外部的参与方式。
- `inline-block` 外部保持行内排列，内部形成盒子。
- `flex` 为直接子元素创建 Flex 格式化上下文。
- `grid` 为直接子元素创建 Grid 格式化上下文。
- `flow-root` 创建新的块格式化上下文，但不会凭空添加布局轴。

请根据子元素之间的关系选择显示模式。

## 相对定位保留原有空间

```css
.badge {
  position: relative;
  inset-block-start: -0.15rem;
}
```

元素先保留在常规流中，再发生视觉偏移，原来的空间不会消失。相对定位还会为许多绝对定位的后代建立包含块。

## 绝对定位让盒子脱离常规流

```css
.card {
  position: relative;
}

.card__status {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
}
```

状态标签相对于包含块定位，不再为卡片的常规流尺寸作贡献。如果卡片预留了足够空间，这适合小型覆盖元素；用在卡片主体内容上则很脆弱。

绝对定位元素出现在错误位置时，应先找出它的包含块，再修改偏移值。

## 粘性与固定定位受环境约束

```css
.section-nav {
  position: sticky;
  inset-block-start: 1rem;
}
```

粘性定位先在常规流中表现，达到滚动阈值后则停留在滚动容器内。祖先元素的 overflow 和可用滚动范围可能让预期效果无法出现。

固定定位附着于类似视口的包含块，并让元素脱离常规流。要预留空间、避免遮挡内容，并测试缩放、虚拟键盘和小屏幕。

## 层叠上下文解释许多 z-index 问题

`z-index` 比较的是同一层叠上下文中的盒子，而不是全局所有元素。带 `z-index` 的定位元素、变换、小于 `1` 的透明度、隔离等属性都可能创建新的层叠上下文。

即使子元素设置 `z-index: 9999`，也无法逃出父元素较低的层叠上下文，从而压过兄弟上下文。不要不断增加数字，应检查祖先链和层叠上下文。

```css
.site-header {
  position: sticky;
  z-index: 10;
  isolation: isolate;
}
```

为真实界面层使用小而有文档说明的层级尺度，例如：基础、抬升内容、导航、覆盖层、模态框。数字本身不如关系重要。

<div class="predict-box">
当卡片标题换成三行时，绝对定位的徽章覆盖了标题。为什么卡片没有增长来为徽章预留空间？请说出两种不依赖增大固定高度的稳健修复方法。
</div>

可行方法包括：在徽章所在位置预留逻辑内边距；或者让徽章留在常规流中，再用 Grid/Flexbox 对齐。

## 定位决策指南

| 需求 | 优先选择 |
| --- | --- |
| 内容应推动后续内容 | 常规流 |
| 项目沿一个轴对齐 | Flexbox |
| 项目跨行列对齐 | Grid |
| 锚定到组件的小型覆盖元素 | 定位容器内的绝对定位 |
| 元素随页面移动，达到滚动阈值后停留 | 粘性定位 |
| 界面附着到视口 | 固定定位，并测试遮挡与移动端 |

<div class="ai-brief">
  <h3>AI 任务：先询问包含块</h3>
  <p>调试偏移问题时，提供祖先样式，并要求模型先识别包含块和层叠上下文，再提出新的 inset 或 z-index 值。</p>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>为什么绝对定位不适合作为包含可变文本的页面布局默认方案？</p>
</div>
