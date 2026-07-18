import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve, sep } from 'node:path'

const root = resolve(process.argv[2] ?? 'docs/.vitepress/dist')
const host = '127.0.0.1'
const requestedPort = Number.parseInt(process.env.GUIDE_PREVIEW_PORT ?? '4173', 10)

if (!existsSync(join(root, 'index.html'))) {
  console.error(`Static build not found at ${root}. Run npm run build first.`)
  process.exit(1)
}

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8'
}

function resolveRequest(pathname) {
  const decoded = decodeURIComponent(pathname)
  const normalized = normalize(decoded).replace(/^([/\\])+/, '')
  const candidate = resolve(root, normalized)

  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null

  const candidates = []
  if (decoded.endsWith('/')) candidates.push(join(candidate, 'index.html'))
  else {
    candidates.push(candidate)
    candidates.push(`${candidate}.html`)
    candidates.push(join(candidate, 'index.html'))
  }

  return candidates.find((file) => existsSync(file) && statSync(file).isFile()) ?? null
}

const server = createServer((request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, {
        Allow: 'GET, HEAD',
        'Content-Type': 'text/plain; charset=utf-8'
      })
      response.end('Method not allowed')
      return
    }

    const url = new URL(request.url ?? '/', `http://${host}`)
    const file = resolveRequest(url.pathname)

    if (!file) {
      const notFound = join(root, '404.html')
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      if (request.method === 'HEAD') response.end()
      else createReadStream(notFound).pipe(response)
      return
    }

    const contentType = mimeTypes[extname(file).toLowerCase()] ?? 'application/octet-stream'
    response.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': file.includes(`${sep}assets${sep}`)
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    })

    if (request.method === 'HEAD') response.end()
    else createReadStream(file).pipe(response)
  } catch {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Bad request')
  }
})

server.listen(requestedPort, host, () => {
  console.log(`Preview: http://${host}:${requestedPort}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}
