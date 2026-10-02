import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// No research-cache dependency: committed inventory includes every pinned declaration URL.
// Offline: validate all binding anchors, RGBA explanations, and fixed-source links.
// --remote: fetch declaration-bearing files at immutable commits and independently compare names.
const root = new URL('../', import.meta.url);
const inventory = JSON.parse(readFileSync(new URL('docs/public/data/texture-channel-evidence/binding-inventory.json', root), 'utf8'));
const sourceFiles = new Map();
for (const game of inventory.games) {
  const guide = readFileSync(new URL(`docs/games/${game.game}/TextureChannelGuide/TextureChannelGuide.md`, root), 'utf8');
  const anchors = [...guide.matchAll(/\{#([^}]+)\}/g)].map(m => m[1]);
  assert.equal(new Set(anchors).size, anchors.length, `${game.game}: duplicate anchors`);
  assert.ok(game.bindings.length > 0, `${game.game}: empty inventory`);
  for (const binding of game.bindings) {
    assert.ok(['verified_scoped', 'verified_unused'].includes(binding.review_status), `${game.game}:${binding.name}: incomplete`);
    for (const guideAnchor of [binding.guide_anchor, ...(binding.additional_guide_anchors ?? [])]) {
      assert.ok(anchors.includes(guideAnchor), `${game.game}:${binding.name}: missing anchor ${guideAnchor}`);
      const anchorPosition = guide.indexOf(`{#${guideAnchor}}`);
      const heading = guide.slice(0, anchorPosition).split('\n').at(-1);
      const section = guide.slice(anchorPosition).split(heading.startsWith('### ') ? /\n#{2,3} / : /\n## /)[0];
      for (const channel of 'RGBA') assert.ok(section.includes(`**${channel}怎么用：**`) || (binding.review_status === 'verified_unused' && section.includes(`| ${channel} |`)), `${game.game}:${binding.name}: missing ${channel}`);
      assert.ok(section.includes('https://github.com/'), `${game.game}:${binding.name}: no source in section`);
    }
    assert.ok(binding.declarations.length > 0, `${binding.name}: missing declarations`);
    for (const declaration of binding.declarations) {
      assert.equal(declaration.commit, game.commit, `${binding.name}: commit mismatch`);
      assert.ok(declaration.url.includes(`/blob/${game.commit}/`), `${binding.name}: unpinned source`);
      const raw = declaration.url.replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('/blob/', '/').split('#')[0];
      if (!sourceFiles.has(raw)) sourceFiles.set(raw, { game: game.game, expected: new Set(), declarations: [] });
      const file = sourceFiles.get(raw);
      file.expected.add(binding.name);
      file.declarations.push({ name: binding.name, line: declaration.line });
    }
  }
  console.log(`${game.game}: ${game.bindings.length} scoped bindings, all RGBA sections sourced`);
}
if (process.argv.includes('--remote')) {
  for (const [url, file] of sourceFiles) {
    let text;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        if (process.argv.includes('--github-api')) {
          const parts = new URL(url).pathname.slice(1).split('/');
          const [owner, repo, commit, ...path] = parts;
          text = execFileSync('gh', ['api', `repos/${owner}/${repo}/contents/${path.join('/')}?ref=${commit}`, '-H', 'Accept: application/vnd.github.raw+json'], { encoding: 'utf8', timeout: 30000, maxBuffer: 4 * 1024 * 1024 });
        } else {
          const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
          assert.ok(response.ok, `${response.status}: ${url}`);
          text = await response.text();
        }
        break;
      } catch (error) {
        if (attempt === 3) throw error;
        console.warn(`Transient fetch failure, retry ${attempt}/3: ${url}`);
      }
    }
    const names = new Set();
    for (const line of text.split('\n')) {
      const declaration = line.match(/^\s*(?:shared\s+)?(?:Texture2D|TextureCube|texture2D|textureCUBE|texture)\s+(\w+)\s*(?=[:<;])/);
      const bloomMacro = line.match(/^EF_POST_DECLARE_BLOOM_TARGET\((\w+),/);
      const name = declaration?.[1] ?? bloomMacro?.[1];
      if (name && name !== 'Name') names.add(name);
    }
    assert.deepEqual([...names].sort(), [...file.expected].sort(), `${file.game}: declared-name set differs at ${url}`);
    const lines = text.split('\n');
    for (const declaration of file.declarations) assert.ok(lines[declaration.line - 1]?.includes(declaration.name), `${url}:${declaration.line}: stale line`);
    console.log(`Pinned source verified: ${url}`);
  }
}
console.log(`Checked ${sourceFiles.size} immutable declaration files. --remote verifies GitHub source sets; this does not claim native-game universality or runtime rendering validation.`);
