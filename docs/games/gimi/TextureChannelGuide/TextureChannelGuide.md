# 原神：角色贴图通道详解与生成提示词

想把一块布改得更哑光，不要先把LightMap整张涂暗。原神这张图里，高光亮度、高光出现范围和阴影分别装在不同通道。下面先拆开看，再用单通道练习试着改。

**怎么用下面的提示词：**先读通道说明，再让模型出草稿。未修改通道请在编辑器里从原图复制，不靠模型保证像素一致；ID和阈值用取色器确认。练习数字不代表该角色的标准参数。

[先读通道基础、色彩空间与验收方法](../../../newbie/tools/TextureChannelGuide/TextureChannelGuide.md)。本页讨论角色 Toon 材质，不覆盖地图、粒子和所有特殊角色效果。

::: warning 范围与证据
主要依据公开复刻 [HoyoToon](https://github.com/Hoyotoon/HoyoToon) 固定提交 `d9e5ca2f312bf16fba89dee67d32c08b482dcda4` 的实际读取代码。它证明**该复刻实现**怎样解释纹理，不能保证原游戏每个版本、每个角色一致。与其它复刻方案、原材质冲突时，核对自己的 Shader 绑定，不按文件名猜。
:::

![原神身体 LightMap 教学示意](./assets/lightmap.png)

配图为原创合成示意，不是游戏原贴图。提示词中的数字是教学候选值；皮肤/布/金属与材质 ID 没有跨角色固定对应。

## 快速总表

| 贴图/路径 | R | G | B | A |
| --- | --- | --- | --- | --- |
| MainTex / Diffuse | RGB共同组成颜色 | 同左 | 同左 | 可由参数选择忽略、裁剪、发光、脸红或透明等，不能一律设255 |
| 身体/头发 LightMapTex | 普通高光强度，同时可触发金属/特殊分支 | AO式光照/阴影阈值控制 | 高光区域/阈值控制，不是通用 roughness | 材质区域选择 |
| FaceMapTex（本实现新脸图） | 本页核心路径未确认用途，保留 | 同左 | 可选轮廓线宽度控制 | 脸部阴影阈值场，读镜像 UV |
| 脸部 LightMapTex | 不应照搬身体含义 | 依脸材质条件 | `_UseFaceBlueAsAO` 开启时乘入脸阴影 | 依具体脸路径，保留 |
| BumpMap | XY法线的X | XY法线的Y | 可选纹理线条控制，核心法线函数不直接使用原Z | 这条路径没确认用途，先保留 |
| CustomAO | 本实现采样R作为AO候选 | 未确认 | 未确认 | 未确认 |
| Ramp / 特殊 LUT | RGB查表颜色 | 同左 | 同左 | 依实际表，保留，不按衣服UV生成 |

### 下载练习图

[合成Diffuse](./assets/synthetic-diffuse.png) · [同UV语义分区](./assets/synthetic-regions.png) · [原始RGBA教学数据](./assets/lightmap-data.png) · [资源来源与边界](./assets/README.md) · [SHA256清单](./assets/manifest.json)

可以下载旁边的合成图练习拆通道。图中的分区和数值是练习设定，不是从游戏角色测得的参数。

## 1. Diffuse：改颜色不要损坏 Alpha

[主程序](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L523-L544)同时采样 Diffuse 和 LightMap；[Alpha 分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L728-L741)明确由 `_MainTexAlphaUse` 决定用途。

先看Alpha正在做什么：忽略模式下，改A没有这项效果；裁剪模式下，`A < Cutoff` 的像素被丢掉，等于阈值不会被这句clip丢掉；脸红模式下，A越大，越靠近设置的脸红颜色。发光模式先扣掉0.02，因此线性8位下0～5没有这项发光贡献，6起才有少量贡献，255也只是约0.98的遮罩，还要乘发光颜色、强度和开关。**同一个A=0，在裁剪模式可能是洞，在发光模式则是“不发光”。**

**一段式提示词：**

```text
按我的配色说明修改<image1>服装Diffuse的RGB。保留原尺寸、UV岛、缝线、装饰和绘制细节，不增加场景光照，不画控制遮罩或文字。只输出颜色草稿，Alpha稍后从原Diffuse复制。
```

不能由“亮色衣服”推断发光 Alpha。常量255仅适用于已确认不使用Alpha的数据/材质。

### 2. 身体/头发 LightMap：最值得学的 packed 图

[高光与阴影调用](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L757-L768)使用 G 参与阴影、R/B 参与高光。R 在高于0.90时关闭普通高光，并可用于金属分支；不能简单说“R=金属度”。

G 的“AO”叫法是近似：源码将其与顶点数据、N·L、Shadow 参数结合，形成阈值/色带，不是纯粹乘颜色的物理 AO。B 在普通高光中进入 `term > 1.015−B` 一类阈值；范围增大与强度增加不是同一件事。

A 的 [materialID](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L1-L13)在材质开关启用时区分若干区域：常见安全代表值0.1、0.3、0.5、0.7、0.9，分别对应字节26、76、128、178、230。**参数组顺序不是固定“皮肤/金属/布料顺序”**；先看原Alpha与材质配置。阈值边界可能重叠且受判断顺序影响，不在0.2/0.4/0.6/0.8上取值。

#### 四个通道怎么调？

以下方向对应[普通高光公式](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L712-L738)和[阴影公式](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L467-L520)，假定通道按线性UNORM采样。

| 通道 | 调小 | 调大 | 特殊值与边界 |
| --- | --- | --- | --- |
| R：普通高光的乘子 | 已出现的普通高光减弱，0不贡献普通高光 | 分支内高光增强，但超过门槛会换路 | R>0.89可进入金属区域，首个字节227；R>0.90关闭普通高光，首个字节230。金属是否生效还看金属/皮革开关 |
| G：受光与阴影控制 | 更容易落入阴影 | 更容易保留亮面 | 启用LightMap AO、顶点AO=1时，内部量为 `t=0.5+2×(G−0.5)×abs(G−0.5)`；128附近t约0.5，不是全材质通用中性。G≤6使t<0.05，G≥249使t>0.95，触发强制暗/亮分支；顶点AO会改变边界 |
| B：普通高光出现门槛 | 高光更难出现、区域缩小 | 高光更容易出现、区域扩大 | 比较 `pow(N·H,指数)>1.015−B`；在N·H≤1且指数非负时，字节0～3不会通过这项比较，255门槛约0.015。亮度仍由R和参数决定 |
| A：参数组选择 | 不表示更弱 | 不表示更强 | 换区才换参数，区间内不是连续强度 |

A的具体顺序也要讲清楚：在线性8位、相关开关开启时，0～50选组1，51～102选组4，103～152选组3，153～204选组5，205～255选组2。0.4与0.8处有重叠，后执行的判断优先；8位204正好是0.8，会选组5，而205进入组2。某组开关关闭时还可能回退，不能只看Alpha灰度。

想让扣件的高光更明显，先判断是“已经有高光但不够亮”，还是“只有很小角度才出现”。前者试R，后者试B，别一起乱调。开启金属路径时，普通非金属练习区的R先保持在0～226，而不是旧示例所写的“低于230”。

**练习：只扩大普通饰件的高光范围**

上传Diffuse作位置参考、原LightMap作灰度参考。下面只生成B层；生成后在编辑器里合并，原R/G/A不动。需要更亮时，再单独试R。

```text
以<image2>原身体LightMap为参考，对照<image1>的UV位置，生成单通道B高光范围草稿。只把我标出的饰件区域调得比原B稍亮，让高光在更多角度出现；布料和未知区域沿用原灰度。保持画布尺寸、UV岛、缝线和扣件位置，不画自然颜色、光照或文字，只输出灰度图。
```

**只改 ID 的提示词：**

```text
对照<image1>的UV边界和<image2>原LightMap的A层，修补我标出的材质分区边界。沿用原区间，不按衣服颜色重新分类，不做渐变或照明，保持尺寸和UV位置，只输出灰度ID草稿。
```

**改完看这几项：**R超过0.9的区域是否有意；G旋转光源下是否过黑；B是否导致过宽高光；A是否选中正确参数组；头发不可直接套用衣服数值。

### 3. 脸部 FaceMap 与 LightMap

本实现 [脸阴影函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L414-L463)读取 FaceMap A，并依光向选择镜像坐标；LightMap B仅在指定选项开启时乘入结果。FaceMap B也可在 [轮廓线路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L350-L358)控制线宽。

#### 脸图数值：B遮蔽和A方向场不是一回事

FaceMap A在当前光向对应的阈值附近做smoothstep。**同一光向下，A越大越倾向亮面，越小越倾向阴影**；光从另一侧来时会读镜像位置，所以这是一整套随光向变化的场，不是静态鼻影。0和255接近两端，中间灰度记录转入/转出阴影的时机。把全脸A涂白会毁掉这种变化。

FaceMap B在启用对应轮廓控制时，值越大提供越大的线宽乘子，0会压掉这一项；实际线宽还有距离和材质参数。R/G在这里没确认到一般用途，原样保留。脸部LightMap的R/G/A也没有可通用的数值方向，不套身体表。

**你可以单独改的脸部LightMap B**，在 `_UseFaceBlueAsAO` 开启时，是一个乘子：`最终脸亮面权重 = SDF算出的亮面权重 × B/255`。

| B字节 | 这项乘法保留多少 | 在脸上意味着什么 |
| --- | --- | --- |
| 0 | 0% | 这一项完全落到阴影端，不是透明，也不保证最终输出纯黑 |
| 128 | 约50.2% | 只保留一半左右的SDF亮面权重，遮蔽较重 |
| 180 | 约70.6% | 比255少保留约29.4%；只是可测试的遮蔽强度，没有“缝隙专用值”的特殊含义 |
| 230 | 约90.2% | 较轻的压暗，适合先做小区域试验 |
| 255 | 100% | 不额外削弱SDF结果；不是取消SDF阴影 |

没有隐藏的180开关，这里0～255是连续变化。最终颜色是亮面色与阴影色之间的混合，因此“权重少29.4%”不等于屏幕亮度少29.4%。如果开关关闭，改B不会影响这项计算。先确认开关，再从230这样较轻的值试起；原图已有遮蔽时，不要把未修改区全洗成255。

**保守提示词：**

```text
对照<image1>脸部UV，修补<image2>原FaceMap上我标记的破损。保留原方向阈值梯度、左右镜像关系和轮廓数据，不重新设计鼻影，不改变UV岛，不加文字，只输出同尺寸修补草稿。
```

**练习：给一小块脸部遮蔽加一点强度**

下面的230是试验值，不是规定。最终在编辑器里设定灰度，只替换B，R/G/A从原图复制回来；如果试验太暗，再往255方向调。

```text
对照<image1>脸部UV和<image2>原脸部LightMap的B层，生成一张同尺寸灰度修补图。只在我标出的遮蔽区域做轻微压暗，先以230作为试验目标；周围保持原灰度，边缘柔和过渡，不挪动眼鼻嘴和UV岛。不要画肤色、方向鼻影或文字，只输出B层草稿。
```

### 4. BumpMap：不一定是标准蓝紫 XYZ

[normal_mapping](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-common.hlsl#L367-L402)将RG解成XY，Z由函数指定并归一化，而原图B可用于 [detail_line](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L659-L664)。因此不要把标准法线Z直接盖掉B的线条数据。

R/G的方向解码是 `2×字节/255−1`：0约−1，128约0，255约+1。R控制切线X，G控制切线Y；更白不是更凸，而是朝另一侧倾斜。B的线条函数用灰度跨过线条阈值：B越大，越多混入所设置的线条色；这个颜色可以暗也可以亮，所以不统一称“越白越黑”。A未确认，保留。

```text
对照<image1>服装UV，生成浅浮雕法线XY草稿，平坦RG约(128,128)，只在指定缝线和扣件处作细小连续变化。不把衣服颜色明暗当凹凸，不增加噪点、光照或文字，保持尺寸与UV位置；只用于提取RG。
```

### 5. CustomAO

本实现 [自定义AO读取](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Genshin%20Impact/Includes/HoyoToonGenshin-program.hlsl#L530-L536)还可选UV0、另一个UV或屏幕坐标，不能保证和Diffuse同UV。

CustomAO的R越小，保留的受光权重越少；255不额外削弱，0可把这一项推向阴影端，128约一半权重。但它会影响混合或Ramp采样，并非所有路径都直接把最终RGB乘成黑色。G/B/A未确认用途，不要跟着R一起重画。

```text
对照<image1>的已确认UV和<image2>原CustomAO的R层，只在我标记的重叠与缝隙处稍微压暗，边缘柔和过渡，其它区域保持原灰度。不按布料颜色画阴影，不画方向光或文字，输出同尺寸R灰度草稿。
```

### 6. Ramp、MatCap与角色特殊图

本实现还有金属/皮革色带、丝袜Detail、武器、星空、VAT和特效Mask等。它们是**条件路径**，不共享一套R/G/B/A解释；不把本页当成“所有原神贴图完整清单”。

Ramp教学提示词：

```text
以<image1>原Ramp查表图为唯一布局参考，只按我指定的色板修改其RGB色带，严格保留原尺寸、每行材质顺序、采样边界与Alpha，不把衣服UV放进色带，不添加纹理、物体或文字，不重新排列冷暖色行，不改变数值查表结构，只输出配准候选供外部采样检查；没有原Ramp与行定义时保留原图。
```

对于任何未确认特殊贴图：`以原图为模板，只编辑指定通道/区域，其余逐像素继承；不能继承则输出独立候选层外部合并。` 这是可靠的保守操作，不是从Diffuse猜回未知数据。

## 改完怎么检查

先导出PNG/TGA中间图，再按实际游戏加载要求部署；不做Gamma增强。用同材质原图作A/B对照，测试正侧背光、近远距离/mip、身体头发脸轮廓。提示词中的“继承”仍必须在外部工具真正拷贝通道，不能以模型口头执行当作像素一致证据。

补充参考：[PrimoToon](https://github.com/festivities/PrimoToon)、[Blender-miHoYo-Shaders](https://github.com/festivities/Blender-miHoYo-Shaders)。它们是不同重建方案，不应把各自变量名和功能合并成无条件游戏规范。更细的后续材质研究应按相同的“声明→采样→计算→条件→渲染”流程加入。
