import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/MIMITools/assets/image.DmiwmGYE.png";
const _imports_1 = "/MIMITools/assets/image-1.zKCI_mdj.png";
const __pageData = JSON.parse('{"title":"如何激活自动逆向功能","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/HowToActivateAutoReverse/HowToActivateAutoReverse.md","filePath":"newbie/reverse/HowToActivateAutoReverse/HowToActivateAutoReverse.md"}');
const _sfc_main = { name: "newbie/reverse/HowToActivateAutoReverse/HowToActivateAutoReverse.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="如何激活自动逆向功能" tabindex="-1">如何激活自动逆向功能 <a class="header-anchor" href="#如何激活自动逆向功能" aria-label="Permalink to “如何激活自动逆向功能”">​</a></h1><h2 id="生成密钥文件并激活" tabindex="-1">生成密钥文件并激活 <a class="header-anchor" href="#生成密钥文件并激活" aria-label="Permalink to “生成密钥文件并激活”">​</a></h2><p>首先，切换到SSMT的设置页面，下拉到最下方，点击生成密钥文件按钮：</p><p><img${ssrRenderAttr("src", _imports_0)} alt="alt text"></p><p>点击后自动弹出一个文件夹，并选中了生成的.key文件：</p><p><img${ssrRenderAttr("src", _imports_1)} alt="alt text"></p><p>此时你把这个key文件发给我，然后我就可以使用这个key文件为你激活SSMT了</p><p>当我激活好之后，我会把激活好的SSMT的安装包发给你，你安装之后就可以使用了</p><h2 id="如何更新新版本" tabindex="-1">如何更新新版本 <a class="header-anchor" href="#如何更新新版本" aria-label="Permalink to “如何更新新版本”">​</a></h2><p>新版本SSMT会自动附带你的激活，所以不用担心版本更新后无法使用的问题，后续更新SSMT正常更新即可。</p><h2 id="技术支持" tabindex="-1">技术支持 <a class="header-anchor" href="#技术支持" aria-label="Permalink to “技术支持”">​</a></h2><p>赞助长期技术支持计划后记得加入附带的 <code>SSMT长期技术支持LTS</code> QQ群。</p><p>在使用SSMT4的Mod逆向功能过程中，遇到任何无法解决的问题或违反直觉的设计，记得反馈给我。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/HowToActivateAutoReverse/HowToActivateAutoReverse.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HowToActivateAutoReverse = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  HowToActivateAutoReverse as default
};
