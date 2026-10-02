# 崩坏：星穹铁道：逐贴图通道图解与完整生成提示词

这页可以单独使用。先上传一张自己的Diffuse颜色图到ChatGPT Image等支持图像输入的模型，再复制目标贴图下面的**完整提示词**。不需要上传第二张LightMap，也不用读另一篇基础文章才能知道怎么用。

**先分清两件事：**通道规则来自指定复刻Shader；下面按皮肤、布料、饰件给的数字是明确的生成练习预设，不是从该角色解包得到的原值。提示词写得完整可以减少歧义，但不能保证模型逐像素保持UV或精确执行RGBA。

本页用“原图/四通道图 → 看图说明 → 每通道数值 → 完整提示词”讲解。教学图都是程序绘制、texconv拆通道的示意，不冒充游戏解包或模型实测。

本页通道约定主要依据HoyoToon固定提交 `d9e5ca2f312bf16fba89dee67d32c08b482dcda4`，属于公开复刻的已审路径，不是原游戏全版本规范。

## 找到你要生成的贴图

- [DiffuseMap / 颜色图](#map-diffuse)
- [LightMap / 身体与头发](#map-lightmap)
- [EmissionTex / 独立发光](#map-emission)
- [FaceExpression / 表情图](#map-expression)
- [StockRangeTex / 丝袜控制](#map-stock)
- [AlphaTex / 自定义配色索引](#map-alphatex)
- [FaceMap / 脸部方向阴影图](#map-sdf)
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

**对应代码：** [发光路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L526-L547)

先看输入的蓝色衣片：颜色图里它就该是蓝色，R/G/B是颜色分量。到了控制图，同一片蓝布可能变成红橙色，那不是改了衣服颜色，而是几个控制值叠在一起。

![崩坏：星穹铁道 DiffuseMap / 颜色图 输入、输出与四通道示意](./assets/maps/diffuse/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/diffuse/diffuse.png) · [R灰度层](./assets/maps/diffuse/diffuse-r.png) · [G灰度层](./assets/maps/diffuse/diffuse-g.png) · [B灰度层](./assets/maps/diffuse/diffuse-b.png) · [A灰度层](./assets/maps/diffuse/diffuse-a.png)

**R怎么用：** R是基础颜色红分量，0最低、255最高。

**G怎么用：** G是基础颜色绿分量，0最低、255最高。

**B怎么用：** B是基础颜色蓝分量，0最低、255最高。

**A怎么用：** A用途由材质决定，单张Diffuse不能推断透明、发光或ID。

颜色分量不是金属、高光或AO；不要增加新的方向光、投影和高光。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成DiffuseMap / 颜色图的颜色贴图草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是基础颜色红分量，0最低、255最高；G是基础颜色绿分量，0最低、255最高；B是基础颜色蓝分量，0最低、255最高；A用途由材质决定，单张Diffuse不能推断透明、发光或ID。本次明确采用的生成预设：本次生成同UV、不透明Diffuse颜色草稿：R/G/B按我给出的新配色修改，未指定改色时保留上传图的RGB颜色；A固定255，不猜透明、发光或材质ID。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 2. LightMap / 身体与头发 {#map-lightmap}

**对应代码：** [材质与Ramp行](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L321-L367) · [G阴影](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L567-L581) · [B高光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L690-L737)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![崩坏：星穹铁道 LightMap / 身体与头发 输入、输出与四通道示意](./assets/maps/lightmap/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/lightmap/lightmap.png) · [R灰度层](./assets/maps/lightmap/lightmap-r.png) · [G灰度层](./assets/maps/lightmap/lightmap-g.png) · [B灰度层](./assets/maps/lightmap/lightmap-b.png) · [A灰度层](./assets/maps/lightmap/lightmap-a.png)

**R怎么用：** R乘边缘光：RimLightMode=1时0关闭该项、255完整；Mode=0不受R影响。

**G怎么用：** G增大提高Ramp受光坐标；原始min(1,4×半Lambert×G×顶点AO×投影阴影)，0在主pass仍有约0.15085下限。

**B怎么用：** B是普通高光阈值/范围，增大降低1−B门槛，羽化另由参数控制；0不保证严格无高光。

**A怎么用：** A为floor(8A)索引：0～31ID0、32～63ID1、64～95ID2、96～127ID3、128～159ID4、160～191ID5、192～223ID6、224～254ID7；255产生8不安全。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成LightMap / 身体与头发的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R乘边缘光：RimLightMode=1时0关闭该项、255完整；Mode=0不受R影响；G增大提高Ramp受光坐标；原始min(1,4×半Lambert×G×顶点AO×投影阴影)，0在主pass仍有约0.15085下限；B是普通高光阈值/范围，增大降低1−B门槛，羽化另由参数控制；0不保证严格无高光；A为floor(8A)索引：0～31ID0、32～63ID1、64～95ID2、96～127ID3、128～159ID4、160～191ID5、192～223ID6、224～254ID7；255产生8不安全。本次明确采用的生成预设：皮肤RGBA(180,128,30,16)、布料(150,128,20,48)、普通饰件(220,128,180,80)、未知(150,128,20,16)。ID是本次练习参数组，不能当角色原编号。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 3. EmissionTex / 独立发光 {#map-emission}

**对应代码：** [发光路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L526-L547)

只有明确的灯带才属于发光区。白衣服、金属反光和蓝色装饰都不自动算发光；黑底表示这一项不贡献，不是在画黑色衣服。

![崩坏：星穹铁道 EmissionTex / 独立发光 输入、输出与四通道示意](./assets/maps/emission/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/emission/emission.png) · [R灰度层](./assets/maps/emission/emission-r.png) · [G灰度层](./assets/maps/emission/emission-g.png) · [B灰度层](./assets/maps/emission/emission-b.png) · [A灰度层](./assets/maps/emission/emission-a.png)

**R怎么用：** R在独立模式作为源s，超过Threshold后重映射增强。

**G怎么用：** G在核心发光链未单独使用。

**B怎么用：** B在核心发光链未单独使用。

**A怎么用：** A作门控，要求s×A>Threshold，0可阻断、255允许正常比较。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成EmissionTex / 独立发光的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R在独立模式作为源s，超过Threshold后重映射增强；G在核心发光链未单独使用；B在核心发光链未单独使用；A作门控，要求s×A>Threshold，0可阻断、255允许正常比较。本次明确采用的生成预设：R只有用户明确指定的灯带255、其它0；G=0、B=0、A=255。没有灯带说明时R全0；不靠Diffuse颜色猜发光。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 4. FaceExpression / 表情图 {#map-expression}

**对应代码：** [B鼻区与Expression](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L789-L805)

表情图不是在Diffuse上画腮红，而是存几层表情权重。特别留意Alpha的正反方向：有的实现255关闭这一层，0才最强。

![崩坏：星穹铁道 FaceExpression / 表情图 输入、输出与四通道示意](./assets/maps/expression/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/expression/expression.png) · [R灰度层](./assets/maps/expression/expression-r.png) · [G灰度层](./assets/maps/expression/expression-g.png) · [B灰度层](./assets/maps/expression/expression-b.png) · [A灰度层](./assets/maps/expression/expression-a.png)

**R怎么用：** R超过ExMapThreshold后才贡献脸颊色，越大通常贡献越多。

**G怎么用：** G乘害羞强度，0无贡献、增大靠近指定害羞色。

**B怎么用：** B乘表情阴影强度，0无贡献、增大靠近指定阴影色。

**A怎么用：** A在该核心链未确认用途。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成FaceExpression / 表情图的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R超过ExMapThreshold后才贡献脸颊色，越大通常贡献越多；G乘害羞强度，0无贡献、增大靠近指定害羞色；B乘表情阴影强度，0无贡献、增大靠近指定阴影色；A在该核心链未确认用途。本次明确采用的生成预设：R=0、G=0、B=0、A=255作为无表情占位；用户明确要求脸红时只在相应脸颊R画180，其余仍0。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 5. StockRangeTex / 丝袜控制 {#map-stock}

**对应代码：** [丝袜路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L700-L731)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![崩坏：星穹铁道 StockRangeTex / 丝袜控制 输入、输出与四通道示意](./assets/maps/stock/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/stock/stock.png) · [R灰度层](./assets/maps/stock/stock-r.png) · [G灰度层](./assets/maps/stock/stock-g.png) · [B灰度层](./assets/maps/stock/stock-b.png) · [A灰度层](./assets/maps/stock/stock-a.png)

**R怎么用：** R>0.001判作用区并作权重，0不作用、255最大纹理权重。

**G怎么用：** G参与丝袜高光细节权重，增大通常增强。

**B怎么用：** B在平铺UV采样，变成1+StockRoughness×(B/2−0.5)，255保留因子1、0降低，不是越白越粗糙。

**A怎么用：** A未确认用途。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成StockRangeTex / 丝袜控制的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R>0.001判作用区并作权重，0不作用、255最大纹理权重；G参与丝袜高光细节权重，增大通常增强；B在平铺UV采样，变成1+StockRoughness×(B/2−0.5)，255保留因子1、0降低，不是越白越粗糙；A未确认用途。本次明确采用的生成预设：只在用户明确指出的丝袜区R=255，其它R=0；G=128练习权重、B=255无平铺细节衰减、A=255占位。没有丝袜区域说明时R全0。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 6. AlphaTex / 自定义配色索引 {#map-alphatex}

**对应代码：** [自定义颜色函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-common.hlsl#L779-L833)

这张图是分类，不是照明。一个类别应保持在同一安全区间；画得很漂亮的渐变反而可能让像素跨到另一个材质组。

![崩坏：星穹铁道 AlphaTex / 自定义配色索引 输入、输出与四通道示意](./assets/maps/alphatex/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/alphatex/alphatex.png) · [R灰度层](./assets/maps/alphatex/alphatex-r.png) · [G灰度层](./assets/maps/alphatex/alphatex-g.png) · [B灰度层](./assets/maps/alphatex/alphatex-b.png) · [A灰度层](./assets/maps/alphatex/alphatex-a.png)

**R怎么用：** R按floor(8R)选配色，0～31skin、32～63第一对、之后每32切组；224～242第七对，243～255保留原色。

**G怎么用：** G未确认用途。

**B怎么用：** B未确认用途。

**A怎么用：** A未确认用途。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成AlphaTex / 自定义配色索引的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R按floor(8R)选配色，0～31skin、32～63第一对、之后每32切组；224～242第七对，243～255保留原色；G未确认用途；B未确认用途；A未确认用途。本次明确采用的生成预设：R=255保留原色的练习默认；G=0、B=0、A=255占位。只有用户另给配色组时才用16/48/80等区间内部值。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 7. FaceMap / 脸部方向阴影图 {#map-sdf}

**对应代码：** [A镜像SDF](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L584-L590)

这里故意展示平场占位，而不画一个看起来像鼻影的假SDF。颜色图没有告诉我们每个脸部像素在哪个光向开始转暗；正确方向场需要额外设计或几何信息。

![崩坏：星穹铁道 FaceMap / 脸部方向阴影图 输入、输出与四通道示意](./assets/maps/sdf/overview.png)

**图中是不能用于脸阴影还原的常量占位，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/sdf/sdf.png) · [R灰度层](./assets/maps/sdf/sdf-r.png) · [G灰度层](./assets/maps/sdf/sdf-g.png) · [B灰度层](./assets/maps/sdf/sdf-b.png) · [A灰度层](./assets/maps/sdf/sdf-a.png)

**R怎么用：** R眼发光仅0.45<R<0.55即115～140，0/255不在区间。

**G怎么用：** G自阴影pass减掉该遮罩再clip，增大更易丢弃该pass，不外推全pass。

**B怎么用：** B鼻高光比较B×视角项>0.1，0～25无法通过，26起还看视角。

**A怎么用：** A方向阈值场，固定光向增大更偏亮面，镜像读取。

只上传Diffuse无法唯一确定方向场。下面完整指令仅生成标明用途的占位草稿，不是正确SDF生成配方；要重建必须增加几何/光向设计信息。

### 完整占位生成提示词（非角色还原）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成FaceMap / 脸部方向阴影图的占位草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R眼发光仅0.45<R<0.55即115～140，0/255不在区间；G自阴影pass减掉该遮罩再clip，增大更易丢弃该pass，不外推全pass；B鼻高光比较B×视角项>0.1，0～25无法通过，26起还看视角；A方向阈值场，固定光向增大更偏亮面，镜像读取。本次明确采用的生成预设：只做不能用于角色还原的方向场占位：R=0、G=0、B=0、A=128。A全128没有方向梯度，不声称有正确随光阴影。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 8. Ramp / 漫反射色带 {#map-ramp}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![崩坏：星穹铁道 Ramp / 漫反射色带 输入、输出与四通道示意](./assets/maps/ramp/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/ramp/ramp.png) · [R灰度层](./assets/maps/ramp/ramp-r.png) · [G灰度层](./assets/maps/ramp/ramp-g.png) · [B灰度层](./assets/maps/ramp/ramp-b.png) · [A灰度层](./assets/maps/ramp/ramp-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成Ramp / 漫反射色带的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；G是查表颜色绿分量，值增大增加所采样绿贡献；B是查表颜色蓝分量，值增大增加所采样蓝贡献；A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。本次明确采用的生成预设：256×16练习色带，8个区每区两行且成对相同；每行左RGB(45,50,65)、中(150,160,180)、右(255,255,255)，A255；不声称复原冷暖Ramp。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 9. MatCap / 球面外观图 {#map-matcap}

这里看的是球面查表外观，不是扣件在UV中的位置。转视角时材质去球面图取样；直接把服装图变成橙色不可能得到正确MatCap。

![崩坏：星穹铁道 MatCap / 球面外观图 输入、输出与四通道示意](./assets/maps/matcap/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/matcap/matcap.png) · [R灰度层](./assets/maps/matcap/matcap-r.png) · [G灰度层](./assets/maps/matcap/matcap-g.png) · [B灰度层](./assets/maps/matcap/matcap-b.png) · [A灰度层](./assets/maps/matcap/matcap-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张崩坏：星穹铁道角色DiffuseMap颜色贴图，生成MatCap / 球面外观图的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；G是查表颜色绿分量，值增大增加所采样绿贡献；B是查表颜色蓝分量，值增大增加所采样蓝贡献；A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。本次明确采用的生成预设：256×256球面练习图，中心RGB(220,220,220)、边缘(40,40,40)，平滑球面高光，无背景物体；A255，仅用户确认该MatCap路径后试用。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 10. LUT / 参数查表图 {#map-lut}

LUT的一个像素可能就是一个精确参数。它不必有衣服形状，也没有一张图通用的“越白越强”；没有表定义时不能靠生成模型补出可替换文件。

**R怎么用：** R依表行列存特定参数，没有全图单调强弱方向。

**G怎么用：** G依表行列存特定参数，不能当统一粗糙度。

**B怎么用：** B依表行列存特定参数，不能当统一AO。

**A怎么用：** A依表行列定义，不能统一填255；缺少布局不生成替代图。

这里不伪造一个固定RGBA值就称能用；有些特殊贴图没有单Diffuse生成解。

### 单Diffuse输入下的完整处理指令（不伪造替代LUT）

```text
我只上传了这张崩坏：星穹铁道角色Diffuse颜色图。我想生成LUT / 参数查表图，但你没有目标采样/参数定义。完整规则是：R依表行列存特定参数，没有全图单调强弱方向；G依表行列存特定参数，不能当统一粗糙度；B依表行列存特定参数，不能当统一AO；A依表行列定义，不能统一填255；缺少布局不生成替代图。不生成替代图；仅说明缺少的表尺寸、行列和RGBA参数，让用户用编辑器按规范填写。不要编RGBA常量或行列，说明还缺哪些尺寸、采样UV、通道和阈值参数；Diffuse只提供颜色和UV，不足以确定这些数据。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 法线贴图补充

这份固定核心程序未确认独立NormalMap采样链，不意味着星铁所有新材质都没有法线。没有实际绑定与解包规则，不单独编一套“星铁Normal RGBA”提示词。

## 看数值方向，不要只看合成颜色

![0到255如何表示切线方向](./assets/value-directions.png)

## 最后检查：不要只看生成图好不好看

1. 同UV目标用原Diffuse半透明叠加，检查岛边界、细条、镜像和空白；查表图则检查行列与采样坐标。
2. 拆RGBA取样，确认常量、离散ID和阈值没有被模型偏色、抗锯齿、Gamma改变；ID不做普通模糊渐变。
3. PNG/TGA用于编辑，中间图不是DDS；BC5仅两路、BC6H没有Alpha且HDR转8位会损失范围，最终格式按游戏加载器要求。
4. 材质参数、版本、关键词、采样UV一起记录。转光、转视角、远近mip都比较；开关关闭时改通道可能看不出作用。

完整提示词解决表达歧义，不解决Diffuse缺少的数据，也不代替实机验证。SDF、LUT、双法线几何方向仍有明确限制。

## 固定源码证据

- [HoyoToon Star Rail](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl)
- [材质与Ramp行](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L321-L367)
- [R边缘光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L499-L506)
- [G阴影](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L567-L581)
- [B高光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L690-L737)
- [计算](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-common.hlsl#L102-L113)
- [公式](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-common.hlsl#L150-L164)
- [发光路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L526-L547)
- [FaceMap G的Stencil](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L380-L397)
- [A镜像SDF](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L584-L590)
- [B鼻区与Expression](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L789-L805)
- [丝袜路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L700-L731)
- [自定义颜色路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L558-L563)
- [自定义颜色函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-common.hlsl#L779-L833)
- [读入代码](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L369-L377)

[图解输出尺寸与SHA256](./assets/map-manifest.json) · [研究记录](../../../newbie/tools/TextureChannelGuide/Review.md)
