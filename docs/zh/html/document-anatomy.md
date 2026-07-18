---
title: 文档结构
description: 构建一份完整的 HTML 文档，理解 doctype、语言、head 元数据、viewport、title 与 body 结构。
---

# 构建完整文档

<p class="lesson-lead">可靠的页面从第一个可见标题之前就开始了。文档外壳会告诉浏览器应该使用哪种解析模式、语言、字符编码、标题和视口设定。</p>

<div class="lesson-meta">
  <span>HTML 核心</span>
  <span>45 分钟</span>
  <span>构建 + 检查</span>
</div>

## 最小且实用的外壳

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>学生设计展</title>
    <meta
      name="description"
      content="学生设计展的日期、地点与参观信息。"
    >
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>…</header>
    <main>…</main>
    <footer>…</footer>
  </body>
</html>
```

## 按职责理解文档外壳

### `<!doctype html>`

doctype 要求现代浏览器使用标准模式。它是一项声明，不是 HTML 元素。

### `<html lang="zh-CN">`

根元素包含整份文档。它的 `lang` 值有助于发音、翻译、拼写检查和其他对语言敏感的处理。请使用页面实际采用的语言，并标记切换语言的段落：

```html
<p>设计原则“留白”可以译为 <span lang="en">white space</span>。</p>
```

### `<meta charset="utf-8">`

UTF-8 支持大多数书面语言所需的字符。请把这项声明放在 `head` 开头附近。

### 视口元数据

视口声明告诉移动浏览器使用设备宽度，而不是呈现一个缩小的桌面尺寸画布。这样，响应式 CSS 才能作用于预期的视口。

### `<title>` 与描述

标题用于在浏览器标签页、历史记录、书签，以及很多搜索结果中标识页面。它应该明确对应当前页面。描述可能用于搜索或分享界面，应该概括页面，而不是重复标题。

### 样式表链接

`href="styles.css"` 是一个相对于 HTML 文件的路径。如果路径错误，网络面板会显示失败请求，文件中的规则也不会匹配任何元素。

## body 需要一个主内容区域

使用 `main` 包含页面的主要内容。页面通常应该只有一个可见的 `main`。重复出现的网站导航和页脚内容放在它之外。

```html
<body>
  <a class="skip-link" href="#main-content">跳到主要内容</a>

  <header class="site-header">…</header>

  <main id="main-content">
    <h1>学生设计展</h1>
    …
  </main>

  <footer class="site-footer">…</footer>
</body>
```

跳过链接让键盘用户能够直接越过重复导航。它需要一个真实的目标 ID 和可见的焦点样式。

<div class="predict-box">
移除 viewport 元素会发生什么？先预测它对窄屏手机的影响，再使用设备模拟进行比较。两次测试之间不要修改任何 CSS。
</div>

## 避免 DOM 混乱的语法习惯

- 为需要闭合标签的元素正确闭合。
- 将子元素完整嵌套在父元素内。
- 始终用引号包住属性值。
- 使用唯一的 `id` 值。
- 必要时转义文本中的特殊字符：`&lt;`、`&gt;` 和 `&amp;`。
- 用缩进显示层级；缩进本身不会建立层级。
- 完成结构调整后进行验证。

<div class="misconception">
  <h3>浏览器能够恢复，不代表代码正确</h3>
  <p>浏览器会有意从错误的 HTML 中恢复。如果恢复结果与你的意图不同，DOM、样式、表单行为或无障碍树都可能受到影响。</p>
</div>

## 引导式构建

为一项校园活动创建页面，内容包括：

1. 完整的文档外壳；
2. 当前页面专用的标题与描述；
3. 带简短导航的网站页眉；
4. 一个 `main` 区域和一个 `h1`；
5. 一篇包含标题、时间、地点和摘要的活动文章；以及
6. 带联系信息的页脚。

检查 DOM 与文档标题。把视口缩窄，确认样式表请求成功。

<div class="ai-brief">
  <h3>AI 任务：只审查文档外壳</h3>
  <p>要求 AI 只审查文档元数据、语言、地标结构与文件路径，并分别列出错误与可选改进。请在源代码或浏览器中验证每项所谓的错误。</p>
</div>

<div class="exit-ticket">
  <h3>复述检验</h3>
  <p>为什么页面在笔记本电脑上看似正常，却仍可能有损坏的文档外壳？请说出截图无法揭示的两项后果。</p>
</div>
