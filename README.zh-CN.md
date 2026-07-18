[English](./README.md) | **简体中文**

# HTML 与 CSS 学习指南

这是一套面向大学生、重视基础并合理使用 AI 的 VitePress 课程。它帮助学习者真正掌握网页的构建、检查、调试与解释方法，而不是把 AI 生成的代码当作无法理解的黑盒。

[打开简体中文课程](https://vibe-off.github.io/gpt-5.6-sol-ultra-html-and-css-guide/zh/) · [Open the English course](https://vibe-off.github.io/gpt-5.6-sol-ultra-html-and-css-guide/)

完整课程同时提供英文和简体中文版本。使用导航栏中的语言菜单，可以切换到当前课程页面对应的另一语言版本。

## 学习方法

每一课都遵循 PAVE 循环：

1. **预测（Predict）**浏览器会如何处理代码。
2. **提问（Ask）**：带着明确问题和证据向 AI 求助。
3. **验证（Verify）**：通过源代码、开发者工具、标准文档或测试核实答案。
4. **解释（Explain）**：用自己的语言说明原因和结果。

AI 在课程中用于辅助解释、调试、审查和迭代，而不是代替对 HTML 与 CSS 的理解。

## 课程内容

- **从这里开始：**浏览器工作模型、环境配置、学习方法和八周课程路线
- **HTML：**文档结构、语义、链接、媒体、表格和表单
- **CSS：**选择器、层叠、盒模型、视觉基础、布局、响应式设计和动效
- **质量与工程：**无障碍、调试、可维护性、性能和现代 CSS
- **项目实践：**渐进式实验、七个可运行的调试案例，以及带通用评分标准的综合项目
- **交互练习：**盒模型、层叠、Flexbox、学习路线和 PAVE 工作流组件
- **双语体验：**中英文课程一一对应，并本地化导航、搜索、交互实验和可运行的调试案例

## 环境要求

- Node.js 22 或更高版本；推荐使用 Node.js 24 LTS
- npm

## 本地运行

```powershell
npm install
npm run dev
```

开发服务器会输出本地地址，通常为 `http://localhost:5173`。服务器被有意限制在 `127.0.0.1`，不会向局域网公开。

## 验证与构建

```powershell
npm run validate
npm run build
npm run preview
```

静态网站会生成到 `docs/.vitepress/dist`。

如需根据本站视觉标志重新生成 favicon 和应用图标，请运行：

```powershell
npm run generate:favicon
```

## GitHub Pages

每次向 `main` 分支推送代码时，[Pages 工作流](./.github/workflows/deploy-pages.yml)都会自动构建并部署网站。工作流会在生产构建时提供仓库子路径，本地构建仍然使用根路径 `/`。

> **工具链说明：**本项目固定使用课程采用的稳定版 VitePress 1.6.4。其 Vite 5 开发依赖存在已公开的本地开发服务器安全公告，目前没有兼容的 VitePress 稳定版修复。本项目将开发服务器限制在本机回环地址、收紧浏览器 CORS 范围，并且只部署静态构建产物。
