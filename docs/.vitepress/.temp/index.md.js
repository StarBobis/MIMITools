import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"MIMITools","text":"二次元游戏 Mod 分析与逆向工具","tagline":"面向二次元游戏 Mod 制作场景，提供 Mod 分析、手动/自动逆向与原神 Mod 防报错的一体化工具。","image":{"src":"https://github.com/user-attachments/assets/aae48eaa-f05d-4666-87a3-6495191cfd05","alt":"MIMITools"},"actions":[{"theme":"brand","text":"开始使用","link":"/newbie/reverse/Introduction/Introduction"},{"theme":"alt","text":"GitHub 仓库","link":"https://github.com/StarBobis/MIMITools"},{"theme":"alt","text":"支持赞助","link":"https://afdian.com/item/ec74ee782b2f11efb5a052540025c377"}]},"features":[{"title":"🔍 Mod 分析","details":"解析复杂的混合 Mod，理清模型、贴图与槽位关系，快速定位问题所在。"},{"title":"✋ Mod 手动逆向","details":"提供完整的手动逆向能力，逐层还原 Mod 中的模型数据，导入 Blender 继续加工。"},{"title":"🤖 Mod 自动逆向","details":"一键自动逆向，把版本更新后损坏或失效的旧 Mod 重新还原为可用模型。"},{"title":"🛡️ 原神 Mod 防报错","details":"内置针对原神的防报错方案，有效减少游戏运行时的报错与崩溃问题。"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="功能定位" tabindex="-1">功能定位 <a class="header-anchor" href="#功能定位" aria-label="Permalink to “功能定位”">​</a></h2><p>MIMITools 专注于<strong>二次元游戏 Mod 的分析与逆向</strong>，围绕 3Dmigoto 系加载器生态打造。无论你是想分析一个复杂 Mod 的结构、修复版本更新后损坏的旧 Mod，还是解决原神 Mod 运行时的报错问题，MIMITools 都能提供对应的一体化工作流。</p><h2 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to “快速上手”">​</a></h2><ul><li><a href="/MIMITools/newbie/reverse/Introduction/Introduction.html">自动逆向功能</a></li><li><a href="/MIMITools/newbie/reverse/HowToActivateAutoReverse/HowToActivateAutoReverse.html">如何激活自动逆向</a></li><li><a href="/MIMITools/newbie/reverse/ManualReverse/ManualReverse.html">手动逆向功能</a></li><li><a href="/MIMITools/newbie/reverse/T004ImportIntoBlender/T004ImportIntoBlender.html">一键逆向后导入 Blender</a></li><li><a href="/MIMITools/games/gimi/HowToSolveErrorCode/HowToSolveErrorCode.html">原神 Mod 防报错：10612-4001 等错误</a></li></ul><h2 id="开始使用" tabindex="-1">开始使用 <a class="header-anchor" href="#开始使用" aria-label="Permalink to “开始使用”">​</a></h2><ul><li>前往 <a href="https://github.com/StarBobis/MIMITools" target="_blank" rel="noreferrer">GitHub 仓库</a> 下载最新版本</li><li>完整功能与长期技术支持详见 <a href="https://afdian.com/item/ec74ee782b2f11efb5a052540025c377" target="_blank" rel="noreferrer">赞助页</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
