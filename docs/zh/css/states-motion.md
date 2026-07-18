---
title: 状态与动态效果
description: 设计完整的交互状态，并使用过渡、变换、动画和减少动态效果偏好，同时不隐藏含义。
---

# 设计每一种状态，而不只是静止截图

<p class="lesson-lead">交互式 CSS 必须说明什么可以操作、焦点在哪里、发生了什么变化，以及哪里失败了。动态效果应该帮助解释这些变化，但不能成为理解界面的必要条件。</p>

<div class="lesson-meta">
  <span>CSS 扩展</span>
  <span>65 分钟</span>
  <span>交互质量</span>
</div>

## 建立状态清单

对于交互组件，应考虑：

- 默认状态；
- 指针设备支持时的悬停状态；
- 键盘焦点与 `:focus-visible`；
- 激活或按下状态；
- 当前或选中状态；
- 操作确实无法执行时的禁用状态；
- 加载状态；
- 成功状态；
- 警告或错误状态；
- 减少动态效果时的行为。

不是每个组件都需要所有状态，但每个真实状态都不能只靠颜色表达。

## 保持焦点清晰可见

```css
.button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
```

轮廓线不占布局空间，也能适应多种组件形状。如果组件会出现在不同背景上，请使用双色焦点环，或确保它与每个表面都有足够对比度。

避免全局设置 `outline: none`。`:focus-visible` 可以让浏览器为键盘式焦点显示增强指示，而不必在每次指针点击后都呈现同样外观。

## 只过渡端点清晰的属性

```css
.card {
  border-color: transparent;
  transform: translateY(0);
  transition:
    transform 180ms ease,
    border-color 180ms ease;
}

.card:hover {
  border-color: var(--color-accent);
  transform: translateY(-0.2rem);
}
```

应逐项列出属性，而不是使用 `transition: all`。否则意料之外的属性也可能发生动画，而影响布局的属性变化还可能显得迟缓。

变换和透明度通常动画效率较高，因为它们可以避免完整布局计算。但性能只是标准之一；易读性、动态效果敏感性和交互反馈同样重要。

## 关键帧用于多阶段动态效果

```css
@keyframes status-pulse {
  0%, 100% { opacity: 0.65; }
  50% { opacity: 1; }
}

.status[aria-busy="true"] {
  animation: status-pulse 1.2s ease-in-out infinite;
}
```

不要把动画作为内容忙碌的唯一信号。语义状态、可见文本和实时播报都必须保持准确。

## 尊重减少动态效果偏好

```css
@media (prefers-reduced-motion: reduce) {
  .card,
  .status[aria-busy="true"] {
    transition: none;
    animation: none;
  }
}
```

减少动态效果并不总是意味着“移除所有视觉变化”。可将大幅移动和重复动画替换为即时状态变化，或不依赖运动的细微提示。

## 禁用并不是通用的隐藏状态

禁用的控件可能难以发现或理解。在可能的情况下，应保留操作并解释缺少哪些输入。确实需要禁用时，对支持的表单控件使用原生 `disabled` 属性，并确保视觉状态仍然易读。

`aria-disabled="true"` 只传达状态，不会阻止激活，也不会将项目移出焦点顺序；应用行为必须负责执行限制。

<div class="predict-box">
一张卡片在 <code>:hover</code> 时上移，却没有键盘焦点样式。哪些用户能收到反馈？在没有动态效果时，应当提供什么等效信息？</div>

## 动态效果审查

对每段动画回答：

1. 它解释了什么变化？
2. 不运行动画时，界面仍能被理解吗？
3. 它是否重复、覆盖大面积、闪烁或意外移动？
4. 是否有减少动态效果的替代方案？
5. 键盘焦点会不会与视觉上的位置脱节？

<div class="ai-brief">
  <h3>AI 任务：审查状态完整性</h3>
  <p>向模型提供组件的交互要求和 CSS，让它列出缺失状态。添加样式之前，应在真实 HTML 中验证它声称存在的每种状态。</p>
</div>

<div class="verification-card">
  <h3>验证清单</h3>
  <ul class="checklist">
    <li>键盘焦点始终可见。</li>
    <li>悬停不是发现操作的唯一途径。</li>
    <li>选中、错误和成功状态不只依赖颜色。</li>
    <li>动态效果目的明确且时长有限。</li>
    <li>减少动态效果模式仍然容易理解。</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>用自己的话解释</h3>
  <p>为什么 <code>transition: all</code> 比逐项列出有意动画的属性更难维护？</p>
</div>

## 继续学习质量工程

至此，你已经掌握完整的 HTML 与 CSS 基础。接下来学习[质量是构建过程的一部分](/zh/quality/)，将无障碍、调试、可维护性、兼容性和性能融入每次实现。
