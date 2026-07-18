import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const vitePressOutput = join(projectRoot, 'docs', '.vitepress', 'dist')
const outputRoot = resolve(projectRoot, 'dist')
const clientOutput = join(outputRoot, 'client')
const serverOutput = join(outputRoot, 'server')
const metadataOutput = join(outputRoot, '.openai')
const hostingConfig = join(projectRoot, '.openai', 'hosting.json')

if (dirname(outputRoot) !== projectRoot || basename(outputRoot) !== 'dist') {
  throw new Error(`Refusing to replace unexpected output path: ${outputRoot}`)
}

for (const requiredFile of [join(vitePressOutput, 'index.html'), join(vitePressOutput, '404.html'), hostingConfig]) {
  if (!existsSync(requiredFile)) throw new Error(`Required build input is missing: ${requiredFile}`)
}

rmSync(outputRoot, { recursive: true, force: true })
mkdirSync(serverOutput, { recursive: true })
mkdirSync(metadataOutput, { recursive: true })
cpSync(vitePressOutput, clientOutput, { recursive: true })
cpSync(hostingConfig, join(metadataOutput, 'hosting.json'))

const workerSource = `const HTML_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Content-Type-Options': 'nosniff'
}

function candidatePaths(pathname) {
  if (pathname === '/') return ['/index.html']

  const candidates = [pathname]

  if (pathname.endsWith('/')) {
    candidates.push(\`\${pathname}index.html\`)
    candidates.push(\`\${pathname.slice(0, -1)}.html\`)
  } else if (!/\\.[a-z0-9]+$/i.test(pathname)) {
    candidates.push(\`\${pathname}.html\`)
    candidates.push(\`\${pathname}/index.html\`)
  }

  return [...new Set(candidates)]
}

export default {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) {
      return new Response('Static asset binding is unavailable.', { status: 503 })
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed.', {
        status: 405,
        headers: { Allow: 'GET, HEAD' }
      })
    }

    const requestUrl = new URL(request.url)

    for (const pathname of candidatePaths(requestUrl.pathname)) {
      const candidateUrl = new URL(requestUrl)
      candidateUrl.pathname = pathname
      const response = await env.ASSETS.fetch(new Request(candidateUrl, request))
      if (response.status !== 404) return response
    }

    const notFoundUrl = new URL(requestUrl)
    notFoundUrl.pathname = '/404.html'
    const notFound = await env.ASSETS.fetch(new Request(notFoundUrl, request))
    return new Response(request.method === 'HEAD' ? null : notFound.body, {
      status: 404,
      headers: notFound.headers.get('content-type')
        ? notFound.headers
        : HTML_HEADERS
    })
  }
}
`

writeFileSync(join(serverOutput, 'index.js'), workerSource)
writeFileSync(join(serverOutput, 'package.json'), '{"type":"module"}\n')

const hosting = JSON.parse(readFileSync(hostingConfig, 'utf8'))
console.log(
  `Prepared Sites build at ${outputRoot} for ` +
  `${hosting.project_id ? 'project ' + hosting.project_id : 'an unregistered project'}.`
)
