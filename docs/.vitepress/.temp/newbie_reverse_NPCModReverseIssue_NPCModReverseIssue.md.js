import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/MIMITools/assets/image.OJYC3Imm.png";
const _imports_1 = "/MIMITools/assets/image-1.DJ6csQ8_.png";
const _imports_2 = "/MIMITools/assets/image-2.-2liYxsq.png";
const _imports_3 = "/MIMITools/assets/image-3.xqakBPZx.png";
const _imports_4 = "/MIMITools/assets/image-4.BqmAOWGp.png";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"newbie/reverse/NPCModReverseIssue/NPCModReverseIssue.md","filePath":"newbie/reverse/NPCModReverseIssue/NPCModReverseIssue.md"}');
const _sfc_main = { name: "newbie/reverse/NPCModReverseIssue/NPCModReverseIssue.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>查看Mod文件：</p><p><img${ssrRenderAttr("src", _imports_0)} alt="alt text"></p><p>可以看到这个绝区零Mod的远距离是加了low标识的，代表低模的意思，这时候一键逆向发现只有贴图文件而没有模型文件，然后我们去查看日志发现如下：</p><p><img${ssrRenderAttr("src", _imports_1)} alt="alt text"></p><p>所有的数据类型都匹配失败了，核心的原因是Resource列表的大小为6，这个正常应该为3，这说明资源列表翻倍了。</p><p>由于我们的逆向程序是根据顶点数对资源进行区分的，这时资源列表大小翻倍，说明有两个Hash的Mod使用了同样大小顶点数的Buffer文件，说明是把近距离和远距离写在了一个ini中，所以程序无法自动识别。</p><p>这时候需要我们去手动的拆分ini，其核心原理就是把一个整合在一起的ini拆分为两个分离的ini，分别代表远距离和近距离两个Mod的ini。</p><p>原始ini内容如下：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({ "--shiki-light": "#24292e", "--shiki-dark": "#e1e4e8", "--shiki-light-bg": "#fff", "--shiki-dark-bg": "#24292e" })}" tabindex="0" dir="ltr"><code><span class="line"><span>; Industryworker</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; Constants -------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; Overrides -------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyPosition]</span></span>
<span class="line"><span>;hash = 37930693</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;vb0 = ResourceIndustryworkerbodyPosition</span></span>
<span class="line"><span>;vb2 = ResourceIndustryworkerbodyBlend</span></span>
<span class="line"><span>;draw = 469,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyTexcoord]</span></span>
<span class="line"><span>;hash = e277bcbf</span></span>
<span class="line"><span>;vb1 = ResourceIndustryworkerbodyTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyVertexLimitRaise]</span></span>
<span class="line"><span>;hash = 5b9e8b18</span></span>
<span class="line"><span>;match_priority = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressPosition]</span></span>
<span class="line"><span>hash = 75c94bf2</span></span>
<span class="line"><span>handling = skip</span></span>
<span class="line"><span>vb0 = ResourceIndustryworkerdressPosition</span></span>
<span class="line"><span>vb2 = ResourceIndustryworkerdressBlend</span></span>
<span class="line"><span>draw = 11233,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressTexcoord]</span></span>
<span class="line"><span>hash = 74ba7d57</span></span>
<span class="line"><span>vb1 = ResourceIndustryworkerdressTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressVertexLimitRaise]</span></span>
<span class="line"><span>hash = 85302f03</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyIB]</span></span>
<span class="line"><span>;hash = f3968c4d</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;drawindexed = auto</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyA]</span></span>
<span class="line"><span>;hash = f3968c4d</span></span>
<span class="line"><span>;match_first_index = 0</span></span>
<span class="line"><span>;run = CommandListSkinTexture</span></span>
<span class="line"><span>;ib = ResourceIndustryworkerbodyAIB</span></span>
<span class="line"><span>;ps-t3 = ResourceIndustryworkerbodyADiffuse</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressIB]</span></span>
<span class="line"><span>hash = 28b78808</span></span>
<span class="line"><span>handling = skip</span></span>
<span class="line"><span>drawindexed = auto</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressA]</span></span>
<span class="line"><span>hash = 28b78808</span></span>
<span class="line"><span>match_first_index = 0</span></span>
<span class="line"><span>run = CommandListSkinTexture</span></span>
<span class="line"><span>ib = ResourceIndustryworkerdressAIB</span></span>
<span class="line"><span>ps-t3 = ResourceIndustryworkerdressADiffuse</span></span>
<span class="line"><span>ps-t4 = ResourceIndustryworkerdressANormalMap</span></span>
<span class="line"><span>ps-t5 = ResourceIndustryworkerdressAMaterialMap</span></span>
<span class="line"><span>ps-t6 = ResourceIndustryworkerdressALightMap</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyPosition]</span></span>
<span class="line"><span>;hash = 879c2402</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;vb0 = ResourceIndustryworker-lowbodyPosition</span></span>
<span class="line"><span>;vb2 = ResourceIndustryworker-lowbodyBlend</span></span>
<span class="line"><span>;draw = 310,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyTexcoord]</span></span>
<span class="line"><span>;hash = 02195f3d</span></span>
<span class="line"><span>;vb1 = ResourceIndustryworker-lowbodyTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyVertexLimitRaise]</span></span>
<span class="line"><span>;hash = f9935fa0</span></span>
<span class="line"><span>;match_priority = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressPosition]</span></span>
<span class="line"><span>hash = 75d732d2</span></span>
<span class="line"><span>handling = skip</span></span>
<span class="line"><span>vb0 = ResourceIndustryworker-lowdressPosition</span></span>
<span class="line"><span>vb2 = ResourceIndustryworker-lowdressBlend</span></span>
<span class="line"><span>draw = 11233,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressTexcoord]</span></span>
<span class="line"><span>hash = 22b7e0cf</span></span>
<span class="line"><span>vb1 = ResourceIndustryworker-lowdressTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressVertexLimitRaise]</span></span>
<span class="line"><span>hash = 008c6ff0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyIB]</span></span>
<span class="line"><span>;hash = 9a37c5b5</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;drawindexed = auto</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyA]</span></span>
<span class="line"><span>;hash = 9a37c5b5</span></span>
<span class="line"><span>;match_first_index = 0</span></span>
<span class="line"><span>;run = CommandListSkinTexture</span></span>
<span class="line"><span>;ib = ResourceIndustryworker-lowbodyAIB</span></span>
<span class="line"><span>;ps-t3 = ResourceIndustryworkerbodyADiffuse</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressIB]</span></span>
<span class="line"><span>hash = 1b6ef5ee</span></span>
<span class="line"><span>handling = skip</span></span>
<span class="line"><span>drawindexed = auto</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressA]</span></span>
<span class="line"><span>hash = 1b6ef5ee</span></span>
<span class="line"><span>match_first_index = 0</span></span>
<span class="line"><span>run = CommandListSkinTexture</span></span>
<span class="line"><span>ib = ResourceIndustryworker-lowdressAIB</span></span>
<span class="line"><span>ps-t3 = ResourceIndustryworkerdressADiffuse</span></span>
<span class="line"><span>ps-t4 = ResourceIndustryworkerdressANormalMap</span></span>
<span class="line"><span>ps-t5 = ResourceIndustryworkerdressAMaterialMap</span></span>
<span class="line"><span>ps-t6 = ResourceIndustryworkerdressALightMap</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; CommandList -----------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; Resources -------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyPosition]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 40</span></span>
<span class="line"><span>filename = IndustryworkerbodyPosition.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyBlend]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 32</span></span>
<span class="line"><span>filename = IndustryworkerbodyBlend.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyTexcoord]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 20</span></span>
<span class="line"><span>filename = IndustryworkerbodyTexcoord.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressPosition]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 40</span></span>
<span class="line"><span>filename = IndustryworkerdressPosition.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressBlend]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 32</span></span>
<span class="line"><span>filename = IndustryworkerdressBlend.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressTexcoord]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 20</span></span>
<span class="line"><span>filename = IndustryworkerdressTexcoord.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyAIB]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>format = DXGI_FORMAT_R32_UINT</span></span>
<span class="line"><span>filename = IndustryworkerbodyA.ib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressAIB]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>format = DXGI_FORMAT_R32_UINT</span></span>
<span class="line"><span>filename = IndustryworkerdressA.ib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowbodyPosition]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 40</span></span>
<span class="line"><span>filename = Industryworker-lowbodyPosition.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowbodyBlend]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 32</span></span>
<span class="line"><span>filename = Industryworker-lowbodyBlend.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowbodyTexcoord]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 20</span></span>
<span class="line"><span>filename = Industryworker-lowbodyTexcoord.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowdressPosition]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 40</span></span>
<span class="line"><span>filename = Industryworker-lowdressPosition.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowdressBlend]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 32</span></span>
<span class="line"><span>filename = Industryworker-lowdressBlend.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowdressTexcoord]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 20</span></span>
<span class="line"><span>filename = Industryworker-lowdressTexcoord.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowbodyAIB]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>format = DXGI_FORMAT_R32_UINT</span></span>
<span class="line"><span>filename = Industryworker-lowbodyA.ib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowdressAIB]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>format = DXGI_FORMAT_R32_UINT</span></span>
<span class="line"><span>filename = Industryworker-lowdressA.ib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyADiffuse]</span></span>
<span class="line"><span>filename = IndustryworkerbodyADiffuse.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressADiffuse]</span></span>
<span class="line"><span>filename = IndustryworkerdressADiffuse.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressANormalMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressANormalMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressAMaterialMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressAMaterialMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressALightMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressALightMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>; .ini generated by XXMI (XX-Model-Importer)</span></span>
<span class="line"><span>; If you have any issues or find any bugs, please open a ticket at https://github.com/SilentNightSound/GI-Model-Importer/issues or contact SilentNightSound#7430 on discord</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br></div></div><p>拆出来的近距离Modini如下：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({ "--shiki-light": "#24292e", "--shiki-dark": "#e1e4e8", "--shiki-light-bg": "#fff", "--shiki-dark-bg": "#24292e" })}" tabindex="0" dir="ltr"><code><span class="line"><span>; Industryworker</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; Constants -------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; Overrides -------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyPosition]</span></span>
<span class="line"><span>;hash = 37930693</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;vb0 = ResourceIndustryworkerbodyPosition</span></span>
<span class="line"><span>;vb2 = ResourceIndustryworkerbodyBlend</span></span>
<span class="line"><span>;draw = 469,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyTexcoord]</span></span>
<span class="line"><span>;hash = e277bcbf</span></span>
<span class="line"><span>;vb1 = ResourceIndustryworkerbodyTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyVertexLimitRaise]</span></span>
<span class="line"><span>;hash = 5b9e8b18</span></span>
<span class="line"><span>;match_priority = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressPosition]</span></span>
<span class="line"><span>hash = 75c94bf2</span></span>
<span class="line"><span>handling = skip</span></span>
<span class="line"><span>vb0 = ResourceIndustryworkerdressPosition</span></span>
<span class="line"><span>vb2 = ResourceIndustryworkerdressBlend</span></span>
<span class="line"><span>draw = 11233,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressTexcoord]</span></span>
<span class="line"><span>hash = 74ba7d57</span></span>
<span class="line"><span>vb1 = ResourceIndustryworkerdressTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressVertexLimitRaise]</span></span>
<span class="line"><span>hash = 85302f03</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyIB]</span></span>
<span class="line"><span>;hash = f3968c4d</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;drawindexed = auto</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyA]</span></span>
<span class="line"><span>;hash = f3968c4d</span></span>
<span class="line"><span>;match_first_index = 0</span></span>
<span class="line"><span>;run = CommandListSkinTexture</span></span>
<span class="line"><span>;ib = ResourceIndustryworkerbodyAIB</span></span>
<span class="line"><span>;ps-t3 = ResourceIndustryworkerbodyADiffuse</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressIB]</span></span>
<span class="line"><span>hash = 28b78808</span></span>
<span class="line"><span>handling = skip</span></span>
<span class="line"><span>drawindexed = auto</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworkerdressA]</span></span>
<span class="line"><span>hash = 28b78808</span></span>
<span class="line"><span>match_first_index = 0</span></span>
<span class="line"><span>run = CommandListSkinTexture</span></span>
<span class="line"><span>ib = ResourceIndustryworkerdressAIB</span></span>
<span class="line"><span>ps-t3 = ResourceIndustryworkerdressADiffuse</span></span>
<span class="line"><span>ps-t4 = ResourceIndustryworkerdressANormalMap</span></span>
<span class="line"><span>ps-t5 = ResourceIndustryworkerdressAMaterialMap</span></span>
<span class="line"><span>ps-t6 = ResourceIndustryworkerdressALightMap</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyPosition]</span></span>
<span class="line"><span>;hash = 879c2402</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;vb0 = ResourceIndustryworker-lowbodyPosition</span></span>
<span class="line"><span>;vb2 = ResourceIndustryworker-lowbodyBlend</span></span>
<span class="line"><span>;draw = 310,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyTexcoord]</span></span>
<span class="line"><span>;hash = 02195f3d</span></span>
<span class="line"><span>;vb1 = ResourceIndustryworker-lowbodyTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyVertexLimitRaise]</span></span>
<span class="line"><span>;hash = f9935fa0</span></span>
<span class="line"><span>;match_priority = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyPosition]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 40</span></span>
<span class="line"><span>filename = IndustryworkerbodyPosition.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyBlend]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 32</span></span>
<span class="line"><span>filename = IndustryworkerbodyBlend.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyTexcoord]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 20</span></span>
<span class="line"><span>filename = IndustryworkerbodyTexcoord.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressPosition]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 40</span></span>
<span class="line"><span>filename = IndustryworkerdressPosition.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressBlend]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 32</span></span>
<span class="line"><span>filename = IndustryworkerdressBlend.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressTexcoord]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 20</span></span>
<span class="line"><span>filename = IndustryworkerdressTexcoord.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyAIB]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>format = DXGI_FORMAT_R32_UINT</span></span>
<span class="line"><span>filename = IndustryworkerbodyA.ib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressAIB]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>format = DXGI_FORMAT_R32_UINT</span></span>
<span class="line"><span>filename = IndustryworkerdressA.ib</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyADiffuse]</span></span>
<span class="line"><span>filename = IndustryworkerbodyADiffuse.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressADiffuse]</span></span>
<span class="line"><span>filename = IndustryworkerdressADiffuse.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressANormalMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressANormalMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressAMaterialMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressAMaterialMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressALightMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressALightMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>; .ini generated by XXMI (XX-Model-Importer)</span></span>
<span class="line"><span>; If you have any issues or find any bugs, please open a ticket at https://github.com/SilentNightSound/GI-Model-Importer/issues or contact SilentNightSound#7430 on discord</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br></div></div><p>拆出来的远距离Mod ini如下：</p><p><img${ssrRenderAttr("src", _imports_2)} alt="alt text"></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({ "--shiki-light": "#24292e", "--shiki-dark": "#e1e4e8", "--shiki-light-bg": "#fff", "--shiki-dark-bg": "#24292e" })}" tabindex="0" dir="ltr"><code><span class="line"><span></span></span>
<span class="line"><span>; Industryworker</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; Constants -------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; Overrides -------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyPosition]</span></span>
<span class="line"><span>;hash = 37930693</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;vb0 = ResourceIndustryworkerbodyPosition</span></span>
<span class="line"><span>;vb2 = ResourceIndustryworkerbodyBlend</span></span>
<span class="line"><span>;draw = 469,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyTexcoord]</span></span>
<span class="line"><span>;hash = e277bcbf</span></span>
<span class="line"><span>;vb1 = ResourceIndustryworkerbodyTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworkerbodyVertexLimitRaise]</span></span>
<span class="line"><span>;hash = 5b9e8b18</span></span>
<span class="line"><span>;match_priority = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyPosition]</span></span>
<span class="line"><span>;hash = 879c2402</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;vb0 = ResourceIndustryworker-lowbodyPosition</span></span>
<span class="line"><span>;vb2 = ResourceIndustryworker-lowbodyBlend</span></span>
<span class="line"><span>;draw = 310,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyTexcoord]</span></span>
<span class="line"><span>;hash = 02195f3d</span></span>
<span class="line"><span>;vb1 = ResourceIndustryworker-lowbodyTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyVertexLimitRaise]</span></span>
<span class="line"><span>;hash = f9935fa0</span></span>
<span class="line"><span>;match_priority = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressPosition]</span></span>
<span class="line"><span>hash = 75d732d2</span></span>
<span class="line"><span>handling = skip</span></span>
<span class="line"><span>vb0 = ResourceIndustryworker-lowdressPosition</span></span>
<span class="line"><span>vb2 = ResourceIndustryworker-lowdressBlend</span></span>
<span class="line"><span>draw = 11233,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressTexcoord]</span></span>
<span class="line"><span>hash = 22b7e0cf</span></span>
<span class="line"><span>vb1 = ResourceIndustryworker-lowdressTexcoord</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressVertexLimitRaise]</span></span>
<span class="line"><span>hash = 008c6ff0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyIB]</span></span>
<span class="line"><span>;hash = 9a37c5b5</span></span>
<span class="line"><span>;handling = skip</span></span>
<span class="line"><span>;drawindexed = auto</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[TextureOverrideIndustryworker-lowbodyA]</span></span>
<span class="line"><span>;hash = 9a37c5b5</span></span>
<span class="line"><span>;match_first_index = 0</span></span>
<span class="line"><span>;run = CommandListSkinTexture</span></span>
<span class="line"><span>;ib = ResourceIndustryworker-lowbodyAIB</span></span>
<span class="line"><span>;ps-t3 = ResourceIndustryworkerbodyADiffuse</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressIB]</span></span>
<span class="line"><span>hash = 1b6ef5ee</span></span>
<span class="line"><span>handling = skip</span></span>
<span class="line"><span>drawindexed = auto</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[TextureOverrideIndustryworker-lowdressA]</span></span>
<span class="line"><span>hash = 1b6ef5ee</span></span>
<span class="line"><span>match_first_index = 0</span></span>
<span class="line"><span>run = CommandListSkinTexture</span></span>
<span class="line"><span>ib = ResourceIndustryworker-lowdressAIB</span></span>
<span class="line"><span>ps-t3 = ResourceIndustryworkerdressADiffuse</span></span>
<span class="line"><span>ps-t4 = ResourceIndustryworkerdressANormalMap</span></span>
<span class="line"><span>ps-t5 = ResourceIndustryworkerdressAMaterialMap</span></span>
<span class="line"><span>ps-t6 = ResourceIndustryworkerdressALightMap</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; CommandList -----------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; Resources -------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowbodyPosition]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 40</span></span>
<span class="line"><span>filename = Industryworker-lowbodyPosition.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowbodyBlend]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 32</span></span>
<span class="line"><span>filename = Industryworker-lowbodyBlend.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowbodyTexcoord]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 20</span></span>
<span class="line"><span>filename = Industryworker-lowbodyTexcoord.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowdressPosition]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 40</span></span>
<span class="line"><span>filename = Industryworker-lowdressPosition.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowdressBlend]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 32</span></span>
<span class="line"><span>filename = Industryworker-lowdressBlend.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowdressTexcoord]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>stride = 20</span></span>
<span class="line"><span>filename = Industryworker-lowdressTexcoord.buf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowbodyAIB]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>format = DXGI_FORMAT_R32_UINT</span></span>
<span class="line"><span>filename = Industryworker-lowbodyA.ib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworker-lowdressAIB]</span></span>
<span class="line"><span>type = Buffer</span></span>
<span class="line"><span>format = DXGI_FORMAT_R32_UINT</span></span>
<span class="line"><span>filename = Industryworker-lowdressA.ib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerbodyADiffuse]</span></span>
<span class="line"><span>filename = IndustryworkerbodyADiffuse.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressADiffuse]</span></span>
<span class="line"><span>filename = IndustryworkerdressADiffuse.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressANormalMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressANormalMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressAMaterialMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressAMaterialMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ResourceIndustryworkerdressALightMap]</span></span>
<span class="line"><span>filename = IndustryworkerdressALightMap.dds</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>; .ini generated by XXMI (XX-Model-Importer)</span></span>
<span class="line"><span>; If you have any issues or find any bugs, please open a ticket at https://github.com/SilentNightSound/GI-Model-Importer/issues or contact SilentNightSound#7430 on discord</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br></div></div><p>差分完成后得到了两个ini文件：</p><p><img${ssrRenderAttr("src", _imports_3)} alt="alt text"></p><p>分别点击一键逆向，就可以导入到Blender里进行查看了，到此逆向成功：</p><p><img${ssrRenderAttr("src", _imports_4)} alt="alt text"></p><p>下次再遇到类似的就可以手动进行ini拆分来，再使用一键逆向来进行逆向了。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("newbie/reverse/NPCModReverseIssue/NPCModReverseIssue.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NPCModReverseIssue = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  NPCModReverseIssue as default
};
