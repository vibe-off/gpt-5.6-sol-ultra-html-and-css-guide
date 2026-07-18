---
title: 语义化页面结构
description: 根据内容含义选择地标与分节元素，并区分链接、按钮、章节、文章与通用容器。
---

# 让每个区域都有存在的理由

<p class="lesson-lead">语义化结构并不意味着替换每一个 div，而是用最准确的原生元素表达页面中的重要区域、章节与交互。</p>

<div class="lesson-meta">
  <span>HTML 核心</span>
  <span>60 分钟</span>
  <span>决策练习</span>
</div>

## 从地标开始

地标能帮助用户和工具在页面中移动。

```html
<body>
  <header class="site-header">
    <a href="/">北校区艺术中心</a>
    <nav aria-label="主导航">…</nav>
  </header>

  <main>
    <h1>即将举办的展览</h1>
    …
  </main>

  <footer>
    <p>北校区艺术中心，C 栋</p>
  </footer>
</body>
```

`header` 和 `footer` 取决于上下文：它们可以属于整个页面，也可以属于一篇文章或一个章节。`main` 表示页面唯一的主要内容。`nav` 用于主要导航区块；如果存在多个导航区域，最好为每个导航添加名称。

## section、article、aside 还是 div？

| 问题 | 可能的元素 |
| --- | --- |
| 这是一个需要标题的主题区域吗？ | `section` |
| 这个项目能否独立存在或单独复用？ | `article` |
| 这是偏离主线的辅助内容吗？ | `aside` |
| 这只是用于样式或脚本的分组吗？ | `div` |

这些答案需要判断，不能自动转换。包住两个控件的容器可能只是一个 `div`；新闻卡片列表可以是 `ul`，每个列表项中再包含 `article`。请选择最能清楚表达关系的内容模型。

## 链接还是按钮，取决于行为

当结果是导航到另一项资源或位置时，使用链接：

```html
<a href="event-details.html">查看活动详情</a>
```

当结果是在当前界面执行操作时，使用按钮：

```html
<button type="button" aria-expanded="false" aria-controls="filters">
  显示筛选项
</button>
```

CSS 可以让它们拥有一致的视觉风格，但不要为了获取默认外观而交换两者的语义。

## 无障碍名称必须经得住布局变化

```html
<button type="button">
  <span aria-hidden="true">×</span>
  <span class="visually-hidden">关闭课程详情</span>
</button>
```

只有图标的控件需要有意义的无障碍名称。可见文本通常是最可靠的选择。如果在视觉上隐藏文本，CSS 必须让辅助技术仍能读取它，不能使用 `display: none`。

## 语义化卡片模式

```html
<article class="event-card">
  <p class="event-card__date">
    <time datetime="2026-09-18">9 月 18 日</time>
  </p>
  <h2>
    <a href="events/type-and-place.html">字体与场所</a>
  </h2>
  <p>一场关于标识、地图与公共记忆的工作室对谈。</p>
  <p>设计工作室 · 18:30</p>
</article>
```

标题链接为卡片命名，并提供一个主要目标。当复杂卡片还包含其他交互控件时，不要用一个链接包住卡片的所有部分。

<div class="predict-box">
页面中有一句视觉上很大的文字，用来介绍一组卡片，但它并不为某个章节命名，也不应该出现在标题导航中。它应该是 <code>h2</code> 吗？请从用途而不是外观出发解释。
</div>

## ARIA 填补空白，但不会重塑 HTML

原生 HTML 无法满足需求时，ARIA 可以传达名称、角色、状态与关系。它不会添加键盘行为、焦点管理、表单提交或样式。

添加角色前，请问：

1. 是否有原生元素已经具备这种角色和行为？
2. 该元素是否已经具有正确的名称？
3. `aria-expanded` 等状态能否与实际 UI 保持同步？
4. 是否已经用键盘与无障碍检查工具测试结果？

<div class="misconception">
  <h3>语义并非越多越好</h3>
  <p>不必要的地标、重复标签，以及与原生行为冲突的角色都会制造噪声。目标是结构准确，而不是语义标签数量最多。</p>
</div>

## 引导式修复

选取一个包含以下内容的页面：

- 一个标志和主要链接；
- 一个页面标题；
- 一个筛选面板；
- 六张活动卡片；
- 一份简报订阅表单；以及
- 联系信息。

编辑前先画出区域树，再根据用途分配元素。为每个 `section` 写出它的标题，为每个 `nav` 写出它的名称，并描述每个按钮与链接会产生什么结果。

<div class="ai-brief">
  <h3>AI 任务：先提供语义清单</h3>
  <p>要求模型生成包含“内容用途”“推荐元素”和“理由”的表格。在清单与页面的真实行为一致之前，不要接受替换后的标记代码。</p>
</div>

<div class="exit-ticket">
  <h3>复述检验</h3>
  <p>举出一个使用 <code>div</code> 才是正确选择的场景，以及一个用可点击 <code>div</code> 替代原生按钮会增加额外工作的场景。</p>
</div>
