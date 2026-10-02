# 绝区零：N / M / A、旧版Alpha与脸图通道详解

绝区零最容易混淆的是“A图”和“Alpha”：前者是一张辅助图，后者是每张图的第四通道。新旧布局会把同一功能放到不同地方，先确认布局，再改光滑度或发光。

**怎么用下面的提示词：**先读通道说明，再让模型出草稿。未修改通道请在编辑器里从原图复制，不靠模型保证像素一致；ID和阈值用取色器确认。练习数字不代表该角色的标准参数。

[通道基础、UV与AI验收](../../../newbie/tools/TextureChannelGuide/TextureChannelGuide.md)。核心来源：[HoyoToon ZZZ](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl)，固定提交 `d9e5ca2f312bf16fba89dee67d32c08b482dcda4`。贴图文件名N/M/A只是常用辨识，必须核对实际材质绑定。

::: warning 不能忽略旧版布局
新辅助图与旧版Alpha打包方式不同。源码 `_LegacyOtherData` 将 Diffuse A、Light A、Material A 分别作为可见性、光滑度、发光来源。把所有A强制255只适合已经确认的新辅助布局与未使用Alpha，**不能推广到全部ZZZ贴图**。
:::

![ZZZ新辅助A图教学示意](./assets/auxiliary.png)

## 下载练习图

[合成Diffuse](./assets/synthetic-diffuse.png) · [同UV语义分区](./assets/synthetic-regions.png) · [原始RGBA教学数据](./assets/auxiliary-data.png) · [资源来源与边界](./assets/README.md) · [SHA256清单](./assets/manifest.json)

可以下载旁边的合成图练习拆通道。图中的分区和数值是练习设定，不是从游戏角色测得的参数。

## 1. 身体/服装主图总表

[明确采样规则](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl#L73-L82)：

| 图与布局 | R | G | B | A |
| --- | --- | --- | --- | --- |
| Diffuse / MainTex（新辅助布局） | RGB自然颜色 | 同左 | 同左 | 依材质透明、鼻线等分支，保留 |
| N / LightTex（身体） | 切线法线X | 切线法线Y | 阴影/漫反射偏置 | 新布局核心路径未统一使用，旧版为光滑度 |
| M / OtherDataTex | 材质区域ID | 金属控制 | 高光遮罩 | 新布局未统一使用，旧版为发光遮罩 |
| A / OtherDataTex2 | 可见性/透明控制 | 光滑度 | 发光遮罩 | 核心路径未确认一般作用，保留 |
| 旧版Diffuse | RGB颜色 | 同左 | 同左 | 辅助可见性来源 |

“LightTex”名字并不等于烘焙LightMap；“A图”名字不代表它只使用Alpha。BC6H的M图是RGB HDR、没有A，因此具体资产组合必须核实。

## 2. N：RG法线，B不是Z

[normal_mapping](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L186-L209)从RG重建法线；[shadow_body](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L606-L632)把B用于阴影计算。平坦N图不是标准(128,128,255)，B由原材质决定，常见教学基值约125而非255。

R/G在线性解包后，0是负方向，128附近是零偏转，255是正方向；R控制切线X，G控制切线Y，不是“白色更凸”。XY组合还要满足法线长度约束，不能一起填255。

N的B则完全不同。忽略自阴影衰减时，阴影输入包含 **`4×B−2+N·L`**：B增大，受光输入增大，更偏向亮面；B减小，更偏向阴影。128附近偏置约0，0提供−2偏置，255提供+2偏置，极值很容易吞掉正常光向变化。125约是−0.039的轻微负偏置，不是官方中性值；有原图就保留原B，不凭练习图重设。A新布局未确认一般用途，旧布局则是光滑度。

```text
对照<image1>服装UV，生成浅浮雕切线法线XY草稿。平坦区域RG约(128,128)，只在我指出的缝线、压边和扣件处做细小连续变化，不把衣服颜色明暗当成凹凸。保留尺寸、UV岛和细节位置，不加织物噪点、文字或场景光；只用于提取RG，B和A由编辑器从原N复制。
```

如果只能生成标准XYZ，先取RG，再单独合并B偏置与原A。模型标准Z不能直接作为N的B。

## 3. M：ID、金属、高光

[specular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L211-L220)读取G金属控制、B高光、辅助G光滑度并用R阈值分区。R常见区间以0.2/0.4/0.6/0.8分隔，安全内部代表点0.1/0.3/0.5/0.7/0.9（字节26/76/128/178/230）。具体哪个区是某材质依原参数而定，不是“R=0.3永远金属”。

| M通道 | 数值方向 | 边界与特殊用途 |
| --- | --- | --- |
| R | 离散选参数，没有强弱方向 | 线性字节0～50→参数组5，51～101→组4，102～152→组3，153～203→组2，204～255→组1。这里用严格小于比较，204=0.8已进入组1；和原神A不一样 |
| G | 乘Metallic参数成为金属混合量；值越大越偏金属响应 | 0为非金属端，255在Metallic=1时到金属端。金属改变漫反射与反射颜色，不等于只增加亮度 |
| B | 普通形状路径作为高光权重；特殊形状路径减门槛，值增大可能同时扩大高光 | 发光颜色函数也按B的0.2/0.4/0.6/0.8分区；即使只想调高光，跨区也可能改发光颜色 |
| A | 新布局没有统一一般用途；旧布局是发光输入 | 旧版A=0无这项发光，A越大贡献越多，但重映射可截掉低值 |

所以不应按“金色扣件”自动指定R=76。先取原图ID，并确认该组参数，金属混合再单独改G。

```text
以<image2>原M图的G层为参考，对照<image1>服装UV，只为我已确认的裸金属饰件生成G灰度草稿，让它比原值稍亮。涂漆、布料和未知区域不变，保持画布、UV岛和扣件边界，不画自然颜色、阴影或文字，只输出G层。
```

只替换生成的G层，R/B/A从原M复制回来。特别注意：本固定复刻的 [发光函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L351-L365)还用M的B选择发光色分支，不能未经检查就认定所有效果都只按R选择参数。

## 4. 新辅助A图：红橙色只是通道叠加的外观

[R透明分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl#L225-L238)与[G光滑度](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L211-L220)、B发光是独立功能。这张图通常红橙，是R接近255而B低的合成外观，不是“所有游戏的LightMap都红橙”。

| 辅助图通道 | 0 | 255 | 中间值与实际限制 |
| --- | --- | --- | --- |
| R可见性 | 相关透明路径趋向不可见 | 相关路径完整可见 | 有的Stencil分支用 `max(R,MinStencilAlpha)`，0也可能被最低Alpha抬起；没启用对应路径时不一定有可见性变化 |
| G光滑度 | Glossiness=1时粗糙端 | Glossiness=1时光滑端 | 基础项为 `(1−G×Glossiness)²`；G越大通常高光更集中，不是整块更亮。110/25/50/130都不是材质标准 |
| B发光 | 无这一项贡献 | 遮罩最大 | 普通模式按B；开启重映射时用 `saturate(1.25×(B−0.2))`，线性字节0～51全被压成0，52起才开始贡献。旧示例38在这种模式下不会亮 |
| A | 尚未确认一般用途 | 尚未确认一般用途 | 原值保留；不是因为叫“A图”就只编辑这个Alpha |

想让布料不那么像塑料，先从原G减一点，只动G；想加灯带，再单独确认B的发光开关。不要按白布、黑布的颜色自动分光滑度。

```text
对照<image1>服装UV，以<image2>原辅助图的G层为参考，生成单通道光滑度草稿。只把我标出的布料区域调得比原G稍暗，让表面更哑光，皮肤、扣件和未知区域保持原灰度。保留尺寸、UV岛、缝线和细带，不画自然颜色、光照或文字，只输出G层。
```

在编辑器里只替换G，R/B/A从原图复制。对同一块布试原值、原值减16、原值减32，比较高光形状再决定成品值。前面的合成配图仍是拆通道练习，不是推荐角色参数。

## 5. 旧版三张Alpha打包

`OtherData2.xyz = (Diffuse.a, Light.a, OtherData.a)` 的旧版模式下，不能直接把新A图导出后就认为已生效。可以先生成三张单通道候选，再外部打包到旧资产A。

**旧Diffuse A可见性：**

```text
根据<image1>UV位置和<image2>原Diffuse Alpha只修补明确的可见性灰度层，原本可见区域保留255、明确镂空保留0、软边保留原灰度，不从衣服黑白颜色猜透明，不加入发光或光滑度，不改UV与尺寸，只输出单通道候选供外部合并到已确认旧版Diffuse A。
```

**旧N A光滑度：**

```text
对照<image1>服装UV和<image2>原N的Alpha，只将标出的布料光滑度稍微调低，其它区域沿用原灰度。保持画布、UV岛和缝线，不画自然颜色、阴影、发光或文字，只输出旧版N的A灰度草稿。
```

**旧M A发光：**

```text
以<image1>UV位置为参考生成单通道发光遮罩，仅我明确标出的灯带区域255、非发光0且保留细边，未知处继承<image2>原M Alpha，不把金属高光或白布当发光、不产生光晕、不改变UV或加文字，供外部合并到已确认旧版OtherDataTex A，保留原RGB材质控制。
```

这些单通道图不是新辅助图本身。原资产没有Alpha时不应凭想象套旧版布局。

## 6. 脸部LightTex与身体N不一样

[shadow_area_face](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L579-L590)取R构成脸阴影阈值、A作为AO式乘子；[face_high](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L810-L825)取G参与高光，B还可 [控制轮廓宽度](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-program.hlsl#L455-L461)。脸材质ID另可由顶点数据获取，不一定用M的R。

| 脸部LightTex | 用途 |
| --- | --- |
| R | 随头部/光向控制的脸阴影阈值场 |
| G | 脸部高光控制 |
| B | 条件启用的轮廓线宽度采样 |
| A | AO式控制，部分面部子区域可被代码替换为1 |

脸R先变成 `0.9R+0.1` 再比较方向阈值：固定光向下越大越偏亮面，越小越偏阴影；0也不是绝对零输入。G先取 `max(G−0.5,0)`：线性字节0～127在这项输入上相同，128起才增加，但最终还经过smoothstep、脸子区域和视角限制，不能说低G一定完全关闭最终高光。B在启用轮廓贴图采样时越大提供越大的线宽乘子；A作为AO乘子，0压掉亮面权重、255保留，部分眼/牙区域会强制A=1。R/G是脸数据，不是法线XY。

```text
对照<image1>脸UV，只修补<image2>原脸LightTex标出的破损，保留方向场、高光、轮廓和AO编码。不套身体法线规则，不改画布或UV位置，不画肤色、鼻影或文字，输出修补草稿。
```

## 7. Diffuse、二级发光与MatCap

**Diffuse：**

```text
按指定配色修改<image1>服装Diffuse的RGB，保留尺寸、UV岛、缝线和扣件。不要画控制图颜色，不增加光源、投影或文字，只输出颜色草稿，Alpha稍后从原图复制。
```

[二级发光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/ZenlessZoneZero/Include/zzz-common.hlsl#L401-L424)可选RGB Mask通道，并对另一张发光图做旋转、平移、UV选择。不是通用服装UV常量。

二级发光只读材质选中的R/G/B Mask通道：0不贡献，增大加强这项，255给最大遮罩；由于颜色和最终混合都可能乘Mask，128不保证一半最终亮度。未选中的通道和Alpha在这条链不作用。SecondaryEmissionTex可选RGB颜色或只取R作灰度颜色，开关未确认时别一起重画三色。

**SecondaryEmissionMask：**

```text
以<image2>同UV原SecondaryEmissionMask为模板，只对我明确指定且材质配置选中的R或G或B通道制作发光区域灰度候选、区域255其它0，所有其它通道与A保持原图，保留原UV和尺寸，不把发光画成光晕，不凭名字选择通道、不加文字，输出单层供外部合并与ST采样验证。
```

**SecondaryEmissionTex：**

```text
以<image1>原SecondaryEmissionTex为布局模板按指定颜色编辑发光纹样RGB，保持原尺寸、平铺连续性与Alpha，不擅自使用服装UV、不改变运行时旋转或滚动所需的边缘结构，不加背景文字或3D照明，只输出候选供材质UV与ST变换测试。
```

**MatCap：**

```text
以<image1>原MatCap为球面查表布局参考修改指定高光外观，保持尺寸、中心方向与Alpha，不放服装UV或自然场景，不重排查表区、不加文字，只输出外观候选并在模型转视角时检验。
```

## 改完怎么检查与已有Demo的边界

确认新/旧辅助布局、身体/脸、MainUV/LightUV、Shader参数；检查RG解包、B偏置、M的ID与G/B、A图R/G/B、所有旧Alpha。教学示意与提示词未作为实际模型质量测试；先生成候选，再外部严格赋值、继承原通道并实机验证。此前单组常量Alpha Demo只能说明那组新辅助布局，不是全游戏规则。
