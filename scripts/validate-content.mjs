import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const docsRoot = join(projectRoot, 'docs')
const configPath = join(docsRoot, '.vitepress', 'config.mts')
const themePath = join(docsRoot, '.vitepress', 'theme', 'index.ts')
const chineseRoot = join(docsRoot, 'zh')

const failures = []

function collectFiles(directory, extension, output = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.vitepress') continue
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) collectFiles(fullPath, extension, output)
    else if (extname(entry.name) === extension) output.push(fullPath)
  }
  return output
}

function stripCodeFences(source) {
  return source.replace(/```[\s\S]*?```/g, '')
}

function pageExists(link) {
  const withoutQuery = link.split('?')[0]
  const withoutHash = withoutQuery.split('#')[0]
  if (!withoutHash || withoutHash === '/') return true

  const pathPart = decodeURIComponent(withoutHash).replace(/^\//, '')
  const candidates = []
  const publicCandidate = join(docsRoot, 'public', pathPart)

  if (
    (existsSync(publicCandidate) && statIsFile(publicCandidate)) ||
    (existsSync(join(publicCandidate, 'index.html')) && statIsFile(join(publicCandidate, 'index.html')))
  ) return true

  if (pathPart.endsWith('/')) {
    candidates.push(join(docsRoot, pathPart, 'index.md'))
  } else if (pathPart.endsWith('.md')) {
    candidates.push(join(docsRoot, pathPart))
  } else if (pathPart.endsWith('.html')) {
    candidates.push(join(docsRoot, `${pathPart.slice(0, -5)}.md`))
  } else {
    candidates.push(join(docsRoot, `${pathPart}.md`))
    candidates.push(join(docsRoot, pathPart, 'index.md'))
  }

  return candidates.some((candidate) => existsSync(candidate))
}

function statIsFile(path) {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

function report(file, message) {
  failures.push(`${relative(projectRoot, file)}: ${message}`)
}

const markdownFiles = collectFiles(docsRoot, '.md').sort()
const publicHtmlFiles = collectFiles(join(docsRoot, 'public'), '.html').sort()

if (markdownFiles.length < 80) {
  failures.push(`Expected at least 80 bilingual course pages; found ${markdownFiles.length}.`)
}

const englishRelativePaths = markdownFiles
  .map((file) => relative(docsRoot, file).replaceAll('\\', '/'))
  .filter((path) => !path.startsWith('zh/'))

const chineseRelativePaths = markdownFiles
  .map((file) => relative(chineseRoot, file).replaceAll('\\', '/'))
  .filter((path) => !path.startsWith('../'))

for (const path of englishRelativePaths) {
  if (!chineseRelativePaths.includes(path)) {
    failures.push(`Missing Simplified Chinese mirror: docs/zh/${path}`)
  }
}

for (const path of chineseRelativePaths) {
  if (!englishRelativePaths.includes(path)) {
    failures.push(`Chinese page has no English source mirror: docs/zh/${path}`)
  }
}

const pageRoutes = new Set()
let headingCount = 0
let characterCount = 0
let internalLinkCount = 0

for (const file of markdownFiles) {
  const source = readFileSync(file, 'utf8')
  const cleanSource = stripCodeFences(source)
  const relativePath = relative(docsRoot, file).replaceAll('\\', '/')
  const route = relativePath === 'index.md'
    ? '/'
    : `/${relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')}`
  pageRoutes.add(route.endsWith('/') || route === '/' ? route : route.replace(/\/$/, ''))
  const isLocaleHome = relativePath === 'index.md' || relativePath === 'zh/index.md'

  if (!source.startsWith('---\n')) report(file, 'Missing YAML frontmatter.')

  if (!isLocaleHome && !/^title:\s*.+$/m.test(source)) {
    report(file, 'Frontmatter is missing a title.')
  }

  if (!isLocaleHome && !/^#\s+\S+/m.test(cleanSource)) {
    report(file, 'Page is missing a level-one heading.')
  }

  const fenceCount = (source.match(/^```/gm) ?? []).length
  if (fenceCount % 2 !== 0) report(file, 'Code fences are unbalanced.')

  if (/\b(?:TODO|TBD|FIXME)\b/.test(cleanSource)) {
    report(file, 'Contains an unfinished placeholder marker.')
  }

  const isChinesePage = relativePath.startsWith('zh/')
  if (isChinesePage && (cleanSource.match(/[\u3400-\u9fff]/g) ?? []).length < 100) {
    report(file, 'Chinese mirror contains too little Simplified Chinese learner-facing content.')
  }

  if (/<(?:a|img|link|script)\b[^>]*(?:href|src)=["']\//i.test(cleanSource)) {
    report(file, 'Raw root-relative HTML asset or link must use withBase() for subpath deployments.')
  }

  headingCount += (cleanSource.match(/^#{1,6}\s+\S+/gm) ?? []).length
  characterCount += cleanSource.replace(/\s/g, '').length

  const targets = [
    ...cleanSource.matchAll(/\[[^\]]+\]\(([^)]+)\)/g),
    ...cleanSource.matchAll(/href=["']([^"']+)["']/g),
    ...cleanSource.matchAll(/withBase\(["']([^"']+)["']\)/g),
    ...source.matchAll(/^\s+link:\s+(\/\S+)\s*$/gm)
  ].map((match) => match[1].trim().replace(/^<|>$/g, ''))

  for (const target of targets) {
    if (/^(?:https?:|mailto:|tel:|#)/.test(target)) continue
    if (!target.startsWith('/')) continue
    internalLinkCount += 1
    if (isChinesePage && target !== '/zh/' && !target.startsWith('/zh/')) {
      report(file, `Chinese page links outside the Chinese route tree: ${target}`)
    }
    if (!pageExists(target)) report(file, `Broken internal link: ${target}`)
  }
}

if (headingCount < 500) {
  failures.push(`Expected at least 500 bilingual headings; found ${headingCount}.`)
}

if (characterCount < 150000) {
  failures.push(`Expected at least 150,000 bilingual non-whitespace characters; found ${characterCount}.`)
}

const configSource = readFileSync(configPath, 'utf8')
const sidebarLinks = [...configSource.matchAll(/link:\s*'([^']+)'/g)]
  .map((match) => match[1])
  .filter((link) => link.startsWith('/'))

for (const link of sidebarLinks) {
  if (!pageExists(link)) report(configPath, `Configured route does not exist: ${link}`)
}

const sidebarRouteSet = new Set(sidebarLinks.map((link) => {
  if (link === '/') return '/'
  return link.endsWith('/') ? link : link.replace(/\/$/, '')
}))

for (const route of pageRoutes) {
  if (route === '/') continue
  if (!sidebarRouteSet.has(route)) {
    report(configPath, `Course page is not represented in the sidebar: ${route}`)
  }
}

const themeSource = readFileSync(themePath, 'utf8')
for (const match of themeSource.matchAll(/from '\.\/components\/([^']+)'/g)) {
  const componentPath = join(docsRoot, '.vitepress', 'theme', 'components', match[1])
  if (!existsSync(componentPath)) report(themePath, `Missing registered component: ${match[1]}`)
}

if (publicHtmlFiles.length < 16) {
  failures.push(`Expected at least 16 bilingual runnable public HTML starters; found ${publicHtmlFiles.length}.`)
}

for (const file of publicHtmlFiles) {
  const source = readFileSync(file, 'utf8')
  const publicPath = relative(join(docsRoot, 'public'), file).replaceAll('\\', '/')

  if (!/^<!doctype html>/i.test(source)) report(file, 'Starter is missing an HTML doctype.')
  if (!/<html\s+lang=["'][^"']+["']/i.test(source)) report(file, 'Starter is missing a document language.')
  if (!/<meta\s+charset=["']utf-8["']/i.test(source)) report(file, 'Starter is missing UTF-8 metadata.')
  if (!/<meta\s+name=["']viewport["']/i.test(source)) report(file, 'Starter is missing viewport metadata.')
  if (!/<title>[^<]+<\/title>/i.test(source)) report(file, 'Starter is missing a page title.')
  if (!/<link\b[^>]*\brel=["']icon["']/i.test(source)) report(file, 'Starter is missing a favicon link.')
  if (!/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/i.test(source)) report(file, 'Starter is missing a level-one heading.')

  for (const match of source.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const target = match[1].split(/[?#]/)[0]
    if (!target || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(target)) continue

    const intentionalMissing =
      publicPath.endsWith('starters/debugging-clinic/case-1/pages/index.html') &&
      target === 'assets/css/styles.css'
    if (intentionalMissing) continue

    if (target.startsWith('/')) {
      if (!pageExists(target)) report(file, `Broken public route: ${target}`)
      continue
    }

    const candidate = resolve(dirname(file), decodeURIComponent(target))
    const exists = statIsFile(candidate) || statIsFile(join(candidate, 'index.html'))
    if (!exists) report(file, `Broken relative starter asset or link: ${target}`)
  }

  if (publicPath.startsWith('zh/') && !/<html\s+lang=["']zh-CN["']/i.test(source)) {
    report(file, 'Chinese starter must declare lang="zh-CN".')
  }
}

const faviconAssets = ['favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon.png']
for (const asset of faviconAssets) {
  const assetPath = join(docsRoot, 'public', asset)
  if (!statIsFile(assetPath) || statSync(assetPath).size < 100) {
    report(assetPath, 'Missing or unexpectedly small favicon asset.')
  }
}

const configSourceChecks = [
  "label: 'English'",
  "lang: 'en-US'",
  "label: '简体中文'",
  "lang: 'zh-CN'",
  "link: '/zh/'",
  'i18nRouting: true'
]
for (const expected of configSourceChecks) {
  if (!configSource.includes(expected)) report(configPath, `Missing i18n configuration: ${expected}`)
}

if (failures.length > 0) {
  console.error('Content validation failed:\n')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(
  `Validated ${markdownFiles.length} pages, ${headingCount} headings, ` +
  `${characterCount.toLocaleString()} non-whitespace characters, ` +
  `${internalLinkCount} internal links, ${sidebarLinks.length} configured routes, ` +
  `and ${publicHtmlFiles.length} runnable HTML starters.`
)
