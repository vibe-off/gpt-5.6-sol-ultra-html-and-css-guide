---
title: 图片与媒体
description: 根据媒体用途添加有效的图片、说明文字、响应式源、尺寸与替代文本。
---

# 让媒体在各种使用方式下都有价值

<p class="lesson-lead">图片不只是一条文件路径。它有自身用途、固有尺寸、无障碍替代内容、加载成本，以及与邻近内容的关系。</p>

<div class="lesson-meta">
  <span>HTML 核心</span>
  <span>55 分钟</span>
  <span>内容 + 性能</span>
</div>

## 从图片用途开始

```html
<img
  src="images/print-studio.webp"
  alt="两名学生正从丝网印刷台上揭起一张蓝色油墨印刷品"
  width="1200"
  height="800"
>
```

好的替代文本会传达图片在当前语境中贡献了什么。不要以“这是一张……的图片”开头，不要复制文件名，也不要描述每一个像素。

### 三种常见情况

1. **信息型：**描述图片提供的信息或体验。
2. **功能型：**如果图片是链接或按钮的内容，应描述目标或操作。
3. **装饰型：**图片不增加信息，且邻近内容已经表达其含义时，使用 `alt=""`。

同一张图片出现在不同语境中，可能需要不同的替代文本。

## width 与 height 保护布局稳定性

`width` 和 `height` 属性能在图片下载前向浏览器提供宽高比提示。CSS 仍然可以让图片流式缩放：

```css
img {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
}
```

这样既能避免溢出，又能保持宽高比。固有尺寸也能减少意外的布局偏移。

## 用 `figure` 关联说明文字

```html
<figure>
  <img
    src="images/material-study.webp"
    alt="六种纸张样品按半透明到不透明的顺序排列"
    width="1000"
    height="700"
  >
  <figcaption>视觉传达专业二年级工作室的材料研究。</figcaption>
</figure>
```

当媒体及其说明共同形成一个可在主要内容中被引用的独立单元时，使用 `figure`。并非每张图片都需要 figure。

## 为浏览器提供有效的源选项

需要切换分辨率时，提供候选文件并说明预期显示尺寸：

```html
<img
  src="images/campus-800.webp"
  srcset="
    images/campus-480.webp 480w,
    images/campus-800.webp 800w,
    images/campus-1400.webp 1400w
  "
  sizes="(min-width: 64rem) 50vw, 100vw"
  alt="下课后，学生们正在穿过校园中央庭院"
  width="1400"
  height="933"
>
```

`srcset` 描述可用文件，`sizes` 描述不同布局条件下图片的预期渲染宽度。浏览器会根据布局和显示密度选择合适的候选文件。

使用 `picture` 进行艺术指导或提供格式替代，而不要只把它当作每张图片外部的装饰容器：

```html
<picture>
  <source media="(max-width: 40rem)" srcset="images/exhibition-portrait.webp">
  <img
    src="images/exhibition-wide.webp"
    alt="参观者正在展厅中阅读学生项目说明"
    width="1400"
    height="800"
  >
</picture>
```

## 音频和视频需要等价的访问方式

是否需要控件、字幕、文字稿和音频描述，取决于内容与受众。自动播放——尤其是带声音的自动播放——可能造成干扰，也经常被浏览器阻止。请先让用户掌握控制权。

```html
<video controls preload="metadata" width="960" poster="images/tour-poster.webp">
  <source src="media/studio-tour.webm" type="video/webm">
  <track
    kind="captions"
    src="media/studio-tour-en.vtt"
    srclang="en"
    label="英语"
    default
  >
  <p>你的浏览器不支持嵌入式视频。</p>
</video>
<p><a href="studio-tour-transcript.html">阅读工作室导览文字稿</a>。</p>
```

<div class="predict-box">
一张图片具有 <code>width="1200"</code>、<code>height="800"</code>，并应用 CSS <code>max-inline-size: 100%; block-size: auto</code>。它放进一个 320 像素宽的容器后会怎样？哪个值保护宽高比，哪条规则防止溢出？
</div>

## 加载方式

首屏以下的图片可能适合使用 `loading="lazy"`。不要懒加载用户一打开页面就需要看到的主要图片。压缩媒体、选择合适格式，并在网络面板中验证实际传输大小。

<div class="ai-brief">
  <h3>AI 任务：根据用途起草替代文本</h3>
  <p>描述图片、周围文字以及它为何出现在这里，要求 AI 给出三个简洁方案。检查确认它提供了额外信息且没有重复说明文字后，再选择或改写其中一个。</p>
</div>

<div class="verification-card">
  <h3>验证清单</h3>
  <ul class="checklist">
    <li>每张图片都有经过考虑的 <code>alt</code> 值。</li>
    <li>固有尺寸预留了正确的宽高比。</li>
    <li>媒体不会溢出窄容器。</li>
    <li>说明文字与文字稿关联到正确内容。</li>
    <li>网络面板显示文件大小合理。</li>
  </ul>
</div>

<div class="exit-ticket">
  <h3>复述检验</h3>
  <p>为什么两个页面可以使用同一张照片，却需要不同的替代文本？</p>
</div>
