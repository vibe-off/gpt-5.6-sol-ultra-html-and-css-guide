---
title: 选择器与状态
description: 使用类、属性、组合器、伪类和伪元素匹配元素，同时保持 CSS 稳健。
---

# 选择最小且有意义的作用范围

<p class="lesson-lead">选择器是针对 DOM 的查询。好的选择器表达稳定的样式职责，不会把每一层偶然出现的包装元素都编码进去。</p>

<div class="lesson-meta">
  <span>CSS 核心</span>
  <span>60 分钟</span>
  <span>匹配练习</span>
</div>

## 核心选择器类别

```css
article { }                    /* 类型 */
.event-card { }                /* 类 */
[aria-current="page"] { }     /* 属性 */
.card > h2 { }                 /* 直接子元素 */
.card p { }                    /* 后代 */
.field + .field { }            /* 相邻兄弟 */
a:hover { }                    /* 用户操作状态 */
input:invalid { }              /* 表单状态 */
.card::before { }              /* 生成的伪元素 */
```

选择器可以组合，但复杂度会增加耦合。`.page main .events article.card > div h2 a` 依赖很长的 DOM 路径；`.event-card__title-link` 则为样式职责提供了明确名称。

## 后代与子元素表达不同关系

```html
<article class="card">
  <div class="card__body">
    <h2>工作坊标题</h2>
  </div>
</article>
```

`.card h2` 能匹配，因为标题是任意层级的后代。`.card > h2` 不匹配，因为直接子元素是 `div`。

只有当直接关系确实属于预期结构时，才使用更严格的组合器。

## 设置状态样式时不要牺牲清晰度

```css
.action-link {
  color: #9c321f;
  text-decoration-thickness: 0.12em;
  text-underline-offset: 0.2em;
}

.action-link:hover {
  color: #d94d34;
}

.action-link:focus-visible {
  outline: 3px solid #177f78;
  outline-offset: 4px;
}

.action-link:visited {
  color: #7748a8;
}
```

并非所有输入方式都能触发悬停。请保留清楚的默认状态和明显的键盘焦点状态。除非提供同样醒目的替代指示，否则不要移除轮廓线。

## 属性选择器连接真实状态

```css
[aria-expanded="true"] .disclosure-icon {
  transform: rotate(180deg);
}

[aria-current="page"] {
  font-weight: 750;
  text-decoration: none;
}
```

当属性已经描述了有意义的状态，CSS 可以直接设置该状态的样式，无须重复添加 `is-open` 类。界面逻辑必须始终让属性如实反映状态。

## 结构伪类

```css
.card-list > :first-child { }
.card-list > :last-child { }
.card-list > :nth-child(odd) { }
.field:has(input:required) label::after { }
```

当元素关系本身有意义时，使用结构选择器。`:has()` 很强大；请根据实际项目确认目标浏览器基线，并在需要时提供可接受的回退方案。

## 伪元素是生成的视觉呈现

```css
.external-link::after {
  content: " ↗";
}
```

生成内容最适合装饰或重复提示。不要只在 `content` 中放置关键说明，因为某些用户、复制操作、翻译系统或阅读模式可能无法获取它们。

<div class="predict-box">
对于 <code>&lt;article class="card"&gt;&lt;header&gt;&lt;h2&gt;…</code>，下列哪些选择器会匹配标题：<code>.card h2</code>、<code>.card &gt; h2</code>、<code>.card header &gt; h2</code> 和 <code>article.card h2:first-child</code>？请解释每一种 DOM 关系。
</div>

## 选择器质量检查

对每个选择器提出以下问题：

1. 它现在能匹配预期元素吗？
2. 它是否会意外匹配无关内容？
3. 添加一层无害包装会让它失效吗？
4. 它是否依赖可能变化的内容顺序？
5. 它是否产生了超出组件需要的优先级？
6. 这个状态是否已经由 HTML 表达？

<div class="misconception">
  <h3>简短不等于稳健</h3>
  <p>像 <code>a</code> 这样的全局选择器虽然短，但范围很广。选择器的质量取决于职责和预期作用域，而不是字符数量。</p>
</div>

<div class="build-brief">
  <h3>引导练习</h3>
  <p>为主导航、活动卡片标题链接、必填表单字段、当前页面和可见焦点设置样式。每写一条规则，都说明它表达的确切 DOM 或状态关系。</p>
</div>

<div class="ai-brief">
  <h3>AI 任务：审查选择器风险</h3>
  <p>让模型按耦合程度从低到高排列你的选择器。要求它为每个高风险选择器给出一种会使其失效的具体 DOM 变更，然后编辑一份标记副本验证这些判断。</p>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>为什么一个今天能匹配的选择器仍可能造成维护问题？请分别给出一个与嵌套有关、一个与状态有关的例子。</p>
</div>
