# 鸣潮：逐贴图通道图解与建议提示词

选好下面的贴图类型，就可以查看 RGBA 通道的作用、数值示例和建议提示词。每个分区都提供两种模板：**只有 DiffuseMap**，或 **DiffuseMap＋Blender 导出的 UV 分布图**，可用于 ChatGPT 等支持参考图的图像模型。

如果手边有模型，建议一起提供 UV 图：模型会更容易辨认 UV 岛、边界和细条，通常有助于对齐。只有 Diffuse 也可以尝试；请补充皮肤、布料、裸金属或发光区域的文字说明。

这里的提示词是可调整的参考模板，数字是练习预设，不是角色原始参数。图解是教学示意，不是 AI 实测结果。生成后仍需检查尺寸、UV 和通道数值；UV 图也不能代替材质参数、几何法线或 SDF 方向信息。

## 找到你要生成的贴图

- [DiffuseMap / 颜色图](#map-diffuse)
- [packed N / 法线与高光控制](#map-normal)
- [身体 MaskTex](#map-bodymask)
- [头发 MaskTex / 已确认HM绑定](#map-hairmask)
- [TypeMask / 类型图](#map-typemask)
- [Eye EM / 眼部视差与高光](#map-eye-em)
- [HeightLightMap / 眼高光图](#map-highlight)
- [FaceMap / 脸部方向阴影图](#map-sdf)
- [独立 Mask / Stencil图](#map-independent-mask)
- [HN / HET / RGID / LD / FTM 逐类型定义](#map-unknown-assets)
- [Ramp / 漫反射色带](#map-ramp)
- [MatCap / 球面外观图](#map-matcap)
- [LUT / 精确布局与适用范围](#map-lut)

- [14. OutlineTexture / 描边颜色](#map-outline-color)
- [15. HeightLightTex / 未完成玻璃高光](#map-glass-highlight)
- [16. D / 声痕距离场](#map-tacet-field)
- [17. Noise / Noise02 声痕滚动噪声](#map-tacet-noise)
- [18. Second_RGB / 星空及极光](#map-secondary-stars)
- [19. CommonNoiseMap / 极光坐标扰动](#map-aurora-noise)
- [20. SDF / ShakeNoise 未使用声明槽](#map-unused-slots)

## 准备参考图

- **单图方式：** 上传对应材质的 DiffuseMap 颜色贴图，再复制该分区的单图模板。
- **双图方式：** 第一张上传 DiffuseMap，第二张上传同一材质、同一 UV 层的 UV 分布图，再复制双图模板。两张图保持相同宽高、方向和 0～1 范围，不裁切、不镜像，也不要把 UV 线直接画进 Diffuse。
- **Blender 导出：** 选中目标网格，进入编辑模式并选中该材质对应的面；在 UV 编辑器中选择正确的 UV 层，使用 **UV → 导出 UV 布局（Export UV Layout）**。尺寸设为 Diffuse 的宽高，填充不透明度设为 0，导出 PNG。若没有该选项，可在 Blender 的扩展/插件设置中启用 UV Layout。多材质请分别导出；UDIM 请注明 tile 编号，不要拼成截图。
- 可以下载本页的[教学 Diffuse](./assets/reference-inputs/diffuse.png)与[教学 UV 图](./assets/reference-inputs/uv.png)了解输入形式。它们是通用衣片示意；脸部或头发贴图请换成自己的对应材质参考图，不要用衣服 UV 代替。
- 模板按文中预设开始练习。想调整材质时，可以改预设数值，并补充“哪些区域是什么材质”；UV 只提供边界，不提供材质标签。

## 通道阅读小提示

- 数据值用0～255；线性UNORM中除以255得到0～1。字节128约0.502，若RGB被sRGB解码则约0.216，不能对控制图做自动Gamma或美化。Alpha通常不经过sRGB转换，仍要核对加载路径。
- 灰度白只意味着数值大：乘子、反向遮罩、材质ID、方向数据的“白”含义不同。下面逐图解释，不用一条规则概括。
- 只上传Diffuse时，材质分类是猜测。裸金属、丝袜、发光区域最好在文字里指出；不明区域有保守默认值，但它不恢复原角色ID。
- 合成预览可能受Alpha显示影响；灰度A图是真正的第四通道。下载各层后用取色器看字节，不靠预览颜色判断。

## 1. DiffuseMap / 颜色图 {#map-diffuse}

先看输入的蓝色衣片：颜色图里它就该是蓝色，R/G/B是颜色分量。到了控制图，同一片蓝布可能变成红橙色，那不是改了衣服颜色，而是几个控制值叠在一起。

![鸣潮 DiffuseMap / 颜色图 输入、输出与四通道示意](./assets/maps/diffuse/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/diffuse/diffuse.png) · [R灰度层](./assets/maps/diffuse/diffuse-r.png) · [G灰度层](./assets/maps/diffuse/diffuse-g.png) · [B灰度层](./assets/maps/diffuse/diffuse-b.png) · [A灰度层](./assets/maps/diffuse/diffuse-a.png)

**R怎么用：** R是基础颜色红分量，0最低、255最高。

**G怎么用：** G是基础颜色绿分量，0最低、255最高。

**B怎么用：** B是基础颜色蓝分量，0最低、255最高。

**A怎么用：** A在此版本可由UseMainTexA选为身体shadow_mask、由呼吸光阈值选发光区域、由UseTranslucent输出透明权重；头发Stencil也取A，不能共用一套填值。

颜色分量不是金属、高光或AO；不要增加新的方向光、投影和高光。

**采样依据：** [主贴图与分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L109-L118)、[呼吸发光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L486-L494)、[透明与Stencil](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L244-L340)。呼吸光为A≥EmissionBreathThreshold的区域开关，不是A直接乘发光强度；UseTranslucent输出A，头发Stencil可按0.8裁剪或直接输出A。_AlphaMode/_AlphaClipRate虽声明，此程序没有消费，不应声称已有通用AlphaClip。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成DiffuseMap / 颜色图的颜色贴图草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是基础颜色红分量，0最低、255最高；
G是基础颜色绿分量，0最低、255最高；
B是基础颜色蓝分量，0最低、255最高；
A在此版本可由UseMainTexA选为身体shadow_mask、由呼吸光阈值选发光区域、由UseTranslucent输出透明权重；头发Stencil也取A，不能共用一套填值。

本次明确采用的生成预设：本次生成同UV、不透明Diffuse颜色草稿：R/G/B按我给出的新配色修改，未指定改色时保留上传图的RGB颜色；
A固定255，不猜透明、发光或材质ID。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成DiffuseMap / 颜色图的颜色贴图草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是基础颜色红分量，0最低、255最高；
G是基础颜色绿分量，0最低、255最高；
B是基础颜色蓝分量，0最低、255最高；
A在此版本可由UseMainTexA选为身体shadow_mask、由呼吸光阈值选发光区域、由UseTranslucent输出透明权重；头发Stencil也取A，不能共用一套填值。

本次明确采用的生成预设：本次生成同UV、不透明Diffuse颜色草稿：R/G/B按我给出的新配色修改，未指定改色时保留上传图的RGB颜色；
A固定255，不猜透明、发光或材质ID。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

以 Diffuse 的像素画布为基准，用 UV 分布图核对岛轮廓、细条、边界与空白区域。UV 线是参考标记，不得画入结果，也不作为 AO、缝线、法线或高光。

若两图尺寸、朝向或岛位置不一致，请先让我确认，不自行缩放或对齐。

UV 图没有材质标签或几何方向；
未确认区域仍按上述预设，不据 UV 线推断真实法线、SDF 或材质 ID。
```

:::


**拿到结果先看：** 尺寸、UV边界和每通道数值，并检查 Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 2. packed N / 法线与高光控制 {#map-normal}

看R和G里的细小变化，方向信息藏在这些梯度里，而不是藏在“蓝紫色外观”里。平坦区域约128；从128向两侧偏移表示向不同切线方向倾斜，不是越白越凸。

![鸣潮 packed N / 法线与高光控制 输入、输出与四通道示意](./assets/maps/normal/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/normal/normal.png) · [R灰度层](./assets/maps/normal/normal-r.png) · [G灰度层](./assets/maps/normal/normal-g.png) · [B灰度层](./assets/maps/normal/normal-b.png) · [A灰度层](./assets/maps/normal/normal-a.png)

**R怎么用：** R编码切线法线X：0负方向、128附近零偏转、255正方向。

**G怎么用：** G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader。

**B怎么用：** B在该复刻≥128允许第一高光、≥217触发另一MatCap判断；≤216仍可走第二高光，不是单调粗糙度。

**A怎么用：** A身体普通高光乘1−A，0保留128约49.8%255抑制；同时参与非线性和MatCap，不是全反射单调控制。

**固定源码证据：** Normal_Roughness_Metallic的RG映射及B/A材质链，名称不等于标准ORM打包；[采样及消费1](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L113-L181)、[采样及消费2](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L575-L631)。这是固定社区实现的依据，不宣称原游戏全版本通用。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成packed N / 法线与高光控制的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；
G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；
B在该复刻≥128允许第一高光、≥217触发另一MatCap判断；
≤216仍可走第二高光，不是单调粗糙度；
A身体普通高光乘1−A，0保留128约49.8%255抑制；
同时参与非线性和MatCap，不是全反射单调控制。

本次明确采用的生成预设：固定复刻普通身体练习：平坦RG128，皮肤/布B=64抑制第一高光、普通饰件B=160允许第一高光，A=128弱权重，未知B64A128。不要把B填标准Z或G填金属。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

法线细节仅来自我明确指出的浅缝线、压边、扣件和发丝结构，不把Diffuse明暗转成高度，不新增织物噪点；
XY解码为2×值/255−1，保持X²+Y²≤1并按目标定义重建或填写Z，不能把方向极值当凹凸强度。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成packed N / 法线与高光控制的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；
G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；
B在该复刻≥128允许第一高光、≥217触发另一MatCap判断；
≤216仍可走第二高光，不是单调粗糙度；
A身体普通高光乘1−A，0保留128约49.8%255抑制；
同时参与非线性和MatCap，不是全反射单调控制。

本次明确采用的生成预设：固定复刻普通身体练习：平坦RG128，皮肤/布B=64抑制第一高光、普通饰件B=160允许第一高光，A=128弱权重，未知B64A128。不要把B填标准Z或G填金属。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

法线细节仅来自我明确指出的浅缝线、压边、扣件和发丝结构，不把Diffuse明暗转成高度，不新增织物噪点；
XY解码为2×值/255−1，保持X²+Y²≤1并按目标定义重建或填写Z，不能把方向极值当凹凸强度。

以 Diffuse 的像素画布为基准，用 UV 分布图核对岛轮廓、细条、边界与空白区域。UV 线是参考标记，不得画入结果，也不作为 AO、缝线、法线或高光。

若两图尺寸、朝向或岛位置不一致，请先让我确认，不自行缩放或对齐。

UV 图没有材质标签或几何方向；
未确认区域仍按上述预设，不据 UV 线推断真实法线、SDF 或材质 ID。
```

:::


**拿到结果先看：** 尺寸、UV边界和每通道数值，并检查 Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 3. 身体 MaskTex {#map-bodymask}

颜色图里的黑色腰带不该自动变成重遮蔽。AO应该对应结构重叠、接缝，而不是布料本身的颜色；灰度较白通常保留更多受光。

![鸣潮 身体 MaskTex 输入、输出与四通道示意](./assets/maps/bodymask/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/bodymask/bodymask.png) · [R灰度层](./assets/maps/bodymask/bodymask-r.png) · [G灰度层](./assets/maps/bodymask/bodymask-g.png) · [B灰度层](./assets/maps/bodymask/bodymask-b.png) · [A灰度层](./assets/maps/bodymask/bodymask-a.png)

**R怎么用：** R在当前身体着色结果中未消费，仅调试可显示；不是已确认的金属度。

**G怎么用：** G或Diffuse A按UseMainTexA选择为shadow_mask；增大通常更受光，26起允许常规高光内部门控，函数有下限。

**B怎么用：** B在当前MaskTex身体着色结果中未消费，仅调试可显示。

**A怎么用：** A在普通身体分支未消费；脸部SDF另取同一绑定的A，不能当身体透明度。

**采样依据：** [MaskTex和shadow_mask选择](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L113-L180)以及[常规阴影、高光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L330-L338)、[高光门控](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L498-L518)。G仅在UseMainTexA关闭时供给shadow_mask，正常正参数下增大受光乘子；shadow_mask≥0.1允许门控，但高光函数保留0.001下限，并不保证黑值完全无高光。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成身体 MaskTex的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在当前身体着色结果中未消费，仅调试可显示；不是已确认的金属度；
G或Diffuse A按UseMainTexA选择为shadow_mask；
增大通常更受光，26起允许常规高光内部门控，函数有下限；
B在当前MaskTex身体着色结果中未消费，仅调试可显示；
A在普通身体分支未消费；脸部SDF另取同一绑定的A，不能当身体透明度。

本次明确采用的生成预设：仅普通身体同UV练习：R0、B0、A255占位，G普通200、明确缝隙180；
UseMainTexA关闭，未确认身体用途不用于成品。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；
材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成身体 MaskTex的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在当前身体着色结果中未消费，仅调试可显示；不是已确认的金属度；
G或Diffuse A按UseMainTexA选择为shadow_mask；
增大通常更受光，26起允许常规高光内部门控，函数有下限；
B在当前MaskTex身体着色结果中未消费，仅调试可显示；
A在普通身体分支未消费；脸部SDF另取同一绑定的A，不能当身体透明度。

本次明确采用的生成预设：仅普通身体同UV练习：R0、B0、A255占位，G普通200、明确缝隙180；
UseMainTexA关闭，未确认身体用途不用于成品。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；
材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。

以 Diffuse 的像素画布为基准，用 UV 分布图核对岛轮廓、细条、边界与空白区域。UV 线是参考标记，不得画入结果，也不作为 AO、缝线、法线或高光。

若两图尺寸、朝向或岛位置不一致，请先让我确认，不自行缩放或对齐。

UV 图没有材质标签或几何方向；
未确认区域仍按上述预设，不据 UV 线推断真实法线、SDF 或材质 ID。
```

:::


**拿到结果先看：** 尺寸、UV边界和每通道数值，并检查 Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 4. 头发 MaskTex / 已确认HM绑定 {#map-hairmask}

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![鸣潮 头发 MaskTex / 已确认HM绑定 输入、输出与四通道示意](./assets/maps/hairmask/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/hairmask/hairmask.png) · [R灰度层](./assets/maps/hairmask/hairmask-r.png) · [G灰度层](./assets/maps/hairmask/hairmask-g.png) · [B灰度层](./assets/maps/hairmask/hairmask-b.png) · [A灰度层](./assets/maps/hairmask/hairmask-a.png)

**R怎么用：** R高光控制，0无该项、增大扩大或增强。

**G怎么用：** G增大通常提高受光偏移并改变Ramp混合，0/255不是全路径暗亮保证。

**B怎么用：** B在此HoyoToon头发结果中未消费，仅调试可显示；Gustling Waters的HM.B定位属于另一实现。

**A怎么用：** A在此HoyoToon头发结果中未消费，仅调试可显示；头发Stencil取Diffuse.A而非HM.A。

**采样依据：** [头发阴影与Ramp](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L341-L441)、[头发高光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L521-L536)和[头发调用](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L200-L205)。HM.R通过max(mask,1−N·H)构成高光带；HM.G改变阴影偏移、Ramp与≥0.05亮面门控。此定义限HoyoToon固定版本；新版Blender HN/HM定位链见后面的独立小节，不可混用。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成头发 MaskTex / 已确认HM绑定的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R高光控制，0无该项、增大扩大或增强；
G增大通常提高受光偏移并改变Ramp混合，0/255不是全路径暗亮保证；
B在此HoyoToon头发结果中未消费，仅调试可显示；Gustling Waters的HM.B定位属于另一实现；
A在此HoyoToon头发结果中未消费，仅调试可显示；头发Stencil取Diffuse.A而非HM.A。

本次明确采用的生成预设：头发岛RGBA(128,180,0,255)，背景(0,0,0,255)，沿发丝方向仅弱连续梯度；
不是发丝切线还原。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；
材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成头发 MaskTex / 已确认HM绑定的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R高光控制，0无该项、增大扩大或增强；
G增大通常提高受光偏移并改变Ramp混合，0/255不是全路径暗亮保证；
B在此HoyoToon头发结果中未消费，仅调试可显示；Gustling Waters的HM.B定位属于另一实现；
A在此HoyoToon头发结果中未消费，仅调试可显示；头发Stencil取Diffuse.A而非HM.A。

本次明确采用的生成预设：头发岛RGBA(128,180,0,255)，背景(0,0,0,255)，沿发丝方向仅弱连续梯度；
不是发丝切线还原。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；
材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。

以 Diffuse 的像素画布为基准，用 UV 分布图核对岛轮廓、细条、边界与空白区域。UV 线是参考标记，不得画入结果，也不作为 AO、缝线、法线或高光。

若两图尺寸、朝向或岛位置不一致，请先让我确认，不自行缩放或对齐。

UV 图没有材质标签或几何方向；
未确认区域仍按上述预设，不据 UV 线推断真实法线、SDF 或材质 ID。
```

:::


**拿到结果先看：** 尺寸、UV边界和每通道数值，并检查 Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 5. TypeMask / 类型图 {#map-typemask}

这张图是分类，不是照明。一个类别应保持在同一安全区间；画得很漂亮的渐变反而可能让像素跨到另一个材质组。

![鸣潮 TypeMask / 类型图 输入、输出与四通道示意](./assets/maps/typemask/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/typemask/typemask.png) · [R灰度层](./assets/maps/typemask/typemask-r.png) · [G灰度层](./assets/maps/typemask/typemask-g.png) · [B灰度层](./assets/maps/typemask/typemask-b.png) · [A灰度层](./assets/maps/typemask/typemask-a.png)

**R怎么用：** R在UseSkinMask=1时：0～127普通、128～229丝袜、230～255皮肤；无强度意义。

**G怎么用：** G传入脸路径的ramp_mask，但该参数没有参与最终输出；调试可显示。

**B怎么用：** B传入身体ramp_mask且按UseRampMask选择，但最终混合未使用该变量；调试可显示。

**A怎么用：** A仅被调试显示，未进入当前材质输出。

**采样依据：** [类型判断](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L53-L71)与[分支调用](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L113-L205)。线性8位输入且UseSkinMask=1时，R128…229为丝袜、230…255为皮肤；头发R先被顶点R覆盖。UseSkinMask=0改用顶点值且强制skin_id.x=0。G/B参数最终未参与颜色混合，见[shadow_color_base](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L384-L408)，不能凭名称生成效果。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成TypeMask / 类型图的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在UseSkinMask=1时：0～127普通、128～229丝袜、230～255皮肤；
无强度意义；
G传入脸路径的ramp_mask，但该参数没有参与最终输出；调试可显示；
B传入身体ramp_mask且按UseRampMask选择，但最终混合未使用该变量；调试可显示；
A仅被调试显示，未进入当前材质输出。

本次明确采用的生成预设：普通布与未知R64、用户确认丝袜R180、确认皮肤R240；
G0、B0、A255。开启UseSkinMask；
没有区域说明不能猜肤色就是皮肤类别。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；
材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成TypeMask / 类型图的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在UseSkinMask=1时：0～127普通、128～229丝袜、230～255皮肤；
无强度意义；
G传入脸路径的ramp_mask，但该参数没有参与最终输出；调试可显示；
B传入身体ramp_mask且按UseRampMask选择，但最终混合未使用该变量；调试可显示；
A仅被调试显示，未进入当前材质输出。

本次明确采用的生成预设：普通布与未知R64、用户确认丝袜R180、确认皮肤R240；
G0、B0、A255。开启UseSkinMask；
没有区域说明不能猜肤色就是皮肤类别。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；
材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。

以 Diffuse 的像素画布为基准，用 UV 分布图核对岛轮廓、细条、边界与空白区域。UV 线是参考标记，不得画入结果，也不作为 AO、缝线、法线或高光。

若两图尺寸、朝向或岛位置不一致，请先让我确认，不自行缩放或对齐。

UV 图没有材质标签或几何方向；
未确认区域仍按上述预设，不据 UV 线推断真实法线、SDF 或材质 ID。
```

:::


**拿到结果先看：** 尺寸、UV边界和每通道数值，并检查 Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 6. Eye EM / 眼部视差与高光 {#map-eye-em}

脸图和身体图不能共用解释。图中常量只是把每个通道的位置拆给你看，不代表脸的方向阴影已经恢复；眼鼻嘴的对应关系、视角和材质分支都很重要。

![鸣潮 Eye EM / 眼部视差与高光 输入、输出与四通道示意](./assets/maps/eye-em/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/eye-em/eye-em.png) · [R灰度层](./assets/maps/eye-em/eye-em-r.png) · [G灰度层](./assets/maps/eye-em/eye-em-g.png) · [B灰度层](./assets/maps/eye-em/eye-em-b.png) · [A灰度层](./assets/maps/eye-em/eye-em-a.png)

**R怎么用：** R二级高光输入增大通常增强，但被A压制。

**G怎么用：** G用于视差高度比较，位移方向由视角和参数决定，不是越白越凸。

**B怎么用：** B在当前EM眼视差和高光链中未消费。

**A怎么用：** A接近255时混回原UV且压二级高光，0更保留视差，不是白作用最大。

**采样依据：** [POM高度读取](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L135-L207)使用EM.G；[眼材质](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L678-L760)使用EM.R和A。R在缩放UV下取样并乘(1−A)×HeightRatioInput；A在原UV取样，smoothstep(0.99,1,A)把视差颜色与Stencil混回原UV。控制数据保持Non-Color。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成Eye EM / 眼部视差与高光的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R二级高光输入增大通常增强，但被A压制；
G用于视差高度比较，位移方向由视角和参数决定，不是越白越凸；
B在当前EM眼视差和高光链中未消费；
A接近255时混回原UV且压二级高光，0更保留视差，不是白作用最大。

本次明确采用的生成预设：眼部无视差安全练习：R0、G128平高度、B0、A255；
不要凭Diffuse重建真实虹膜深度。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成Eye EM / 眼部视差与高光的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R二级高光输入增大通常增强，但被A压制；
G用于视差高度比较，位移方向由视角和参数决定，不是越白越凸；
B在当前EM眼视差和高光链中未消费；
A接近255时混回原UV且压二级高光，0更保留视差，不是白作用最大。

本次明确采用的生成预设：眼部无视差安全练习：R0、G128平高度、B0、A255；
不要凭Diffuse重建真实虹膜深度。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

以 Diffuse 的像素画布为基准，用 UV 分布图核对岛轮廓、细条、边界与空白区域。UV 线是参考标记，不得画入结果，也不作为 AO、缝线、法线或高光。

若两图尺寸、朝向或岛位置不一致，请先让我确认，不自行缩放或对齐。

UV 图没有材质标签或几何方向；
未确认区域仍按上述预设，不据 UV 线推断真实法线、SDF 或材质 ID。
```

:::


**拿到结果先看：** 尺寸、UV边界和每通道数值，并检查 Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 7. HeightLightMap / 眼高光图 {#map-highlight}

这类图通常平铺或沿特定坐标取样。输入Diffuse可以给风格线索，却不能让模型知道原来使用的ST缩放和发丝切线；练习图只演示灰度数据。

![鸣潮 HeightLightMap / 眼高光图 输入、输出与四通道示意](./assets/maps/highlight/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/highlight/highlight.png) · [R灰度层](./assets/maps/highlight/highlight-r.png) · [G灰度层](./assets/maps/highlight/highlight-g.png) · [B灰度层](./assets/maps/highlight/highlight-b.png) · [A灰度层](./assets/maps/highlight/highlight-a.png)

**R怎么用：** R虽随RGB读取，但第一眼高光计算只用B，R未进入输出。

**G怎么用：** G虽随RGB读取，但第一眼高光计算只用B，G未进入输出。

**B怎么用：** B乘EyeScale及HeightRatioInput成为第一眼高光，并加到RGB；正参数下值越大越强。

**A怎么用：** A没有被此绑定采样，读取只取xyz且输出只用z。

**采样依据：** [眼高光坐标与输出](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L699-L756)按位置、旋转和宽高缩放重映射UV，Clamp取样，不是服装UV上的灰度蒙版。R/G不参与最终输出；不能把所有RGB都当高光强度。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成HeightLightMap / 眼高光图的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R虽随RGB读取，但第一眼高光计算只用B，R未进入输出；
G虽随RGB读取，但第一眼高光计算只用B，G未进入输出；
B乘EyeScale及HeightRatioInput成为第一眼高光，并加到RGB；正参数下值越大越强；
A没有被此绑定采样，读取只取xyz且输出只用z。

本次明确采用的生成预设：256×256采样图R0G0A255，B黑底0、用户指定高光斑255柔和边缘；
不是整张服装UV。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成HeightLightMap / 眼高光图的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R虽随RGB读取，但第一眼高光计算只用B，R未进入输出；
G虽随RGB读取，但第一眼高光计算只用B，G未进入输出；
B乘EyeScale及HeightRatioInput成为第一眼高光，并加到RGB；正参数下值越大越强；
A没有被此绑定采样，读取只取xyz且输出只用z。

本次明确采用的生成预设：256×256采样图R0G0A255，B黑底0、用户指定高光斑255柔和边缘；
不是整张服装UV。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

UV 图仅作为材质关联参考，不作为输出布局；
查表、球面或平铺图仍严格按上面的尺寸与坐标结构生成。
```

:::


**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 8. FaceMap / 脸部方向阴影图 {#map-sdf}

这张示意图展示常量占位，用来认识通道，并不具备正确的脸部方向阴影。颜色图没有告诉我们每个脸部像素在哪个光向开始转暗；正确方向场需要额外设计或几何信息。

![鸣潮 FaceMap / 脸部方向阴影图 输入、输出与四通道示意](./assets/maps/sdf/overview.png)

**常量占位示意：** 用于认识通道，不具备正确的脸部方向阴影。

[原始RGBA图](./assets/maps/sdf/sdf.png) · [R灰度层](./assets/maps/sdf/sdf-r.png) · [G灰度层](./assets/maps/sdf/sdf-g.png) · [B灰度层](./assets/maps/sdf/sdf-b.png) · [A灰度层](./assets/maps/sdf/sdf-a.png)

**R怎么用：** R在face_shadow方向阈值中未消费；同一MaskTex在其他材质另有用途。

**G怎么用：** G在face_shadow方向阈值中未消费；基础脸着色仍读取MaskTex.G作为shadow_mask输入。

**B怎么用：** B在face_shadow方向阈值中未消费。

**A怎么用：** A方向场，固定光向增大更偏亮面，头部朝向有门控。

只上传Diffuse无法唯一确定方向场。下面建议模板仅生成标明用途的占位草稿，不是正确SDF生成配方；要重建必须增加几何/光向设计信息。

**实际绑定与方向：** 此处不是独立_SDF槽，而是[face_shadow读取MaskTex.A](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L299-L327)。光在头右侧时取原UV，否则取(1−u,v)；t=1−(headForward·light×0.5+0.5)，A经smoothstep(t−(SDFSmoothness+0.05),t+(SDFSmoothness+0.05),A)比较并用headForward·light≥−0.5门控，再反向返回阴影值。基础脸着色另取MaskTex.G；独立_SDF声明没有采样，见未使用槽清单。

### 建议提示词（占位练习）

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成FaceMap / 脸部方向阴影图的占位草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在face_shadow方向阈值中未消费；同一MaskTex在其他材质另有用途；
G在face_shadow方向阈值中未消费；基础脸着色仍读取MaskTex.G作为shadow_mask输入；
B在face_shadow方向阈值中未消费；
A方向场，固定光向增大更偏亮面，头部朝向有门控。

本次明确采用的生成预设：只做不能用于角色还原的方向场占位：R=0、G=0、B=0、A=128。A全128没有方向梯度，不声称有正确随光阴影。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成FaceMap / 脸部方向阴影图的占位草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在face_shadow方向阈值中未消费；同一MaskTex在其他材质另有用途；
G在face_shadow方向阈值中未消费；基础脸着色仍读取MaskTex.G作为shadow_mask输入；
B在face_shadow方向阈值中未消费；
A方向场，固定光向增大更偏亮面，头部朝向有门控。

本次明确采用的生成预设：只做不能用于角色还原的方向场占位：R=0、G=0、B=0、A=128。A全128没有方向梯度，不声称有正确随光阴影。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

以 Diffuse 的像素画布为基准，用 UV 分布图核对岛轮廓、细条、边界与空白区域。UV 线是参考标记，不得画入结果，也不作为 AO、缝线、法线或高光。

若两图尺寸、朝向或岛位置不一致，请先让我确认，不自行缩放或对齐。

UV 图没有材质标签或几何方向；
未确认区域仍按上述预设，不据 UV 线推断真实法线、SDF 或材质 ID。
```

:::


**拿到结果先看：** 尺寸、UV边界和每通道数值，并检查 Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 9. 独立 Mask / Stencil图 {#map-independent-mask}

**R怎么用：** `_Mask.R` 是眼／脸Stencil输入。在Stencil pass且EnabelStencil开启时，眼／脸clip(R−0.5)并输出R；小于0.5丢弃，正好0.5保留。眼材质把视差UV和原UV下的R按EM.A门控混合。

**G怎么用：** 所核对程序所有该绑定的采样均取 `.x`，G未消费。

**B怎么用：** 同上，B未消费。

**A怎么用：** 同上，A未消费；不是这条Stencil链的透明度。

[采样与Stencil消费](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L113-L340)、[眼UV混合](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L678-L697)。数据保持Non-Color。普通身体先把stencil_mask置0；头发改取Diffuse.A，不是独立Mask.R。Stencil以外不能把此图当通用透明蒙版。

**制作约束：** 为上述指定眼／脸pass制作二值R时，0丢弃、255保留；边界过滤会出现中间值，阈值仍为0.5。保留原GBA兼容其他版本。需有真实眼／脸UV和目标开关，服装Diffuse不能提供正确区域。此类型没有伪造AI生成配方。


## 10. HN / HET / RGID / LD / FTM：逐类型拆解 {#map-unknown-assets}

此前将这些后缀合称“未确认资产”不够准确。以下核对的是 **Gacha Setup 固定提交所附 Gustling Waters 节点**，不是 HoyoToon，也不冒充原游戏所有版本。`Use New Shading` 是该节点的分支开关，节点标签“3.0+”是作者的命名，不能据此推断所有新角色通用。

各通道值以加载后的0…1说明，线性8位图才可乘255换算。HN／HET／RGID／FTM 使用 Non-Color；LD 的节点标签要求 sRGB，但标签本身不证明它已正确导入。RGBA 中的 A 指图像纹理 Alpha 输出，不能混同 Mix 节点的输入 A。

### 10.1 HN / 头发高光位置图 {#map-hn}

**R怎么用：** 在已连通的 `Hair Highlights (3.0+)` 中，HN.R 没有被取出使用。这里不是根据文件名断言“R一定是切线法线X”；不要套用身体N的规则。

**G怎么用：** HN.G（Vector 的 Y）加到高光定位表达式中，与物体空间表面法线Z、HM.B、Position和Distortion共同改变高光带的位置。增大G会增加定位输入，随后经过除法及Ramp，不能称为高光强度或一律“更亮”。

**B怎么用：** HN.B 在这条高光定位链未消费；不能直接写成标准法线Z。

**A怎么用：** Hair HN／Bangs HN 的图像 Alpha 输出没有连入转换器或高光组，所以这条绑定不消费A；保留原值以兼容其他实现。

**连线证据：** 图像 `Hair HN.Color` → `Hair Map Converter.HN` → `WW - Hair.HN` → `Hair Highlights (3.0+).HN` → `Separate XYZ.Y` → `Math.001`。HN 不参与该组的 Normal Map 输入；正常照明法线另取N。没有完整头发切线／空间约定时不能用AI从Diffuse恢复这张定位图。

### 10.2 HET / 眼、脸透发遮罩 {#map-het}

**R怎么用：** 在内部 `Bullshit` 组（保留作者原节点名以便定位）中，HET.R 经 `Separate XYZ.X` 乘默认0.5，输入 `See-through Effect by IsaacS.Depth Factor`。这是内层效果的遮罩／深度混合控制，不是基础眼色。

**G怎么用：** 内层组没有读取G。

**B怎么用：** 内层组没有读取B。

**A怎么用：** 眼／脸 HET 的图像 Alpha 没有接入这条绑定。

**关键限制：** 外层 `See Through` 的真正 Group Output 接的是 `Shader to RGB.Color`，**内层 Bullshit 的输出未接到外层输出**。所以在此固定文件的这条绑定中，修改任何HET通道都不会改变外层返回结果；不能把“内部R有运算”误报为透发功能已经生效。内层还依赖 Screenspace Info／Set Depth 等定制节点，标准Blender中显示 NodeUndefined；本次只验证拓扑，不宣称已验证定制引擎的透发渲染。

### 10.3 RGID / 新版区域分类输入 {#map-rgid}

**R怎么用：** RGID Color 接到 float 输入，**不是单取R**；Blender把RGB转标量后作为区域判断值。R改变会影响该标量，但不能独立称为“皮肤R遮罩”。

**G怎么用：** 与R/B一起参与Color→Value转换，并非单独的粗糙度。

**B怎么用：** 与R/G一起参与Color→Value转换，并非单独的AO。应保留原始编码，尤其不能随意把三个通道变成不同颜色来表示想象的材质。

**A怎么用：** RGID图像的Alpha输出未连入此区域分类链。

`Shadow Mask Converter` 在新分支算 `k = (value < RGID Threshold)`，再由 `Invert RGID` 选择k或1−k。默认阈值0.001；这是离散判断，不是越白受光越强。旧分支使用 `1−ID.R`，与RGID不是同一布局。

`Stockings` 新分支算 `(value>0.011)−(value>0.013)`，即 **0.011 < value ≤ 0.013** 时进入丝袜区域；旧分支用Stocking Mask的0.1…0.5区间。若使用线性8位且RGB为相等灰度，只有字节3≈0.011765落在新丝袜区间；彩色输入、过滤和其他格式可能不同。这里不能套用HoyoToon TypeMask的128／230阈值。

### 10.4 LD / 本文件中未接入输出的纹理 {#map-ld}

**R怎么用：** LD Color虽接到 `Reroute.004`，该Reroute没有输出连线，R不进入描边结果。

**G怎么用：** 同上，未消费G。

**B怎么用：** 同上，未消费B。

**A怎么用：** LD的图像Alpha没有连线，也未消费。

描边材质实际输出来自 `WW - Outlines Colors`，其输入取自 `Outline Converter` 的ID／RGID／FTM等，不是LD。故不能把这个文件的LD直接解释为描边RGB或发光图；原游戏LD含义仍需另一份真正消费它的shader佐证。这里记录“已绑定但断路”，不是“全游戏不存在该贴图”。

### 10.5 FTM / 透明、高光分类与受损显示打包 {#map-ftm}

**R怎么用：** `Alpha Transparency` 在新分支以FTM.R作为不透明权重：0选择Transparent BSDF，1选择原BSDF，旧分支改用Diffuse Alpha。描边转换器的新分支也读取FTM.R。不要把R叫金属度。

**G怎么用：** `Lightmap Conventer` 新分支用FTM.G替换原N.B作为内部Lightmap.R，送往身体高光／金属分支；它是材质分类和门控输入，不是通用粗糙度。只有旧分支取N.B。

**B怎么用：** `Damage Display` 取FTM.B作为Overlay运算的基础输入，与Diffuse颜色合成；`Enable Damage?` 再决定原Diffuse还是合成结果。B=0.5是Overlay中性基础，偏暗／偏亮改变受损配色，不是发光强度。在不开受损显示时这条B效果不生效。

**A怎么用：** 本文件的FTM图像Alpha输出不连入上述转换器、透明或受损链；不能误把它当透明度。

**生成与编辑建议：** 从原图精确保留各层，再按目标分支改一个通道；FTM.R透明区域需要真实透明边界，FTM.G区域编码要与材质匹配，FTM.B受损外观要单独检查。只有Diffuse／UV不足以推回这三种数据，未取得原图时不要生成声称可直接替换的“默认FTM”。

**可复核来源：** [固定版本 Gustling Waters 节点文件](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/shaders/wuwa/Gustling%20Waters.blend)。节点组 `Hair Map Converter`、`Hair Highlights (3.0+)`、`See Through`、`Bullshit`、`Shadow Mask Converter`、`Stockings`、`Lightmap Conventer`、`Damage Display`、`Alpha Transparency`、`Outline Converter` 与图像节点连线已逐项检查。可下载[精简节点证据](/data/texture-channel-evidence/wuwa-auxiliary.json)核对输入标识与连接，避免同名Mix插槽混淆。

## 11. Ramp / 漫反射色带 {#map-ramp}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![鸣潮 Ramp / 漫反射色带 输入、输出与四通道示意](./assets/maps/ramp/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/ramp/ramp.png) · [R灰度层](./assets/maps/ramp/ramp-r.png) · [G灰度层](./assets/maps/ramp/ramp-g.png) · [B灰度层](./assets/maps/ramp/ramp-b.png) · [A灰度层](./assets/maps/ramp/ramp-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A在所引漫反射Ramp采样中未消费，仅取RGB；保留原Alpha兼容其他实现，不能把它当统一阴影遮罩。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

**坐标与消费证据：** Ramp使用受光坐标和皮肤色区域取样RGB；与后述RGBA四灰度层MatCap不是同一种布局。 [固定版本Ramp读取](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L384-L428)。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成Ramp / 漫反射色带的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A在所引漫反射Ramp采样中未消费，仅取RGB；保留原Alpha兼容其他实现，不能把它当统一阴影遮罩。

本次明确采用的生成预设：256×16练习色带：每一行相同，左RGB(45,50,65)、中(150,160,180)、右(255,255,255)，A255，沿X平滑变化、不重排成衣服UV。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成Ramp / 漫反射色带的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A在所引漫反射Ramp采样中未消费，仅取RGB；保留原Alpha兼容其他实现，不能把它当统一阴影遮罩。

本次明确采用的生成预设：256×16练习色带：每一行相同，左RGB(45,50,65)、中(150,160,180)、右(255,255,255)，A255，沿X平滑变化、不重排成衣服UV。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

UV 图仅作为材质关联参考，不作为输出布局；
查表、球面或平铺图仍严格按上面的尺寸与坐标结构生成。
```

:::


**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 12. MatCap / 球面外观图 {#map-matcap}

这里看的是球面查表外观，不是扣件在UV中的位置。转视角时材质去球面图取样；直接把服装图变成橙色不可能得到正确MatCap。

![鸣潮 MatCap / 球面外观图 输入、输出与四通道示意](./assets/maps/matcap/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/matcap/matcap.png) · [R灰度层](./assets/maps/matcap/matcap-r.png) · [G灰度层](./assets/maps/matcap/matcap-g.png) · [B灰度层](./assets/maps/matcap/matcap-b.png) · [A灰度层](./assets/maps/matcap/matcap-a.png)

**R怎么用：** R是球面响应层0；先与G按saturate(spec.x)混合，最终作为灰度高光响应，不是输出颜色红分量。

**G怎么用：** G是球面响应层1，与R混合；不是粗糙度或输出绿色。

**B怎么用：** B是另一球面响应层，再按saturate(3*spec.y−1)混入RG结果；不是法线Z或AO。

**A怎么用：** A是第四球面响应层，按saturate(3*spec.z−2)混入之前结果；这条MatCap读取中不是透明度。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

**四层打包的实际算法：** [matcap_specular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L575-L603)将四通道当四个灰度响应层；随后乘阴影／金属参数，返回值`.w`才是组合高光响应。返回值RGB是另算的metal_color，不能把输入MatCap RGB误称为最终颜色。下面旧彩色示意不能证明真实层内容，编辑时必须分别设计四个响应层。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张鸣潮角色DiffuseMap颜色贴图，生成MatCap / 球面外观图的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是球面响应层0；先与G按saturate(spec.x)混合，最终作为灰度高光响应，不是输出颜色红分量；
G是球面响应层1，与R混合；不是粗糙度或输出绿色；
B是另一球面响应层，再按saturate(3*spec.y−1)混入RG结果；不是法线Z或AO；
A是第四球面响应层，按saturate(3*spec.z−2)混入之前结果；这条MatCap读取中不是透明度。

本次明确采用的生成预设：256×256四层球面练习：RGBA四层均用中心200边缘40的相同灰度球面响应；不把A固定255当成透明度。这只是层布局练习，不还原原始材质。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是鸣潮角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成MatCap / 球面外观图的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是球面响应层0；先与G按saturate(spec.x)混合，最终作为灰度高光响应，不是输出颜色红分量；
G是球面响应层1，与R混合；不是粗糙度或输出绿色；
B是另一球面响应层，再按saturate(3*spec.y−1)混入RG结果；不是法线Z或AO；
A是第四球面响应层，按saturate(3*spec.z−2)混入之前结果；这条MatCap读取中不是透明度。

本次明确采用的生成预设：256×256四层球面练习：RGBA四层均用中心200边缘40的相同灰度球面响应；不把A固定255当成透明度。这只是层布局练习，不还原原始材质。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。

UV 图仅作为材质关联参考，不作为输出布局；
查表、球面或平铺图仍严格按上面的尺寸与坐标结构生成。
```

:::


**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 13. LUT / 颜色分级表 {#map-lut}

这里的 LUT 是**颜色变换表**，不是服装 UV 图，也不是金属度／粗糙度／AO 的四通道打包。输入颜色决定取样坐标；像素 RGB 存取样后输出的颜色。

**R怎么用：** R 存输出颜色的红分量；提高某个表格像素的 R，只改变落在该颜色区间的红色输出，不是增加材质金属度。

**G怎么用：** G 存输出颜色的绿分量；不是粗糙度，也不是受光遮罩。

**B怎么用：** B 存输出颜色的蓝分量；不是 AO、法线 Z 或材质编号。

**A怎么用：** 以下固定版本的颜色 LUT 采样只取 `.rgb`，A 不进入颜色变换。保留原 Alpha 便于兼容其他工具；在这一已核对路径中新建 A=255 不会改变 RGB 结果。这不适用于材质参数 LUT。

### 输入编码和切片坐标

先把输入颜色按 **B、R、G** 重排，逐分量算：

```text
q = clamp(log2(color.brg * 5.55555582 + 0.0479959995)
          * 0.0734997839 + 0.386036009, 0, 1)
p = q * (N-1)
s = floor(p.x)
u0 = s/N + p.y/(N*N) + 0.5/(N*N)
v  = p.z/N + 0.5/N
u1 = u0 + 1/N
outputRGB = lerp(LUT(u0,v).rgb, LUT(u1,v).rgb, frac(p.x))
```

`N=32` 时对应 32 个水平切片，每片 32×32，整体 1024×32。**B 控制切片编号，R 控制片内横坐标，G 控制片内纵坐标**；此处 B/R/G 指经过上式编码的输入分量，不是纹理输出通道。实际函数用材质中的 `_Lut2DTexParam.xy` 代替上式精确倒数，默认近似 `(0.00098,0.03125,31,0)`，应保留目标材质参数。采样使用线性 Clamp，在两片之间插值；不能按材质 ID 列去画这个表。

数值经加载器解码后再取样，不能把纹理字节和输出线性颜色直接等同。需要确认 sRGB 导入设置和最终显示变换；这张表也不是“原始颜色输入＝输出”的普通 RGB 恒等渐变。

### 鸣潮复刻的额外差异

HoyoToon 鸣潮 `tonemapping` 将 V 改为 `1−v`，并在插值、saturate 后输出 `(lutRGB+0.25)^4.5`；RGB 仍是变换后颜色的三个分量，但并不是最后显示值。该函数硬编码倒数近似 `(0.0011,0.0311,31,1)`，不能假装它精确等于1024×32标准坐标。

HoyoToon 的独立 Post Processing 路径也翻转 V，但 GameType=3 的后处理使用 `lutRGB^2`，**不是上述 +0.25 再4.5次幂**。两条路径必须分别记录，不能用“鸣潮 LUT 都一样”的规则互换。

**证据：** [鸣潮材质 tonemapping](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L881-L918)、[独立后处理差异](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomCommon.hlsl#L352-L394)。

### 如何制作或修改

Diffuse 和 UV 不决定完整的颜色变换：请提供原 LUT、目标调色及目标着色器。用脚本／颜色查表工具按上述坐标生成，或对原表逐像素修改 RGB；不要让图像模型画衣服形状、自动改对比度或跨切片涂抹。先测试黑、白、灰、红、绿、蓝和高亮输入，再比较启用／关闭 LUT 的渲染。这个步骤需要准确数值文件，不提供声称能从一张 Diffuse 还原原表的 AI 提示词。

## 14. OutlineTexture / 描边颜色 {#map-outline-color}

**R怎么用：** 描边颜色红分量；UseMainTex开启时乘OutlineColor.R。

**G怎么用：** 描边颜色绿分量；同上乘OutlineColor.G。

**B怎么用：** 描边颜色蓝分量；同上乘OutlineColor.B。

**A怎么用：** 随float4加载和乘色，但随后被强制设为1，贴图A不控制此pass透明度。

ps_edge使用coord0.xy、Repeat采样。UseMainTex关闭时整张贴图不影响结果；Outline=0、眼材质2或材质≥5会clip(-1)，不绘制此描边。名字虽是UseMainTex，实际这里采样的是_OutlineTexture。

**源码：** [14. OutlineTexture / 描边颜色采样与消费](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L386-L404)。范围仅限本页固定HoyoToon版本；控制通道按线性数据保留，RGB颜色纹理另核对加载器的sRGB设置；未消费通道保留原值兼容其他实现。

## 15. HeightLightTex / 未完成玻璃高光 {#map-glass-highlight}

**R怎么用：** 被material_glass取作灰度高光，赋给输出RGB。

**G怎么用：** 未消费。

**B怎么用：** 未消费。

**A怎么用：** 未消费；函数把颜色A强制设为0.1，不取贴图A。

Repeat、原材质UV。重要限制：材质5调用此函数后立刻clip(-1)，所以此版本正式玻璃pass没有可见输出；R的函数内含义不能写成已完成的玻璃材质。参见[玻璃分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L207-L212)。

**源码：** [15. HeightLightTex / 未完成玻璃高光采样与消费](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L763-L767)。范围仅限本页固定HoyoToon版本；控制通道按线性数据保留，RGB颜色纹理另核对加载器的sRGB设置；未消费通道保留原值兼容其他实现。

## 16. D / 声痕距离场 {#map-tacet-field}

**R怎么用：** 随float4读取，但没有消费。

**G怎么用：** 随float4读取，但没有消费。

**B怎么用：** 声痕阈值场：q=Noise.R×Noise02.R−D.B，与SDFStart比较；不是普通颜色蓝分量。

**A怎么用：** 随float4读取，但没有消费，不是透明度。

独立material_tacet以原UV Repeat取样：mark=(q≥SDFStart)，clip((1−mark)−0.01)，即q≥阈值丢弃。幸存mark=0的像素颜色取SDFColor。apply_tacet_decal则Clamp读取变换UV，coverage=1−(q≥SDFStart)并lerp原色/SDFColor，不裁剪；B增大使q变小，固定噪声下增加保留或贴花覆盖。贴花围绕0.5缩放、x减位置/y加位置，可按RotationAngle×2π旋转，UV3.x结合MaskingSide选择左右侧。不要将独立_SDF槽与实际_D采样混为一谈。

**源码：** [16. D / 声痕距离场采样与消费](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L770-L866)。范围仅限本页固定HoyoToon版本；控制通道按线性数据保留，RGB颜色纹理另核对加载器的sRGB设置；未消费通道保留原值兼容其他实现。

## 17. Noise / Noise02 声痕滚动噪声 {#map-tacet-noise}

**R怎么用：** 两张图分别取R后相乘，与D.B共同生成声痕阈值；增大任一R通常增大q，减少独立声痕保留／贴花覆盖（另一R非负时）。

**G怎么用：** 虽然采样表达式写.xy，但结果赋给float标量，截取第一分量；G不参与q。

**B怎么用：** 未采样。

**A怎么用：** 未采样。

两张图各自Repeat取样UV=Time.yy×SoundWaveSpeed01/02+目标UV×SoundWaveTiling01/02；目标UV在独立材质为原UV，在贴花为缩放／旋转后的tacet_uv。采样写.xy不等于最终用了RG，必须跟踪标量赋值。

**源码：** [17. Noise / Noise02 声痕滚动噪声采样与消费](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L770-L866)。范围仅限本页固定HoyoToon版本；控制通道按线性数据保留，RGB颜色纹理另核对加载器的sRGB设置；未消费通道保留原值兼容其他实现。

## 18. Second_RGB / 星空及极光 {#map-secondary-stars}

**R怎么用：** 屏幕空间下取星空红色，加到极光颜色。

**G怎么用：** 同上取星空绿色。

**B怎么用：** 同上取星空蓝色。

**A怎么用：** 在原材质UV另一次采样作为极光加色权重；0不加该效果，1全权重，不是基础表面透明度。

仅普通身体材质0、UseStarrySky开启时调用。[调用分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L169-L186)。RGB采样UV=(screen.xy/screen.w×Second_Height)×(noise×2−1)，Repeat；A使用原UV。outRGB+=((secondary.rgb+pow(color,1.2))×aurora×AuroraAmount)×A。aurora含uv.y正弦、时间和法线调制，RGB与A坐标不同，不能照搬衣服颜色为星空。

**源码：** [18. Second_RGB / 星空及极光采样与消费](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L785-L810)。范围仅限本页固定HoyoToon版本；控制通道按线性数据保留，RGB颜色纹理另核对加载器的sRGB设置；未消费通道保留原值兼容其他实现。

## 19. CommonNoiseMap / 极光坐标扰动 {#map-aurora-noise}

**R怎么用：** 未消费。

**G怎么用：** Repeat取样后乘Second_NoiseStrength得到noise；noise×2−1缩放Second_RGB的屏幕UV。改变G改变坐标而非直接增加亮度。

**B怎么用：** 未消费。

**A怎么用：** 未消费。

UV=原UV+Time.yy×(0,0.1)。正强度下noise=0.5使星空RGB取样坐标坍缩到(0,0)，更小为负向坐标、更大为正向坐标；不是常规RG双轴扰动。_CommonNoiseMap_ST声明在这条函数中没有使用。

**源码：** [19. CommonNoiseMap / 极光坐标扰动采样与消费](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L785-L810)。范围仅限本页固定HoyoToon版本；控制通道按线性数据保留，RGB颜色纹理另核对加载器的sRGB设置；未消费通道保留原值兼容其他实现。

## 20. SDF / ShakeNoise 未使用声明槽 {#map-unused-slots}

**R怎么用：** _SDF和_ShakeNoise均只有声明、没有Sample/Load或任何消费；R不影响此实现结果。

**G怎么用：** 同上，G未消费。

**B怎么用：** 同上，B未消费。

**A怎么用：** 同上，A未消费。

两槽在Shader属性中被注释；真实声痕逻辑读_D、_Noise、_Noise02。这证明固定复刻未使用，不证明原游戏数据没有用途，不能根据SDF／Shake名字伪造通道定义。

**源码：** [20. SDF / ShakeNoise 未使用声明槽采样与消费](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-declaration.hlsl#L1-L20)。范围仅限本页固定HoyoToon版本；控制通道按线性数据保留，RGB颜色纹理另核对加载器的sRGB设置；未消费通道保留原值兼容其他实现。

## 看数值方向，不要只看合成颜色

![0到255如何表示切线方向](./assets/value-directions.png)

## 导出前的小检查

1. 同UV目标用原Diffuse半透明叠加，检查岛边界、细条、镜像和空白；查表图则检查行列与采样坐标。
2. 拆RGBA取样，确认常量、离散ID和阈值没有被模型偏色、抗锯齿、Gamma改变；ID不做普通模糊渐变。
3. PNG/TGA用于编辑，中间图不是DDS；BC5仅两路、BC6H没有Alpha且HDR转8位会损失范围，最终格式按游戏加载器要求。
4. 材质参数、版本、关键词、采样UV一起记录。转光、转视角、远近mip都比较；开关关闭时改通道可能看不出作用。

建议提示词解决表达歧义，不解决Diffuse缺少的数据，也不代替实机验证。SDF、LUT、双法线几何方向仍有明确限制。

## 自己查看 RGBA 通道

将 DDS 转为 PNG，再拆出灰度层，就能分别检查每个通道。输出请放在新目录，保留原文件。以下命令只处理第一层 mip，不做 sRGB 转换或预乘 Alpha：

```powershell
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -o output input.dds
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -swizzle rrr1 -sx -r -o output input.dds
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -swizzle ggg1 -sx -g -o output input.dds
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -swizzle bbb1 -sx -b -o output input.dds
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -swizzle aaa1 -sx -a -o output input.dds
```

`rrr1` 将原 R 复制到显示用 RGB；`aaa1` 显示原 Alpha 的灰度，不会把原数据变成白色。PNG 输入也可用。BC5 只有两路，BC6H 是无 Alpha 的 HDR 格式，转成 8 位会量化；立方体、数组和多 mip 贴图需要选择对应子资源。

## 参考仓库与资料

- [HoyoToon Wuthering Waves](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl)
- [Gacha Setup导入映射](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L11-L32)
- [RG法线与spec来源](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L109-L149)
- [高光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L169-L181)
- [material_basic](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L607-L630)
- [shadow_mask选择](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L113-L118)
- [material_hair](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L670-L675)
- [skin_type](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L53-L71)
- [判断代码](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L53-L71)
- [函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L384-L408)
- [face_shadow](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L299-L328)
- [眼路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L678-L751)


- [微软 DirectXTex / texconv 下载](https://github.com/microsoft/DirectXTex/releases)
- [Blender UV 布局导出说明](https://docs.blender.org/manual/en/latest/addons/import_export/mesh_uv_layout.html)

## 共享后处理模块的适用范围

以下仅为HoyoToon共享Bloom实现，原神GameType=1、星铁=2、鸣潮=3。不是角色资产贴图，也不推定其它游戏原生后处理一致。输入是运行时RenderTexture，色彩编码由实际渲染目标/导入设置决定，不能给全部RT强制套sRGB。

## Post MainTex / OriginalTexture / HDRTexture / 场景输入 {#map-post-color}

屏幕UV，linear_clamp；Original→prefilter，HDR→sharpen/vignette→tone mapping。该版本sharpening输出saturate，不能写成无限HDR值完整保留。白平衡pass当前两条layer分支均返回MainTex，不实现注释掉的矩阵。

**R怎么用：** 场景颜色红分量；参与预滤波、锐化或显示颜色。

**G怎么用：** 场景颜色绿分量；非独立材质通道。

**B怎么用：** 场景颜色蓝分量；非法线或粗糙度。

**A怎么用：** 输入Alpha不是统一透明度契约：OriginalTexture在GI/WW预滤波中与RGB一并max(A−threshold,0)×scaler，SR预滤波保留A；HDR锐化先恢复中心Alpha再saturate，GI又随col×0.95缩放；MainTex白平衡pass返回原RGBA。

源码：[passes](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomProgram.hlsl#L13-L35)、[tone/white balance](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomProgram.hlsl#L138-L193)、[prefilter/sharpen](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomCommon.hlsl#L12-L29)、[sharpen](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomCommon.hlsl#L286-L301)。

## Post PreFilter / BloomH,V / BloomAH,AV,BH,BV,CH,CV / MHYBloomTex {#map-post-bloom}

实际链为Original→PreFilter→BloomH→BloomV→AH→AV→BH→BV→CH→CV；combined使用PreFilter×weight.x与同一个CV×(weight.y+z+w)，不是分别采三块atlas（旧atlas组合代码已注释）。MHYBloomTex是最终bloom采样输入，UV为屏幕UV。

**R怎么用：** Bloom红色能量，逐通道卷积和加权。

**G怎么用：** Bloom绿色能量，非阈值图。

**B怎么用：** Bloom蓝色能量，非材质ID。

**A怎么用：** 模糊和合成使用float4，同RGB被卷积及加权，并不强制A=1；tone mapping仅加Bloom.RGB，Bloom.A不进入最终颜色/Alpha。

源码：[完整pass链](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomProgram.hlsl#L13-L171)、[float4卷积](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomCommon.hlsl#L31-L283)。

## Post LayerTex / 图层选择 {#map-post-layer}

屏幕UV，sampler_LayerTex，线性数据。white balance同样读取R但两分支相同，当前对该pass的返回颜色没有作用。

**R怎么用：** R>0时选tone-mapped final，否则选原col；不是二进制材质ID查表，也不使用IncludedLayers做位运算。

**G怎么用：** 未使用。

**B怎么用：** 未使用。

**A怎么用：** 未使用。

源码：[layer selection](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomProgram.hlsl#L168-L193)。

## Post Lut2DTex / 颜色分级二维LUT {#map-post-lut}

先对输入color.zxy执行log2(color.zxy×5.55555582+0.0479959995)×0.0734997839+0.386036009并clamp；乘param.z。B变换值沿水平方向选相邻两片，R/G分别决定片内U/V，param.xy给出texel/slice尺度，0.5像素偏移后线性插值；WW反转V并平方输出。GI GameType1不调用LUT，不应生成角色UV色块或从Diffuse推导精确颜色分级表。

**R怎么用：** 查表输出红分量，SR直接saturate，WW额外pow(RGB,2)。

**G怎么用：** 查表输出绿分量，同样颜色编码规则。

**B怎么用：** 查表输出蓝分量，不是控制参数。

**A怎么用：** 采样仅.rgb，Alpha未使用。

源码：[实际LUT坐标及编码](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomCommon.hlsl#L352-L403)。

## Post CharacterMask / BloomAtlas / FinalImage / LayerRT / 声明未使用 {#map-post-unused}

这些名字出现在声明中；BloomAtlas的旧组合代码是注释，不能按名字猜为有效atlas输入。LayerRT不等于实际采样的LayerTex。

**R怎么用：** 该固定版本有效pass未采样。

**G怎么用：** 未采样。

**B怎么用：** 未采样。

**A怎么用：** 未采样。

源码：[声明](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomDeclarations.hlsl#L19-L95)、[有效pass与已注释atlas](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Post%20Processing/Includes/BloomProgram.hlsl#L90-L193)。

## 导入器别名与消费端边界 {#importer-aliases}

以下核对Gacha Setup固定版本的分类/JSON绑定代码：**导入器找到图片，只能证明图片被分配给某个节点，不能证明通道含义与HoyoToon或MME相同**。模糊文件名、角色特例、材质分支仍须看实际消费节点。

| 导入槽或属性 | 对应说明 | 核对源码 |
| --- | --- | --- |
| `_D` | [消费端与通道边界](#map-diffuse) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_N` | [消费端与通道边界](#map-normal) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_ID` | [消费端与通道边界](#map-typemask) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_HM` | [消费端与通道边界](#map-hairmask) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_HN` | [消费端与通道边界](#map-hn) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_Skin` | [消费端与通道边界](#map-ramp) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_HET` | [消费端与通道边界](#map-het) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_FX` | [消费端与通道边界](#map-highlight) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_SDF` | [消费端与通道边界](#map-sdf) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_LD` | [消费端与通道边界](#map-ld) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_RGID` | [消费端与通道边界](#map-rgid) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |
| `_FTM` | [消费端与通道边界](#map-ftm) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L308-L393) |

`_FX`分类还接受EM/pm_emissive，不能把眼EM的视差通道强行套给所有FX；HM是头发MaskTex，身体MaskTex不是同一材质布局。SDF虽然导入器可分类，HoyoToon固定版本仍未采样该声明槽，脸部方向阴影节点的规则需单独看FaceMap分区。utility/cubemap/noise过滤返回None不代表游戏不存在这些图。
