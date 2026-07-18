---
title: 用 HTML 表达含义
description: 把 HTML 学成描述结构、关系和浏览器内置行为的语言，而不是一组控制外观的标签。
---

# HTML 是一门表达含义的语言

<p class="lesson-lead">HTML 告诉浏览器内容是什么、各部分如何关联。这些含义支撑着导航、表单、搜索、阅读模式、自动化和辅助技术。</p>

<div class="lesson-meta">
  <span>HTML 核心</span>
  <span>40 分钟</span>
  <span>含义先于外观</span>
</div>

## 结构也是一种接口

比较下面两段代码：

```html
<div class="big-text">报名将于星期五截止</div>
<div class="blue-text" onclick="register()">报名</div>
```

```html
<h2>报名将于星期五截止</h2>
<button type="button">报名</button>
```

CSS 可以让两组代码看起来相似，但第二组还能表达标题与交互控件。浏览器已经知道按钮如何获得焦点，以及如何通过键盘激活。含义会在编写自定义样式之前带来实用行为。

## 元素、属性与内容

```html
<a href="schedule.html" class="primary-link">查看日程</a>
```

- `<a>` 和 `</a>` 是开始标签与结束标签。
- 完整结构称为一个**元素**。
- `href` 和 `class` 是**属性**。
- `查看日程` 是文本内容，也会成为链接的无障碍名称。

有些元素不会包裹内容，例如 `<img>`：

```html
<img src="images/studio.jpg" alt="学生们正在工作室墙上布置版画作品">
```

`alt` 的值不是装饰性元数据。当像素无法显示或对用户无关时，它负责传达图片的用途。

## 嵌套建立关系

```html
<article>
  <header>
    <h2>设计周</h2>
    <p>为期五天的讲座与工作坊。</p>
  </header>
  <a href="design-week.html">查看活动安排</a>
</article>
```

由于 `header` 嵌套在 `article` 内，它属于这篇文章。标题说明文章的主题；链接因为 `href` 指向另一项资源而能够跳转。

无效或草率的嵌套可能导致 DOM 与源代码不同。浏览器看似“移动”了某个元素时，务必检查解析后的 DOM。

## 通过提问选择元素

按以下顺序提问：

1. 这是什么内容或操作？
2. HTML 是否已有具备这种含义和行为的元素？
3. 文档应该表达哪些关系？
4. 最后才问：它应该是什么样子？

<div class="concept-grid">
  <div class="concept-card">
    <h3>导航还是一组链接？</h3>
    <p>将 <code>nav</code> 用于主要导航区域，而不是每一小组链接。</p>
  </div>
  <div class="concept-card">
    <h3>按钮还是链接？</h3>
    <p>链接前往某项资源或位置；按钮在当前界面中执行一项操作。</p>
  </div>
  <div class="concept-card">
    <h3>section 还是 div？</h3>
    <p><code>section</code> 是通常带有标题的主题区域；没有合适的语义元素时，用 <code>div</code> 组合内容。</p>
  </div>
  <div class="concept-card">
    <h3>strong 还是加粗？</h3>
    <p><code>strong</code> 表示重要性；单纯的视觉粗细应该交给 CSS。</p>
  </div>
</div>

<div class="predict-box">
如果学生把 <code>span</code> 设置得与 <code>h2</code> 外观完全一样，哪些用户或系统仍会感受到区别？至少列出三类。
</div>

可能的答案包括：按标题导航的键盘或屏幕阅读器用户、搜索与内容提取工具、阅读模式、阅读源代码的维护者，以及专门选中真实标题元素的 CSS。

## 原生 HTML 是第一种无障碍工具

语义化 HTML 并不能保证无障碍，但能提供坚实的基础。带标签的表单控件、真实的标题层级、有意义的链接文本和真正的按钮，通常比自定义替代方案所需代码更少、出错方式也更少。

::: tip ARIA 第一原则
原生 HTML 元素已经提供所需语义与行为时，优先使用它。ARIA 可以描述组件，但不会自动实现其键盘行为。
:::

<div class="ai-brief">
  <h3>AI 任务：修复“div 汤”</h3>
  <p>向模型提供一个完全由 <code>div</code> 元素构成的小页面。要求它先标注各区域的含义，再提出替换标签。依据真实内容与交互验证每项选择。</p>
</div>

<div class="verification-card">
  <h3>验证清单</h3>
  <ul class="checklist">
    <li>页面有一个清晰的最高级标题。</li>
    <li>标题级别表达内容层级，而不是字体大小。</li>
    <li>链接负责导航，按钮负责执行操作。</li>
    <li>地标元素反映真实的页面区域。</li>
    <li>只有没有合适语义元素时才使用通用容器。</li>
  </ul>
</div>

## 继续学习

接下来学习[文档结构](/zh/html/document-anatomy)，了解每份 HTML 页面都需要的语言、标题、元数据与正文。
