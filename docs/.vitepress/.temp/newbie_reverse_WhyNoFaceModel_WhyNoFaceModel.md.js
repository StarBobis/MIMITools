import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Mod模型里没有脸部模型?","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/WhyNoFaceModel/WhyNoFaceModel.md","filePath":"newbie/reverse/WhyNoFaceModel/WhyNoFaceModel.md"}');
const _sfc_main = { name: "newbie/reverse/WhyNoFaceModel/WhyNoFaceModel.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="mod模型里没有脸部模型" tabindex="-1">Mod模型里没有脸部模型? <a class="header-anchor" href="#mod模型里没有脸部模型" aria-label="Permalink to “Mod模型里没有脸部模型?”">​</a></h1><h2 id="mod模型提取出来之后缺少脸部模型" tabindex="-1">Mod模型提取出来之后缺少脸部模型？ <a class="header-anchor" href="#mod模型提取出来之后缺少脸部模型" aria-label="Permalink to “Mod模型提取出来之后缺少脸部模型？”">​</a></h2><p>逆向出来之后发现Mod里缺少脸部模型，这在以下游戏内很常见：</p><ul><li><code>原神</code></li><li><code>崩坏三</code></li><li><code>绝区零</code></li></ul><p>这是因为这些游戏的Mod制作中，脸部是CPU-PreSkinning类型，所以只能制作形态键Mod，这导致大部分作者都不会在Mod中包含脸部的替换，所以这些游戏的Mod逆向出来一般只有衣服</p><p>虽然 <code>崩坏:星穹铁道</code> 这个游戏可以修改脸部模型，但是由于修改脸部模型后，效果一般不是特别明显</p><p>所以大部分Mod作者都不会在Mod中制作脸部，所以说米哈游的四个游戏的3Dmigoto类型Mod逆向出来之后，一般都没有脸部模型</p><h2 id="如何补全脸部模型" tabindex="-1">如何补全脸部模型？ <a class="header-anchor" href="#如何补全脸部模型" aria-label="Permalink to “如何补全脸部模型？”">​</a></h2><p>第一种方式是从游戏中找IB然后Dump，然后提取游戏原本的脸的模型，但是这样提取出来大概率是没有形态键的</p><p>并且由于是CPU-PreSkinning，和身体的GPU-PreSkinning属于不同类型，使用的坐标系也不同，这意味着导入到Blender后的位置也是不同的，无法和身体、头发完美对应，仍然需要翻转。</p><p>第二种方式是从<code>模之屋 </code>中下载对应官方发布的原版MMD模型，将其脸部分离出来和Mod的模型结合使用。</p><p><a href="https://www.aplaybox.com/" target="_blank" rel="noreferrer">https://www.aplaybox.com/</a></p><p>第三种方式是解包游戏资源文件来获取脸部模型，难度较大且逆向圈子较为封闭，综合获取成本和难度都最高（不要问我相关内容，我不会也不了解）。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/WhyNoFaceModel/WhyNoFaceModel.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WhyNoFaceModel = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  WhyNoFaceModel as default
};
