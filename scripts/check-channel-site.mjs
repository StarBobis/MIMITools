import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const games = ['gimi', 'himi', 'srmi', 'zzmi', 'wwmi', 'efmi'];
for (const game of games) {
  const relative = `games/${game}/TextureChannelGuide/TextureChannelGuide`;
  const markdown = readFileSync(new URL(`docs/${relative}.md`, root), 'utf8');
  const htmlPath = new URL(`docs/.vitepress/dist/${relative}.html`, root);
  assert.ok(existsSync(htmlPath), `${game}: missing built guide`);
  const html = readFileSync(htmlPath, 'utf8');
  const anchors = [...markdown.matchAll(/\{#([^}]+)\}/g)].map(m => m[1]);
  for (const anchor of anchors) assert.ok(html.includes(`id="${anchor}"`), `${game}: built anchor absent ${anchor}`);
  for (const link of markdown.matchAll(/\]\(#([^\s)]+)\)/g)) assert.ok(anchors.includes(link[1]), `${game}: broken local navigation ${link[1]}`);
  for (const image of markdown.matchAll(/!\[[^\]]*\]\(([^\s)]+)\)/g)) {
    if (/^https?:/.test(image[1])) continue;
    const path = image[1].startsWith('/') ? new URL(`docs/public${image[1]}`, root) : new URL(image[1], new URL(`docs/${relative}.md`, root));
    assert.ok(existsSync(path), `${game}: missing image ${image[1]}`);
  }
  console.log(`${game}: ${anchors.length} rendered anchors, local links and image files verified`);
}
for (const name of ['binding-inventory.json', 'wuwa-auxiliary.json', 'endfield-property.json', 'importer-crosswalk.json', 'source-scope.json', 'endfield-extra.json', 'endfield-image-ledger.json']) {
  const source = readFileSync(new URL(`docs/public/data/texture-channel-evidence/${name}`, root), 'utf8');
  const built = readFileSync(new URL(`docs/.vitepress/dist/data/texture-channel-evidence/${name}`, root), 'utf8');
  assert.equal(built, source, `Stale published evidence: ${name}`);
}
console.log('Built channel evidence matches committed inputs. This is structural site validation, not visual/rendered-game QA.');
