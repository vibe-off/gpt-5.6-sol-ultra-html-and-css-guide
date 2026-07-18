---
title: HTML 与 CSS 速查表
description: 一份以决策为导向的简明参考，涵盖文档结构、语义元素、表单、选择器、层叠、盒模型、布局、响应式设计和无障碍。
---

# HTML 与 CSS 速查表

<p class="lesson-lead">需要回忆某项决策时使用本页；需要完整心智模型时，再返回对应课程。速查表是地图，不是实际地形。</p>

## HTML 文档外壳

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>明确的页面标题</title>
    <meta name="description" content="简明的页面摘要。">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>…</header>
    <main id="main-content">…</main>
    <footer>…</footer>
  </body>
</html>
```

## 元素选择指南

| 需求 | 优先选择 |
| --- | --- |
| 页面或章节标题 | 按层级使用 `h1`–`h6` |
| 段落 | `p` |
| 无序 / 有序集合 | `ul` / `ol` |
| 主要导航 | `nav`，需要时提供有意义的标签 |
| 页面唯一的主要内容 | `main` |
| 带标题的主题区域 | `section` |
| 独立或可复用的条目 | `article` |
| 与主体间接相关的辅助内容 | `aside` |
| 导航到另一个目标 | `a href="…"` |
| 在当前界面执行操作 | `button type="button"` |
| 具有行列关系的数据 | 带标题和表头的 `table` |
| 一组表单选项 | `fieldset` + `legend` |
| 仅用于样式的分组 | `div` 或 `span` |

## 图片基线

```html
<img
  src="images/example.webp"
  alt="符合当前上下文用途的替代文本"
  width="1200"
  height="800"
>
```

```css
img {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
}
```

- 信息型图片：描述图片在当前内容中的作用。
- 功能型图片：描述目标或操作。
- 装饰型图片：使用 `alt=""`。
- 不要重复附近图注已经表达的内容。

## 表单基线

```html
<label for="email">学校邮箱</label>
<p id="email-help">请使用你的学校邮箱地址。</p>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  aria-describedby="email-help"
  required
>
<button type="submit">提交报名</button>
```

- `label` 为用户和无障碍 API 提供控件名称。
- `id` 连接标签、帮助文本和片段引用。
- `name` 标识提交的表单数据。
- 占位文本不能替代标签。
- 客户端验证不能替代服务器验证。

## 选择器速查

```css
article { }                 /* 类型 */
.card { }                   /* 类 */
[aria-current="page"] { }  /* 属性 */
.card > h2 { }              /* 直接子元素 */
.card h2 { }                /* 后代元素 */
.field + .field { }         /* 下一个兄弟元素 */
a:hover { }                 /* 伪类 */
.card::before { }           /* 伪元素 */
```

选择器应尽量描述稳定的组件职责。增加一个无害的包裹元素，不应破坏无关样式。

## 层叠决策顺序

1. 选择器和条件是否相关
2. 来源与重要性
3. 层叠层
4. 特异性
5. 适用时的作用域接近度
6. 源码顺序

只有当元素本身没有胜出的声明时，继承才会为某些属性提供值。

## 盒模型

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

从内到外：**内容 → 内边距 → 边框 → 外边距**。

发生溢出时，在裁剪之前先检查父元素尺寸、子元素尺寸、内在最小值、固定值、图片、无法断行的字符串和 `box-sizing`。

## 流式包裹容器

```css
.wrapper {
  inline-size: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
```

## Flexbox

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
}

.toolbar__last {
  margin-inline-start: auto;
}
```

当一个主轴主导元素关系时使用 Flexbox。

## Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.25rem;
}
```

当行列或页面区域需要协调轨道时使用 Grid。

## 响应式基线

```css
.layout {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .layout {
    grid-template-columns: minmax(0, 1fr) 18rem;
  }
}
```

- 从流式窄屏布局开始。
- 在内容需要建立新关系的位置添加查询。
- 测试预设宽度之间的情况、200% 缩放、长内容和键盘焦点。
- 当布局依赖组件自身空间时，使用容器查询。

## 焦点与减少动态效果

```css
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
```

## 调试时先问的问题

1. 资源加载了吗？
2. 选择器匹配了吗？
3. 声明解析成功并在层叠中胜出了吗？
4. 布局能满足这个值吗？
5. 哪个最小实验可以区分最可能的原因？

答案不明显时，请打开完整的[调试决策树](/zh/reference/debugging-tree)。
