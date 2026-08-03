import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"🔗 逆向出来的模型如何绑定骨骼？","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/BindModelToBone/BindModelToBone.md","filePath":"newbie/reverse/BindModelToBone/BindModelToBone.md"}');
const _sfc_main = { name: "newbie/reverse/BindModelToBone/BindModelToBone.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="🔗-逆向出来的模型如何绑定骨骼" tabindex="-1">🔗 逆向出来的模型如何绑定骨骼？ <a class="header-anchor" href="#🔗-逆向出来的模型如何绑定骨骼" aria-label="Permalink to “🔗 逆向出来的模型如何绑定骨骼？”">​</a></h1><p>这是一个很常见的需求，因为并不是所有人逆向 Mod 的需求都是制作 Mod，有一部分人会拿去做别的事情，那么学会在 Blender 或其它软件中进行骨骼绑定是很重要的环节。</p><h2 id="🔧-绑定的思路" tabindex="-1">🔧 绑定的思路 <a class="header-anchor" href="#🔧-绑定的思路" aria-label="Permalink to “🔧 绑定的思路”">​</a></h2><p>以下是几种常见的绑定方法：</p><ul><li><strong>使用 Auto Rig Pro 插件</strong>：快速用它的预制骨架拖拽调整来绑定。</li><li><strong>使用 TheHerta3 的右键菜单</strong>：选择 <code>根据顶点组生成基础骨骼</code> 来在每个顶点组的中心位置生成一个骨骼，简化绑定流程。</li><li><strong>获取游戏原本的骨骼</strong>：然后用 TheHerta3 的【将目标 obj 的顶点组按位置对应关系改名】来快速改名并一键绑定到原本的骨骼。</li><li><strong>导出为 obj 格式</strong>：并放到 MMD 软件中进行绑定骨骼。</li></ul><h2 id="📚-学习建议" tabindex="-1">📚 学习建议 <a class="header-anchor" href="#📚-学习建议" aria-label="Permalink to “📚 学习建议”">​</a></h2><p>不管是哪一种，都需要你学会骨骼绑定，所以现在就去补 Blender 基础之骨骼绑定吧。</p><p>需要自己绑定MMD骨骼，推荐看这个BiliBili视频合集：</p><p><a href="https://space.bilibili.com/373989566/lists/2229922?type=season" target="_blank" rel="noreferrer">https://space.bilibili.com/373989566/lists/2229922?type=season</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/BindModelToBone/BindModelToBone.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BindModelToBone = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  BindModelToBone as default
};
