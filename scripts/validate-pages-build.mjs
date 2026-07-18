import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const outputRoot = join(projectRoot, 'docs', '.vitepress', 'dist')
const expectedBase = normalizeBase(
  process.env.VITEPRESS_BASE ?? '/gpt-5.6-sol-ultra-html-and-css-guide/'
)
const failures = []
let rootReferenceCount = 0

function normalizeBase(value) {
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

function collectHtmlFiles(directory, output = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) collectHtmlFiles(fullPath, output)
    else if (extname(entry.name) === '.html') output.push(fullPath)
  }
  return output
}

function targetExists(target) {
  const withoutBase = target.slice(expectedBase.length)
  const pathname = decodeURIComponent(withoutBase.split(/[?#]/, 1)[0])
  if (!pathname) return true
  if (pathname.split('/').includes('..')) return false

  const exact = join(outputRoot, pathname)
  const candidates = [exact]

  if (pathname.endsWith('/')) {
    candidates.push(join(exact, 'index.html'))
  } else if (!extname(pathname)) {
    candidates.push(`${exact}.html`, join(exact, 'index.html'))
  }

  return candidates.some((candidate) => {
    try {
      return statSync(candidate).isFile()
    } catch {
      return false
    }
  })
}

if (!existsSync(outputRoot)) {
  throw new Error(`GitHub Pages output does not exist: ${outputRoot}`)
}

const htmlFiles = collectHtmlFiles(outputRoot).sort()

for (const file of htmlFiles) {
  const source = readFileSync(file, 'utf8')
  const targets = [...source.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)]
    .map((match) => match[1])

  for (const target of targets) {
    if (!target.startsWith('/')) continue
    rootReferenceCount += 1

    if (!target.startsWith(expectedBase)) {
      failures.push(`${relative(outputRoot, file)} escapes the Pages base: ${target}`)
      continue
    }

    if (!targetExists(target)) {
      failures.push(`${relative(outputRoot, file)} points to missing output: ${target}`)
    }
  }
}

if (htmlFiles.length < 90) {
  failures.push(`Expected at least 90 bilingual generated HTML pages; found ${htmlFiles.length}.`)
}

const rootHtml = readFileSync(join(outputRoot, 'index.html'), 'utf8')
const chineseHtml = readFileSync(join(outputRoot, 'zh', 'index.html'), 'utf8')
const englishLessonHtml = readFileSync(join(outputRoot, 'css', 'box-model.html'), 'utf8')
const chineseLessonHtml = readFileSync(join(outputRoot, 'zh', 'css', 'box-model.html'), 'utf8')

if (!rootHtml.includes('lang="en-US"')) failures.push('English home page does not declare lang="en-US".')
if (!chineseHtml.includes('lang="zh-CN"')) failures.push('Chinese home page does not declare lang="zh-CN".')
if (!rootHtml.includes(`${expectedBase}zh/`)) failures.push('English home page does not expose the Chinese locale link.')
if (!chineseHtml.includes(`href="${expectedBase}"`)) failures.push('Chinese home page does not expose the English locale link.')
if (!englishLessonHtml.includes(`${expectedBase}zh/css/box-model`)) {
  failures.push('English lesson does not preserve its route when switching to Chinese.')
}
if (!chineseLessonHtml.includes(`${expectedBase}css/box-model`)) {
  failures.push('Chinese lesson does not preserve its route when switching to English.')
}

for (const asset of ['favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon.png']) {
  if (!existsSync(join(outputRoot, asset))) failures.push(`GitHub Pages output is missing ${asset}.`)
}

if (rootReferenceCount === 0) {
  failures.push('No root-relative references were found; the Pages base was not exercised.')
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(
  `Validated ${htmlFiles.length} GitHub Pages HTML files and ${rootReferenceCount} base-prefixed asset or navigation references.`
)
