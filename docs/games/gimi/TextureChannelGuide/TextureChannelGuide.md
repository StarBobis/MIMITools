# 原神：逐贴图通道图解与建议提示词

选好下面的贴图类型，就可以查看 RGBA 通道的作用、数值示例和建议提示词。每个分区都提供两种模板：**只有 DiffuseMap**，或 **DiffuseMap＋Blender 导出的 UV 分布图**，可用于 ChatGPT 等支持参考图的图像模型。

如果手边有模型，建议一起提供 UV 图：模型会更容易辨认 UV 岛、边界和细条，通常有助于对齐。只有 Diffuse 也可以尝试；请补充皮肤、布料、裸金属或发光区域的文字说明。

这里的提示词是可调整的参考模板，数字是练习预设，不是角色原始参数。图解是教学示意，不是 AI 实测结果。生成后仍需检查尺寸、UV 和通道数值；UV 图也不能代替材质参数、几何法线或 SDF 方向信息。

## 找到你要生成的贴图

- [DiffuseMap / 颜色图](#map-diffuse)
- [身体 / 头发 LightMap](#map-lightmap)
- [脸部 LightMap（Blue AO选项）](#map-facelight)
- [BumpMap / 身体法线](#map-bump)
- [CustomAO / 自定义遮蔽](#map-customao)
- [FaceMap / 脸部方向阴影图](#map-sdf)
- [Ramp / 漫反射色带](#map-ramp)
- [MatCap / 球面外观图](#map-matcap)
- [LUT / 参数查表图](#map-lut)

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

![原神 DiffuseMap / 颜色图 输入、输出与四通道示意](./assets/maps/diffuse/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/diffuse/diffuse.png) · [R灰度层](./assets/maps/diffuse/diffuse-r.png) · [G灰度层](./assets/maps/diffuse/diffuse-g.png) · [B灰度层](./assets/maps/diffuse/diffuse-b.png) · [A灰度层](./assets/maps/diffuse/diffuse-a.png)

**R怎么用：** R是基础颜色红分量，0最低、255最高。

**G怎么用：** G是基础颜色绿分量，0最低、255最高。

**B怎么用：** B是基础颜色蓝分量，0最低、255最高。

**A怎么用：** A可由MainTexAlphaUse选择忽略、裁剪、发光或脸红；裁剪小于Cutoff丢弃，脸红越大越强；发光先减0.02，线性字节0～5无该项贡献，6起才有。

颜色分量不是金属、高光或AO；不要增加新的方向光、投影和高光。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张原神角色DiffuseMap颜色贴图，生成DiffuseMap / 颜色图的颜色贴图草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是基础颜色红分量，0最低、255最高；
G是基础颜色绿分量，0最低、255最高；
B是基础颜色蓝分量，0最低、255最高；
A可由MainTexAlphaUse选择忽略、裁剪、发光或脸红；
裁剪小于Cutoff丢弃，脸红越大越强；
发光先减0.02，线性字节0～5无该项贡献，6起才有。

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
我上传了两张参考图：第一张是原神角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成DiffuseMap / 颜色图的颜色贴图草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是基础颜色红分量，0最低、255最高；
G是基础颜色绿分量，0最低、255最高；
B是基础颜色蓝分量，0最低、255最高；
A可由MainTexAlphaUse选择忽略、裁剪、发光或脸红；
裁剪小于Cutoff丢弃，脸红越大越强；
发光先减0.02，线性字节0～5无该项贡献，6起才有。

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

## 2. 身体 / 头发 LightMap {#map-lightmap}

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![原神 身体 / 头发 LightMap 输入、输出与四通道示意](./assets/maps/lightmap/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/lightmap/lightmap.png) · [R灰度层](./assets/maps/lightmap/lightmap-r.png) · [G灰度层](./assets/maps/lightmap/lightmap-g.png) · [B灰度层](./assets/maps/lightmap/lightmap-b.png) · [A灰度层](./assets/maps/lightmap/lightmap-a.png)

**R怎么用：** R为普通高光乘子，0无该项、增大增强；>0.89即字节227起可能进入金属，230起关闭普通高光。

**G怎么用：** G控制受光阈值，增大通常更偏亮面；启用AO且顶点AO=1时t=0.5+2(G−0.5)abs(G−0.5)，字节≤6强暗、≥249强亮。

**B怎么用：** B降低普通高光门槛：term>1.015−B，增大扩大范围；正常指数下0～3不通过。

**A怎么用：** A选参数组，0～50组1、51～102组4、103～152组3、153～204组5、205～255组2；开关关闭会回退，无物理材质固定对应。

想让高光更亮改R，想让出现范围更宽改B；G不是照搬衣服明暗。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张原神角色DiffuseMap颜色贴图，生成身体 / 头发 LightMap的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R为普通高光乘子，0无该项、增大增强；
>0.89即字节227起可能进入金属，230起关闭普通高光；
G控制受光阈值，增大通常更偏亮面；
启用AO且顶点AO=1时t=0.5+2(G−0.5)abs(G−0.5)，字节≤6强暗、≥249强亮；
B降低普通高光门槛：term>1.015−B，增大扩大范围；
正常指数下0～3不通过；
A选参数组，0～50组1、51～102组4、103～152组3、153～204组5、205～255组2；
开关关闭会回退，无物理材质固定对应。

本次明确采用的生成预设：仅普通非金属练习，金属开关关闭：皮肤RGBA(30,128,40,26)、布料(20,128,30,76)、普通光滑饰件(130,128,160,128)、未识别(20,128,30,26)。这些ID只定义练习组，不声称皮肤固定组1。

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
我上传了两张参考图：第一张是原神角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成身体 / 头发 LightMap的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R为普通高光乘子，0无该项、增大增强；
>0.89即字节227起可能进入金属，230起关闭普通高光；
G控制受光阈值，增大通常更偏亮面；
启用AO且顶点AO=1时t=0.5+2(G−0.5)abs(G−0.5)，字节≤6强暗、≥249强亮；
B降低普通高光门槛：term>1.015−B，增大扩大范围；
正常指数下0～3不通过；
A选参数组，0～50组1、51～102组4、103～152组3、153～204组5、205～255组2；
开关关闭会回退，无物理材质固定对应。

本次明确采用的生成预设：仅普通非金属练习，金属开关关闭：皮肤RGBA(30,128,40,26)、布料(20,128,30,76)、普通光滑饰件(130,128,160,128)、未识别(20,128,30,26)。这些ID只定义练习组，不声称皮肤固定组1。

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

![普通高光门槛的数值变化](./assets/spec-threshold.png)

## 3. 脸部 LightMap（Blue AO选项） {#map-facelight}

脸图和身体图不能共用解释。图中常量只是把每个通道的位置拆给你看，不代表脸的方向阴影已经恢复；眼鼻嘴的对应关系、视角和材质分支都很重要。

![原神 脸部 LightMap（Blue AO选项） 输入、输出与四通道示意](./assets/maps/facelight/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/facelight/facelight.png) · [R灰度层](./assets/maps/facelight/facelight-r.png) · [G灰度层](./assets/maps/facelight/facelight-g.png) · [B灰度层](./assets/maps/facelight/facelight-b.png) · [A灰度层](./assets/maps/facelight/facelight-a.png)

**R怎么用：** R在这条脸AO链未确认一般用途。

**G怎么用：** G在这条脸AO链未确认一般用途。

**B怎么用：** B在UseFaceBlueAsAO开启时乘SDF亮面权重，0阴影端、128约50.2%、180约70.6%、255保留100%。

**A怎么用：** A在这条脸AO链未确认一般用途。

180没有特殊开关意义；最终亮度不等于乘子百分比。 R/G/A占位取值没有已证实的兼容性，建议提示词只供练习打包，不是建议覆盖原脸图。

![脸B遮蔽权重变化示意](./assets/face-blue-weights.png)

### 建议提示词（占位练习）

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张原神角色DiffuseMap颜色贴图，生成脸部 LightMap（Blue AO选项）的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在这条脸AO链未确认一般用途；
G在这条脸AO链未确认一般用途；
B在UseFaceBlueAsAO开启时乘SDF亮面权重，0阴影端、128约50.2%、180约70.6%、255保留100%；
A在这条脸AO链未确认一般用途。

本次明确采用的生成预设：只做Blue AO教学占位：R=0、G=0、A=255；
B普通脸区255、可辨认重叠缝隙230。未知通道是占位，不是从Diffuse恢复。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是原神角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成脸部 LightMap（Blue AO选项）的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在这条脸AO链未确认一般用途；
G在这条脸AO链未确认一般用途；
B在UseFaceBlueAsAO开启时乘SDF亮面权重，0阴影端、128约50.2%、180约70.6%、255保留100%；
A在这条脸AO链未确认一般用途。

本次明确采用的生成预设：只做Blue AO教学占位：R=0、G=0、A=255；
B普通脸区255、可辨认重叠缝隙230。未知通道是占位，不是从Diffuse恢复。

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

## 4. BumpMap / 身体法线 {#map-bump}

看R和G里的细小变化，方向信息藏在这些梯度里，而不是藏在“蓝紫色外观”里。平坦区域约128；从128向两侧偏移表示向不同切线方向倾斜，不是越白越凸。

![原神 BumpMap / 身体法线 输入、输出与四通道示意](./assets/maps/bump/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/bump/bump.png) · [R灰度层](./assets/maps/bump/bump-r.png) · [G灰度层](./assets/maps/bump/bump-g.png) · [B灰度层](./assets/maps/bump/bump-b.png) · [A灰度层](./assets/maps/bump/bump-a.png)

**R怎么用：** R编码切线法线X：0负方向、128附近零偏转、255正方向。

**G怎么用：** G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader。

**B怎么用：** B在纹理线条功能中跨阈值混入线条色，越大更多混入，线条色可亮可暗；不作为原Z。

**A怎么用：** A在该法线链未确认用途。

该函数指定Z后归一化，不是把标准蓝紫图直接写回。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张原神角色DiffuseMap颜色贴图，生成BumpMap / 身体法线的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；
G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；
B在纹理线条功能中跨阈值混入线条色，越大更多混入，线条色可亮可暗；
不作为原Z；
A在该法线链未确认用途。

本次明确采用的生成预设：平坦RG=(128,128)，指定浅缝线才有小XY变化；
无原控制图时B=0关闭练习线条候选、A=255占位，不覆盖原角色未知BA。

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
我上传了两张参考图：第一张是原神角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成BumpMap / 身体法线的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；
G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；
B在纹理线条功能中跨阈值混入线条色，越大更多混入，线条色可亮可暗；
不作为原Z；
A在该法线链未确认用途。

本次明确采用的生成预设：平坦RG=(128,128)，指定浅缝线才有小XY变化；
无原控制图时B=0关闭练习线条候选、A=255占位，不覆盖原角色未知BA。

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

## 5. CustomAO / 自定义遮蔽 {#map-customao}

颜色图里的黑色腰带不该自动变成重遮蔽。AO应该对应结构重叠、接缝，而不是布料本身的颜色；灰度较白通常保留更多受光。

![原神 CustomAO / 自定义遮蔽 输入、输出与四通道示意](./assets/maps/customao/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/customao/customao.png) · [R灰度层](./assets/maps/customao/customao-r.png) · [G灰度层](./assets/maps/customao/customao-g.png) · [B灰度层](./assets/maps/customao/customao-b.png) · [A灰度层](./assets/maps/customao/customao-a.png)

**R怎么用：** R为AO权重，低值更遮蔽、255不额外削弱，参与Ramp/混合不保证0纯黑。

**G怎么用：** G未确认用途。

**B怎么用：** B未确认用途。

**A怎么用：** A未确认用途。

必须确认CustomAO采样衣服同一UV，屏幕坐标或第二UV时不能从当前Diffuse配准。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张原神角色DiffuseMap颜色贴图，生成CustomAO / 自定义遮蔽的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R为AO权重，低值更遮蔽、255不额外削弱，参与Ramp/混合不保证0纯黑；
G未确认用途；
B未确认用途；
A未确认用途。

本次明确采用的生成预设：仅同UV教学：R无遮挡255、明确结构缝隙230，柔和过渡；
G=0、B=0、A=255占位。

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
我上传了两张参考图：第一张是原神角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成CustomAO / 自定义遮蔽的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R为AO权重，低值更遮蔽、255不额外削弱，参与Ramp/混合不保证0纯黑；
G未确认用途；
B未确认用途；
A未确认用途。

本次明确采用的生成预设：仅同UV教学：R无遮挡255、明确结构缝隙230，柔和过渡；
G=0、B=0、A=255占位。

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

## 6. FaceMap / 脸部方向阴影图 {#map-sdf}

这张示意图展示常量占位，用来认识通道，并不具备正确的脸部方向阴影。颜色图没有告诉我们每个脸部像素在哪个光向开始转暗；正确方向场需要额外设计或几何信息。

![原神 FaceMap / 脸部方向阴影图 输入、输出与四通道示意](./assets/maps/sdf/overview.png)

**常量占位示意：** 用于认识通道，不具备正确的脸部方向阴影。

[原始RGBA图](./assets/maps/sdf/sdf.png) · [R灰度层](./assets/maps/sdf/sdf-r.png) · [G灰度层](./assets/maps/sdf/sdf-g.png) · [B灰度层](./assets/maps/sdf/sdf-b.png) · [A灰度层](./assets/maps/sdf/sdf-a.png)

**R怎么用：** R在该核心SDF链未确认用途。

**G怎么用：** G在该核心SDF链未确认用途。

**B怎么用：** B为新脸轮廓宽度乘子，0抑制该项、255最大纹理乘子。

**A怎么用：** A是方向阴影阈值场，固定光向下增大更偏亮面，镜像/头部方向决定采样。

只上传Diffuse无法唯一确定方向场。下面建议模板仅生成标明用途的占位草稿，不是正确SDF生成配方；要重建必须增加几何/光向设计信息。

### 建议提示词（占位练习）

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张原神角色DiffuseMap颜色贴图，生成FaceMap / 脸部方向阴影图的占位草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在该核心SDF链未确认用途；
G在该核心SDF链未确认用途；
B为新脸轮廓宽度乘子，0抑制该项、255最大纹理乘子；
A是方向阴影阈值场，固定光向下增大更偏亮面，镜像/头部方向决定采样。

本次明确采用的生成预设：非还原占位RGBA(0,0,255,128)，保留练习轮廓乘子但A平场没有正确脸阴影。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是原神角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成FaceMap / 脸部方向阴影图的占位草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R在该核心SDF链未确认用途；
G在该核心SDF链未确认用途；
B为新脸轮廓宽度乘子，0抑制该项、255最大纹理乘子；
A是方向阴影阈值场，固定光向下增大更偏亮面，镜像/头部方向决定采样。

本次明确采用的生成预设：非还原占位RGBA(0,0,255,128)，保留练习轮廓乘子但A平场没有正确脸阴影。

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

## 7. Ramp / 漫反射色带 {#map-ramp}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![原神 Ramp / 漫反射色带 输入、输出与四通道示意](./assets/maps/ramp/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/ramp/ramp.png) · [R灰度层](./assets/maps/ramp/ramp-r.png) · [G灰度层](./assets/maps/ramp/ramp-g.png) · [B灰度层](./assets/maps/ramp/ramp-b.png) · [A灰度层](./assets/maps/ramp/ramp-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，仅凭 Diffuse 无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张原神角色DiffuseMap颜色贴图，生成Ramp / 漫反射色带的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A必须按表定义，仅凭 Diffuse 无法恢复；
以下只给不透明练习占位。

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
我上传了两张参考图：第一张是原神角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成Ramp / 漫反射色带的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A必须按表定义，仅凭 Diffuse 无法恢复；
以下只给不透明练习占位。

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

## 8. MatCap / 球面外观图 {#map-matcap}

这里看的是球面查表外观，不是扣件在UV中的位置。转视角时材质去球面图取样；直接把服装图变成橙色不可能得到正确MatCap。

![原神 MatCap / 球面外观图 输入、输出与四通道示意](./assets/maps/matcap/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/matcap/matcap.png) · [R灰度层](./assets/maps/matcap/matcap-r.png) · [G灰度层](./assets/maps/matcap/matcap-g.png) · [B灰度层](./assets/maps/matcap/matcap-b.png) · [A灰度层](./assets/maps/matcap/matcap-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，仅凭 Diffuse 无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张原神角色DiffuseMap颜色贴图，生成MatCap / 球面外观图的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A必须按表定义，仅凭 Diffuse 无法恢复；
以下只给不透明练习占位。

本次明确采用的生成预设：256×256球面练习图，中心RGB(220,220,220)、边缘(40,40,40)，平滑球面高光，无背景物体；
A255，仅用户确认该MatCap路径后试用。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是原神角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成MatCap / 球面外观图的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A必须按表定义，仅凭 Diffuse 无法恢复；
以下只给不透明练习占位。

本次明确采用的生成预设：256×256球面练习图，中心RGB(220,220,220)、边缘(40,40,40)，平滑球面高光，无背景物体；
A255，仅用户确认该MatCap路径后试用。

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

## 9. LUT / 参数查表图 {#map-lut}

LUT的一个像素可能就是一个精确参数。它不必有衣服形状，也没有一张图通用的“越白越强”；没有表定义时不能靠生成模型补出可替换文件。

**R怎么用：** R依表行列存特定参数，没有全图单调强弱方向。

**G怎么用：** G依表行列存特定参数，不能当统一粗糙度。

**B怎么用：** B依表行列存特定参数，不能当统一AO。

**A怎么用：** A依表行列定义，不能统一填255；缺少布局不生成替代图。

这类贴图需要明确的采样与参数定义；仅有 Diffuse 或 UV 图还不足以制作可替换文件。

### 建议提示词（需补充定义）

UV 能帮助对齐边界，但不能补齐这类贴图的参数定义。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
我只上传了这张原神角色Diffuse颜色图。我想生成LUT / 参数查表图，但你没有目标采样/参数定义。完整规则是：R依表行列存特定参数，没有全图单调强弱方向；
G依表行列存特定参数，不能当统一粗糙度；
B依表行列存特定参数，不能当统一AO；
A依表行列定义，不能统一填255；
缺少布局不生成替代图。不生成替代图；
仅说明缺少的表尺寸、行列和RGBA参数，让用户用编辑器按规范填写。不要编RGBA常量或行列，说明还缺哪些尺寸、采样UV、通道和阈值参数；
Diffuse 提供颜色与位置线索，但不足以确定这些数据。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是原神角色 DiffuseMap，第二张是 Blender 导出的对应 UV 分布图。我想生成LUT / 参数查表图，但你没有目标采样/参数定义。完整规则是：R依表行列存特定参数，没有全图单调强弱方向；
G依表行列存特定参数，不能当统一粗糙度；
B依表行列存特定参数，不能当统一AO；
A依表行列定义，不能统一填255；
缺少布局不生成替代图。不生成替代图；
仅说明缺少的表尺寸、行列和RGBA参数，让用户用编辑器按规范填写。不要编RGBA常量或行列，说明还缺哪些尺寸、采样UV、通道和阈值参数；
Diffuse 提供颜色与位置线索，但不足以确定这些数据。

UV 图只用来核对坐标，不包含采样函数或参数表；
若还缺定义，请先列出需要补充的信息，不猜测替代数据。
```

:::


**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，确认无误后再导出目标格式并测试。

## 补充：球面与色带贴图示例

下面三张资源可以帮助区分法线占位、球面外观与高光色带。它们不代表某个角色的完整贴图，来源与许可列在文末。

### Avatar_Tex_Body_Normalmap

它是常量占位资源。拆开后能看到通道固定，不能把“法线”文件名当成一张有衣服细节的正常XYZ图。

![PrimoToon原图及RGBA灰度层](./assets/github-examples/Avatar_Tex_Body_Normalmap/overview.png)

[转换后的原图](./assets/github-examples/Avatar_Tex_Body_Normalmap/Avatar_Tex_Body_Normalmap.png) · [R层](./assets/github-examples/Avatar_Tex_Body_Normalmap/Avatar_Tex_Body_Normalmap-r.png) · [G层](./assets/github-examples/Avatar_Tex_Body_Normalmap/Avatar_Tex_Body_Normalmap-g.png) · [B层](./assets/github-examples/Avatar_Tex_Body_Normalmap/Avatar_Tex_Body_Normalmap-b.png) · [A层](./assets/github-examples/Avatar_Tex_Body_Normalmap/Avatar_Tex_Body_Normalmap-a.png)

### Avatar_Tex_MetalMap

这是金属球面/查表外观，不是衣服UV上的金属ID。不同灰度带被反射采样用来形成分层外观。

![PrimoToon原图及RGBA灰度层](./assets/github-examples/Avatar_Tex_MetalMap/overview.png)

[转换后的原图](./assets/github-examples/Avatar_Tex_MetalMap/Avatar_Tex_MetalMap.png) · [R层](./assets/github-examples/Avatar_Tex_MetalMap/Avatar_Tex_MetalMap-r.png) · [G层](./assets/github-examples/Avatar_Tex_MetalMap/Avatar_Tex_MetalMap-g.png) · [B层](./assets/github-examples/Avatar_Tex_MetalMap/Avatar_Tex_MetalMap-b.png) · [A层](./assets/github-examples/Avatar_Tex_MetalMap/Avatar_Tex_MetalMap-a.png)

### Avatar_Tex_Specular_Ramp

这是小尺寸高光Ramp；按查表坐标取样，不根据衣服形状排布局。

![PrimoToon原图及RGBA灰度层](./assets/github-examples/Avatar_Tex_Specular_Ramp/overview.png)

[转换后的原图](./assets/github-examples/Avatar_Tex_Specular_Ramp/Avatar_Tex_Specular_Ramp.png) · [R层](./assets/github-examples/Avatar_Tex_Specular_Ramp/Avatar_Tex_Specular_Ramp-r.png) · [G层](./assets/github-examples/Avatar_Tex_Specular_Ramp/Avatar_Tex_Specular_Ramp-g.png) · [B层](./assets/github-examples/Avatar_Tex_Specular_Ramp/Avatar_Tex_Specular_Ramp-b.png) · [A层](./assets/github-examples/Avatar_Tex_Specular_Ramp/Avatar_Tex_Specular_Ramp-a.png)


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

- [主程序](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L523-L544)
- [Alpha 分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L728-L741)
- [高光与阴影调用](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L757-L768)
- [materialID](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L1-L13)
- [普通高光公式](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L712-L738)
- [阴影公式](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L467-L520)
- [脸阴影函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L414-L463)
- [轮廓线路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L350-L358)
- [normal_mapping](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L367-L402)
- [detail_line](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L659-L664)
- [自定义AO读取](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L530-L536)


- [微软 DirectXTex / texconv 下载](https://github.com/microsoft/DirectXTex/releases)
- [Blender UV 布局导出说明](https://docs.blender.org/manual/en/latest/addons/import_export/mesh_uv_layout.html)
- [PrimoToon 资源与作者说明](https://github.com/festivities/PrimoToon/tree/12d42095035edf879a45b3e7a679a6ab86fc081d/Resources) · [再分发说明](https://github.com/festivities/PrimoToon/blob/12d42095035edf879a45b3e7a679a6ab86fc081d/README.md#L44-L48) · [GPL-3.0 许可](https://github.com/festivities/PrimoToon/blob/12d42095035edf879a45b3e7a679a6ab86fc081d/LICENSE)。补充示例归属 festivities/PrimoToon；游戏资产权利归原权利人。
