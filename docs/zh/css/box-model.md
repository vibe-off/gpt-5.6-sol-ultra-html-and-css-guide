---
title: 盒模型与尺寸
description: 理解内容、内边距、边框、外边距、box-sizing、固有尺寸、约束和溢出。
---

# 每个元素都以盒子的形式参与布局

<p class="lesson-lead">许多“神秘”的布局错误，其实只是算术与约束的组合。你需要知道哪些层会贡献尺寸、哪个维度取决于内容，以及哪个祖先元素限制了结果。</p>

<div class="lesson-meta">
  <span>CSS 核心</span>
  <span>75 分钟</span>
  <span>交互模型</span>
</div>

## 四个层次

从内到外依次是：

1. **内容盒：**文本、媒体或子元素布局。
2. **内边距：**边框以内的空白。
3. **边框：**包围内边距的可见边缘。
4. **外边距：**边框以外的间隔。

使用默认的 `content-box` 时，声明的宽度只应用于内容。内边距和边框会继续增加最终渲染的外部尺寸。

```css
.card {
  width: 300px;
  padding: 24px;
  border: 4px solid;
}
```

在不计外边距的情况下，边框盒宽度为 `300 + 48 + 8 = 356px`。

## 让声明尺寸更容易推理

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

使用 `border-box` 后，声明的宽度和高度包含内容、内边距与边框。这通常更符合组件想要表达的尺寸约束。

<BoxModelLab />

## 优先使用约束，而非固定尺寸

```css
.article {
  inline-size: min(100% - 2rem, 68ch);
  margin-inline: auto;
}
```

这表示：在扣除窄屏边距后的可用宽度与适合阅读的最大行长之间，选较小者。这样无需凭空设置断点也能自适应。

常用尺寸工具：

- `min-inline-size` 和 `max-inline-size` 设置上下界；
- `min()` 选择最小候选值；
- `max()` 选择最大候选值；
- `clamp(min, preferred, max)` 创建带上下限的流动值；
- `min-content`、`max-content` 和 `fit-content()` 暴露固有尺寸行为。

`inline-size`、`margin-inline`、`padding-block` 等逻辑属性会根据书写模式映射，而不是假定所有文本都是横排英文。

## 行内盒与块级盒有所不同

块级盒通常占满可用行内空间，并按常规流依次堆叠。行内盒则随文字排列在行中。普通行内盒不会像块级盒或行内块盒一样响应宽高设置。

```css
.tag {
  display: inline-block;
  padding: 0.25rem 0.65rem;
}
```

`inline-block` 让标签继续留在文本行内，同时可以接受盒子式尺寸和内边距。

## 溢出是证据，不是杂物

内容放不下时，应先查明原因，再决定是否隐藏。

常见原因包括：

- 子元素固定宽度大于容器；
- 无法断行的 URL 或长字符串；
- Flex 或 Grid 项目的默认最小尺寸；
- 图片等替换元素缺少流动尺寸约束；
- `100vw` 把滚动条空间也计算在内；
- 绝对定位让元素脱离常规流尺寸计算；
- 父元素的计算宽度比预期更窄。

有针对性的修复包括：

```css
img {
  max-inline-size: 100%;
  block-size: auto;
}

.flex-child {
  min-inline-size: 0;
}

.long-token {
  overflow-wrap: anywhere;
}
```

不要仅为消除水平滚动条，就给页面设置 `overflow: hidden`。这可能裁掉焦点指示、菜单、阴影或真实内容，却保留根本缺陷。

## 外边距折叠取决于上下文

在特定情况下，常规流中块级盒的垂直外边距会折叠。如果子元素的上外边距看起来跑到了父元素之外，请检查盒模型和格式化上下文。随意添加内边距可能改变症状，却无法解释关系。

Flex 和 Grid 容器不会以同样方式折叠子元素外边距。确有需要时，`display: flow-root` 可以创建新的块格式化上下文。

<div class="predict-box">
一张卡片设置了 <code>width: 100%</code>、<code>padding: 2rem</code>，并使用默认盒模型。它的父元素恰好宽 320px。请预测应用 <code>box-sizing: border-box</code> 前后，卡片的边框盒宽度。
</div>

## 盒模型调试步骤

1. 选中溢出的元素及其父元素。
2. 记录计算后的内容尺寸、内边距、边框和外边距。
3. 检查 `box-sizing`、最小尺寸和固有内容。
4. 每次只禁用一个固定尺寸。
5. 使用长文本和窄容器测试。
6. 修复被破坏的约束，而不是裁掉结果。

<div class="ai-brief">
  <h3>AI 任务：要求给出算式</h3>
  <p>提供父元素的计算宽度，以及子元素的内容、内边距、边框、外边距和盒模型。要求模型先计算预期的边框盒尺寸，再建议任何属性。</p>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>为什么 <code>width: 100%</code> 仍可能溢出？请分别给出一个盒模型原因和一个固有内容原因。</p>
</div>
