# 明日方舟：终末地：属性图、皮肤、脸与头发通道详解

[通用基础与验收](../../../newbie/tools/TextureChannelGuide/TextureChannelGuide.md)。终末地的公开资料仍有不同复刻管线和社区定义，**不能把一个“R/G/B/A表”当全部材质规范**。

## 相邻教学资源

[合成Diffuse](./assets/synthetic-diffuse.png) · [同UV语义分区](./assets/synthetic-regions.png) · [原始RGBA教学数据](./assets/property-data.png) · [资源来源与边界](./assets/README.md) · [SHA256清单](./assets/manifest.json)

这些资源只用于学习如何拆通道、量化与合并；分区颜色和材质ID的对应是教学预设，不是游戏官方规则。

## 1. 先解决旧简表与公开源码的冲突

本站已有[社区简表](../TextureChannels/TextureChannels.md)：R金属、G镜面高光类型、B平滑度、A AO，并提到皮肤Diffuse A的AO。该页署名为“失乡のKnight”，没有附对应Shader版本和读取代码，因此应作为**待核查的社区资产约定**，不能直接删除，也不能擅自把它推广。

本次取得的 [Endfield MME Shader](https://github.com/chris0214/Arknights-Endfield-MME-Shader) 固定提交 `f9e90932a25678101e3e28a8d91663fa0706a4ed`，其 [材质指南](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/USER_GUIDE_CN.md#L67-L75)与 [衣服实际计算](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1842-L1852)明确：**R金属、G反射率、B AO、A光滑度**。这与简表BA相反、G也不能直接解释成离散高光类型。

| 约定 | R | G | B | A | 证据与使用范围 |
| --- | --- | --- | --- | --- | --- |
| 社区简表 | 金属 | 镜面高光类型 | 光滑度 | AO | 没有固定Shader证据；仅在确认自己的资产确实如此时使用 |
| 本次MME衣服Property | 金属 | Reflectivity反射率 | AO | 光滑度 | 有固定版本计算源码；适用于该复刻契约 |
| DanbaidongRP PBRMask | 金属 | 光滑度 | AO | 反向发光1−A | 独立参考管线，不是终末地原资产规范 |

[DanbaidongRP实际读取](https://github.com/danbaidong1111/DanbaidongRP/blob/072b375399e4c38d0cad235a7ec513f981fd5676/Shaders/Material/PBRToon/PBRToonBase.shader#L466-L475)展示第三种布局。它是MME作者列出的参考之一，但**引用该管线不意味着所有贴图按它打包**。

::: danger 防止灾难性通道交换
未经确认就把B/A交换，可能让无遮蔽区域变成极光滑或让光滑区域变成强遮蔽。先检查目标材质采样代码或做单通道小区测试；不知道属于哪套时保留原图。
:::

![MME衣服Property教学示意](./assets/property.png)

## 2. 按MME实际实现划分材质

| 图与材质 | R | G | B | A |
| --- | --- | --- | --- | --- |
| 衣服Diffuse | RGB颜色 | 同左 | 同左 | 依具体载入/透明路径，保留，别套皮肤AO |
| 衣服Property | 金属度控制 | 反射率控制 | AO式遮蔽控制 | 光滑度，代码取1−A获得粗糙度 |
| 衣服Normal | 法线X | 法线Y | 核心RG解包未使用，保留 | 同左 |
| 脸Diffuse（已核查Face路径） | RGB颜色 | 同左 | 同左 | AO控制，并受参数指数影响 |
| 独立Skin路径Diffuse | RGB颜色 | 同左 | 同左 | 本次核心Skin函数只读RGB，不能据此断言A用于AO；原资产约定待确认 |
| 脸SDF | 方向阴影阈值R | 另一方向阈值G/混合使用 | 本页核心未确认，保留 | 同左 |
| 脸cm_M | SSS作用权重 | 脸SDF/几何区混合与保护 | 摄像机阴影区域控制 | 脸边缘/轮廓光遮罩 |
| 头发HN | 常规法线X | 常规法线Y | 平滑法线X | 平滑法线Y；BA也是法线而非AO/光滑度 |
| 头发Property / P | 层/法线混合等头发专属控制 | 反射率或高光遮罩，按路径 | AO式控制，按路径 | 光滑度或发丝线控制，按路径 |
| RD | RGB色带/光照外观 | 同左 | 同左 | 明暗混合权重 |
| RS | RGB高光查表 | 同左 | 同左 | 依表，保留 |
| Skin LUT / FGD / MatCap | 查表外观/数值，非衣服UV | 依表 | 依表 | 依表 |

这个表限定为上述MME复刻的确认路径；头发与脸图不能套衣服Property。下面每个贴图给出一次可复制的提示词，未知编码只给保守修补而不硬编。

## 3. 衣服Property：适用于本MME契约

G是反射率，和高光形状、强度、各向异性类别不同。它还会乘材质强度参数；A光滑度进入 `roughness=1−A`，最终有最低粗糙度限制。AO图不等于“深色布料”。

```text
将<image1>角色服装UV颜色图转换为已确认R金属G反射率B AO A光滑度的终末地MME衣服Property候选，原尺寸与UV布局必须完全相同，R普通布料与皮肤0、明确裸金属255，G非金属反射率教学值100、金属180，B无遮蔽255、明确结构缝隙200且不把黑布当AO，A光滑度教学值普通布40、光滑饰件140、金属180，所以普通布RGBA(0,100,255,40)、金属(255,180,255,180)，未知区域继承<image2>同UV原Property，不保留自然颜色不做光照渐变、不把G编码成未知离散类别，保留缝线与扣件位置、不加文字不做3D渲染，仅输出待外部定值与通道校验的技术候选。
```

不能精确输出A时，先生成RGB候选与独立灰度光滑度，再外部合成。

**社区BA相反约定的提示词（仅确认后使用）：**

```text
在已经通过目标Shader或原材质测试确认R金属G高光类型B光滑度A AO的前提下，以<image2>同UV原属性图为模板根据<image1>仅修改已确认材质区域，R非金属0裸金属255，G完整保留原高光类型编码绝不自行指定，B普通布教学值40金属180，A无遮蔽255明确缝隙200，不把这套BA顺序混用到MME Property，不保留自然颜色、不按黑布判断AO，尺寸与UV布局不变、不加文字，输出候选或独立通道层供外部合并。
```

该段不证明社区表就是你的资产规范。

## 4. 衣服Normal：RG法线

[RG解包](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L811-L885)支持法线强度与Y方向调整。不能把头发HN的BA双法线方式推广到衣服。

```text
将<image1>服装UV图生成浅浮雕切线法线RG候选，平坦R/G约128、明确缝线扣件和压边产生细微连贯XY变化，保持原尺寸与UV布局、不将自然颜色亮暗转成高低、不增加织物噪点，B/A逐像素继承<image2>同UV原衣服Normal，不把B/A猜成粗糙度或AO，不加文字和3D照明，只输出候选或RG层外部合并，并按目标DirectX/OpenGL方向检验Y。
```

## 5. 脸Diffuse：Alpha参与AO，独立Skin路径不能外推

Face路径已确认A参与AO；独立Skin函数主要读取Diffuse RGB，本次没有找到同样的Diffuse A→AO链路。因此以下“皮肤AO”操作仅在自己的皮肤材质也确认该用途时使用，不把社区经验外推到所有复刻路径。

[Face读取AO](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L969-L975)把A作为遮蔽并受指数参数调节。不能把所有颜色图Alpha定义成“透明度”。

```text
编辑<image1>终末地皮肤或脸部Diffuse，只按指定色板修订RGB并保持原尺寸、UV、眼鼻嘴与肤色细节，不加入新场景阴影或高光，A由外部工具逐像素继承<image2>同UV原Diffuse以保留AO控制、不按透明度重置、不把所有Alpha设255，不加文字或3D渲染，输出颜色候选；需要修AO时单独处理而不靠RGB重绘。
```

**单独皮肤AO候选：**

```text
根据<image1>皮肤UV和<image2>同UV原Diffuse Alpha修补AO灰度层，无遮蔽区域沿用255、明确结构缝隙弱降至200至230、其它区域保留原值，不把肤色或绘制腮红当AO、不烘焙方向光照、不改变UV尺寸，不加文字，只输出候选供外部合并到已确认皮肤Diffuse A并验证AO指数参数。
```

## 6. 脸SDF与cm_M

MME [SDF读取](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L705-L758)包含RG选择与不同诊断/渲染路径，依头部与光向计算；不能用灰度鼻影替代。

**SDF：**

```text
以<image1>脸部UV为定位参考修补<image2>同角色原SDF，严格保留R/G两套方向阈值梯度、镜像关系和B/A未知数据，仅修复指定破损位置，不把SDF当普通AO或透明图、不依据肤色重画，不改UV尺寸、不加自然照明或文字，输出配准候选或单独修改层外部合并；没有原方向场时不声称精确重建。
```

cm_M用途分别见 [摄像机阴影](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L552-L560)、[SSS](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L602-L621)、[边缘遮罩](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L861-L876)。R/G/B/A不是衣服MRO。

```text
对照<image1>脸部UV，以<image2>同UV原cm_M为模板只修补指定控制区域，R保留SSS作用权重、G保留脸与几何区混合保护、B保留摄像机阴影控制、A保留边缘光遮罩，不按金属粗糙AO规则重画、不将全部Alpha设255，尺寸与UV位置完全不变，不加文字或3D光照，仅输出指定层候选供外部合并与转视角验证。
```

## 7. 头发HN与Property：双法线不能丢Alpha

[头发读入](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1231-L1252)把HN RG作为regular normal、BA作为soft normal，再以P.r作层混合。**HN A不是未用透明通道，直接置255会破坏平滑法线Y。**

```text
以<image2>原头发HN为双法线模板，对照<image1>头发UV只修补指定RG常规切线法线区域、平坦RG约128且弱连贯梯度，BA完整继承原平滑法线XY，不把B当Z或A当透明度、不把Alpha设255、不生成自然头发颜色，不改变发丝UV布局和尺寸、不加文字，输出RG候选层供外部合并；BA需要重建时必须有目标几何和切线信息而不从Diffuse猜。
```

**头发Property：**

```text
以<image2>同UV原头发Property为模板，对照<image1>头发位置仅修补明确指定的控制区域，R保留头发层与双法线混合权重而不按衣服金属度重画，G/B/A按原高光遮蔽光滑度路径完整继承，不凭ORM名称猜标准通道，不改变UV、尺寸或发丝边界，不加文字和3D光照，输出指定灰度层供外部合并与层混合测试。
```

头发G/B/A最终作用还需要查看选定wrapper、宏与对应分支：资产原生高光路径会读G作highlightMask、A作发丝线控制；另一ORM路径读G作反射率、A作光滑度。部分路径还显式将Property RGB做sRGB→线性转换，不能无条件套用“所有控制图一律Non-Color数值直接读”的泛化规则。本页不把所有诊断路径当最终渲染，增加新角色应再审计。

## 8. RD、RS、查表与微细节

RD在 [衣服路径](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1838-L1844)读A为diffuseWeight；[脸路径](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L765-L788)也以RD A混合明暗。RS、FGD、Skin LUT都不是服装UV。

**RD：**

```text
以<image1>原RD为查表模板，只按指定色板修改对应RGB色带，A完整继承原明暗混合权重，保留尺寸、取样行和边界，不放服装UV、不重新绘制人物、不加文字，只输出查表候选供逐坐标取样检查。
```

**RS：**

```text
以<image1>原RS为高光查表模板按指定外观修订RGB，严格保留尺寸、行列、取样方向和Alpha，不把它当UV服装贴图、不增加文字或场景，只输出候选并用原高光坐标映射验证。
```

**Skin LUT / FGD：**

```text
以<image1>原Skin LUT或FGD为精确查表模板，仅修补我明确提供坐标与RGBA目标值的像素，保持所有其它表格数据、切片布局与尺寸不变，不美化或生成随意渐变、不放服装UV、不加文字；未知映射时保留原表而不生成替代数据。
```

**MatCap：**

```text
以<image1>原MatCap为球面采样布局模板，按指定材质外观修改RGB高光、Alpha继承原图，保留中心与边缘结构，不放服装UV或真实背景、不加文字，只输出球面外观候选供转视角和mip采样验证。
```

独立头发噪声、发丝线、唇高光及雨水图由特定宏/采样坐标决定：

```text
以<image1>原微细节或特效控制图为模板，仅对已经确认的指定采样通道修补明确区域，所有其它RGBA、尺寸、平铺连续性与查表布局保持原值，不凭名称把它改成粗糙AO或普通法线、不加入文字；缺少目标Shader与采样契约时保留原图。
```

## 9. 可靠性与实机验收

公开MME作者也明确自动匹配和检查不能替代实机视觉验收。该复刻是MMD/MME运行时，**不是直接可安装进终末地游戏的Shader**；此文用于解释与生成候选，部署仍要核对原游戏绑定。

检查Property BA顺序、皮肤Diffuse A、脸SDF RG、cm_M、头发HN双法线与P.r；逐通道、逐材质、不同光向和视角测试。保留源图与宏配置，不把衣服/皮肤/脸/头发各自规则混用。提示词生成不保证数字精度，用外部工具定值与继承通道。
