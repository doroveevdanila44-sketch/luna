/**
 * Копирует исходники из ~/Desktop/Луна в public/images по таблице docs/ASSETS.md,
 * пережимает в jpg + webp. Исходная папка не изменяется.
 *
 * Запуск: npm run assets
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { homedir } from 'node:os'
import sharp from 'sharp'

const SRC_DIR = join(homedir(), 'Desktop', 'Луна')
const OUT_DIR = resolve('public/images')

// macOS отдаёт имена файлов в NFD («й» = и + комбинирующая бреве), поэтому обе
// стороны сравнения приводим к NFC, иначе кириллица с диакритикой не совпадёт.
const norm = (s) => s.normalize('NFC').toLowerCase()

// Ключ — фрагмент имени исходного файла в нижнем регистре (имена кириллические
// и в разном регистре, поэтому сопоставляем по вхождению подстроки).
const MAP = [
  // «Главный баннер 2» — на первом кадре луна почти не читалась
  { match: 'главный банер 2', out: 'hero', maxWidth: 2400 },
  { match: 'тренажерный зал', out: 'dir-gym', maxWidth: 1200 },
  { match: 'груповые занятия', out: 'dir-group', maxWidth: 1200 },
  { match: 'персональные тренировки', out: 'dir-personal', maxWidth: 1200 },
  { match: 'функциональный тренинг', out: 'dir-functional', maxWidth: 1200 },
  { match: 'атмосфера клуба 1', out: 'atmosphere-1', maxWidth: 1400 },
  { match: 'атмосфера клуба 3', out: 'atmosphere-3', maxWidth: 1400 },
  { match: 'атмосфера клуба 4', out: 'atmosphere-4', maxWidth: 1400 },
  { match: 'начать сегодня', out: 'cta-banner', maxWidth: 2000 },
]

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const files = await readdir(SRC_DIR)
  const manifest = {}

  for (const rule of MAP) {
    const file = files.find(
      (f) => norm(f).includes(norm(rule.match)) && /\.(png|jpe?g)$/i.test(f),
    )
    if (!file) {
      console.warn(`SKIP  нет исходника для «${rule.match}» → ${rule.out}`)
      continue
    }

    const srcPath = join(SRC_DIR, file)
    const pipeline = sharp(srcPath).rotate()
    const meta = await pipeline.metadata()
    const width = Math.min(rule.maxWidth, meta.width ?? rule.maxWidth)

    const jpgPath = join(OUT_DIR, `${rule.out}.jpg`)
    const webpPath = join(OUT_DIR, `${rule.out}.webp`)

    const jpgInfo = await sharp(srcPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(jpgPath)

    await sharp(srcPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpPath)

    const before = (await stat(srcPath)).size
    const after = (await stat(jpgPath)).size
    manifest[rule.out] = { width: jpgInfo.width, height: jpgInfo.height }

    console.log(
      `OK    ${file} → ${rule.out}.jpg  ` +
        `${jpgInfo.width}×${jpgInfo.height}  ` +
        `${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(2)}MB`,
    )
  }

  // Размеры нужны компонентам для next/image без layout shift.
  await writeFile(
    resolve('data/image-sizes.json'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8',
  )
  console.log('\nЗаписан data/image-sizes.json')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
