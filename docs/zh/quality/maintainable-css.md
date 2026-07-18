---
title: 可维护的 CSS
description: 使用组件边界、低优先级、自定义属性、命名策略、层叠层和解释原因的注释来组织样式。
---

# 让改动保持局部且可预测

<p class="lesson-lead">可维护的 CSS 并不等于某一种命名约定。它是一组边界与优先规则，让开发者能够预测改动应该放在哪里，以及还会影响哪些地方。</p>

<div class="lesson-meta">
  <span>工程实践</span>
  <span>75 分钟</span>
  <span>重构练习</span>
</div>

## 定义组件的作用范围

```html
<article class="event-card event-card--featured">
  <p class="event-card__date">…</p>
  <h2 class="event-card__title">…</h2>
  <p class="event-card__summary">…</p>
</article>
```

```css
.event-card { … }
.event-card__date { … }
.event-card__title { … }
.event-card__summary { … }
.event-card--featured { … }
```

这种类似 BEM 的模式明确了组件归属。它只是一种选择，并非定律。小型网站可以使用更简单的类名，工具类系统可以表达可复用的单一职责，框架也可以按组件限定样式作用域。请选择符合项目且保持一致的模型。

## 保持选择器浅而优先级低

脆弱的写法：

```css
.events-page main section article > div h2 a { … }
```

更局部的写法：

```css
.event-card__title-link { … }
```

第一条把页面位置和包装结构编码进选择器；第二条则直接命名真正的样式职责。较低的优先级能让合理的状态和上下文调整更容易。

避免主要依靠 ID 设置样式。如果内容顺序可能变化，也不要使用依赖精确子元素索引的选择器。

## 将决策与实现机制分开

```css
:root {
  --color-text: #182032;
  --color-surface: #fffdf8;
  --color-accent: #b83d29;
  --space-card: 1.25rem;
  --radius-card: 1rem;
}

.event-card {
  padding: var(--space-card);
  border-radius: var(--radius-card);
  color: var(--color-text);
  background: var(--color-surface);
}
```

令牌集中管理真正共享的决策。不要把每个只用一次的值都变成全局变量。令牌应代表系统选择或组件输入。

## 组织层叠

```css
@layer reset, base, objects, components, utilities;
```

一种可用约定：

- `reset`：统一不一致的默认值；
- `base`：定义文档排版和原生元素；
- `objects`：不带视觉身份的布局模式；
- `components`：产品特有界面；
- `utilities`：范围狭窄、意图明确的覆盖。

层不能替代好的选择器，只是让宽泛的优先关系更直观。还应记录未分层的第三方 CSS 如何与层堆栈交互。

## 了解取舍，再选择策略

| 策略 | 优势 | 风险 |
| --- | --- | --- |
| 语义化组件类 | 归属清楚，标记易读 | 需要命名纪律 |
| 类 BEM 命名 | 块/元素/修饰关系明确 | 可能冗长或过于字面化 |
| 工具类 | 声明小而可复用，优先级可预测 | 标记的视觉密度可能很高 |
| 组件作用域 CSS | 靠近实现，局部性强 | 共享令牌和全局状态仍需要架构 |
| CSS-in-JS 或生成样式 | 动态集成与工具支持 | 运行时/构建成本和可移植性各异 |

学生应学会评估策略，而不是宣布某一种方案普遍优于其他方案。

## 注释解释原因与风险

有用：

```css
/* 允许过长的课程标题在工具栏内收缩，避免迫使页面溢出。 */
.toolbar__title {
  min-inline-size: 0;
}
```

无用：

```css
/* 将最小宽度设为零。 */
.toolbar__title { min-inline-size: 0; }
```

应删除废弃代码，而不是将它注释掉；版本控制会保留历史记录。

## 安全重构

1. 记录验收标准；必要时保存当前截图或计算值。
2. 找出重复项和高优先级热点。
3. 一次只选择一个边界或令牌改动。
4. 在不改变行为的前提下重构。
5. 测试共享状态和视口条件。
6. 只有证明旧规则不再使用后，才将其删除。

<div class="predict-box">
两个无关组件目前都使用 <code>12px</code> 间距。它们应该共享一个全局令牌吗？哪些证据能表明这个值代表同一项设计决策，而不是巧合？</div>

## 代码审查问题

- 哪个组件拥有这条规则？
- 哪项 DOM 改动会使选择器失效？
- 为什么这条声明需要这样的优先级？
- 这个值是可复用决策，还是局部细节？
- 能否用已有语义属性表达状态？
- 哪项验收测试能够保护这次重构？

<div class="ai-brief">
  <h3>AI 任务：先建议，再约束</h3>
  <p>先让模型生成重复项与优先级报告，不修改代码。选择一个已验证的热点，再请求保持组件外部选择器不变的最小重构。比较重构前后的计算样式。</p>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>CSS 改动保持“局部”意味着什么？请分别给出一个选择器示例和一个令牌示例。</p>
</div>
