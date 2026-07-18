**English** | [简体中文](./README.zh-CN.md)

# HTML & CSS Field Guide

An AI-aware, fundamentals-first VitePress course for college students. It teaches learners to build, inspect, debug, and explain accessible web pages instead of treating generated code as a black box.

[Open the live course](https://vibe-off.github.io/gpt-5.6-sol-ultra-html-and-css-guide/)

## Learning approach

Every lesson follows the PAVE loop:

1. **Predict** what the browser will do.
2. **Ask** AI a focused question with evidence.
3. **Verify** the answer in source code, DevTools, standards, or tests.
4. **Explain** the result in your own words.

AI is used as a collaborator for explanation, debugging, review, and iteration—not as a substitute for understanding HTML and CSS.

## What is included

- **Start here:** browser mental models, setup, learning method, and an eight-week course map
- **HTML:** document anatomy, semantics, links, media, tables, and forms
- **CSS:** selectors, cascade, box model, visual foundations, layout, responsive design, and motion
- **Quality:** accessibility, debugging, maintainability, performance, and modern CSS
- **Projects:** progressive labs, seven runnable debugging cases, and a capstone with reusable rubrics
- **Interactive practice:** box-model, cascade, Flexbox, learning-path, and PAVE workflow components

## Requirements

- Node.js 22 or newer; Node.js 24 LTS is recommended
- npm

## Run locally

```powershell
npm install
npm run dev
```

The development server prints the local URL, usually `http://localhost:5173`. It is intentionally bound to `127.0.0.1` so it stays private to your computer.

## Validate and build

```powershell
npm run validate
npm run build
npm run preview
```

The static site is generated in `docs/.vitepress/dist`.

## GitHub Pages

Pushes to `main` are built and deployed by [the Pages workflow](./.github/workflows/deploy-pages.yml). The workflow supplies the repository base path during the production build; local builds continue to work from `/`.

> **Toolchain note:** This project pins VitePress 1.6.4, the stable release used by the course. Its Vite 5 development dependency has published local development-server advisories without a compatible stable VitePress fix. The project limits the development server to loopback, narrows browser CORS access, and deploys only static build output.
