import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const root = new URL('../docs/public/data/texture-channel-evidence/', import.meta.url);
const scope = JSON.parse(readFileSync(new URL('source-scope.json', root), 'utf8'));
const inventory = JSON.parse(readFileSync(new URL('binding-inventory.json', root), 'utf8'));
for (const repo of scope.repositories) {
  assert.ok(/^[a-f0-9]{40}$/.test(repo.commit));
  const paths = repo.files.map(f => f.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const file of repo.files) {
    assert.ok(/^[a-f0-9]{40}$/.test(file.blob_sha));
    const names = new Set(inventory.games.flatMap(g => g.bindings.filter(b => b.declarations.some(d => d.path === file.path && d.commit === repo.commit)).map(b => b.name)));
    assert.deepEqual([...names].sort(), file.texture_names, `Scope mismatch ${file.path}`);
  }
  for (const game of inventory.games.filter(g => g.commit === repo.commit)) {
    for (const b of game.bindings) for (const d of b.declarations) assert.ok(paths.includes(d.path), `Declaration outside audited scope: ${d.path}`);
  }
  if (process.argv.includes('--remote')) {
    const tree = JSON.parse(execFileSync('gh', ['api', `repos/${repo.repository}/git/trees/${repo.commit}?recursive=1`], { encoding: 'utf8', timeout: 30000, maxBuffer: 16 * 1024 * 1024 }));
    assert.ok(!tree.truncated, 'GitHub tree truncated');
    const files = tree.tree.filter(f => f.type === 'blob' && f.path.startsWith(repo.prefix) && repo.extensions.some(ext => f.path.endsWith(ext)));
    assert.deepEqual(files.map(f => f.path).sort(), [...paths].sort(), `${repo.repository}: missing shader source file`);
    for (const f of files) assert.equal(f.sha, repo.files.find(r => r.path === f.path).blob_sha, `Original blob mismatch ${f.path}`);
  }
  console.log(`${repo.repository}: ${paths.length} audited files, including zero-declaration sources`);
}
console.log('Source scope covers every selected shader file; --remote checks immutable GitHub tree paths and audited original blob hashes.');
