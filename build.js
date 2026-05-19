const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { minify } = require('html-minifier-terser');

const ROOT = __dirname;
const SRC  = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

// Clean and scaffold
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'assets', 'css'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'assets', 'js'),  { recursive: true });
fs.mkdirSync(path.join(DIST, 'assets', 'img'), { recursive: true });

// CSS
console.log('[1/4] CSS...');
execSync(
  `npx @tailwindcss/cli -i "${path.join(SRC, 'assets/css/style.css')}" -o "${path.join(DIST, 'assets/css/style.min.css')}" --minify`,
  { stdio: 'inherit' }
);

// JS
console.log('[2/4] JS...');
execSync(
  `npx terser "${path.join(SRC, 'assets/js/main.js')}" --compress --mangle -o "${path.join(DIST, 'assets/js/main.min.js')}"`,
  { stdio: 'inherit' }
);

// Images
console.log('[3/4] Images...');
for (const file of fs.readdirSync(path.join(SRC, 'assets', 'img'))) {
  fs.copyFileSync(
    path.join(SRC, 'assets', 'img', file),
    path.join(DIST, 'assets', 'img', file)
  );
}

// HTML — paths stay as "assets/" since dist/index.html is alongside dist/assets/
console.log('[4/4] HTML...');
const html = fs.readFileSync(path.join(SRC, 'source.html'), 'utf8');
minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  minifyJS: true,
  minifyCSS: true,
}).then(minifiedHtml => {
  fs.writeFileSync(path.join(DIST, 'index.html'), minifiedHtml);
  console.log('Done → dist/');
});
