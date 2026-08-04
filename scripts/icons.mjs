/**
 * Rend les icônes du site à partir de public/logo/monogramme.svg.
 *
 *   node scripts/icons.mjs
 *
 * La source de vérité de la marque est le dépôt de branding
 * (dépôt de branding NEXTRI, non versionné avec ce site) : monogramme.svg est
 * une copie conforme de son `identite/logo/monogramme/mark-b-full.svg`. Le
 * regénérer là-bas et le recopier ici est la manœuvre correcte ; le retoucher
 * ici ferait diverger le site de la papeterie et des réseaux.
 *
 * Ce que ce script corrige : le monogramme n'occupait que 53 % de la largeur
 * du carré, et rendait un timbre-poste à 16 px à côté de l'octocat de GitHub
 * ou du « in » de LinkedIn, qui remplissent leur case. La cause n'était pas la
 * marge d'export du branding (déjà à 2 %) mais l'artboard : le triangle mesure
 * 162 sur un carré de 256, soit 63 %, et le retrait des facettes le réduit
 * encore. VIEWBOX ci-dessous recadre donc sur l'encre seule, et `fill` décide
 * ensuite de la respiration — qui n'a pas de valeur unique : un favicon se
 * remplit bord à bord, une icône maskable doit tenir dans la zone sûre
 * d'Android, une apple-touch-icon est arrondie par iOS.
 */
import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
// Chromium sait rasteriser du SVG et Playwright est installé dans le portfolio
// voisin : on l'emprunte plutôt que d'ajouter sharp ou resvg à ce projet pour
// sept fichiers regénérés deux fois par an.
const PW_ROOT = process.env.PW_ROOT ?? join(ROOT, '..', 'lionel-ratovo-portfolio');

const PAPER = '#f4eee0';

/* Boîte de l'encre dans l'artboard de 256, lue sur les sommets des trois
 * facettes : x de 46.83 à 209.17, y de 56.12 à 196.71. Recadrer dessus retire
 * la marge cuite dans le master sans toucher au dessin. */
const VIEWBOX = '46.83 56.12 162.34 140.59';

/** fill : part de la largeur du carré occupée par le monogramme. bg : null = transparent. */
const TARGETS = [
  { file: 'favicon-16.png', size: 16, fill: 0.92, bg: null },
  { file: 'favicon-32.png', size: 32, fill: 0.92, bg: null },
  { file: 'favicon-48.png', size: 48, fill: 0.92, bg: null },
  { file: 'icon-192.png', size: 192, fill: 0.84, bg: null },
  { file: 'icon-512.png', size: 512, fill: 0.84, bg: null },
  { file: 'apple-touch-icon.png', size: 180, fill: 0.7, bg: PAPER },
  // Zone sûre d'Android : le cercle des 80 % centraux. Un monogramme large de
  // 56 % y tient avec sa diagonale.
  { file: 'icon-512-maskable.png', size: 512, fill: 0.56, bg: PAPER },
];

/** Le .ico embarque trois PNG : licite depuis Vista, lu par tous les navigateurs. */
const ICO_SIZES = [16, 32, 48];

function page(svg, { size, fill, bg }) {
  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;width:${size}px;height:${size}px;
      background:${bg ?? 'transparent'}}
    body{display:grid;place-items:center}
    img{width:${(fill * 100).toFixed(4)}%;height:auto;display:block}
  </style><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`;
}

function ico(entries) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(1, 2); // type : icône
  head.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dir = [];
  for (const { size, png } of entries) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 vaut 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4); // plans
    e.writeUInt16LE(32, 6); // bits par pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += png.length;
  }
  return Buffer.concat([head, ...dir, ...entries.map((e) => e.png)]);
}

const require = createRequire(pathToFileURL(join(PW_ROOT, 'package.json')));
const pw = await import(pathToFileURL(require.resolve('@playwright/test')));
const { chromium } = pw.default ?? pw;

const master = await readFile(join(PUBLIC, 'logo', 'monogramme.svg'), 'utf-8');
const svg = master.replace(/viewBox="[^"]*"/, `viewBox="${VIEWBOX}"`);
if (svg === master) throw new Error('viewBox introuvable dans monogramme.svg');

const browser = await chromium.launch();
const rendered = new Map();

for (const target of TARGETS) {
  const p = await browser.newPage({
    viewport: { width: target.size, height: target.size },
    deviceScaleFactor: 1,
  });
  await p.setContent(page(svg, target));
  const png = await p.screenshot({ omitBackground: target.bg === null });
  await p.close();
  await writeFile(join(PUBLIC, target.file), png);
  rendered.set(target.size, png);
  console.log(`ok   ${target.file.padEnd(24)} ${String(target.size).padStart(3)}px  ${(target.fill * 100).toFixed(0)} %`);
}

await writeFile(
  join(PUBLIC, 'favicon.ico'),
  ico(ICO_SIZES.map((size) => ({ size, png: rendered.get(size) }))),
);
console.log(`ok   ${'favicon.ico'.padEnd(24)} ${ICO_SIZES.join(' + ')}px`);

await browser.close();
