import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { deflateSync } from 'node:zlib'

const outputRoot = resolve(import.meta.dirname, '..', 'docs', 'public')
const palette = {
  navy: [24, 32, 50, 255],
  coral: [169, 54, 34, 255],
  cream: [255, 253, 248, 255],
  clear: [0, 0, 0, 0]
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) ? 0xedb88320 ^ (value >>> 1) : value >>> 1
  }
  return value >>> 0
})

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function pngChunk(type, data = Buffer.alloc(0)) {
  const typeBuffer = Buffer.from(type)
  const length = Buffer.alloc(4)
  const checksum = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])))
  return Buffer.concat([length, typeBuffer, data, checksum])
}

function encodePng(size, pixels) {
  const scanlines = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1)
    scanlines[rowStart] = 0
    pixels.copy(scanlines, rowStart + 1, y * size * 4, (y + 1) * size * 4)
  }

  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header[8] = 8
  header[9] = 6

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(scanlines, { level: 9 })),
    pngChunk('IEND')
  ])
}

function sampleMark(x, y, size) {
  const inset = size * 0.06
  const radius = size * 0.22
  const left = inset
  const top = inset
  const right = size - inset
  const bottom = size - inset
  const nearestX = Math.max(left + radius, Math.min(x, right - radius))
  const nearestY = Math.max(top + radius, Math.min(y, bottom - radius))
  const inside = x >= left && x <= right && y >= top && y <= bottom &&
    Math.hypot(x - nearestX, y - nearestY) <= radius

  if (!inside) return palette.clear

  const diagonal = Math.abs((x + y) - size)
  if (diagonal < size * 0.055) return palette.cream
  if (diagonal < size * 0.19) return palette.coral
  return palette.navy
}

function renderMark(size) {
  const samples = 4
  const pixels = Buffer.alloc(size * size * 4)

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const totals = [0, 0, 0, 0]
      for (let sampleY = 0; sampleY < samples; sampleY += 1) {
        for (let sampleX = 0; sampleX < samples; sampleX += 1) {
          const color = sampleMark(
            x + (sampleX + 0.5) / samples,
            y + (sampleY + 0.5) / samples,
            size
          )
          for (let channel = 0; channel < 4; channel += 1) totals[channel] += color[channel]
        }
      }

      const offset = (y * size + x) * 4
      for (let channel = 0; channel < 4; channel += 1) {
        pixels[offset + channel] = Math.round(totals[channel] / (samples * samples))
      }
    }
  }

  return encodePng(size, pixels)
}

function encodeIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)

  const directory = Buffer.alloc(images.length * 16)
  let offset = header.length + directory.length

  images.forEach(({ size, png }, index) => {
    const entry = index * 16
    directory[entry] = size >= 256 ? 0 : size
    directory[entry + 1] = size >= 256 ? 0 : size
    directory.writeUInt16LE(1, entry + 4)
    directory.writeUInt16LE(32, entry + 6)
    directory.writeUInt32LE(png.length, entry + 8)
    directory.writeUInt32LE(offset, entry + 12)
    offset += png.length
  })

  return Buffer.concat([header, directory, ...images.map(({ png }) => png)])
}

const faviconSizes = [16, 32, 48].map((size) => ({ size, png: renderMark(size) }))
const favicon32 = faviconSizes.find(({ size }) => size === 32).png
const icon192 = renderMark(192)
const appleTouchIcon = renderMark(180)

writeFileSync(join(outputRoot, 'favicon.ico'), encodeIco(faviconSizes))
writeFileSync(join(outputRoot, 'favicon-32.png'), favicon32)
writeFileSync(join(outputRoot, 'favicon-192.png'), icon192)
writeFileSync(join(outputRoot, 'apple-touch-icon.png'), appleTouchIcon)

console.log('Generated favicon.ico and PNG app icons in docs/public.')
