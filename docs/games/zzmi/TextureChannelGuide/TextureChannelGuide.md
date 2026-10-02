# 绝区零：逐贴图通道图解与完整生成提示词

这页可以单独使用。先上传一张自己的Diffuse颜色图到ChatGPT Image等支持图像输入的模型，再复制目标贴图下面的**完整提示词**。不需要上传第二张LightMap，也不用读另一篇基础文章才能知道怎么用。

**先分清两件事：**通道规则来自指定复刻Shader；下面按皮肤、布料、饰件给的数字是明确的生成练习预设，不是从该角色解包得到的原值。提示词写得完整可以减少歧义，但不能保证模型逐像素保持UV或精确执行RGBA。

本页用“原图/四通道图 → 看图说明 → 每通道数值 → 完整提示词”讲解。教学图都是程序绘制、texconv拆通道的示意，不冒充游戏解包或模型实测。

本页通道约定主要依据HoyoToon固定提交 `d9e5ca2f312bf16fba89dee67d32c08b482dcda4`，属于公开复刻的已审路径，不是原游戏全版本规范。

## 找到你要生成的贴图

- [DiffuseMap / 颜色图](#map-diffuse)
- [身体 N / LightTex](#map-normal)
- [M / OtherDataTex 材质图](#map-material)
- [新辅助 A / OtherDataTex2](#map-auxiliary)
- [旧版三张 Alpha 打包](#map-legacy-alpha)
- [脸部 LightTex](#map-facelight)
- [SecondaryEmissionMask](#map-secondary-mask)
- [SecondaryEmissionTex](#map-secondary-emission)
- [Ramp / 漫反射色带](#map-ramp)
- [MatCap / 球面外观图](#map-matcap)
- [LUT / 参数查表图](#map-lut)

## 这页怎样读

- 数据值用0～255；线性UNORM中除以255得到0～1。字节128约0.502，若RGB被sRGB解码则约0.216，不能对控制图做自动Gamma或美化。Alpha通常不经过sRGB转换，仍要核对加载路径。
- 灰度白只意味着数值大：乘子、反向遮罩、材质ID、方向数据的“白”含义不同。下面逐图解释，不用一条规则概括。
- 只上传Diffuse时，材质分类是猜测。裸金属、丝袜、发光区域最好在文字里指出；不明区域有保守默认值，但它不恢复原角色ID。
- 合成预览可能受Alpha显示影响；灰度A图是真正的第四通道。下载各层后用取色器看字节，不靠预览颜色判断。

实际清点的HoyoToon仓库主要提供界面装饰图，没有这款游戏的一整套角色Diffuse/LightMap/Normal示例。下面使用原创数据图讲解，不把UI图或渲染截图拆成灰度后冒充角色通道。

## 1. DiffuseMap / 颜色图 {#map-diffuse}

**对应代码：** [发光函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L351-L365) · [二级发光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L401-L424)

先看输入的蓝色衣片：颜色图里它就该是蓝色，R/G/B是颜色分量。到了控制图，同一片蓝布可能变成红橙色，那不是改了衣服颜色，而是几个控制值叠在一起。

![绝区零 DiffuseMap / 颜色图 输入、输出与四通道示意](./assets/maps/diffuse/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/diffuse/diffuse.png) · [R灰度层](./assets/maps/diffuse/diffuse-r.png) · [G灰度层](./assets/maps/diffuse/diffuse-g.png) · [B灰度层](./assets/maps/diffuse/diffuse-b.png) · [A灰度层](./assets/maps/diffuse/diffuse-a.png)

**R怎么用：** R是基础颜色红分量，0最低、255最高。

**G怎么用：** G是基础颜色绿分量，0最低、255最高。

**B怎么用：** B是基础颜色蓝分量，0最低、255最高。

**A怎么用：** A用途由材质决定，单张Diffuse不能推断透明、发光或ID。

颜色分量不是金属、高光或AO；不要增加新的方向光、投影和高光。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成DiffuseMap / 颜色图的颜色贴图草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是基础颜色红分量，0最低、255最高；G是基础颜色绿分量，0最低、255最高；B是基础颜色蓝分量，0最低、255最高；A用途由材质决定，单张Diffuse不能推断透明、发光或ID。本次明确采用的生成预设：本次生成同UV、不透明Diffuse颜色草稿：R/G/B按我给出的新配色修改，未指定改色时保留上传图的RGB颜色；A固定255，不猜透明、发光或材质ID。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 2. 身体 N / LightTex {#map-normal}

**对应代码：** [normal_mapping](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L186-L209)

看R和G里的细小变化，方向信息藏在这些梯度里，而不是藏在“蓝紫色外观”里。平坦区域约128；从128向两侧偏移表示向不同切线方向倾斜，不是越白越凸。

![绝区零 身体 N / LightTex 输入、输出与四通道示意](./assets/maps/normal/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/normal/normal.png) · [R灰度层](./assets/maps/normal/normal-r.png) · [G灰度层](./assets/maps/normal/normal-g.png) · [B灰度层](./assets/maps/normal/normal-b.png) · [A灰度层](./assets/maps/normal/normal-a.png)

**R怎么用：** R编码切线法线X：0负方向、128附近零偏转、255正方向。

**G怎么用：** G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader。

**B怎么用：** B为阴影偏置，无自阴影衰减时输入4B−2+N·L，增大偏亮、减小偏暗，0−2偏置、255+2，128附近0。

**A怎么用：** A新辅助布局未确认一般用途；旧版A是光滑度。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成身体 N / LightTex的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；B为阴影偏置，无自阴影衰减时输入4B−2+N·L，增大偏亮、减小偏暗，0−2偏置、255+2，128附近0；A新辅助布局未确认一般用途；旧版A是光滑度。本次明确采用的生成预设：只针对新辅助布局：平坦RGBA(128,128,128,255)，浅缝线变化RG，B全128近零偏置、A255占位；不是旧版成品。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。法线细节仅来自我明确指出的浅缝线、压边、扣件和发丝结构，不把Diffuse明暗转成高度，不新增织物噪点；XY解码为2×值/255−1，保持X²+Y²≤1并按目标定义重建或填写Z，不能把方向极值当凹凸强度。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 3. M / OtherDataTex 材质图 {#map-material}

**对应代码：** [specular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L211-L220) · [发光函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L351-L365)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![绝区零 M / OtherDataTex 材质图 输入、输出与四通道示意](./assets/maps/material/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/material/material.png) · [R灰度层](./assets/maps/material/material-r.png) · [G灰度层](./assets/maps/material/material-g.png) · [B灰度层](./assets/maps/material/material-b.png) · [A灰度层](./assets/maps/material/material-a.png)

**R怎么用：** R参数分组：0～50组5、51～101组4、102～152组3、153～203组2、204～255组1；没有越大越金属。

**G怎么用：** G乘Metallic参数，0非金属端、增大更偏金属响应，不等于更亮。

**B怎么用：** B普通高光权重/特殊形状门槛，增大可增强扩范围；另按0.2/0.4/0.6/0.8分发光颜色。

**A怎么用：** A新辅助布局未确认一般用途；旧版A是发光。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成M / OtherDataTex 材质图的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R参数分组：0～50组5、51～101组4、102～152组3、153～203组2、204～255组1；没有越大越金属；G乘Metallic参数，0非金属端、增大更偏金属响应，不等于更亮；B普通高光权重/特殊形状门槛，增大可增强扩范围；另按0.2/0.4/0.6/0.8分发光颜色；A新辅助布局未确认一般用途；旧版A是发光。本次明确采用的生成预设：仅新布局练习：皮肤RGBA(230,0,20,255)、布(178,0,40,255)、裸金属(76,255,160,255)、未知(178,0,40,255)。R对应本次人为组别，不恢复角色原ID；金属需用户明确说明。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 4. 新辅助 A / OtherDataTex2 {#map-auxiliary}

**对应代码：** [R透明分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl#L225-L238) · [G光滑度](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L211-L220)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![绝区零 新辅助 A / OtherDataTex2 输入、输出与四通道示意](./assets/maps/auxiliary/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/auxiliary/auxiliary.png) · [R灰度层](./assets/maps/auxiliary/auxiliary-r.png) · [G灰度层](./assets/maps/auxiliary/auxiliary-g.png) · [B灰度层](./assets/maps/auxiliary/auxiliary-b.png) · [A灰度层](./assets/maps/auxiliary/auxiliary-a.png)

**R怎么用：** R可见性，0趋向隐藏、255完整可见，Stencil可能用MinStencilAlpha抬起低值。

**G怎么用：** G光滑度，(1−G×Glossiness)²，增大通常更集中，0粗糙端255光滑端。

**B怎么用：** B发光，普通按B；重映射saturate(1.25(B−0.2))，0～51无贡献、52起开始。

**A怎么用：** A核心一般用途未确认。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成新辅助 A / OtherDataTex2的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R可见性，0趋向隐藏、255完整可见，Stencil可能用MinStencilAlpha抬起低值；G光滑度，(1−G×Glossiness)²，增大通常更集中，0粗糙端255光滑端；B发光，普通按B；重映射saturate(1.25(B−0.2))，0～51无贡献、52起开始；A核心一般用途未确认。本次明确采用的生成预设：不透明新布局练习：R255、A255；G皮肤110、布40、金属160、未知40；B只有用户明确的灯带255，其它0。不要按白布黑布自行设光滑度，不靠青蓝颜色猜发光。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 5. 旧版三张 Alpha 打包 {#map-legacy-alpha}

同样的三项功能，旧版分散在三张贴图的Alpha里。要生成的是三个目标数据层，不是把新辅助A图直接丢进旧版槽位。

**R怎么用：** 辅助R来源是Diffuse A，作可见性0隐藏端255可见端。

**G怎么用：** 辅助G来源是N/LightTex A，作光滑度0粗255光滑。

**B怎么用：** 辅助B来源是M/OtherDataTex A，作发光0无贡献255最大，受重映射门槛。

**A怎么用：** 三个Alpha分别写入三张资产，不是新A图的Alpha。

一次提示词可以请求三个文件，但模型可能只能返回一张，实际按三个目标分别执行。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成旧版三张 Alpha 打包的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：辅助R来源是Diffuse A，作可见性0隐藏端255可见端；辅助G来源是N/LightTex A，作光滑度0粗255光滑；辅助B来源是M/OtherDataTex A，作发光0无贡献255最大，受重映射门槛；三个Alpha分别写入三张资产，不是新A图的Alpha。本次明确采用的生成预设：生成三张独立同UV灰度草稿：可见性全255；光滑度皮肤110布40金属160未知40；发光只明确灯带255其余0。PNG本身A=255，标注由用户选择的输出顺序，不把三层塞到一张RGB冒充旧资源。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 6. 脸部 LightTex {#map-facelight}

**对应代码：** [shadow_area_face](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L579-L590) · [face_high](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L810-L825)

脸图和身体图不能共用解释。图中常量只是把每个通道的位置拆给你看，不代表脸的方向阴影已经恢复；眼鼻嘴的对应关系、视角和材质分支都很重要。

![绝区零 脸部 LightTex 输入、输出与四通道示意](./assets/maps/facelight/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/facelight/facelight.png) · [R灰度层](./assets/maps/facelight/facelight-r.png) · [G灰度层](./assets/maps/facelight/facelight-g.png) · [B灰度层](./assets/maps/facelight/facelight-b.png) · [A灰度层](./assets/maps/facelight/facelight-a.png)

**R怎么用：** R方向阈值场，先0.9R+0.1，同一光向增大更偏亮面，不能从Diffuse唯一恢复。

**G怎么用：** G高光先max(G−0.5,0)，0～127同输入，128起增加，还受视角/脸子区域限制。

**B怎么用：** B条件轮廓乘子，低值更窄、高值更宽，0抑制该项。

**A怎么用：** A AO乘子0阴影端255保留，眼牙等子区域可强制1。

### 完整占位生成提示词（非角色还原）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成脸部 LightTex的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R方向阈值场，先0.9R+0.1，同一光向增大更偏亮面，不能从Diffuse唯一恢复；G高光先max(G−0.5,0)，0～127同输入，128起增加，还受视角/脸子区域限制；B条件轮廓乘子，低值更窄、高值更宽，0抑制该项；A AO乘子0阴影端255保留，眼牙等子区域可强制1。本次明确采用的生成预设：非还原性脸图占位：R128平场、G0低高光输入、B255保留轮廓乘子、A255无额外AO。该占位不具备角色正确脸阴影变化。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 7. SecondaryEmissionMask {#map-secondary-mask}

**对应代码：** [二级发光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L401-L424)

只有明确的灯带才属于发光区。白衣服、金属反光和蓝色装饰都不自动算发光；黑底表示这一项不贡献，不是在画黑色衣服。

![绝区零 SecondaryEmissionMask 输入、输出与四通道示意](./assets/maps/secondary-mask/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/secondary-mask/secondary-mask.png) · [R灰度层](./assets/maps/secondary-mask/secondary-mask-r.png) · [G灰度层](./assets/maps/secondary-mask/secondary-mask-g.png) · [B灰度层](./assets/maps/secondary-mask/secondary-mask-b.png) · [A灰度层](./assets/maps/secondary-mask/secondary-mask-a.png)

**R怎么用：** R在本次选定R模式下是发光遮罩，0无该项、255最大，重复相乘时128不是一半最终贡献。

**G怎么用：** G只有选中G时参与，规则同R；本次不选。

**B怎么用：** B只有选中B时参与，规则同R；本次不选。

**A怎么用：** A该二级发光链未确认用途，本次占位255。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成SecondaryEmissionMask的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R在本次选定R模式下是发光遮罩，0无该项、255最大，重复相乘时128不是一半最终贡献；G只有选中G时参与，规则同R；本次不选；B只有选中B时参与，规则同R；本次不选；A该二级发光链未确认用途，本次占位255。本次明确采用的生成预设：本次选R：明确灯带R255其它0，G0、B0、A255；没有灯带说明则RGB全0。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 8. SecondaryEmissionTex {#map-secondary-emission}

**对应代码：** [二级发光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L401-L424)

先看输入的蓝色衣片：颜色图里它就该是蓝色，R/G/B是颜色分量。到了控制图，同一片蓝布可能变成红橙色，那不是改了衣服颜色，而是几个控制值叠在一起。

![绝区零 SecondaryEmissionTex 输入、输出与四通道示意](./assets/maps/secondary-emission/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/secondary-emission/secondary-emission.png) · [R灰度层](./assets/maps/secondary-emission/secondary-emission-r.png) · [G灰度层](./assets/maps/secondary-emission/secondary-emission-g.png) · [B灰度层](./assets/maps/secondary-emission/secondary-emission-b.png) · [A灰度层](./assets/maps/secondary-emission/secondary-emission-a.png)

**R怎么用：** R是发光颜色红，或灰度模式唯一来源。

**G怎么用：** G是彩色模式绿，灰度模式不单独用。

**B怎么用：** B是彩色模式蓝，灰度模式不单独用。

**A怎么用：** A在所引用二级发光链未确认用途。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成SecondaryEmissionTex的颜色贴图草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是发光颜色红，或灰度模式唯一来源；G是彩色模式绿，灰度模式不单独用；B是彩色模式蓝，灰度模式不单独用；A在所引用二级发光链未确认用途。本次明确采用的生成预设：本次彩色模式同UV练习：用户明确灯带用RGB(40,220,255)，其它RGB0，A255；不画光晕；实际旋转/平移/第二UV时需另指定布局。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 9. Ramp / 漫反射色带 {#map-ramp}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![绝区零 Ramp / 漫反射色带 输入、输出与四通道示意](./assets/maps/ramp/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/ramp/ramp.png) · [R灰度层](./assets/maps/ramp/ramp-r.png) · [G灰度层](./assets/maps/ramp/ramp-g.png) · [B灰度层](./assets/maps/ramp/ramp-b.png) · [A灰度层](./assets/maps/ramp/ramp-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成Ramp / 漫反射色带的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；G是查表颜色绿分量，值增大增加所采样绿贡献；B是查表颜色蓝分量，值增大增加所采样蓝贡献；A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。本次明确采用的生成预设：256×16练习色带：每一行相同，左RGB(45,50,65)、中(150,160,180)、右(255,255,255)，A255，沿X平滑变化、不重排成衣服UV。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 10. MatCap / 球面外观图 {#map-matcap}

这里看的是球面查表外观，不是扣件在UV中的位置。转视角时材质去球面图取样；直接把服装图变成橙色不可能得到正确MatCap。

![绝区零 MatCap / 球面外观图 输入、输出与四通道示意](./assets/maps/matcap/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/matcap/matcap.png) · [R灰度层](./assets/maps/matcap/matcap-r.png) · [G灰度层](./assets/maps/matcap/matcap-g.png) · [B灰度层](./assets/maps/matcap/matcap-b.png) · [A灰度层](./assets/maps/matcap/matcap-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张绝区零角色DiffuseMap颜色贴图，生成MatCap / 球面外观图的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；G是查表颜色绿分量，值增大增加所采样绿贡献；B是查表颜色蓝分量，值增大增加所采样蓝贡献；A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。本次明确采用的生成预设：256×256球面练习图，中心RGB(220,220,220)、边缘(40,40,40)，平滑球面高光，无背景物体；A255，仅用户确认该MatCap路径后试用。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 11. LUT / 参数查表图 {#map-lut}

LUT的一个像素可能就是一个精确参数。它不必有衣服形状，也没有一张图通用的“越白越强”；没有表定义时不能靠生成模型补出可替换文件。

**R怎么用：** R依表行列存特定参数，没有全图单调强弱方向。

**G怎么用：** G依表行列存特定参数，不能当统一粗糙度。

**B怎么用：** B依表行列存特定参数，不能当统一AO。

**A怎么用：** A依表行列定义，不能统一填255；缺少布局不生成替代图。

这里不伪造一个固定RGBA值就称能用；有些特殊贴图没有单Diffuse生成解。

### 单Diffuse输入下的完整处理指令（不伪造替代LUT）

```text
我只上传了这张绝区零角色Diffuse颜色图。我想生成LUT / 参数查表图，但你没有目标采样/参数定义。完整规则是：R依表行列存特定参数，没有全图单调强弱方向；G依表行列存特定参数，不能当统一粗糙度；B依表行列存特定参数，不能当统一AO；A依表行列定义，不能统一填255；缺少布局不生成替代图。不生成替代图；仅说明缺少的表尺寸、行列和RGBA参数，让用户用编辑器按规范填写。不要编RGBA常量或行列，说明还缺哪些尺寸、采样UV、通道和阈值参数；Diffuse只提供颜色和UV，不足以确定这些数据。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 看数值方向，不要只看合成颜色

![0到255如何表示切线方向](./assets/value-directions.png)

## 最后检查：不要只看生成图好不好看

1. 同UV目标用原Diffuse半透明叠加，检查岛边界、细条、镜像和空白；查表图则检查行列与采样坐标。
2. 拆RGBA取样，确认常量、离散ID和阈值没有被模型偏色、抗锯齿、Gamma改变；ID不做普通模糊渐变。
3. PNG/TGA用于编辑，中间图不是DDS；BC5仅两路、BC6H没有Alpha且HDR转8位会损失范围，最终格式按游戏加载器要求。
4. 材质参数、版本、关键词、采样UV一起记录。转光、转视角、远近mip都比较；开关关闭时改通道可能看不出作用。

完整提示词解决表达歧义，不解决Diffuse缺少的数据，也不代替实机验证。SDF、LUT、双法线几何方向仍有明确限制。

## 固定源码证据

- [HoyoToon ZZZ](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl)
- [明确采样规则](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl#L73-L82)
- [normal_mapping](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L186-L209)
- [shadow_body](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L606-L632)
- [specular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L211-L220)
- [发光函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L351-L365)
- [R透明分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl#L225-L238)
- [G光滑度](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L211-L220)
- [shadow_area_face](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L579-L590)
- [face_high](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L810-L825)
- [控制轮廓宽度](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl#L455-L461)
- [二级发光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L401-L424)

[图解输出尺寸与SHA256](./assets/map-manifest.json) · [研究记录](../../../newbie/tools/TextureChannelGuide/Review.md)
