import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"🛡️ IndexBuffer 膨胀混淆技术","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/BufferInflationObfuscation/BufferInflationObfuscation.md","filePath":"newbie/reverse/BufferInflationObfuscation/BufferInflationObfuscation.md"}');
const _sfc_main = { name: "newbie/reverse/BufferInflationObfuscation/BufferInflationObfuscation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="🛡️-indexbuffer-膨胀混淆技术" tabindex="-1">🛡️ IndexBuffer 膨胀混淆技术 <a class="header-anchor" href="#🛡️-indexbuffer-膨胀混淆技术" aria-label="Permalink to “🛡️ IndexBuffer 膨胀混淆技术”">​</a></h1><p><strong>IndexBuffer 膨胀混淆技术</strong>，指的是对于使用了分开 <code>drawindexed</code> 具体数值的 Mod，在 <code>IndexBuffer</code> 中塞入一些干扰数据。由于使用 <code>DrawIndexed</code> 可以精确控制具体从 IB 文件中使用哪些数字列表来进行 Draw，所以可以用避开塞入的干扰数据，只绘制正确的数据。</p><p>此时就达到了膨胀 IB 文件大小的效果，也改变了 IB 文件中的 <code>UniqueVertexCount</code> (所有具有唯一值的数字索引的总和) 的数量，使得自动化 Mod 逆向中的根据 <code>IndexBuffer</code> 的 <code>Total UniqueVertexCount</code> 和 <code>ResourceVBList</code> 进行匹配的时候无法按照这个数值进行精确匹配，达到干扰自动化 Mod 逆向的效果。</p><h2 id="🛠️-解决方案-1" tabindex="-1">🛠️ 解决方案 1 <a class="header-anchor" href="#🛠️-解决方案-1" aria-label="Permalink to “🛠️ 解决方案 1”">​</a></h2><ol><li><strong>分类列表</strong>：实际操作过程中，先把能够精确匹配的放到一个列表，然后把不能精确匹配的放到剩余的列表，后续的步骤只对剩余的列表进行操作。</li><li><strong>统计数值</strong>：根据 <code>ini</code> 中绘制的 <code>DrawIndexed</code> 的范围，截取出 <code>Index Buffer</code> 文件中对应的数字列表，统计出一个最大值，统计出一个 <code>UniqueVertexCount</code> 的总和。</li><li><strong>过滤列表</strong>：在所有可能的 <code>ResourceVBList</code> 中，先过滤掉最大值小于上面统计的最大值的 <code>ResourceVBList</code>。</li><li><strong>二次过滤</strong>：再过滤掉这些 <code>ResourceVBList</code> 的顶点数小于 <code>UniqueVertexCount</code> 的总和的，此时剩余的所有满足条件的 <code>ResourceVBList</code> 都作为一个可能出现的 Mod 类型参与后续的文件输出步骤。</li></ol><h2 id="🛠️-解决方案-2" tabindex="-1">🛠️ 解决方案 2 <a class="header-anchor" href="#🛠️-解决方案-2" aria-label="Permalink to “🛠️ 解决方案 2”">​</a></h2><ul><li><strong>手动逆向</strong>：使用手动逆向脚本，精确指定 IB 文件和 Buffer 文件，可直接绕过顶点数匹配问题。</li></ul><h1 id="🛡️-categorybuffer-膨胀混淆技术" tabindex="-1">🛡️ CategoryBuffer 膨胀混淆技术 <a class="header-anchor" href="#🛡️-categorybuffer-膨胀混淆技术" aria-label="Permalink to “🛡️ CategoryBuffer 膨胀混淆技术”">​</a></h1><p><strong>CategoryBuffer 混淆技术</strong> 指的是，由于在 3Dmigoto 的 Buffer 文件中，读取 Buffer 文件是按照 <code>Stride</code> 读取的，然后传递到 Shader 之后，Shader 只会读取自己定义的那部分 <code>stride</code> 而不会读取额外的 <code>stride</code>，这样在生成 Mod 时就可以加入长度混淆，使得 Mod 逆向时使用的数据类型和在游戏中提取原模型时使用的数据类型不一致，达到干扰 Mod 逆向的效果。</p><h2 id="🛠️-解决方案-1-1" tabindex="-1">🛠️ 解决方案 1 <a class="header-anchor" href="#🛠️-解决方案-1-1" aria-label="Permalink to “🛠️ 解决方案 1”">​</a></h2><ul><li><strong>新增数据类型</strong>：先提取游戏原模型，得到正确的数据类型，在此基础上新增加入了额外若干 <code>TEXCOORD.xy</code> 的数据类型，使得 <code>stride</code> 能够匹配，从而能够正常逆向。</li></ul><h2 id="🛠️-解决方案-2-1" tabindex="-1">🛠️ 解决方案 2 <a class="header-anchor" href="#🛠️-解决方案-2-1" aria-label="Permalink to “🛠️ 解决方案 2”">​</a></h2><ul><li><strong>手动逆向</strong>：使用手动逆向脚本，和上面一样手搓一个额外的数据类型来逆向。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/BufferInflationObfuscation/BufferInflationObfuscation.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BufferInflationObfuscation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  BufferInflationObfuscation as default
};
