import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"🔧 米游系列游戏原本解包骨骼","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/HoyoGamesBone/HoyoGamesBone.md","filePath":"newbie/reverse/HoyoGamesBone/HoyoGamesBone.md"}');
const _sfc_main = { name: "newbie/reverse/HoyoGamesBone/HoyoGamesBone.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="🔧-米游系列游戏原本解包骨骼" tabindex="-1">🔧 米游系列游戏原本解包骨骼 <a class="header-anchor" href="#🔧-米游系列游戏原本解包骨骼" aria-label="Permalink to “🔧 米游系列游戏原本解包骨骼”">​</a></h1><h2 id="📦-骨骼资源" tabindex="-1">📦 骨骼资源 <a class="header-anchor" href="#📦-骨骼资源" aria-label="Permalink to “📦 骨骼资源”">​</a></h2><p><a href="https://github.com/Seris0/AnimeGameArmatures" target="_blank" rel="noreferrer">🔗 GitHub 仓库: AnimeGameArmatures</a></p><p>这里有一大部分骨骼，而且是别人处理好可以直接使用的。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/HoyoGamesBone/HoyoGamesBone.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HoyoGamesBone = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  HoyoGamesBone as default
};
