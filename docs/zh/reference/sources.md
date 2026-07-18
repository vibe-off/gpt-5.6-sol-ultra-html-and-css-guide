---
title: 可信来源
description: HTML、CSS、无障碍、浏览器兼容性、验证、Web 性能和 VitePress 的当前一手参考资料。
---

# 可信来源及其使用方法

<p class="lesson-lead">需要确认准确语法和行为时，请使用一手标准与持续维护的参考资料；再通过浏览器确认你自己的文档、样式和目标环境实际上如何表现。</p>

## 核心学习参考

<div class="source-grid">
  <div class="source-card">
    <h3>MDN Curriculum</h3>
    <p>一份结构化的 Web 开发基础技能地图，涵盖语义化 HTML、CSS 基础、布局、无障碍、设计和辅助实践。</p>
    <p><a href="https://developer.mozilla.org/en-US/curriculum/">打开 MDN Curriculum</a></p>
  </div>
  <div class="source-card">
    <h3>MDN Learn Web Development</h3>
    <p>为学习者从入门走向熟练提供渐进式讲解、技能测试、挑战和扩展模块。</p>
    <p><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development">打开 MDN Learn</a></p>
  </div>
</div>

## 精确的平台参考

- [MDN HTML 参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference) — 元素、属性、指南和相关无障碍说明。
- [MDN CSS 参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) — 属性、选择器、at 规则、值、概念和示例。
- [HTML Living Standard](https://html.spec.whatwg.org/) — 持续更新的 HTML 标准；内容精确而密集。
- [CSS 规范](https://www.w3.org/Style/CSS/specs.en.html) — 通过 W3C 流程维护的模块规范。

学习或实现时先从 MDN 开始；当你需要精确的规范行为，或要解决尚未明确的边缘情况时，再查阅规范。

## 无障碍

- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/) — 标准、指南、评估资源和教学材料。
- [WAI 课程资料](https://www.w3.org/WAI/curricula/) — 学习成果、教学思路和评估思路。
- [Web Content Accessibility Guidelines（WCAG）](https://www.w3.org/WAI/standards-guidelines/wcag/) — 当前标准及配套文档。
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — 当原生 HTML 无法满足需求时，自定义组件可参考的模式。

ARIA 模式不是重新实现原生控件的理由。请从语义化 HTML 开始，只有需求确实需要时才使用自定义组件指南。

## 兼容性

- [MDN 浏览器兼容性数据](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Compatibility_tables) — 嵌入在参考页面中的兼容性表格。
- [Can I use](https://caniuse.com/) — 持续维护的特性支持摘要，适合辅助项目决策。
- 浏览器发布说明和厂商文档 — 当问题涉及特定引擎或新的实现细节时很有用。

请记录日期、目标浏览器政策、回退方案和对用户的影响。不要脱离项目上下文直接复制一个全球支持率。

## 验证

- [Nu HTML Checker](https://validator.w3.org/nu/) — 提供 HTML 结构与规范一致性反馈。
- [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) — 检查许多 CSS 规则的语法和规范一致性。

验证器可能落后于新特性，也可能漏掉可用性缺陷。请把输出视为有针对性的信号，然后检查实际规则和当前规范。

## 性能

- [web.dev 性能课程](https://web.dev/learn/performance/) — Chrome 团队提供的加载和渲染性能实践材料。
- [MDN 性能指南](https://developer.mozilla.org/en-US/docs/Web/Performance) — 以 Web 平台为中心的性能概念和 API。
- 浏览器的 Network 和 Performance 工具 — 用于记录实际条件下当前页面的证据。

厂商指南可能更强调自家的工具或引擎。请在项目支持的环境中测试。

## 本指南的平台

- [VitePress 稳定版文档](https://vuejs.github.io/vitepress/v1/) — 本指南使用的稳定 1.x 文档。
- [VitePress 入门](https://vuejs.github.io/vitepress/v1/guide/getting-started) — 安装、脚本和项目结构。
- [VitePress Markdown 扩展](https://vuejs.github.io/vitepress/v1/guide/markdown) — 提示框、代码组、语法高亮和其他写作功能。

本项目固定使用稳定版 VitePress 1.6.4，而不是 VitePress 2 alpha 系列。依赖版本记录在 `package.json` 中，它是项目构建版本的事实来源。

## 核查来源的习惯

对于需要精确结论或随时间变化的说法：

1. 明确哪个决策依赖这个答案；
2. 查阅当前维护的参考资料或一手标准；
3. 确认目标浏览器或项目上下文；
4. 构建最小的相关示例；
5. 检查真实的浏览器结果；以及
6. 如果决策可能随时间失效，记录来源日期和回退方案。

AI 可以帮助定位术语或总结密集的段落，但它不应成为不断变化的兼容性说法，或它没有亲自观察到的浏览器结果的最终权威。
