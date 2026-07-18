---
title: 表格与表单
description: 使用标题、表头、标签、名称、原生输入类型、分组、帮助文本与验证，标记数据表格和易用表单。
---

# 组织数据并收集输入

<p class="lesson-lead">表格表达数据中的关系，表单建立与用户的对话。只要让视觉布局取代结构，两者都会变得脆弱。</p>

<div class="lesson-meta">
  <span>HTML 核心</span>
  <span>75 分钟</span>
  <span>构建 + 键盘测试</span>
</div>

## 表格用于表达表格数据关系

当数值需要借助所在行与列的表头获得含义时，使用表格。

```html
<table>
  <caption>秋季学期开放工作室场次</caption>
  <thead>
    <tr>
      <th scope="col">工作室</th>
      <th scope="col">日期</th>
      <th scope="col">名额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">版画</th>
      <td>星期二</td>
      <td>12</td>
    </tr>
    <tr>
      <th scope="row">摄影</th>
      <td>星期四</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
```

标题说明这组数据是什么，`scope` 明确简单的表头关系。不要用表格进行页面布局。

在窄屏上，应保留表格关系，并在需要时允许外层区域滚动。不要把单元格变成没有标签的内容块。

## 每个表单控件都需要三套系统中的名称

实用的控件通常需要：

1. 给人看的**可见标签**；
2. 暴露给辅助技术的**无障碍名称**；以及
3. 提交表单数据时使用的 `name` 属性。

```html
<form action="/registrations" method="post">
  <div class="field">
    <label for="student-email">学校邮箱</label>
    <p id="email-help">请使用以 @college.example 结尾的邮箱地址。</p>
    <input
      id="student-email"
      name="email"
      type="email"
      autocomplete="email"
      aria-describedby="email-help"
      required
    >
  </div>

  <button type="submit">报名工作坊</button>
</form>
```

显式标签通过 `for` 和 `id` 建立关联。帮助文本是补充说明，不能替代标签。按钮明确说明提交会执行什么操作。

## 根据行为选择输入类型

合适的输入类型能提供更好的键盘、内置验证和符合含义的控件：

- `email` 用于电子邮箱地址；
- `tel` 用于电话号码，但不要强加一种通用格式；
- `url` 用于 URL；
- `date` 用于适合日期控件，且已经充分测试本地化的任务；
- `number` 用于用户确实会增减或计算的数量，而不是 ID 或邮政编码；
- `search` 用于搜索框。

原生验证只是基线，并不等于完整的错误体验。由于客户端输入不可信，服务端验证仍然不可缺少。

## 将相关选项分组

```html
<fieldset>
  <legend>首选场次</legend>

  <label>
    <input type="radio" name="session" value="morning" required>
    上午，09:00–11:00
  </label>

  <label>
    <input type="radio" name="session" value="afternoon">
    下午，14:00–16:00
  </label>
</fieldset>
```

`legend` 为分组命名，各个 `label` 为选项命名。相同的 `name` 值会让这些单选按钮形成一个互斥组。

## placeholder 不是标签

占位文字会在输入后消失，而且往往对比度不足。只有在已经提供可见标签和说明时，才把它用于简短示例。

```html
<label for="portfolio-url">作品集 URL</label>
<input id="portfolio-url" name="portfolio" type="url" placeholder="https://example.com">
```

## 错误信息需要提供恢复路径

实用的错误提示应该：

- 指明对应控件；
- 用清楚的语言解释问题；
- 说明如何修复；
- 让辅助技术可以持续访问；以及
- 不仅依赖颜色传达信息。

焦点行为取决于表单。如果一次提交失败产生多项错误，应提供一份错误摘要，链接到每个无效字段；只有确实有助于定位时，才谨慎移动焦点。

<div class="predict-box">
如果 input 有 <code>id</code> 但没有 <code>name</code>，会提交什么数据？如果 label 的 <code>for</code> 值与 input 的 <code>id</code> 不匹配，又会破坏什么关系？
</div>

没有名称的 input 不会作为表单数据键提交。标签不匹配时，也无法通过显式关联为该控件命名或聚焦它。

## 按钮需要明确的 type

在 HTML 中，表单内的按钮默认执行提交。请明确写出意图：

```html
<button type="button">再添加一位参与者</button>
<button type="submit">提交报名</button>
```

这样可以避免以后新增界面操作时意外提交表单。

## 引导式构建：活动报名

内容包括：

- 姓名和学校邮箱；
- 一个必选场次；
- 可选的无障碍或饮食需求说明；
- 确有必要时，对清楚且具体条款的同意选项；
- 一个标签明确的提交按钮；以及
- 项目需求中描述的确认状态。

全程只用键盘测试。激活每个标签，分别提交空白、格式错误和有效状态，缩放文字，并检查名称与描述。

<div class="ai-brief">
  <h3>AI 任务：只审查，不重新设计</h3>
  <p>要求 AI 生成一个表格，列出每个控件的可见标签、无障碍名称、提交名称、预期类型与验证规则。要求模型标记不确定之处，而不是虚构产品需求。</p>
</div>

<div class="verification-card">
  <h3>验证清单</h3>
  <ul class="checklist">
    <li>每个控件都有持续可见的标签。</li>
    <li>标签能够聚焦或激活对应控件。</li>
    <li>相关选项使用 fieldset 和 legend 分组。</li>
    <li>键盘顺序与视觉顺序一致。</li>
    <li>错误信息同时说明问题和恢复操作。</li>
    <li>提交的名称和值符合需求。</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>复述检验</h3>
  <p>说明表单中 <code>label</code>、<code>id</code> 与 <code>name</code> 分别承担什么职责。</p>
</div>
