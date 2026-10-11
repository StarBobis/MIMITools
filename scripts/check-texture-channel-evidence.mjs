import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const evidence = JSON.parse(readFileSync(new URL('../docs/public/data/texture-channel-evidence/wuwa-auxiliary.json', import.meta.url), 'utf8'));
assert.equal(evidence.commit, '3e40423dbec489368696c4f89a2bfb285662cdc1');
const tree = name => {
  const result = evidence.trees.find(t => t.name === name);
  assert.ok(result, `Missing evidence tree: ${name}`);
  return result;
};
const socket = (t, node, direction, id) => t.nodes.find(n => n.name === node)[direction].find(s => s.id === id)?.name;
const links = name => {
  const t = tree(name);
  return t.links.map(l => [l.from, socket(t, l.from, 'outputs', l.out), l.to, socket(t, l.to, 'inputs', l.in)]);
};
const hasLink = (name, expected) => assert.ok(links(name).some(l => JSON.stringify(l) === JSON.stringify(expected)), `${name}: missing ${expected.join(' → ')}`);

// HN is routed to the highlight-position Y input, not silently treated as ordinary RG normals.
hasLink('Hair Highlights (3.0+)', ['Separate XYZ', 'Y', 'Math.001', 'Value']);
hasLink('Hair Highlights (3.0+)', ['Group Input', 'HN', 'Reroute', 'Input']);
// HET has an internal R computation, but no output from it is used by the outer group.
hasLink('Bullshit', ['Separate XYZ', 'X', 'Math.005', 'Value']);
hasLink('See Through', ['Shader to RGB', 'Color', 'Group Output', 'Shader']);
assert.ok(!tree('See Through').links.some(l => l.from === 'Group.001'));
// FTM G is selected as the new shading lightmap R; B only enters damage overlay.
hasLink('Lightmap Conventer', ['Separate Color.002', 'Green', 'Mix', 'B']);
hasLink('Damage Display', ['Separate Color', 'Blue', 'Mix', 'A']);
hasLink('Alpha Transparency', ['Separate Color', 'Red', 'Mix', 'B']);
const transparent = tree('Alpha Transparency');
assert.ok(transparent.links.some(l => l.from === 'Transparent BSDF' && l.in === 'Shader'));
assert.ok(transparent.links.some(l => l.from === 'Group Input' && l.in === 'Shader_001'));
// LD's named reroute is a dead end in the supplied outline material.
const ldMaterial = evidence.trees.find(t => t.nodes.some(n => n.name === 'LD'));
assert.ok(ldMaterial);
assert.ok(ldMaterial.links.some(l => l.from === 'LD' && l.to === 'Reroute.004'));
assert.ok(!ldMaterial.links.some(l => l.from === 'Reroute.004'));

const stockings = tree('Stockings');
const threshold = name => stockings.nodes.find(n => n.name === name).inputs.find(s => s.id === 'Value_001').value;
const upper = threshold('Math.003'), lower = threshold('Math.004');
assert.ok(Math.abs(lower - 0.011) < 1e-8 && Math.abs(upper - 0.013) < 1e-8);
const selected = Array.from({ length: 256 }, (_, i) => i).filter(i => i / 255 > lower && i / 255 <= upper);
assert.deepEqual(selected, [3]);

// Numerically verify the documented positive-parameter dissolve direction, including inversion below 0.5.
const clipAmount = (r, position, uv = 0.1) => Math.max(Math.floor(-(position - 0.5) * r + uv + 1), 0);
assert.ok(clipAmount(1, 0.8) < clipAmount(0, 0.8));
assert.ok(clipAmount(1, -1) > clipAmount(0, -1));
const nG = (g, position = 0.8, edge = 0.1, soft = 0.5) => {
  const z = Math.max(0, Math.min(1, (1 - (position + edge) * g) / soft));
  return 1 - (3 - 2 * z) * z * z;
};
assert.ok(nG(1) > nG(0));

const ww = readFileSync(new URL('../docs/games/wwmi/TextureChannelGuide/TextureChannelGuide.md', import.meta.url), 'utf8');
for (const anchor of ['map-hn', 'map-het', 'map-rgid', 'map-ld', 'map-ftm']) {
  const section = ww.split(`{#${anchor}}`)[1]?.split(/\n###? /)[0];
  assert.ok(section, `Missing auxiliary section: ${anchor}`);
  for (const channel of 'RGBA') assert.ok(section.includes(`**${channel}怎么用：**`), `${anchor}: missing ${channel}`);
}
assert.ok(!ww.includes('R没有取得对应节点或Shader完整读取定义'));
const ef = readFileSync(new URL('../docs/games/efmi/TextureChannelGuide/TextureChannelGuide.md', import.meta.url), 'utf8');
for (const anchor of ['map-hairline', 'map-hairst', 'map-rain-flow', 'map-rain-drops', 'map-rain-phase', 'map-lip-highlight']) {
  const section = ef.split(`{#${anchor}}`)[1]?.split(/\n###? /)[0];
  assert.ok(section, `Missing Endfield detail: ${anchor}`);
  for (const channel of 'RGBA') assert.ok(section.includes(`**${channel}怎么用：**`), `${anchor}: missing ${channel}`);
  assert.ok(section.includes('https://github.com/'), `${anchor}: missing source`);
}
const dropCoverage = a => Math.abs(2 * a - 1);
assert.equal(dropCoverage(0), 1);
assert.equal(dropCoverage(0.5), 0);
assert.equal(dropCoverage(1), 1);
assert.ok(!ef.includes('G没有统一用途定义'));
for (const anchor of ['map-eye-matcap05', 'map-eye-matcap07', 'map-eye-highlight', 'map-fgd', 'map-environment-rgbm', 'map-manual-matcap', 'map-facial-main', 'map-cmm', 'map-sdf', 'map-matcap', 'map-eye-capture-source', 'map-hair-capture-source', 'map-packed-depth-rt', 'map-shadow-viewport-rt', 'map-post-scene-rt', 'map-post-bloom-rt', 'map-post-depth-buffer', 'map-skin-diffuse', 'map-skin-rd']) {
  const section = ef.split(`{#${anchor}}`)[1]?.split(/\n## /)[0];
  assert.ok(section, `Endfield eye section missing: ${anchor}`);
  for (const channel of 'RGBA') assert.ok(section.includes(`**${channel}怎么用：**`), `${anchor}: missing ${channel}`);
  assert.ok(section.includes('https://github.com/'), `${anchor}: missing evidence`);
}
const akeProperty = JSON.parse(readFileSync(new URL('../docs/public/data/texture-channel-evidence/endfield-property.json', import.meta.url), 'utf8'));
assert.equal(akeProperty.commit, '3e40423dbec489368696c4f89a2bfb285662cdc1');
assert.ok(akeProperty.links.some(l => l.from === '分离 XYZ.001' && l.to === '转接点.007'));
assert.ok(!akeProperty.links.some(l => l.from === '转接点.007'), 'AKE P.G is a dead end in this group');
assert.ok(akeProperty.links.some(l => l.from === 'Group Input.017' && l.to === '转接点.005'));
assert.ok(!ef.includes('G在该布局中表示高光类型'));
assert.ok(ef.includes('不是该PBRToonBase的绑定规则'));
const inventory = JSON.parse(readFileSync(new URL('../docs/public/data/texture-channel-evidence/binding-inventory.json', import.meta.url), 'utf8'));
assert.equal(inventory.games.length, 2);
const crosswalk = JSON.parse(readFileSync(new URL('../docs/public/data/texture-channel-evidence/importer-crosswalk.json', import.meta.url), 'utf8'));
assert.equal(crosswalk.commit, '3e40423dbec489368696c4f89a2bfb285662cdc1');
assert.equal(crosswalk.entries.length, 21);
for (const entry of crosswalk.entries) {
  const guide = readFileSync(new URL(`../docs/games/${entry.game}/TextureChannelGuide/TextureChannelGuide.md`, import.meta.url), 'utf8');
  for (const anchor of [entry.guide_anchor, ...(entry.additional_guide_anchors ?? [])]) assert.ok(guide.includes(`{#${anchor}}`), `${entry.game}:${entry.slot}: importer alias has no guide`);
  assert.ok(entry.source.includes(`/blob/${crosswalk.commit}/`));
  assert.ok(guide.includes(entry.source), `${entry.slot}: crosswalk lacks source in guide`);
}
assert.ok(ef.includes('两分支对RD可能不同'));
const akeExtra = JSON.parse(readFileSync(new URL('../docs/public/data/texture-channel-evidence/endfield-extra.json', import.meta.url), 'utf8'));
const baseExtra = akeExtra.trees.find(t => t.name === 'Arknights: Endfield_PBRToonBase');
const faceExtra = akeExtra.trees.find(t => t.name.endsWith('BaseFace'));
const edge = (t, from, out, to, input) => assert.ok(t.links.some(l => l.from === from && l.out === out && l.to === to && l.in === input), `AKE edge ${from}:${out}->${to}:${input}`);
edge(baseExtra, 264, 'Socket_6', 219, 'Input');
edge(baseExtra, 219, 'Output', 209, 'A_Color');
edge(baseExtra, 209, 'Result_Color', 210, 'B_Color');
edge(baseExtra, 265, 'Socket_15', 227, 'B_Color');
edge(baseExtra, 266, 'Socket_15', 244, 'A_Color');
edge(faceExtra, 270, 'X', 264, 'Value_001'); // R is threshold, not tested value!
edge(faceExtra, 270, 'Z', 276, 'Factor_Float');
edge(faceExtra, 272, 'Y', 273, 'Value');
assert.ok(!faceExtra.links.some(l => [263, 271].includes(l.from) && l.out === 'Alpha'));
for (const anchor of ['map-ake-emission', 'map-ake-rs-mask', 'map-ake-custom-face-mask']) {
  const section = ef.split(`{#${anchor}}`)[1]?.split(/\n## /)[0];
  for (const channel of 'RGBA') assert.ok(section?.includes(`**${channel}怎么用：**`), `${anchor}:${channel}`);
  assert.ok(section.includes('https://github.com/'));
}
const akeImages = JSON.parse(readFileSync(new URL('../docs/public/data/texture-channel-evidence/endfield-image-ledger.json', import.meta.url), 'utf8'));
assert.equal(akeImages.entries.length, 58);
assert.equal(new Set(akeImages.entries.map(e => `${e.tree_index}:${e.node_index}`)).size, 58);
assert.equal(new Set(akeImages.entries.map(e => e.label)).size, 53);
for (const entry of akeImages.entries) {
  assert.ok(ef.includes(`{#${entry.guide_anchor}}`), `${entry.label}: AKE image has no guide`);
  assert.ok(!('path' in entry), 'Do not publish private source paths');
}
const efInventory = inventory.games.find(g => g.game === 'efmi');
assert.equal(efInventory.bindings.length, 57);
for (const b of efInventory.bindings.filter(b => b.review_status.startsWith('verified'))) assert.ok(ef.includes(`{#${b.guide_anchor}}`), `${b.name}: no Endfield section`);
const packDepth = depth => {
  const p = [1, 255, 65025].map(scale => depth * scale - Math.floor(depth * scale));
  return [p[0] - p[1] / 255, p[1] - p[2] / 255, p[2]];
};
const unpackDepth = p => p[0] + p[1] / 255 + p[2] / 65025;
for (const depth of [0, 0.01, 0.5, 0.999]) assert.ok(Math.abs(unpackDepth(packDepth(depth)) - depth) < 1e-10);
assert.equal(unpackDepth(packDepth(1)), 0); // real frac packing boundary caveat
assert.ok(ef.includes('A≥0.5才视为有效捕获'));
assert.ok(ef.includes('D24S8深度模板格式'));
const fgdUv = (noV, roughness) => [Math.sqrt(Math.max(0, Math.min(1, noV))), Math.max(0, Math.min(1, roughness))].map(v => v * 63 / 64 + 0.5 / 64);
assert.deepEqual(fgdUv(0, 0), [0.5 / 64, 0.5 / 64]);
assert.deepEqual(fgdUv(1, 1), [63.5 / 64, 63.5 / 64]);
assert.deepEqual([0.2, 0.4, 0.8].map(v => v * 0.5 * 8), [0.8, 1.6, 3.2]); // RGBM, A is HDR multiplier
assert.ok(!ef.includes('A必须按表定义'));
assert.ok(!ef.includes('B核心未确认用途'));
const wwInventory = inventory.games.find(g => g.game === 'wwmi');
assert.equal(wwInventory.bindings.length, 36);
const selectParticle = (v, s, override = false) => override ? ([v[3], v[0], v[1], v[2]][s] ?? 1) : ([...v, 1][s] ?? 0);
assert.deepEqual([0, 1, 2, 3, 4].map(s => selectParticle([0.1, 0.2, 0.3, 0.4], s)), [0.1, 0.2, 0.3, 0.4, 1]);
assert.deepEqual([0, 1, 2, 3, 4].map(s => selectParticle([0.1, 0.2, 0.3, 0.4], s, true)), [0.4, 0.1, 0.2, 0.3, 1]);
for (const game of ['wwmi']) {
  const guide = readFileSync(new URL(`../docs/games/${game}/TextureChannelGuide/TextureChannelGuide.md`, import.meta.url), 'utf8');
  for (const anchor of ['map-post-color', 'map-post-bloom', 'map-post-layer', 'map-post-lut', 'map-post-unused']) {
    const section = guide.split(`{#${anchor}}`)[1]?.split(/\n## /)[0];
    for (const channel of 'RGBA') assert.ok(section?.includes(`**${channel}怎么用：**`), `${game}:${anchor}:${channel}`);
  }
  assert.ok(guide.includes('weight.y+z+w'));
}
for (const binding of wwInventory.bindings) {
  assert.ok(binding.review_status.startsWith('verified'), `${binding.name}: Wuwa not reviewed`);
  assert.ok(ww.includes(`{#${binding.guide_anchor}}`), `${binding.name}: Wuwa guide missing`);
}
for (const anchor of ['map-outline-color', 'map-glass-highlight', 'map-tacet-field', 'map-tacet-noise', 'map-secondary-stars', 'map-aurora-noise', 'map-unused-slots', 'map-eye-em', 'map-highlight', 'map-typemask', 'map-sdf', 'map-independent-mask']) {
  const section = ww.split(`{#${anchor}}`)[1]?.split(/\n## /)[0];
  assert.ok(section, `Wuwa section missing: ${anchor}`);
  for (const channel of 'RGBA') assert.ok(section.includes(`**${channel}怎么用：**`), `${anchor}: missing ${channel}`);
  assert.ok(section.includes('https://github.com/'), `${anchor}: missing evidence`);
  assert.ok(!section.includes('未确认用途'), `${anchor}: stale vague placeholder`);
}
const tacetCoverage = (b, n1, n2, threshold) => 1 - Number(n1 * n2 - b >= threshold);
assert.equal(tacetCoverage(0, 1, 1, 0.5), 0);
assert.equal(tacetCoverage(1, 1, 1, 0.5), 1);
assert.equal(tacetCoverage(0.5, 1, 1, 0.5), 0); // equality discarded
assert.equal(tacetCoverage(0, 0, 1, 0.5), 1);
const secondaryUvScale = (g, strength) => 2 * g * strength - 1;
assert.equal(secondaryUvScale(0.5, 1), 0);
assert.equal(secondaryUvScale(0, 1), -1);
assert.equal(secondaryUvScale(1, 1), 1);
if (process.argv.includes('--complete')) {
  const pending = inventory.games.flatMap(g => g.bindings.filter(b => !b.review_status.startsWith('verified')).map(b => `${g.game}:${b.name}`));
  assert.equal(pending.length, 0, `Incomplete shader coverage: ${pending.join(', ')}`);
  assert.ok(inventory.games.every(g => g.bindings.length > 0 && g.review_status !== 'pending_sampler_inventory'), 'Missing game sampler inventory');
}
console.log('Verified RGBA sections, node topology, Wuwa 36-binding inventory, Bloom pass rules, and numeric examples. Full coverage gate: --complete.');
