import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/MIMITools/assets/image.CfuKgYh8.png";
const _imports_1 = "/MIMITools/assets/image-21.Cctx-x0I.png";
const _imports_2 = "/MIMITools/assets/image-22.CUp1hKJB.png";
const _imports_3 = "/MIMITools/assets/image-23.Bk4B_W8v.png";
const _imports_4 = "/MIMITools/assets/image-24.BZpugG2n.png";
const _imports_5 = "/MIMITools/assets/image-25.Bw87H3JG.png";
const _imports_6 = "/MIMITools/assets/image-26.COYO5mjm.png";
const _imports_7 = "/MIMITools/assets/image-27.gujTdWSp.png";
const _imports_8 = "/MIMITools/assets/image-28.Is6k4gtu.png";
const _imports_9 = "/MIMITools/assets/image-29.DZvwyNw7.png";
const _imports_10 = "/MIMITools/assets/image-30.Bosn3tUR.png";
const _imports_11 = "/MIMITools/assets/image-31.UxZY5lJz.png";
const _imports_12 = "/MIMITools/assets/15358a20f54fd9f6f70397f90530563d_720.CirCupA5.png";
const _imports_13 = "/MIMITools/assets/366f90e87bc3d8fc649e5f8611975803_720.Dt09a5iz.png";
const _imports_14 = "/MIMITools/assets/image-1.ByTeTID3.png";
const _imports_15 = "/MIMITools/assets/image-2.CqCcEs4R.png";
const __pageData = JSON.parse('{"title":"🔍 排除并筛选正确的数据类型","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/T005UseCorrectDataType/T005UseCorrectDataType.md","filePath":"newbie/reverse/T005UseCorrectDataType/T005UseCorrectDataType.md"}');
const _sfc_main = { name: "newbie/reverse/T005UseCorrectDataType/T005UseCorrectDataType.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="warning custom-block"><p class="custom-block-title">⚠️ 版本差异提示</p><p>在 <strong>TheHerta3</strong> 版本更新后，<code>逆向后导入</code> 和 <code>自动上贴图</code> 面板已移动至侧边栏的 <strong><code>Sword</code></strong> 选项卡中。 本文档截图使用的是旧版本，操作流程基本一致，请根据实际界面进行调整。</p></div><p><img${ssrRenderAttr("src", _imports_0)} alt="alt text"></p><h1 id="🔍-排除并筛选正确的数据类型" tabindex="-1">🔍 排除并筛选正确的数据类型 <a class="header-anchor" href="#🔍-排除并筛选正确的数据类型" aria-label="Permalink to “🔍 排除并筛选正确的数据类型”">​</a></h1><div class="danger custom-block"><p class="custom-block-title">🚨 遇到的问题</p><p>在上一节中，我们在应用贴图后发现显示异常（如下图所示）。 这通常是由于 <strong>❌ 数据类型不正确</strong> 导致的。</p></div><p><img${ssrRenderAttr("src", _imports_1)} alt="贴图不对"></p><div class="info custom-block"><p class="custom-block-title">💡 原理解析：全量逆向策略</p><p>Mod 逆向工具会自动分析 Buffer 文件中 <strong>所有可能的数据类型</strong>，并将它们 <strong>全部导出</strong>，以确保没有遗漏。</p></div><p>现在我们回头查看之前逆向生成的文件夹：</p><p><img${ssrRenderAttr("src", _imports_2)} alt="文件夹结构"></p><div class="tip custom-block"><p class="custom-block-title">📂 文件夹命名规则</p><p>每个文件夹的名称由三部分组成：</p><ol><li><strong><code>8 位 Hash 值</code></strong> (代表模型集合/Collection)</li><li><strong><code>_</code></strong> (下划线)</li><li><strong><code>数据类型名称</code></strong></li></ol></div><p>由于工具分析出了多种可能的数据类型，你会看到多个具有 <strong>相同 Hash 前缀</strong> 但 <strong>后缀不同</strong> 的文件夹。</p><p><img${ssrRenderAttr("src", _imports_3)} alt="多数据类型"></p><div class="warning custom-block"><p class="custom-block-title">🎯 核心目标</p><p>在这些选项中，通常 <strong>只有一个数据类型是正确的</strong> ✅。 我们需要 <strong>筛选并保留</strong> 正确的数据类型，<strong>排除</strong> 错误的 ❎。</p></div><hr><h2 id="🛠️-筛选步骤详解" tabindex="-1">🛠️ 筛选步骤详解 <a class="header-anchor" href="#🛠️-筛选步骤详解" aria-label="Permalink to “🛠️ 筛选步骤详解”">​</a></h2><p>首先回到 Blender，查看导入后的集合结构：</p><p><img${ssrRenderAttr("src", _imports_4)} alt="Blender 集合"></p><p>每个白色集合对应一个逆向导出的子文件夹。我们只需删除名称对应错误数据类型的集合，即可排除错误的模型。</p><h3 id="❓-如何分辨数据类型是否错误" tabindex="-1">❓ 如何分辨数据类型是否错误？ <a class="header-anchor" href="#❓-如何分辨数据类型是否错误" aria-label="Permalink to “❓ 如何分辨数据类型是否错误？”">​</a></h3><p>回顾刚才贴图错乱的效果，我们可以通过 <strong>检查 UV</strong> 来确认。</p><p><img${ssrRenderAttr("src", _imports_5)} alt="分辨错误"></p><div class="tip custom-block"><p class="custom-block-title">👁️ 检查方法</p><p>打开 <strong>UV 编辑器</strong> 查看：</p></div><p><img${ssrRenderAttr("src", _imports_6)} alt="UV 检查"></p><div class="danger custom-block"><p class="custom-block-title">❌ 错误特征</p><p>可以看到 <strong>UV 映射完全混乱</strong> (炸了)，说明该数据类型是 <strong>错误的</strong>。 我们需要 <strong>删除</strong> 这个错误的集合。</p></div><p><img${ssrRenderAttr("src", _imports_7)} alt="删除错误集合"></p><p>对于 <code>9e396d3e</code>，剩余两个候选数据类型。继续检查 UV：</p><p><img${ssrRenderAttr("src", _imports_8)} alt="继续检查"></p><p>发现其中一个的 <strong>第二套 UV</strong> 是错误的，而另一个的 <strong>所有 UV 均正常</strong>：</p><p><img${ssrRenderAttr("src", _imports_9)} alt="正确 UV"></p><div class="tip custom-block"><p class="custom-block-title">✅ 最终筛选</p><p>排除错误选项后，保留 <strong>唯一的正确数据类型</strong>：</p></div><p><img${ssrRenderAttr("src", _imports_10)} alt="最终结果"></p><p>此时，<strong>自动上贴图</strong> 的结果就正常了 ✨。</p><p>对于 <code>a702451c</code> 也是同理，删除 UV 错误的那个数据类型。</p><p><img${ssrRenderAttr("src", _imports_11)} alt="同理操作"></p><p>最后得到的结果就可以直接使用了 🎉。</p><hr><h2 id="🚧-重要注意事项-多层-uv-陷阱" tabindex="-1">🚧 重要注意事项：多层 UV 陷阱 <a class="header-anchor" href="#🚧-重要注意事项-多层-uv-陷阱" aria-label="Permalink to “🚧 重要注意事项：多层 UV 陷阱”">​</a></h2><div class="warning custom-block"><p class="custom-block-title">🧐 为什么只看第一层 UV 不够？</p><p>在上述演示中，我们主要通过第一套 UV 进行判断。 但在实际操作中，可能会遇到 <strong>多个数据类型的第一套 UV 看起来都正确且相同</strong> 的情况。</p></div><p>此时，我们需要检查模型的 <strong>其他 UV 层</strong>。</p><p>如下图所示，选中模型后，默认显示的第一套 UV 均正常，无法直接区分正确的数据类型。</p><p><img${ssrRenderAttr("src", _imports_12)} alt="alt text"></p><p><img${ssrRenderAttr("src", _imports_13)} alt="alt text"></p><div class="tip custom-block"><p class="custom-block-title">🕵️‍♀️ 进阶检查步骤</p><ol><li>选中模型。</li><li>进入右下角绿色的 <strong><code>Data</code></strong> 属性面板。</li><li>找到 <strong><code>UV Maps</code></strong> 选项。</li></ol></div><p><img${ssrRenderAttr("src", _imports_14)} alt="alt text"></p><p>切换到其他 UV 层（如 <code>UVMap.001</code>, <code>UVMap.002</code> 等），逐个对比不同数据类型的表现，最终筛选出 <strong>完全正确</strong> 的那个：</p><p><img${ssrRenderAttr("src", _imports_15)} alt="alt text"></p><div class="info custom-block"><p class="custom-block-title">📝 总结</p><p>实战中 <strong>不能仅依赖第一套 UV</strong>，必须 <strong>全面检查所有 UV 层</strong>。 注重细节，才能制作出高质量的 Mod！ 🚀</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/T005UseCorrectDataType/T005UseCorrectDataType.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const T005UseCorrectDataType = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  T005UseCorrectDataType as default
};
