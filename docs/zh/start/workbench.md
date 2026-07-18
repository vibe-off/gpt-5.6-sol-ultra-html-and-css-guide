---
title: 搭建学习工作台
description: 使用浏览器开发者工具、验证器与可复用文件结构，搭建一个最简本地 HTML 和 CSS 工作区。
---

# 搭建学习工作台

<p class="lesson-lead">最初的环境越朴素越好：一个文件夹、一份 HTML、一份 CSS、一个编辑器和一个现代浏览器。环节越少，证据越容易读懂。</p>

<div class="lesson-meta">
  <span>环境准备</span>
  <span>30 分钟</span>
  <span>本地文件</span>
</div>

## 创建最小且实用的项目

```text
campus-page/
├─ index.html
├─ styles.css
└─ images/
```

名称使用小写字母，以连字符代替空格，并让路径能够描述资源。创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>校园页面</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main>
      <h1>校园页面</h1>
      <p>你的浏览器正在读取一份本地 HTML 文档。</p>
    </main>
  </body>
</html>
```

创建 `styles.css`：

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

main {
  width: min(100% - 2rem, 42rem);
  margin-inline: auto;
  padding-block: 4rem;
}
```

在浏览器中打开 `index.html`。对最初的这些练习来说，本地文件已经足够。之后的练习如果使用模块、请求或类似路由的路径，再启用一个小型本地开发服务器。

## 让 DevTools 成为工作台的一部分

先熟悉以下五个面板：

- **元素（Elements）：**DOM、匹配规则、计算样式和盒模型。
- **控制台（Console）：**解析错误、资源加载失败和脚本消息。
- **网络（Network）：**文件是否成功加载，以及返回了什么状态。
- **无障碍（Accessibility）：**向辅助技术暴露的角色、名称与状态。
- **设备模拟（Device emulation）：**快速检查尺寸，但不能替代真实的键盘与缩放测试。

::: warning 不要靠“更用力地刷新”来修复问题
如果样式没有出现，请先检查 `styles.css` 是否加载、选择器是否匹配，以及是否有另一条声明胜出。反复刷新不会增加任何证据。
:::

## 把验证器当作聚焦的信号

[Nu HTML Checker](https://validator.w3.org/nu/) 可以发现无效嵌套、缺少必需属性等结构问题。[W3C CSS Validator](https://jigsaw.w3.org/css-validator/) 可以发现许多语法错误，但现代 CSS 变化很快；应把验证器输出视为需要调查的证据，而不是判定正确性的唯一标准。

如果课程政策或隐私要求只能在本地操作，请向教师索取离线验证器，或使用编辑器诊断，不要上传私密内容。

## 建立“保存—检查”循环

每次小幅修改后：

1. 保存文件；
2. 重新加载页面，或让开发服务器自动更新；
3. 复现目标行为；
4. 检查一项证据；然后
5. 记录下一个假设。

这比一次做五项猜测式改动，再努力回想是哪一项产生了影响更快。

<div class="build-brief">
  <h3>工作台检查</h3>
  <p>修改标题颜色、增大主内容的最大宽度，并故意拼错一个属性。用 DevTools 找到被忽略的声明，然后将其还原。</p>
</div>

<div class="verification-card">
  <h3>学习准备清单</h3>
  <ul class="checklist">
    <li>HTML 文件能够打开，样式表也成功加载。</li>
    <li>我能在元素面板中检查标题。</li>
    <li>我能找到计算后的字号与盒子尺寸。</li>
    <li>我知道在哪里查看失败的文件请求。</li>
    <li>我能让项目恢复到有效且正常工作的状态。</li>
  </ul>
</div>

## 可选：尽早使用版本控制

能够熟练编辑本地文件后，就可以初始化 Git 仓库。每达到一个可用里程碑，就创建一次提交。版本控制能让你比较、解释和恢复决策，并不只是发布工具。

<div class="exit-ticket">
  <h3>复述检验</h3>
  <p>如果图片没有显示，哪些证据能够区分“路径错误”和“CSS 规则隐藏了图片”这两种情况？</p>
</div>
