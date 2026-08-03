import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/MIMITools/assets/image.CGBKHCxd.png";
const _imports_1 = "/MIMITools/assets/image-1.9umhaPk0.png";
const _imports_2 = "/MIMITools/assets/image-2.DPo9wl7h.png";
const _imports_3 = "/MIMITools/assets/image-3.TcArsbFy.png";
const __pageData = JSON.parse('{"title":"⚠️ ResourceVBList.size() 为 4 的 Mod","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/ResourceVBListSize4/ResourceVBListSize4.md","filePath":"newbie/reverse/ResourceVBListSize4/ResourceVBListSize4.md"}');
const _sfc_main = { name: "newbie/reverse/ResourceVBListSize4/ResourceVBListSize4.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="⚠️-resourcevblist-size-为-4-的-mod" tabindex="-1">⚠️ ResourceVBList.size() 为 4 的 Mod <a class="header-anchor" href="#⚠️-resourcevblist-size-为-4-的-mod" aria-label="Permalink to “⚠️ ResourceVBList.size() 为 4 的 Mod”">​</a></h1><p>有些 Mod 额外加入了大招动画修复，或者某些特殊状态下的动画修复，这时候就会多一个 <code>Blend</code> 类型的 Resource，技术上称之为 <code>remapped blend</code>：</p><p><img${ssrRenderAttr("src", _imports_0)} alt="alt text"></p><h2 id="🔍-问题分析" tabindex="-1">🔍 问题分析 <a class="header-anchor" href="#🔍-问题分析" aria-label="Permalink to “🔍 问题分析”">​</a></h2><p>直接逆向的话，日志大概是酱紫的：</p><p><img${ssrRenderAttr("src", _imports_1)} alt="alt text"></p><h2 id="🛠️-解决方案" tabindex="-1">🛠️ 解决方案 <a class="header-anchor" href="#🛠️-解决方案" aria-label="Permalink to “🛠️ 解决方案”">​</a></h2><p>这时候我们手动删掉这个 <code>remapped</code> 技术的 Resource，或者注释掉：</p><p><img${ssrRenderAttr("src", _imports_2)} alt="alt text"></p><p>然后就成功逆向出来了：</p><p><img${ssrRenderAttr("src", _imports_3)} alt="alt text"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/ResourceVBListSize4/ResourceVBListSize4.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ResourceVBListSize4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ResourceVBListSize4 as default
};
