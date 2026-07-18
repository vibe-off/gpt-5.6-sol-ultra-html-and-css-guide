# HTML & CSS Field Guide

An AI-aware, fundamentals-first VitePress course for college students. The guide teaches students to build, inspect, debug, and explain accessible web pages instead of treating generated code as a black box.

## Requirements

- Node.js 22 or newer (Node.js 24 LTS recommended)
- npm

## Run locally

```powershell
npm install
npm run dev
```

The development server prints the local URL, usually `http://localhost:5173`.
It is intentionally bound to `127.0.0.1`; keep the development server private to
your own computer rather than exposing it to a classroom or public network.

## Validate and build

```powershell
npm run build
npm run preview
```

The static site is generated in `docs/.vitepress/dist`.

> **Toolchain note:** VitePress 1.6.4 is the current stable release, but its
> Vite 5 development dependency has published local development-server
> advisories with no compatible stable VitePress fix. This project restricts
> the server to loopback, narrows browser CORS access, and deploys only static
> build output. Recheck the stable release before running the dev server on an
> untrusted machine.

## Course structure

- **Start here:** mental models, setup, learning method, and course map
- **HTML:** document anatomy, semantics, links, media, tables, and forms
- **CSS:** rules, cascade, box model, visual design, layout, and responsive design
- **Quality:** accessibility, debugging, maintainability, performance, and modern CSS
- **AI workflow:** prompting with evidence, reviewing generated code, and documenting decisions
- **Projects:** progressive labs, debugging clinics, and a capstone with a reusable rubric

Every lesson follows the PAVE loop: **Predict → Ask → Verify → Explain**.
