---
title: 现代 CSS 工具箱
description: 使用嵌套、:is()、:where()、:has()、层叠层、容器查询、subgrid、逻辑属性和特性查询扩展核心 CSS。
---

# 现代 CSS 应该简化已知问题

<p class="lesson-lead">当新特性能更直接地表达关系、减少脆弱代码或增强适应能力时，它们才真正有价值。要理解它们的用途与回退方案，而不只是语法。</p>

<div class="lesson-meta">
  <span>扩展内容</span>
  <span>80 分钟</span>
  <span>渐进增强</span>
</div>

## 逻辑属性支持不同书写模式

```css
.notice {
  margin-inline: auto;
  padding-block: 1rem;
  padding-inline: 1.25rem;
  border-inline-start: 0.3rem solid var(--color-accent);
  max-inline-size: 42rem;
}
```

逻辑属性描述行内方向与块方向，而不是假设左/右和上/下。它们让组件更容易适应不同书写模式和文字方向。

不要机械替换所有物理属性。一幅插图可能确实需要固定在视觉左侧。请选择最能表达意图的坐标系统。

## `:is()` 与 `:where()` 为选择器分组

```css
.prose :is(h2, h3, h4) {
  text-wrap: balance;
}

:where(.prose) :where(ul, ol) {
  padding-inline-start: 1.4em;
}
```

`:is()` 采用参数中最高的优先级；`:where()` 的优先级始终为零。后者适合创建容易覆盖的默认样式。

## `:has()` 根据相对匹配设置样式

```css
.field:has(input:invalid:not(:placeholder-shown)) {
  border-color: var(--color-error);
}
```

`:has()` 可以根据后代或其他相对关系，选择类似父元素的目标。应让它响应 DOM 中真实存在的状态。不要只依靠 CSS 状态，让无效控件看起来有效；底层表单语义始终是基础。

## 原生嵌套让相关选择器保持靠近

```css
.event-card {
  padding: 1.25rem;

  & h2 {
    margin-block: 0;
  }

  &:hover {
    border-color: var(--color-accent);
  }
}
```

嵌套可以减少重复，也可能隐藏深层耦合。应保持浅层嵌套并检查最终优先级。与多层 DOM 嵌套相比，扁平的组件类可能依然更清楚。

## 层叠层记录优先关系

```css
@layer reset, base, components, utilities;

@layer base {
  :where(a) { color: var(--color-link); }
}

@layer components {
  .button { color: white; background: var(--color-accent); }
}
```

在选择器开始竞争之前，层就定义了架构顺序。使用它作为“魔法覆盖机制”之前，请复习[层叠与优先级](/zh/css/cascade)。

## 容器查询让组件响应上下文

```css
.profile-shell {
  container: profile / inline-size;
}

@container profile (min-width: 30rem) {
  .profile-card {
    grid-template-columns: 8rem 1fr;
  }
}
```

命名容器明确了依赖关系。组件会适应分配给自己的空间，而不是整个视口。

## Subgrid 可以对齐嵌套内容

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}
```

Subgrid 让嵌套网格使用父网格的轨道尺寸。当多张卡片的标题、正文和操作需要真正横向对齐时，它很有用。如果不需要这种关系，应让每张卡片使用独立的常规流。

## 特性查询保护增强功能

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
}

@supports (grid-template-columns: subgrid) {
  .card-grid {
    display: grid;
  }
}
```

先提供可接受的基线，再逐步增强。回退方案无须外观完全相同，但必须保留内容和功能。

## 支持性决策需要当前证据

浏览器支持会变化。对于每项现代特性：

1. 定义真实受众与浏览器政策；
2. 查阅当前兼容性数据和规范；
3. 明确规则被忽略后会怎样；
4. 构建基线体验；
5. 当特性检测能明确分支时使用 `@supports`；
6. 风险重要时，测试一个有代表性的不支持或回退环境。

<div class="predict-box">
浏览器忽略一条不支持的声明，却能理解下一条声明。源码顺序如何为属性值提供简单回退？请写一个两行示例。</div>

```css
width: 90%;
width: min(90%, 60rem);
```

拒绝 `min()` 的旧浏览器可能保留前面的有效宽度；现代浏览器则使用后面的值。

<div class="ai-brief">
  <h3>AI 任务：为兼容性主张标注日期</h3>
  <p>先让模型指出可能的支持问题，再用当前一手资料或持续维护的兼容性来源逐项验证。记录日期和项目浏览器政策，不要复制一个冻结的全球百分比。</p>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>选择一项现代特性，说明它解决的核心问题、可接受的回退方案，以及发布前所需证据。</p>
</div>
