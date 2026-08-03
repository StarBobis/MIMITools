import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/MIMITools/assets/image.BaOZRYUM.png";
const _imports_1 = "/MIMITools/assets/image-1.BH0-RHsl.png";
const _imports_2 = "/MIMITools/assets/image-2.Mqrv2L5i.png";
const _imports_3 = "/MIMITools/assets/image-3.DGboJiNq.png";
const _imports_4 = "/MIMITools/assets/image-4.C8gWTnEg.png";
const _imports_5 = "/MIMITools/assets/image-5.CekC8Zkz.png";
const __pageData = JSON.parse('{"title":"📥 一键逆向后如何导入 Blender","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/T004ImportIntoBlender/T004ImportIntoBlender.md","filePath":"newbie/reverse/T004ImportIntoBlender/T004ImportIntoBlender.md"}');
const _sfc_main = { name: "newbie/reverse/T004ImportIntoBlender/T004ImportIntoBlender.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="📥-一键逆向后如何导入-blender" tabindex="-1">📥 一键逆向后如何导入 Blender <a class="header-anchor" href="#📥-一键逆向后如何导入-blender" aria-label="Permalink to “📥 一键逆向后如何导入 Blender”">​</a></h1><p>一键逆向后会自动弹出来逆向好的 Mod 文件夹：</p><p><img${ssrRenderAttr("src", _imports_0)} alt="alt text"></p><p>里面包含了逆向好的模型以及转换过的贴图。</p><p>此时我们打开 Blender，点开 <strong>TheHerta</strong> 插件的<strong>Sword</strong>侧边栏面板，点击【一键导入逆向出来的全部模型】：</p><p><img${ssrRenderAttr("src", _imports_1)} alt="alt text"></p><p>稍等过后，全部模型都被导入成功了：</p><p><img${ssrRenderAttr("src", _imports_2)} alt="alt text"></p><h1 id="🎨-逆向出来的-mod-模型如何上贴图" tabindex="-1">🎨 逆向出来的 Mod 模型如何上贴图 <a class="header-anchor" href="#🎨-逆向出来的-mod-模型如何上贴图" aria-label="Permalink to “🎨 逆向出来的 Mod 模型如何上贴图”">​</a></h1><p>手动在 Shading 中上贴图已经过时了。我们 Mod 逆向成功，导入模型到 Blender 之后，可以通过插件的功能非常方便的快速上贴图。</p><p>首先我们切换到 <strong>材质模式</strong>。</p><p><img${ssrRenderAttr("src", _imports_3)} alt="alt text"></p><p>选中要上贴图的模型，选中要上的贴图，在下方点击 【Apply Image to Selected Objects】 即可将贴图列表中的贴图，快速贴上显示：</p><p><img${ssrRenderAttr("src", _imports_4)} alt="alt text"></p><p>嗯，可以看到这里上贴图之后，整个都是错误的，且有很多小纹路，这是因为 <strong>数据类型不正确</strong> 导致的。</p><p><img${ssrRenderAttr("src", _imports_5)} alt="alt text"></p><blockquote><p>⚠️ <strong>注意</strong>：在下一节内容中我们将讨论数据类型问题，在本节中我们主要演示自动上贴图的步骤。</p></blockquote><p>这里需要注意的是，这里的贴图是 Mod 逆向后打开的文件夹中被转换好的贴图。</p><p>上贴图我们一般只上一个 <strong>Diffuse</strong> 贴图就够用了，如果你需要用到其他的贴图，那么最好还是手动上比较好。</p><p>这个自动上贴图功能的目的就是为了快速上 DiffuseMap 贴图，方便显示，因为在 Mod 制作流程中一般只需要上这个 DiffuseMap 贴图。</p><blockquote><p>💡 <strong>小技巧</strong>：你可以同时选中多个模型来给他们快速上相同的贴图，操作步骤也是一样的。</p></blockquote></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/T004ImportIntoBlender/T004ImportIntoBlender.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const T004ImportIntoBlender = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  T004ImportIntoBlender as default
};
