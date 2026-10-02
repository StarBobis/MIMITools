# 崩坏：星穹铁道：贴图通道详解与生成提示词

星铁的LightMap乍看和原神很像，但R已经不是普通高光强度。照搬原神的数值，可能改到边缘光上。先认清四个通道，再保留原图做局部修改。

**怎么用下面的提示词：**先读通道说明，再让模型出草稿。未修改通道请在编辑器里从原图复制，不靠模型保证像素一致；ID和阈值用取色器确认。练习数字不代表该角色的标准参数。

[通用基础与验收](../../../newbie/tools/TextureChannelGuide/TextureChannelGuide.md)。核心证据是 [HoyoToon Star Rail](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl)，固定提交 `d9e5ca2f312bf16fba89dee67d32c08b482dcda4`。下表是公开复刻实现的约定，不能无条件套用原游戏全部更新、新角色和特效。

![星穹铁道LightMap教学示意](./assets/lightmap.png)

## 下载练习图

[合成Diffuse](./assets/synthetic-diffuse.png) · [同UV语义分区](./assets/synthetic-regions.png) · [原始RGBA教学数据](./assets/lightmap-data.png) · [资源来源与边界](./assets/README.md) · [SHA256清单](./assets/manifest.json)

可以下载旁边的合成图练习拆通道。图中的分区和数值是练习设定，不是从游戏角色测得的参数。

## 1. 总表：不要把原神的 LightMap 原样搬过来

| 贴图 | R | G | B | A |
| --- | --- | --- | --- | --- |
| Diffuse / MainTex | RGB颜色 | 同左 | 同左 | 裁剪/透明或发光候选，取决于材质 |
| LightMap（身体/头发核心路径） | 边缘光控制，可由RimLightMode决定权重 | AO式阴影阈值控制 | 普通高光阈值/范围与MatCap控制 | 8区材质索引与Ramp行选择 |
| FaceMap | 眼部发光区域的特殊阈值判定 | Stencil遮罩 | 鼻部高光/亮区遮罩 | 脸部SDF/阴影阈值，镜像采样 |
| FaceExpression | 脸颊/表情阈值层 | 害羞/脸红层 | 表情阴影层 | 核心计算未确认用途，保留 |
| StockRangeTex | 丝袜作用区域/权重 | 丝袜高光/细节权重 | 单独平铺采样的细节层 | 这条路径没确认用途，先保留 |
| EmissionTex（独立模式） | 可替代Diffuse A作为发光强度来源 | 未见该核心路径独立使用，保留 | 同左 | 与发光来源相乘、参与阈值门控 |
| AlphaTex | 自定义颜色/轮廓索引来源，依选项 | 未确认 | 未确认 | 未确认 |
| DiffuseRamp / CoolRamp | RGB查表颜色 | 同左 | 同左 | 依原表，保留 |
| MaterialValuesLUT / MatCap | 查表数据/外观，不是服装UV | 依表定义 | 依表定义 | 依表定义 |

**Normal补充：**此固定版本的核心角色程序没有像身体LightMap那样明确的独立NormalMap采样链。本页不因此宣称“星铁永远没有法线贴图”；如新Shader绑定了法线，必须单独追踪解包。不要凭蓝紫外观把LightMap解释成法线。

## 2. LightMap：R边缘、G阴影、B高光、A分区

[材质与Ramp行](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L321-L367)按 `floor(8×A)` 获得索引，Ramp Y为 `(2×ID+1)/16`。[R边缘光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L499-L506)由选项控制；[G阴影](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L567-L581)和[B高光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L690-L737)是不同功能。

8区安全中心示例字节：16、48、80、112、143、175、207、239。A=255会得到8，在8项数组路径下不安全，不要对这种ID图要求“Alpha全部255”。索引号不天然代表皮肤或金属；材质参数、LUT与Ramp决定表现。

### 先看数值方向，别沿用原神的叫法

| 通道 | 往小调 | 往大调 | 0、255与条件 |
| --- | --- | --- | --- |
| R | 边缘光减弱 | 边缘光增强 | RimLightMode=1时按R相乘，0关闭这项，255完整保留；Mode=0时不读R权重，改R不会有这项变化 |
| G | Ramp受光坐标减小，更偏向色带的暗端 | 坐标增大，更偏向亮端 | [计算](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-common.hlsl#L102-L113)原始量是 `min(1,4×半Lambert×G×顶点AO×投影阴影)`；G=0在主pass仍有约0.15085坐标下限，不等于纯黑。255也不能消除背光和投影阴影 |
| B | 普通高光门槛提高，出现更难、范围更小 | 门槛降低，同一点高光增大、出现范围扩大 | [公式](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-common.hlsl#L150-L164)的中心门槛是 `1−B`，羽化由材质roughness参数控制；B=0仍可能在羽化区有高光，不是严格关闭开关 |
| A | 换参数组，不是减弱 | 换参数组，不是增强 | `floor(8A)`，255产生索引8，不适合8项数组 |

**A的线性8位区间：**0～31→ID0，32～63→ID1，64～95→ID2，96～127→ID3，128～159→ID4，160～191→ID5，192～223→ID6，224～254→ID7。255必须另查实现有没有钳制，这个固定路径没有给它安全的第九组。前面列的16等数值只是区间中心，原图在同一区间内的值不必全部改成中心。

同一块布的高光太宽，优先把B调低；亮度不够时还要看材质高光强度参数，不是把B命名成强度就能解释所有变化。

```text
对照<image1>服装UV，以<image2>原LightMap的B层为参考，生成单通道灰度高光草稿。只把我标出的布料区域调得比原B稍暗，缩小普通高光出现范围；饰件和未知区域保持原灰度。保持尺寸、UV岛和细条位置，不画自然颜色、场景光或文字，只输出B层。
```

**只生成ID层：**

```text
对照<image1>UV边界和<image2>原LightMap的A层，修补指定ID边界，沿用原八区关系。保留画布和UV位置，不按配色重新编号，不做连续渐变、照明或文字，只输出A灰度草稿。
```

高光草稿只合并到B，原R/G/A不动；ID草稿则只合并到A。一次只改其中一项，方便知道变化从哪里来。

## 3. Diffuse与EmissionTex

[发光路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L526-L547)从Diffuse A开始，独立模式切换到EmissionTex R，同时乘入EmissionTex A并与阈值比较。不能简单描述为“独立EmissionTex RGB就是发光颜色”；这里颜色仍来自Diffuse和材质Tint。

发光先选择源值s（Diffuse A或独立Emission R），只有 `s×Emission A > Threshold` 才通过门控，再按 `(s−Threshold)/(1−Threshold)` 重映射。小值可能完全不发光，超过阈值后才连续增强；Emission A=0会阻断这条门控，255只是允许源值正常比较。颜色来自Diffuse和Tint，并非把Emission RGB画亮就能生效。透明/裁剪模式另看阈值，别用发光规则改透明边。

**Diffuse：**

```text
按指定配色修改<image1>服装Diffuse的RGB，保留画布、UV岛、缝线和装饰。不要新加光源、投影或文字，只输出颜色草稿，Alpha稍后从原图复制。
```

**独立EmissionTex候选：**

```text
对照<image1>服装UV，只把我标出的灯带和发光图案画成白色，其它区域黑色。保持尺寸、UV边界和细条位置，不把白布和金属反光算成发光，不画光晕或文字，只输出EmissionTex的R灰度草稿。
```

## 4. FaceMap与FaceExpression

[FaceMap G的Stencil](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L380-L397)、[A镜像SDF](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L584-L590)、[B鼻区与Expression](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L789-L805)均在不同计算里。FaceMap R的眼部发光仅对0.45–0.55附近判定，不能把它当线性“越白越亮”的普通Mask。

| 脸图通道 | 数值怎么理解 |
| --- | --- |
| FaceMap R | 眼发光开启时，只识别 `0.45<R<0.55`，线性字节115～140；0和255都不在该区间。它不是越白越发光 |
| FaceMap G | 所引用的自阴影pass用 `脸亮面权重−G` 再clip；G越大越容易被丢掉，0不减这项，255几乎压掉全部。不能把这个Stencil作用外推到所有pass |
| FaceMap B | 鼻高光比较 `B×视角项>0.1`；B越大越容易出现，0～25无法通过，26以上还要看视角，不是26就必亮 |
| FaceMap A | 同一光向下越大越偏亮面，越小越偏阴影；镜像采样和光向决定实际门槛。保留原场，不填常量 |
| Expression R | 低于/等于表情Threshold不作用，超过后逐步增强；255接近全权重 |
| Expression G/B | 通道乘各自强度再混合颜色；0不贡献，值越大越靠近所设置的害羞色/阴影色，不一定只变暗 |
| Expression A | 当前核心未确认用途，原样保留 |

眼发光R=128是特殊区间内的数，不是“半强度”。这类区别必须在写提示词前弄清楚。

**FaceMap保守修补：**

```text
对照<image1>脸UV，只修补<image2>原FaceMap上标出的破损。保留A方向场、G边界、B鼻部遮罩和R特殊眼区编码，不重画肤色和方向鼻影，不改画布或UV位置，不加文字，输出修补草稿。
```

**FaceExpression：**

```text
对照<image1>脸UV和<image2>原表情图，按我的表情说明只生成指定R或G或B层的灰度草稿。保持眼鼻嘴、画布和UV位置，未标区不动，不画自然肤色、SDF或文字。
```

## 5. StockRangeTex：同一B还会平铺采样

[丝袜路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L700-L731)将R当作用区/权重、G参与细节高光，B以另一个tile_uv采样。不能把B简单画成“服装UV上的光滑度”。

丝袜R先用 `R>0.001` 判作用区，线性8位除了0之外都通过，再继续按R作权重：0不作用，255权重最大。G越大，这项丝袜高光权重通常越高；B在另一套平铺UV采样后变成 `1+StockRoughness×(B/2−0.5)`，B=255保留因子1，B=0因子降低。这里不是“B越大粗糙越强”，A未确认。

```text
对照<image1>服装UV和<image2>原丝袜图的R层，只修补我标出的作用区，作用区白色、其它黑色，保持原软边。不改发丝或布料颜色，不画光照和文字，输出同尺寸R灰度草稿。
```

## 6. AlphaTex、Ramp、LUT与MatCap

AlphaTex R在 [自定义颜色路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L558-L563)作为编码输入。其含义由custom_coloring与选项决定，不能命名“透明图”就全涂白。

[自定义颜色函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-common.hlsl#L779-L833)先按floor(8R)选颜色：线性字节0～31选skin配色，32～63选第一对自定义色，之后每32字节切一组；224～242选第七对，243～255因R>0.95改为1而保留原色。它和LightMap A不是同一套255越界行为。G/B/A在这里未确认用途，保留。

**AlphaTex：**

```text
对照<image1>UV边界和<image2>原AlphaTex的R层，修补我标出的配色索引边界，沿用原编码，不画透明度或连续渐变。保持尺寸和UV位置，只输出R灰度草稿。
```

**Ramp：**

```text
编辑<image1>星穹铁道原DiffuseRamp或CoolRamp，只按我指定的色板修改对应行的RGB，保留原尺寸与八区行中心、冷暖表对应关系、Alpha和取样边界，不输入衣服UV、不重排行、不加物体或文字，只输出同布局色带候选供逐行取样检查。
```

MaterialValuesLUT不是按衣服UV取样，而是“列=材质ID、行=参数类型”。[读入代码](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Star%20Rail/Includes/HoyoToonStarRail-program.hlsl#L369-L377)中第0行RGB是高光色，第1行RGB依次为指数、羽化宽度、强度，第2/3行是轮廓/边缘色，第4行含边缘类型与软度，第5行是边缘阴影色，第6行含宽度与羽化。第1行R增大通常更集中，G增大更柔和，B增大更强；其它类型值不能整张按同一强弱方向改，未知Alpha和未确认项保留。

**MaterialValuesLUT：**

有坐标和数值时直接在编辑器里填写更可靠，模型只适合局部视觉草稿，不负责恢复未知参数。

```text
以<image1>原MaterialValuesLUT为参考，只修补我标出的视觉破损，保持原尺寸、行列网格和其它区域，不美化、不新添渐变或文字，输出修补草稿。精确参数值稍后在编辑器里填写。
```

**MatCap：**

```text
以<image1>原MatCap为球面外观参考，按指定材质外观生成相同尺寸和球面布局的MatCap候选，保留中心方向与边缘过渡，不把衣服UV放进图中，不加背景物体或文字，Alpha继承原图，结果仅用于已确认的MatCap采样路径，需在模型旋转视角下验证而不是当服装Mask使用。
```

## 改完怎么检查与不覆盖范围

本页不把每个角色的天空、星光、眼特效或独立技能图都归入通用LightMap。先保留原配置，检查材质ID对应Ramp行、G阴影、R边缘、B高光、Alpha与表情开关。文生图数字不准确时，采用“语义分区→人工确认→通道定值”。脸SDF和LUT不能由Diffuse可靠恢复。

源码中部分LUT高光系数带作者近似实现注释；因此“能在HoyoToon渲染”也不代表原游戏参数完全复现。PNG/TGA导出、真实通道合并与实际引擎验证仍是必需步骤。
