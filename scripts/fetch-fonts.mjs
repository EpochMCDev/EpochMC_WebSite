import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

const SRC_CSS = process.argv[2]
const OUT_ROOT = 'public/fonts'
const CSS_OUT = 'src/fonts.css'

const css = readFileSync(SRC_CSS, 'utf8')

const blocks = css.match(/@font-face\s*{[^}]*}/g) ?? []
console.log('font-face blocks:', blocks.length)

const familyDir = (name) =>
  name === 'Noto Sans SC' ? 'noto-sans-sc' : name.toLowerCase().replace(/\s+/g, '-')

let total = 0
let count = 0

const rewritten = (await Promise.all(
  blocks.map(async (block) => {
    const family = block.match(/font-family:\s*'([^']+)'/)?.[1]
    const style = block.match(/font-style:\s*(\w+)/)?.[1] ?? 'normal'
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1]
    const urlMatch = block.match(/url\(([^)]+\.woff2)\)/)
    const unicode = block.match(/unicode-range:\s*([^;]+);/)?.[1]
    if (!family || !weight || !urlMatch) return null

    const remoteUrl = urlMatch[1]
    const fileName = remoteUrl.split('/').pop()
    const dir = join(OUT_ROOT, familyDir(family))
    const localPath = join(dir, fileName)
    const size = existsSync(localPath) ? 0 : await download(remoteUrl, localPath)
    total += size
    count++

    const localUrl = `/fonts/${familyDir(family)}/${fileName}`
    return [
      '@font-face {',
      `  font-family: '${family}';`,
      `  font-style: ${style};`,
      `  font-weight: ${weight};`,
      '  font-display: swap;',
      `  src: url(${localUrl}) format('woff2');`,
      unicode ? `  unicode-range: ${unicode};` : null,
      '}',
    ]
      .filter(Boolean)
      .join('\n')
  })
)).filter(Boolean)
  .join('\n\n')

writeFileSync(CSS_OUT, rewritten + '\n')
console.log(`downloaded: ${count}, total: ${(total / 1024 / 1024).toFixed(2)} MB`)

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, buf)
  return buf.length
}
