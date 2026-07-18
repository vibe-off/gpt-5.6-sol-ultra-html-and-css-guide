import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

const projectRoot = resolve(import.meta.dirname, '..')
const clientRoot = resolve(projectRoot, 'dist', 'client')
const workerPath = resolve(projectRoot, 'dist', 'server', 'index.js')

for (const required of [
  resolve(clientRoot, 'index.html'),
  resolve(clientRoot, '404.html'),
  workerPath,
  resolve(projectRoot, 'dist', 'server', 'package.json'),
  resolve(projectRoot, 'dist', '.openai', 'hosting.json')
]) {
  if (!existsSync(required)) throw new Error(`Sites build is missing ${required}`)
}

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
}

const assetBinding = {
  async fetch(request) {
    const url = new URL(request.url)
    const candidate = resolve(clientRoot, decodeURIComponent(url.pathname).replace(/^\/+/, ''))
    if (candidate !== clientRoot && !candidate.startsWith(`${clientRoot}${sep}`)) {
      return new Response('Not found', { status: 404 })
    }
    if (!existsSync(candidate) || !statSync(candidate).isFile()) {
      return new Response('Not found', { status: 404 })
    }
    const body = request.method === 'HEAD' ? null : readFileSync(candidate)
    return new Response(body, {
      status: 200,
      headers: { 'Content-Type': mimeTypes[extname(candidate)] ?? 'application/octet-stream' }
    })
  }
}

const workerModule = await import(`${pathToFileURL(workerPath).href}?validate=${Date.now()}`)
const worker = workerModule.default

async function check(pathname, expectedStatus, method = 'GET', expectedText = null) {
  const response = await worker.fetch(
    new Request(`https://guide.example${pathname}`, { method }),
    { ASSETS: assetBinding }
  )
  if (response.status !== expectedStatus) {
    throw new Error(`${method} ${pathname}: expected ${expectedStatus}, received ${response.status}`)
  }
  if (expectedText && !(await response.text()).includes(expectedText)) {
    throw new Error(`${method} ${pathname}: response did not include ${JSON.stringify(expectedText)}`)
  }
}

await check('/', 200, 'GET', 'HTML &amp; CSS Field Guide')
await check('/', 200, 'GET', 'href="/zh/"')
await check('/css/', 200, 'GET', 'CSS is a rule system')
await check('/css/box-model', 200, 'GET', 'Every element participates as a box')
await check('/css/box-model/', 200, 'GET', 'Every element participates as a box')
await check('/projects/capstone', 200, 'GET', 'Capstone: Campus hub')
await check('/starters/debugging-clinic/', 200, 'GET', 'Seven evidence cases')
await check('/zh/', 200, 'GET', 'lang="zh-CN"')
await check('/zh/', 200, 'GET', 'href="/"')
await check('/zh/css/box-model', 200, 'GET', 'lang="zh-CN"')
await check('/zh/projects/debugging-clinic', 200, 'GET', 'lang="zh-CN"')
await check('/zh/starters/debugging-clinic/', 200, 'GET', 'lang="zh-CN"')
await check('/favicon.ico', 200)
await check('/favicon-32.png', 200)
await check('/definitely-missing', 404, 'GET', 'Not Found')
await check('/', 405, 'POST')
await check('/', 200, 'HEAD')

const unavailable = await worker.fetch(new Request('https://guide.example/'), {})
if (unavailable.status !== 503) throw new Error(`Missing ASSETS binding should return 503; received ${unavailable.status}`)

const indexHtml = readFileSync(resolve(clientRoot, 'index.html'), 'utf8')
const assetMatch = indexHtml.match(/(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/)
if (!assetMatch) throw new Error('Built home page does not reference a hashed JS or CSS asset.')
await check(assetMatch[1], 200)

console.log('Validated Sites worker routes, clean URLs, starter assets, 404 handling, method handling, and hashed assets.')
