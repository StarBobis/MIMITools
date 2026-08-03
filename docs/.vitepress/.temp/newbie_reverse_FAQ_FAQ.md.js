import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/MIMITools/assets/image.JThk_JZ6.png";
const _imports_1 = "/MIMITools/assets/image-1.C36bCeeA.png";
const _imports_2 = "/MIMITools/assets/image-2.CvZS__Wj.png";
const _imports_3 = "/MIMITools/assets/image-3.vOhMNqvF.png";
const __pageData = JSON.parse('{"title":"萌新常见问题","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/FAQ/FAQ.md","filePath":"newbie/reverse/FAQ/FAQ.md"}');
const _sfc_main = { name: "newbie/reverse/FAQ/FAQ.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="萌新常见问题" tabindex="-1">萌新常见问题 <a class="header-anchor" href="#萌新常见问题" aria-label="Permalink to “萌新常见问题”">​</a></h1><p>常见问题总结，如果没有你遇到的问题，可以联系我询问或联系我添加到这里。</p><h2 id="为什么我的mod文件里没有-ini文件" tabindex="-1">为什么我的Mod文件里没有.ini文件？ <a class="header-anchor" href="#为什么我的mod文件里没有-ini文件" aria-label="Permalink to “为什么我的Mod文件里没有.ini文件？”">​</a></h2><p><img${ssrRenderAttr("src", _imports_0)} alt="alt text"></p><p>可能ini文件需要再往里一层，也许放在子文件夹里</p><h2 id="为什么我的mod文件里没有ini文件" tabindex="-1">为什么我的Mod文件里没有ini文件？ <a class="header-anchor" href="#为什么我的mod文件里没有ini文件" aria-label="Permalink to “为什么我的Mod文件里没有ini文件？”">​</a></h2><p><img${ssrRenderAttr("src", _imports_1)} alt="alt text"></p><p>这种情况需要把文件后缀名显示打开：</p><p><img${ssrRenderAttr("src", _imports_2)} alt="alt text"></p><h2 id="为什么我的mod文件里没有-ini文件-1" tabindex="-1">为什么我的Mod文件里没有.ini文件？ <a class="header-anchor" href="#为什么我的mod文件里没有-ini文件-1" aria-label="Permalink to “为什么我的Mod文件里没有.ini文件？”">​</a></h2><p><img${ssrRenderAttr("src", _imports_3)} alt="alt text"></p><p>你把名称展开大一点</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/FAQ/FAQ.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FAQ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  FAQ as default
};
