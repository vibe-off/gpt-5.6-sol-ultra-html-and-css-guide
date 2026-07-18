---
title: 文本、列表与链接
description: 用标题、段落、列表、强调、有用的链接文本和可靠的文件路径表达内容层级。
---

# 先让内容可导航，再为它添加样式

<p class="lesson-lead">良好的文本结构能让读者快速浏览、辅助技术用户有效导航，也让维护者无需反推字号就能理解页面。</p>

<div class="lesson-meta">
  <span>HTML 核心</span>
  <span>55 分钟</span>
  <span>内容层级</span>
</div>

## 标题描述层级

使用标题为章节命名，而不是为了获得某种视觉尺寸。

```html
<main>
  <h1>校园可持续发展报告</h1>

  <section>
    <h2>能源使用</h2>
    <h3>教学楼</h3>
    <h3>学生宿舍</h3>
  </section>

  <section>
    <h2>减少废弃物</h2>
  </section>
</main>
```

新的标题级别会创建上一级内容的子章节。不要因为 `h4` 的默认字号恰好合适就选择它；外观应由 CSS 控制。

## 按用途选择文本元素

| 内容 | 元素 | 说明 |
| --- | --- | --- |
| 段落 | `p` | 一段连贯的正文 |
| 无序集合 | `ul` | 顺序不改变含义 |
| 步骤或排名 | `ol` | 顺序很重要 |
| 术语与描述 | `dl`、`dt`、`dd` | 适合元数据与词汇表 |
| 语气强调 | `em` | 改变一句话的含义或重音 |
| 重要性强调 | `strong` | 标记重要内容 |
| 短代码 | `code` | 机器可读或需要原样理解的代码文本 |
| 时间或日期 | `time` | 可包含机器可读的 `datetime` |
| 引文 | `blockquote` 或 `q` | 根据块级或行内语境选择 |

不要用 `br` 在段落间制造垂直间距。请用 `p` 分隔段落，再用 CSS 控制间距。

## 链接需要目标和有用的名称

```html
<a href="workshops.html">浏览所有工作坊</a>
```

目标来自 `href`。链接文本即使脱离上下文也应该容易理解。“浏览所有工作坊”比“点击这里”更有用。

使用片段链接到页面内部：

```html
<a href="#fees">跳到费用说明</a>

<section id="fees">
  <h2>费用说明</h2>
</section>
```

ID 必须唯一，也要足够稳定，才能作为链接目标。

## 建立路径模型

假设有以下结构：

```text
site/
├─ index.html
├─ events/
│  └─ exhibition.html
└─ images/
   └─ poster.webp
```

从 `index.html` 前往活动页面的路径是 `events/exhibition.html`。从 `events/exhibition.html` 前往图片的路径是 `../images/poster.webp`：`..` 先向上移动一个文件夹，再进入 `images`。

| 路径类型 | 示例 | 含义 |
| --- | --- | --- |
| 同一文件夹 | `about.html` | 从当前文件所在位置开始 |
| 子文件夹 | `events/talk.html` | 向下进入 `events` |
| 父文件夹 | `../index.html` | 向上移动一个文件夹 |
| 根相对路径 | `/images/logo.png` | 从网站 URL 根目录开始 |
| 绝对 URL | `https://example.edu/map` | 完整的外部位置 |

根相对路径在 Web 服务器上可用，但直接打开本地文件时未必可用。你需要了解自己正在测试的环境。

<div class="predict-box">
从 <code>events/exhibition.html</code> 链回 <code>index.html</code> 应使用什么路径？链接到 <code>images/poster.webp</code> 又应该使用什么路径？先画出文件夹移动过程再回答。
</div>

## 外部链接与新标签页

在没有提示的情况下打开新标签页可能让用户迷失方向。最安全的默认方式是正常导航。如果真实工作流确实需要 `target="_blank"`，请在链接文本或邻近上下文中明确说明该行为。现代浏览器可以防范许多 opener 风险，但显式添加 `rel="noopener"` 依然是一项易于理解的防御性措施。

## 构建稳健的导航列表

```html
<nav aria-label="主导航">
  <ul>
    <li><a href="index.html" aria-current="page">首页</a></li>
    <li><a href="events.html">活动</a></li>
    <li><a href="contact.html">联系</a></li>
  </ul>
</nav>
```

列表表达一组项目；导航地标拥有名称；`aria-current="page"` 在不禁用链接的前提下传达当前所在页面。

<div class="ai-brief">
  <h3>AI 任务：测试链接质量</h3>
  <p>只把页面中的链接文本提供给模型，询问每个链接脱离周围句子后是否仍然容易理解。拒绝那些虚构目标或改变内容含义的建议。</p>
</div>

<div class="verification-card">
  <h3>验证清单</h3>
  <ul class="checklist">
    <li>标题大纲与内容层级一致。</li>
    <li>列表只用于真正的集合或序列。</li>
    <li>每个链接都能到达预期目标。</li>
    <li>链接文本描述目标或用途。</li>
    <li>焦点顺序符合视觉阅读顺序。</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>复述检验</h3>
  <p>为什么仅仅因为 <code>h4</code> 的默认样式较小，就把 <code>h2</code> 改为 <code>h4</code>，属于内容错误，即使页面看起来仍然整齐？</p>
</div>
