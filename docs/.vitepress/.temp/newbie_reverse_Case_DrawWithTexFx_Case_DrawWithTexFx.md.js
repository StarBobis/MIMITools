import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/MIMITools/assets/image.BZSYdm1d.png";
const __pageData = JSON.parse('{"title":"案例：调用TexFx进行绘制的Mod","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/Case_DrawWithTexFx/Case_DrawWithTexFx.md","filePath":"newbie/reverse/Case_DrawWithTexFx/Case_DrawWithTexFx.md"}');
const _sfc_main = { name: "newbie/reverse/Case_DrawWithTexFx/Case_DrawWithTexFx.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="案例-调用texfx进行绘制的mod" tabindex="-1">案例：调用TexFx进行绘制的Mod <a class="header-anchor" href="#案例-调用texfx进行绘制的mod" aria-label="Permalink to “案例：调用TexFx进行绘制的Mod”">​</a></h1><h2 id="问题描述" tabindex="-1">问题描述 <a class="header-anchor" href="#问题描述" aria-label="Permalink to “问题描述”">​</a></h2><p>有一些Mod使用了TexFx插件进行绘制透明部位，此时一键逆向无法解析：</p><p><img${ssrRenderAttr("src", _imports_0)} alt="alt text"></p><h2 id="解决方案1-修改ini文件" tabindex="-1">解决方案1: 修改ini文件 <a class="header-anchor" href="#解决方案1-修改ini文件" aria-label="Permalink to “解决方案1: 修改ini文件”">​</a></h2><p>第一种方法是修改<code>.ini</code>文件，例如这里的<code>$\\TexFx\\_1</code>是Offset, <code>$\\TexFx\\_2</code>是IndexCount</p><p>所以可以改写为DrawIndexed，例如 <code>drawindexed = 249132, 96, 0</code></p><p>从而使自动逆向能够解析，从而逆向出来Mod</p><h2 id="解决方案2-手动逆向-手动分割" tabindex="-1">解决方案2: 手动逆向 + 手动分割 <a class="header-anchor" href="#解决方案2-手动逆向-手动分割" aria-label="Permalink to “解决方案2: 手动逆向 + 手动分割”">​</a></h2><p>第二种方法是使用手动逆向，直接绕过自动解析的限制，最后看ini这俩爹IndexCount和Offset</p><p>再使用TheHerta插件的Split By DrawIndexed功能进行分割分块儿</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/Case_DrawWithTexFx/Case_DrawWithTexFx.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Case_DrawWithTexFx = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Case_DrawWithTexFx as default
};
