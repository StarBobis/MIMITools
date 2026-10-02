# 崩坏三：逐贴图通道图解与完整生成提示词

这页可以单独使用。先上传一张自己的Diffuse颜色图到ChatGPT Image等支持图像输入的模型，再复制目标贴图下面的**完整提示词**。不需要上传第二张LightMap，也不用读另一篇基础文章才能知道怎么用。

**先分清两件事：**通道规则来自指定复刻Shader；下面按皮肤、布料、饰件给的数字是明确的生成练习预设，不是从该角色解包得到的原值。提示词写得完整可以减少歧义，但不能保证模型逐像素保持UV或精确执行RGBA。

本页用“原图/四通道图 → 看图说明 → 每通道数值 → 完整提示词”讲解。教学图都是程序绘制、texconv拆通道的示意，不冒充游戏解包或模型实测。

本页通道约定主要依据HoyoToon固定提交 `d9e5ca2f312bf16fba89dee67d32c08b482dcda4`，属于公开复刻的已审路径，不是原游戏全版本规范。

## 找到你要生成的贴图

- [DiffuseMap / 颜色图](#map-diffuse)
- [Part 1 LightMap](#map-lightmap-p1)
- [Part 2 LightMap](#map-lightmap-p2)
- [Part 2 BumpMap / 法线](#map-normal)
- [FacExpTex / FaceExpTex 表情图](#map-expression)
- [Part 2 SpecularMaskMap / 发丝高光](#map-specmask)
- [Part 2 JitterMap / 发丝扰动](#map-jitter)
- [Part 2 HairStripPatterns](#map-hairpattern)
- [FaceMap / 脸部方向阴影图（Part1 / Part2）](#map-sdf)
- [MaskDisTex / 溶解控制图](#map-dissolve)
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

**对应代码：** [AlphaType分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L216-L240) · [发光来源](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-program.hlsl#L153-L158)

先看输入的蓝色衣片：颜色图里它就该是蓝色，R/G/B是颜色分量。到了控制图，同一片蓝布可能变成红橙色，那不是改了衣服颜色，而是几个控制值叠在一起。

![崩坏三 DiffuseMap / 颜色图 输入、输出与四通道示意](./assets/maps/diffuse/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/diffuse/diffuse.png) · [R灰度层](./assets/maps/diffuse/diffuse-r.png) · [G灰度层](./assets/maps/diffuse/diffuse-g.png) · [B灰度层](./assets/maps/diffuse/diffuse-b.png) · [A灰度层](./assets/maps/diffuse/diffuse-a.png)

**R怎么用：** R是基础颜色红分量，0最低、255最高。

**G怎么用：** G是基础颜色绿分量，0最低、255最高。

**B怎么用：** B是基础颜色蓝分量，0最低、255最高。

**A怎么用：** A用途由材质决定，单张Diffuse不能推断透明、发光或ID。

颜色分量不是金属、高光或AO；不要增加新的方向光、投影和高光。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成DiffuseMap / 颜色图的颜色贴图草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是基础颜色红分量，0最低、255最高；G是基础颜色绿分量，0最低、255最高；B是基础颜色蓝分量，0最低、255最高；A用途由材质决定，单张Diffuse不能推断透明、发光或ID。本次明确采用的生成预设：本次生成同UV、不透明Diffuse颜色草稿：R/G/B按我给出的新配色修改，未指定改色时保留上传图的RGB颜色；A固定255，不猜透明、发光或材质ID。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 2. Part 1 LightMap {#map-lightmap-p1}

**对应代码：** [普通高光函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Common.hlsl#L46-L55) · [hi3_shadow](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Common.hlsl#L29-L43) · [颜色选择函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Colors.hlsl#L1-L27)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![崩坏三 Part 1 LightMap 输入、输出与四通道示意](./assets/maps/lightmap-p1/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/lightmap-p1/lightmap-p1.png) · [R灰度层](./assets/maps/lightmap-p1/lightmap-p1-r.png) · [G灰度层](./assets/maps/lightmap-p1/lightmap-p1-g.png) · [B灰度层](./assets/maps/lightmap-p1/lightmap-p1-b.png) · [A灰度层](./assets/maps/lightmap-p1/lightmap-p1-a.png)

**R怎么用：** R普通高光强度，0无该项、增大增强已出现高光。

**G怎么用：** G与顶点R相乘p，p≤0.5用1.25p−0.125、p>0.5用1.2p−0.1，再与光向floor；段内增大通常更受光，有台阶。

**B怎么用：** B控制硬高光门槛，pow(N·H,Shininess)>1−B，增大扩范围，0通常不通过。

**A怎么用：** A+0.1选颜色：0～25色1、26～76色2、77～127色3、128～178色4、179～255色5，头发variant2固定色1。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成Part 1 LightMap的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R普通高光强度，0无该项、增大增强已出现高光；G与顶点R相乘p，p≤0.5用1.25p−0.125、p>0.5用1.2p−0.1，再与光向floor；段内增大通常更受光，有台阶；B控制硬高光门槛，pow(N·H,Shininess)>1−B，增大扩范围，0通常不通过；A+0.1选颜色：0～25色1、26～76色2、77～127色3、128～178色4、179～255色5，头发variant2固定色1。本次明确采用的生成预设：普通高光练习：皮肤RGBA(30,128,40,13)、布料(20,128,30,51)、普通饰件(160,128,180,102)、未识别(20,128,30,13)；组别是本次练习参数组，不恢复原角色编号。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 3. Part 2 LightMap {#map-lightmap-p2}

**对应代码：** [核心采样与分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-program.hlsl#L52-L158) · [material_region](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L69-L86) · [specular_regular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L291-L332)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![崩坏三 Part 2 LightMap 输入、输出与四通道示意](./assets/maps/lightmap-p2/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/lightmap-p2/lightmap-p2.png) · [R灰度层](./assets/maps/lightmap-p2/lightmap-p2-r.png) · [G灰度层](./assets/maps/lightmap-p2/lightmap-p2-g.png) · [B灰度层](./assets/maps/lightmap-p2/lightmap-p2-b.png) · [A灰度层](./assets/maps/lightmap-p2/lightmap-p2-a.png)

**R怎么用：** R参与普通高光强度/门槛，≤0.1即0～25且EnableStocking开启可走丝袜；某pass R<0.45裁剪。

**G怎么用：** G身体增大通常更受光，头发G+0.5控制且G<0.2即0～50走第二阴影色。

**B怎么用：** B硬分支增大降低1−B门槛扩大高光；软分支增大提高指数，让高光更集中，方向相反。

**A怎么用：** A+0.1分组：0～25组0、26～76组1、77～127组2、128～178组3、179～255组4；金属由A+0.1≥材质MetalThreshold另判。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成Part 2 LightMap的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R参与普通高光强度/门槛，≤0.1即0～25且EnableStocking开启可走丝袜；某pass R<0.45裁剪；G身体增大通常更受光，头发G+0.5控制且G<0.2即0～50走第二阴影色；B硬分支增大降低1−B门槛扩大高光；软分支增大提高指数，让高光更集中，方向相反；A+0.1分组：0～25组0、26～76组1、77～127组2、128～178组3、179～255组4；金属由A+0.1≥材质MetalThreshold另判。本次明确采用的生成预设：只做普通非金属、关闭丝袜与金属路径、UseSoftSpecular=0的练习：皮肤(120,128,40,13)、布(120,128,30,51)、饰件(160,128,180,102)、未知(120,128,30,13)。R≥115只是避开已知0.45裁剪候选，不保证其它pass安全。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 4. Part 2 BumpMap / 法线 {#map-normal}

**对应代码：** [法线函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L21-L29)

看R和G里的细小变化，方向信息藏在这些梯度里，而不是藏在“蓝紫色外观”里。平坦区域约128；从128向两侧偏移表示向不同切线方向倾斜，不是越白越凸。

![崩坏三 Part 2 BumpMap / 法线 输入、输出与四通道示意](./assets/maps/normal/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/normal/normal.png) · [R灰度层](./assets/maps/normal/normal-r.png) · [G灰度层](./assets/maps/normal/normal-g.png) · [B灰度层](./assets/maps/normal/normal-b.png) · [A灰度层](./assets/maps/normal/normal-a.png)

**R怎么用：** R编码切线法线X：0负方向、128附近零偏转、255正方向。

**G怎么用：** G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader。

**B怎么用：** B标准切线Z：0负Z、128附近零、255正Z，平坦B255。

**A怎么用：** A在核心法线链未确认用途。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成Part 2 BumpMap / 法线的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；B标准切线Z：0负Z、128附近零、255正Z，平坦B255；A在核心法线链未确认用途。本次明确采用的生成预设：平坦RGBA(128,128,255,255)，浅缝线微弱XY变化并保证XYZ单位方向；输出标准XYZ、不预先翻X，由目标online解包翻X，offline不翻。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。法线细节仅来自我明确指出的浅缝线、压边、扣件和发丝结构，不把Diffuse明暗转成高度，不新增织物噪点；XY解码为2×值/255−1，保持X²+Y²≤1并按目标定义重建或填写Z，不能把方向极值当凹凸强度。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 5. FacExpTex / FaceExpTex 表情图 {#map-expression}

**对应代码：** [RGBA读取](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L242-L256)

表情图不是在Diffuse上画腮红，而是存几层表情权重。特别留意Alpha的正反方向：有的实现255关闭这一层，0才最强。

![崩坏三 FacExpTex / FaceExpTex 表情图 输入、输出与四通道示意](./assets/maps/expression/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/expression/expression.png) · [R灰度层](./assets/maps/expression/expression-r.png) · [G灰度层](./assets/maps/expression/expression-g.png) · [B灰度层](./assets/maps/expression/expression-b.png) · [A灰度层](./assets/maps/expression/expression-a.png)

**R怎么用：** R脸红权重，0无贡献；Part1含平方所以中灰不是一半效果。

**G怎么用：** G表情阴影，0无贡献、增大靠近材质色，Part2含平方。

**B怎么用：** B另一表情阴影，0无贡献、增大靠近材质色。

**A怎么用：** A反向表情遮罩，255关闭、0最强；1−A后还可能平方。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成FacExpTex / FaceExpTex 表情图的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R脸红权重，0无贡献；Part1含平方所以中灰不是一半效果；G表情阴影，0无贡献、增大靠近材质色，Part2含平方；B另一表情阴影，0无贡献、增大靠近材质色；A反向表情遮罩，255关闭、0最强；1−A后还可能平方。本次明确采用的生成预设：无表情RGBA(0,0,0,255)；只在用户明确要求的脸红区域R=180，G/B保持0，A255。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 6. Part 2 SpecularMaskMap / 发丝高光 {#map-specmask}

**对应代码：** [完整发丝计算](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L335-L406)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![崩坏三 Part 2 SpecularMaskMap / 发丝高光 输入、输出与四通道示意](./assets/maps/specmask/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/specmask/specmask.png) · [R灰度层](./assets/maps/specmask/specmask-r.png) · [G灰度层](./assets/maps/specmask/specmask-g.png) · [B灰度层](./assets/maps/specmask/specmask-b.png) · [A灰度层](./assets/maps/specmask/specmask-a.png)

**R怎么用：** R按SpecularMaskLerp混合高光权重并参与扰动，开关1时0抑制、255保留。

**G怎么用：** G在高频指数Max/Min间插值，通常Max>Min时增大更宽，反向设置方向相反。

**B怎么用：** B≥0.5即128起允许高频高光、0～127不通过。

**A怎么用：** A在该发丝函数未确认用途。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成Part 2 SpecularMaskMap / 发丝高光的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R按SpecularMaskLerp混合高光权重并参与扰动，开关1时0抑制、255保留；G在高频指数Max/Min间插值，通常Max>Min时增大更宽，反向设置方向相反；B≥0.5即128起允许高频高光、0～127不通过；A在该发丝函数未确认用途。本次明确采用的生成预设：只做无方向细节练习：头发岛R=128、G=128、B=255，背景R/G/B=0，A=255；不能从Diffuse恢复真实切线高光。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 7. Part 2 JitterMap / 发丝扰动 {#map-jitter}

**对应代码：** [完整发丝计算](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L335-L406)

这类图通常平铺或沿特定坐标取样。输入Diffuse可以给风格线索，却不能让模型知道原来使用的ST缩放和发丝切线；练习图只演示灰度数据。

![崩坏三 Part 2 JitterMap / 发丝扰动 输入、输出与四通道示意](./assets/maps/jitter/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/jitter/jitter.png) · [R灰度层](./assets/maps/jitter/jitter-r.png) · [G灰度层](./assets/maps/jitter/jitter-g.png) · [B灰度层](./assets/maps/jitter/jitter-b.png) · [A灰度层](./assets/maps/jitter/jitter-a.png)

**R怎么用：** R在两端扰动方向间插值，0一端、255另一端，128附近中间，不是强度。

**G怎么用：** G在这条函数未用。

**B怎么用：** B在这条函数未用。

**A怎么用：** A在这条函数未用。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成Part 2 JitterMap / 发丝扰动的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R在两端扰动方向间插值，0一端、255另一端，128附近中间，不是强度；G在这条函数未用；B在这条函数未用；A在这条函数未用。本次明确采用的生成预设：R基值128并按用户指定发丝走向作110～145弱扰动；G=0、B=0、A=255。采用256×256平铺图，不按衣服UV输出。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 8. Part 2 HairStripPatterns {#map-hairpattern}

**对应代码：** [完整发丝计算](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L335-L406)

这类图通常平铺或沿特定坐标取样。输入Diffuse可以给风格线索，却不能让模型知道原来使用的ST缩放和发丝切线；练习图只演示灰度数据。

![崩坏三 Part 2 HairStripPatterns 输入、输出与四通道示意](./assets/maps/hairpattern/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/hairpattern/hairpattern.png) · [R灰度层](./assets/maps/hairpattern/hairpattern-r.png) · [G灰度层](./assets/maps/hairpattern/hairpattern-g.png) · [B灰度层](./assets/maps/hairpattern/hairpattern-b.png) · [A灰度层](./assets/maps/hairpattern/hairpattern-a.png)

**R怎么用：** R先映射2R−1，再影响Min/Max扰动范围，0−1、128附近0、255+1。

**G怎么用：** G未确认用途。

**B怎么用：** B未确认用途。

**A怎么用：** A未确认用途。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成Part 2 HairStripPatterns的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R先映射2R−1，再影响Min/Max扰动范围，0−1、128附近0、255+1；G未确认用途；B未确认用途；A未确认用途。本次明确采用的生成预设：256×256无缝灰度条带R基值128、范围110～145；G=0、B=0、A=255。用户提供Diffuse只作为发丝风格参考，尺寸不继承衣服UV。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 9. FaceMap / 脸部方向阴影图（Part1 / Part2） {#map-sdf}

**对应代码：** [Part1镜像采样](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L145-L171)

这里故意展示平场占位，而不画一个看起来像鼻影的假SDF。颜色图没有告诉我们每个脸部像素在哪个光向开始转暗；正确方向场需要额外设计或几何信息。

![崩坏三 FaceMap / 脸部方向阴影图（Part1 / Part2） 输入、输出与四通道示意](./assets/maps/sdf/overview.png)

**图中是不能用于脸阴影还原的常量占位，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/sdf/sdf.png) · [R灰度层](./assets/maps/sdf/sdf-r.png) · [G灰度层](./assets/maps/sdf/sdf-g.png) · [B灰度层](./assets/maps/sdf/sdf-b.png) · [A灰度层](./assets/maps/sdf/sdf-a.png)

**R怎么用：** R在该核心SDF链未确认用途。

**G怎么用：** G在该核心SDF链未确认用途。

**B怎么用：** B在该核心SDF链未确认用途。

**A怎么用：** A是方向阴影阈值场，固定光向下增大更偏亮面，镜像/头部方向决定采样。

只上传Diffuse无法唯一确定方向场。下面完整指令仅生成标明用途的占位草稿，不是正确SDF生成配方；要重建必须增加几何/光向设计信息。

### 完整占位生成提示词（非角色还原）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成FaceMap / 脸部方向阴影图（Part1 / Part2）的占位草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R在该核心SDF链未确认用途；G在该核心SDF链未确认用途；B在该核心SDF链未确认用途；A是方向阴影阈值场，固定光向下增大更偏亮面，镜像/头部方向决定采样。本次明确采用的生成预设：只做不能用于角色还原的方向场占位：R=0、G=0、B=0、A=128。A全128没有方向梯度，不声称有正确随光阴影。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 10. MaskDisTex / 溶解控制图 {#map-dissolve}

LUT的一个像素可能就是一个精确参数。它不必有衣服形状，也没有一张图通用的“越白越强”；没有表定义时不能靠生成模型补出可替换文件。

**R怎么用：** R参与溶解Mask计算，方向取决于AlphaPosition、UV和分支。

**G怎么用：** G参与另一溶解Mask与边缘计算，不能统一说越白越消失。

**B怎么用：** B该所审链未确认通用用途。

**A怎么用：** A该所审链未确认通用用途。

溶解阈值是运行时参数。不同采样坐标会改变效果，仅看Diffuse不能推回噪声与溶解场。

### 单Diffuse输入下的完整处理指令（不伪造替代LUT）

```text
我只上传了这张崩坏三角色Diffuse颜色图。我想生成MaskDisTex / 溶解控制图，但你没有目标采样/参数定义。完整规则是：R参与溶解Mask计算，方向取决于AlphaPosition、UV和分支；G参与另一溶解Mask与边缘计算，不能统一说越白越消失；B该所审链未确认通用用途；A该所审链未确认通用用途。只上传Diffuse无法确定该图的采样布局和阈值，因此不生成声称可替换的四通道图，不自行填RGBA常量；需要取得目标Shader、参数或几何信息。不要编RGBA常量或行列，说明还缺哪些尺寸、采样UV、通道和阈值参数；Diffuse只提供颜色和UV，不足以确定这些数据。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 11. Ramp / 漫反射色带 {#map-ramp}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![崩坏三 Ramp / 漫反射色带 输入、输出与四通道示意](./assets/maps/ramp/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/ramp/ramp.png) · [R灰度层](./assets/maps/ramp/ramp-r.png) · [G灰度层](./assets/maps/ramp/ramp-g.png) · [B灰度层](./assets/maps/ramp/ramp-b.png) · [A灰度层](./assets/maps/ramp/ramp-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成Ramp / 漫反射色带的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；G是查表颜色绿分量，值增大增加所采样绿贡献；B是查表颜色蓝分量，值增大增加所采样蓝贡献；A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。本次明确采用的生成预设：256×16练习色带：每一行相同，左RGB(45,50,65)、中(150,160,180)、右(255,255,255)，A255，沿X平滑变化、不重排成衣服UV。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 12. MatCap / 球面外观图 {#map-matcap}

这里看的是球面查表外观，不是扣件在UV中的位置。转视角时材质去球面图取样；直接把服装图变成橙色不可能得到正确MatCap。

![崩坏三 MatCap / 球面外观图 输入、输出与四通道示意](./assets/maps/matcap/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/matcap/matcap.png) · [R灰度层](./assets/maps/matcap/matcap-r.png) · [G灰度层](./assets/maps/matcap/matcap-g.png) · [B灰度层](./assets/maps/matcap/matcap-b.png) · [A灰度层](./assets/maps/matcap/matcap-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏三角色DiffuseMap颜色贴图，生成MatCap / 球面外观图的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；G是查表颜色绿分量，值增大增加所采样绿贡献；B是查表颜色蓝分量，值增大增加所采样蓝贡献；A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。本次明确采用的生成预设：256×256球面练习图，中心RGB(220,220,220)、边缘(40,40,40)，平滑球面高光，无背景物体；A255，仅用户确认该MatCap路径后试用。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 13. LUT / 参数查表图 {#map-lut}

LUT的一个像素可能就是一个精确参数。它不必有衣服形状，也没有一张图通用的“越白越强”；没有表定义时不能靠生成模型补出可替换文件。

**R怎么用：** R依表行列存特定参数，没有全图单调强弱方向。

**G怎么用：** G依表行列存特定参数，不能当统一粗糙度。

**B怎么用：** B依表行列存特定参数，不能当统一AO。

**A怎么用：** A依表行列定义，不能统一填255；缺少布局不生成替代图。

这里不伪造一个固定RGBA值就称能用；有些特殊贴图没有单Diffuse生成解。

### 单Diffuse输入下的完整处理指令（不伪造替代LUT）

```text
我只上传了这张崩坏三角色Diffuse颜色图。我想生成LUT / 参数查表图，但你没有目标采样/参数定义。完整规则是：R依表行列存特定参数，没有全图单调强弱方向；G依表行列存特定参数，不能当统一粗糙度；B依表行列存特定参数，不能当统一AO；A依表行列定义，不能统一填255；缺少布局不生成替代图。不生成替代图；仅说明缺少的表尺寸、行列和RGBA参数，让用户用编辑器按规范填写。不要编RGBA常量或行列，说明还缺哪些尺寸、采样UV、通道和阈值参数；Diffuse只提供颜色和UV，不足以确定这些数据。
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

- [HoyoToon Part 1](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl)
- [Part 2](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-program.hlsl)
- [普通高光函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Common.hlsl#L46-L55)
- [hi3_shadow](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Common.hlsl#L29-L43)
- [HI3-Toon-old](https://github.com/Elysia-simp/HI3-Toon-old/blob/8a53d3235f906517e202439aa9ec89dceb1701e0/Sub/materials.fxh#L99-L104)
- [颜色选择函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Colors.hlsl#L1-L27)
- [核心采样与分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-program.hlsl#L52-L158)
- [material_region](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L69-L86)
- [specular_regular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L291-L332)
- [AlphaType分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L216-L240)
- [发光来源](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-program.hlsl#L153-L158)
- [Part1镜像采样](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L145-L171)
- [RGBA读取](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L242-L256)
- [face_exp](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L88-L111)
- [法线函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L21-L29)
- [hair_specular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L335-L354)
- [完整发丝计算](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L335-L406)

[图解输出尺寸与SHA256](./assets/map-manifest.json) · [研究记录](../../../newbie/tools/TextureChannelGuide/Review.md)
