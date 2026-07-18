---
title: Flexbox 与 Grid
description: 根据布局关系选择一维 Flexbox 或二维 Grid，并调试尺寸、换行、对齐和溢出。
---

# 根据关系选择布局方式

<p class="lesson-lead">Flexbox 沿一个主轴分配项目；Grid 跨行列协调轨道。只有当你能清楚说明容器负责哪些关系时，它们才能发挥最大作用。</p>

<div class="lesson-meta">
  <span>CSS 核心</span>
  <span>100 分钟</span>
  <span>交互实验</span>
</div>

## Flexbox：一维分配

```css
.site-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
}
```

容器会建立主轴与交叉轴。对于横向排列，主轴默认沿行内方向。`justify-content` 在主轴上分配空余空间，`align-items` 在交叉轴上对齐项目。

`gap` 表达项目之间的间距，不会给容器外缘增加外边距。

<FlexLab />

### 理解弹性尺寸

```css
.card {
  flex: 1 1 16rem;
}
```

这是增长、收缩和基准值的简写。每张卡片从 `16rem` 基准开始，可以增长以分享空余空间，也可以在需要时收缩。

Flex 项目会根据内容应用自动最小尺寸。如果文字拒绝收缩并发生溢出，请检查固有内容，再尝试有明确意图的约束：

```css
.card__body {
  min-inline-size: 0;
}
```

不要在所有地方都添加它。只有允许 Flex 子元素窄于默认内容最小值时才应使用。

### 自动外边距吸收空余空间

```css
.site-nav__account {
  margin-inline-start: auto;
}
```

在横向排列中，行内起始方向的自动外边距会占据可用空间，将这个项目推到另一端。如果只有一个项目需要成为分隔点，这可能比分配模式更清楚。

## Grid：二维轨道

```css
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.25rem;
}
```

Grid 会在空间允许时重复创建列。每条轨道的最小值是 `100%` 与 `16rem` 中较小者，之后最多增长到 `1fr`，共同分享剩余空间。无需媒体查询，这个模式也能收缩为单列。

### 页面区域网格

```css
.course-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 20rem);
  grid-template-areas: "main aside";
  gap: clamp(1.5rem, 4vw, 4rem);
}

.course-page__main { grid-area: main; }
.course-page__aside { grid-area: aside; }
```

命名区域可以让页面关系一目了然。对于小型组件，直接指定网格线可能更简单。

### `fr` 分配剩余空间

`1fr` 表示在考虑非弹性尺寸和间距后，对可用空间的一份占比。受到固有约束时，它并不保证始终占容器的固定比例。如果允许轨道缩小到低于基于内容的最小值，请使用 `minmax(0, 1fr)`。

## 选择 Flex 还是 Grid？

| 关系 | 首选方案 |
| --- | --- |
| 单行导航项目，必要时可换行 | Flexbox |
| 按钮图标与标签 | Flexbox 或行内流 |
| 需要列对齐的卡片集合 | Grid |
| 带命名页面区域的仪表盘 | Grid |
| 将一个项目推到最远端 | Flexbox + 自动外边距 |
| 内容只需依次堆叠 | 常规流 |

嵌套布局系统很正常。Grid 卡片集合内部的卡片标题可以使用 Flexbox。请在每个组件边界独立选择。

## 对齐术语

- `justify-*` 通常沿行内轴或主轴生效，具体取决于布局方式。
- `align-*` 通常沿块轴或交叉轴生效。
- `place-*` 在 Grid 等上下文中组合 align 与 justify 变体。
- `*-content` 在容器有额外空间时分配轨道或项目组。
- `*-items` 设置所有项目的默认对齐。
- `*-self` 调整单个项目。

改变对齐方式之前，务必先确认容器、轴线和可用空余空间。

<div class="predict-box">
三个 Flex 项目设置了 <code>justify-content: space-between</code>，却没有出现间隔。DevTools 显示这些项目已经占满主轴宽度。属性坏了吗？请解释空余空间所起的作用。
</div>

## 布局调试步骤

1. 确认真正想要的元素是 Flex 或 Grid 容器。
2. 检查直接子元素；更深层的后代不是该容器的布局项目。
3. 确认主轴/交叉轴或网格轨道。
4. 检查容器尺寸和可用空余空间。
5. 检查项目最小尺寸和固有内容。
6. 开关浏览器的 Flexbox 或 Grid 覆盖层。
7. 将问题缩减到一个项目和一个约束。

<div class="build-brief">
  <h3>引导构建：课程仪表盘</h3>
  <p>主页面区域和课程卡片集合使用 Grid；页头、筛选行和卡片元数据内部使用 Flexbox。为每个容器写一句话，说明它负责的关系。</p>
</div>

<div class="ai-brief">
  <h3>AI 任务：论证布局选择</h3>
  <p>向模型提供想要的关系，而不只是一张截图。让它给出 Flexbox 与 Grid 两种方案及其权衡。实现其中较小的方案，再验证溢出、换行和内容顺序。</p>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>举一个例子，说明外层用 Grid、内层用 Flexbox 为何比所有地方都用同一种系统更清楚。</p>
</div>
