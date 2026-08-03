import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/MIMITools/assets/image.DLbsKfJN.png";
const _imports_1 = "/MIMITools/assets/image-1.1xodYyz8.png";
const __pageData = JSON.parse('{"title":"🖐️ 手动逆向功能","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/ManualReverse/ManualReverse.md","filePath":"newbie/reverse/ManualReverse/ManualReverse.md"}');
const _sfc_main = { name: "newbie/reverse/ManualReverse/ManualReverse.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="🖐️-手动逆向功能" tabindex="-1">🖐️ 手动逆向功能 <a class="header-anchor" href="#🖐️-手动逆向功能" aria-label="Permalink to “🖐️ 手动逆向功能”">​</a></h1><p>手动逆向功能是最强大的 Mod 逆向功能，没有之一。</p><p><img${ssrRenderAttr("src", _imports_0)} alt="alt text"></p><p>使用手动逆向功能，可以在全自动逆向被特殊 <code>ini</code> 写法导致失效时，仍然能够进行 Mod 逆向，并且其上限只取决于用户的操作，不会受到一键逆向的上限影响。</p><h2 id="🛠️-操作方法" tabindex="-1">🛠️ 操作方法 <a class="header-anchor" href="#🛠️-操作方法" aria-label="Permalink to “🛠️ 操作方法”">​</a></h2><p>手动逆向要填入 <code>Index Buffer File List</code> 和 <code>Category buffer File List</code>，全程拖拽，操作简单方便。</p><h2 id="⚠️-缺点与解决方案" tabindex="-1">⚠️ 缺点与解决方案 <a class="header-anchor" href="#⚠️-缺点与解决方案" aria-label="Permalink to “⚠️ 缺点与解决方案”">​</a></h2><p>手动逆向的缺点就是没有办法自动拆分模型，如果 Mod 是由多个 <code>drawindexed</code> 构成的则逆向出的模型仍然是一个整体，需要手动进行拆分。</p><p>此时我们可以使用 <strong>Herta 插件</strong> 中的 <code>Split By DrawIndexed</code> 功能进行拆分。</p><p><img${ssrRenderAttr("src", _imports_1)} alt="alt text"></p><h2 id="🧩-数据类型缺失" tabindex="-1">🧩 数据类型缺失 <a class="header-anchor" href="#🧩-数据类型缺失" aria-label="Permalink to “🧩 数据类型缺失”">​</a></h2><p>如果手动逆向功能没有找到对应的数据类型，则会弹出提示。</p><p>此时可以把 Mod 文件发我联系我添加数据类型，当然也有可能是你没有选对游戏预设导致的。</p><h2 id="📝-总结" tabindex="-1">📝 总结 <a class="header-anchor" href="#📝-总结" aria-label="Permalink to “📝 总结”">​</a></h2><p>总之，灵活应用手动逆向功能可以解决你遇到的很多 Mod 无法一键逆向的问题。</p><p>比如带有面板可调整的形态键 Mod 或者使用 <code>Slider Impact</code> 制作的多切换形态键 Mod 等等。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/ManualReverse/ManualReverse.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ManualReverse = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ManualReverse as default
};
