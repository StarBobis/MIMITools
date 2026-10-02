# 鸣潮：N、Mask、TypeMask与版本差异详解

鸣潮这份复刻里，界面标签和实际计算有冲突。先别急着把N图当标准PBR图；RG是法线，BA还会触发高光分支。下面告诉你哪些方向能确定，哪些目前只能保留。

**怎么用下面的提示词：**先读通道说明，再让模型出草稿。未修改通道请在编辑器里从原图复制，不靠模型保证像素一致；ID和阈值用取色器确认。练习数字不代表该角色的标准参数。

[通用基础与验收](../../../newbie/tools/TextureChannelGuide/TextureChannelGuide.md)。本页核心证据为 [HoyoToon Wuthering Waves](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl)，固定提交 `d9e5ca2f312bf16fba89dee67d32c08b482dcda4`。它存在近似、待完成路径与标签错误，所以本页明确区分“实际读取”与“从名字推断”。

![鸣潮packed N教学示意](./assets/normal-packed.png)

::: danger 一个真实标签冲突
界面写着 `Normal Map(RG)|Roughness(B)|Metallic(G)`，但RG已经用于法线，实际程序另将B/A传入高光/材质计算。**不能因为标签写Metallic(G)就覆盖法线G。** 本页将B/A描述为该复刻中的roughness/metallic命名控制候选及实际高光作用，不保证它与原游戏所有材质的PBR语义相同。
:::

## 下载练习图

[合成Diffuse](./assets/synthetic-diffuse.png) · [同UV语义分区](./assets/synthetic-regions.png) · [原始RGBA教学数据](./assets/normal-packed-data.png) · [资源来源与边界](./assets/README.md) · [SHA256清单](./assets/manifest.json)

可以下载旁边的合成图练习拆通道。图中的分区和数值是练习设定，不是从游戏角色测得的参数。

## 1. 总表

| 贴图/核心绑定 | R | G | B | A |
| --- | --- | --- | --- | --- |
| Diffuse / MainTex | RGB颜色 | 同左 | 同左 | 可选shadow_mask来源；头发Stencil来源等，不一定透明 |
| Normal_Roughness_Metallic | 切线法线X | 切线法线Y | high/spec control，标签称roughness，实际还用于MatCap/高光判定 | metallic命名控制候选，实际参加高光与衰减 |
| MaskTex（身体） | 身体没有确认用途，先保留 | Shadow/AO式控制，可被Diffuse A替代 | 没有确认用途，先保留 | SDF路径可作脸阈值，不能统一称透明 |
| MaskTex（头发） | 高光控制 | 阴影控制 | 没有确认用途，先保留 | 核心头发路径未确认，保留 |
| TypeMask | 与顶点R二选一用于皮肤/丝袜/普通区判断 | Face路径传递，但当前核心计算未证明独立效果 | Ramp mask命名输入，当前函数内未实际用于最终混合 | 没有确认用途，先保留 |
| Mask（独立，不同于MaskTex） | Stencil/眼区遮罩 | 核心未确认 | 同左 | 同左 |
| Eye EM | 二级眼高光读取 | 眼视差高度读取 | 没有确认用途，先保留 | 眼作用区读取 |
| HeightLightMap | 当前眼高光链未单独取用，保留 | 同左 | 主要眼高光输入 | 没有确认用途，先保留 |
| Ramp / MatCap / LUT | 查表颜色或数值，不是服装UV | 依表 | 依表 | 依表 |

### 文件名 `_N/_HM/_HN/_HET/_ID/_RGID/_LD/_FTM` 不是统一规范

[Gacha Setup导入映射](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/utils/wuwa_texture_utils.py#L11-L32)可见更多命名和节点路径，包含LD(sRGB)、FTM(Non-Color)标识。这证明存在不同工作流，不证明它们各通道与HoyoToon表一一对应。本页不把未知的HN/HET/RGID/LD/FTM硬编成普通R金属/G粗糙/B AO；未获得实际节点或Shader读取时保留原图。

## 2. packed N：保留BA比猜金属更重要

[RG法线与spec来源](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L109-L149)明确：RG用于法线，`spec = normalmap.zww`。身体分支 [高光](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L169-L181)还乘 `1−A`；[material_basic](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L607-L630)对B/A做非线性与阈值逻辑，不是标准PBR的简单关系。

### BA不能写成“越白越粗糙/金属”就结束

R/G是法线方向：128附近零偏转，低值负方向、高值正方向；翻转选项会改变方向，BA不要跟着法线重画。

当前身体路径里，B至少有两道门槛：**B≥0.5（线性字节128起）允许第一高光，B≥0.85（217起）进入另一项MatCap/高光判断**。第二高光还判断B≤0.85（216及以下的8位值），所以跨过217并不是平滑加一点“粗糙度”。另有颜色指数 `lerp(0.5,2,B)`，不同底色下屏幕亮度方向也不同。

A在普通身体最终高光上乘 `1−A`：0保留此项，128约保留49.8%，255压掉此项。同时A还参与非线性高光指数和MatCap处理，不能由此推出“所有反射都随A增大而减弱”。**没有一个对全BA路径有效的单调PBR解释。** 想改BA时先挑一块小区，分开测试；只改凹凸就保留BA。

这些边界以该固定源码及线性采样为前提，不是原游戏全角色规范。

```text
对照<image1>服装UV生成浅法线XY草稿，平坦RG约(128,128)，只在指定缝线、压边和扣件处作细小连续变化。不把颜色明暗当凹凸，不添噪点、光照或文字，保持画布和UV位置，只用于提取RG。
```

另一套真正PBR打包里，B粗糙度0光滑、255粗糙，A金属度0非金属、255金属，中间值混合响应；这只是独立确认该布局后的含义，不适用于上面的复杂BA公式。

**已确认另一套真正RG法线+B粗糙+A金属布局时，才能使用如下通用打包候选：**

```text
在已经独立确认目标Shader采用RG法线、B粗糙度、A金属度的前提下，将<image1>服装UV图生成同尺寸技术候选，平坦RG约128、浅缝线弱梯度，B教学值皮肤140、哑光布220、光滑金属60，A非金属0、明确裸金属255，未知材质继承<image2>原图，不按金色油漆猜金属，不把B当法线Z，不保留自然颜色、不加文字、不改变UV，最终由外部工具定值并验证；这不是本页HoyoToon复杂BA路径的直接推荐预设。
```

## 3. MaskTex身体与头发

[shadow_mask选择](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-program.hlsl#L113-L118)由 `_UseMainTexA` 决定读Diffuse A还是MaskTex G。头发 [material_hair](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L670-L675)把R传入高光，G参与阴影。

身体MaskTex G（或启用UseMainTexA时的Diffuse A）作为shadow_mask：普通身体受光计算中越小越容易偏阴影，越大保留更多受光，最终还有饱和和色带处理，G=0也不保证输出黑色。高光内部另判断 `shadow_mask≥0.1`（线性字节26起），低于它会压掉常规贡献，但函数保留0.001下限，不是数学上完全零。R/B及非脸A没有确认一般用途，保留。

头发R高光遮罩增大通常扩大/增强高光，0不贡献这项；G增大通常提高受光偏移，但还改变Ramp混合。0、255不是一套全头发材质的暗/亮保证，头发B/A未确认。

**身体MaskTex：**

```text
对照<image1>服装UV和<image2>原MaskTex的G层，只在标出的结构缝隙稍微压暗，其它区域沿用原灰度。保持画布、UV边界和小配件，不按布料颜色画AO，不加光照或文字，只输出G层草稿。
```

**头发MaskTex / 已确认对应的HM：**

```text
对照<image1>头发UV和<image2>原头发MaskTex的指定R或G层，只修补标出的区域，保持原发丝方向、灰度梯度和UV边界。不重画自然头发颜色，不加光照或文字，输出单通道草稿。
```

## 4. TypeMask：分类由阈值与开关决定

[skin_type](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L53-L71)在UseSkinMask开启时读TypeMask R，否则读顶点R；头发还会用顶点R覆盖TypeMask R。其判断包含0.05/0.3/0.5/0.9阈值，不能凭“黑=布白=皮肤”忽略代码与边界。

这里可以把实际分类拆出来。UseSkinMask开启、线性采样时：

| TypeMask R字节 | 返回分类权重 | 对应核心路径 |
| --- | --- | --- |
| 0～127 | (0,0,1) | 普通区 |
| 128～229 | (0,1,0) | tight/丝袜区 |
| 230～255 | (1,0,0) | skin区 |

[判断代码](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L53-L71)虽然包含0.05和0.3判断，但继续运算后，**这些中间判断没有产生额外的最终类别**。上表按完整函数逐个核对0～255的结果，而不是把见到的每个阈值都当成一类。增大灰度是普通→丝袜→皮肤，仍不是更强或更亮。关闭UseSkinMask后改这张R可能无效，头发路径还会覆盖输入。G/B在这份核心中没有证实一般独立作用，A未知。

TypeMask B虽传入名为ramp_mask的参数，[函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L384-L408)只赋值而未将该变量用于最终混合；所以不能把“B必然控制Ramp效果”写成已确认功能。

```text
对照<image1>服装UV和<image2>原TypeMask的R层，只修补标出的分类边界，沿用原区间，不按浅色深色重新分类。保留画布和UV位置，不做渐变、照明或文字，输出R灰度草稿。
```

## 5. 脸SDF：MaskTex A

[face_shadow](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L299-L328)根据头部方向和镜像UV采样MaskTex A。这里A不是透明。

MaskTex A越大，在同一光向下越容易保留脸亮面；函数内部有一次反相，调用处又反回来，不能只看变量名shadow就说“越大越暗”。背光到头部前向点积低于−0.5时另有朝向门控，高A也不会无限保持亮面。0、255是方向场两端，不是透明开关，RGB保留。

```text
对照<image1>脸UV，只修补<image2>原MaskTex上标出的破损，保留A方向阈值场、镜像关系和原编码。不画肤色、透明度或静态鼻影，不改变画布和UV位置，不加文字，输出修补草稿。
```

## 6. Diffuse Alpha、独立Mask与眼图

**Diffuse：**

```text
按指定配色修改<image1>角色Diffuse的RGB，保留画布、UV岛和绘制细节，不加新光源、投影或文字。只输出颜色草稿，Alpha稍后从原图复制。
```

独立Mask R在所选Stencil/眼路径作为遮罩输入，最终还经过原UV与视差UV混合；具体裁剪方向和门槛要看使用pass，不能把0/255写成全路径通用的隐藏/显示。已确认的Diffuse A阴影用途见上面的MaskTex章节，其它Alpha用途保留原值。

**独立Mask R：**

```text
以<image2>同UV原独立Mask为模板对照<image1>，只修补我明确指定的R Stencil或眼部遮罩边界，G/B/A全部保留原值，不与MaskTex的G阴影和A脸SDF混淆，不增加自然颜色光照、不改变UV和尺寸，不加文字，输出R灰度候选供外部合并。
```

[眼路径](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Wuthering%20Waves/Include/HoyoToonWutheringWaves-common.hlsl#L678-L751)读EM G作高度、A作作用区、R作二级高光；HeightLightMap以变换后的UV采样，主要高光取B。眼视差/高光并不一定按同一坐标。

EM R控制二级高光输入，通常越大贡献越多，但会被A压制；G供视差迭代比较，灰度越大改变高度交点，位移方向还看视角与视差参数，不能说“越白越凸”。A接近255时（smoothstep 0.99～1）反而混回原UV并压掉二级高光，0更保留视差图；这不是“白色眼区作用最大”。B未确认。HeightLightMap当前眼高光链主要取B，值增大通常加强该项高光，R/G/A未确认独立作用。

**Eye EM：**

```text
以<image2>原眼部EM为编码模板，对照<image1>眼UV仅修补指定区域，R保留二级高光控制、G保留视差高度、B未知用途保持原值、A保留眼作用遮罩，不把EM重绘成RGB发光颜色、不按白眼球全涂255，不改变尺寸和眼纹位置、不加文字，只输出指定修改通道的灰度候选外部合并并检验眼视差。
```

**HeightLightMap：**

```text
以<image1>原HeightLightMap的B层为参考，只修改我指定的眼高光纹样，保留原尺寸、图案位置和边界。不套服装UV，不画眼睛3D渲染或文字，输出B层草稿。
```

## 7. 其它命名、Ramp、MatCap、LUT

仅有 `.blend` 的 [Jonn Shader](https://github.com/fnoji/Blender-WuWa-Jonn-Shader/tree/07529f5aa14546873afff140bd242571fc67880d)未在本次按真实节点图审计，因此不能把它当成R/G/B/A独立交叉确认。HN、HET、RGID、LD、FTM、FX、Skin等名字存在不代表用途已查清。

**未知图怎么处理**

没有对应Shader时不建议生成替代图。下面只适合修补明确标出的视觉破损，不是恢复未知通道的配方：

```text
以<image1>原贴图为参考，只修补我标记的局部破损，沿用原灰度结构、尺寸和采样布局。不根据Diffuse重新设计通道，不画自然颜色或文字，输出修补草稿。
```

该段不是万能新生成公式，而是每个未知资产在查清用途前的安全策略。

**Ramp：**

```text
编辑<image1>原Ramp，只按指定色板修改指定行RGB，保留原尺寸、行坐标、采样边界与Alpha，不放服装UV、不重排行、不生成物体或文字，只输出查表候选供目标RampPosition与材质路径验证。
```

**MatCap：**

```text
以<image1>原MatCap为球面布局参考，按指定外观修改高光，保留尺寸、中心方向和边缘过渡，不放服装UV、背景物体或文字，只输出外观草稿。
```

**LUT：**

精确参数请直接用编辑器填写，不建议靠模型恢复。下面仅用于视觉破损草稿，不能作为查表数值合格的证明。

```text
以<image1>原LUT为参考，只修补我标出的视觉破损，保持原网格、尺寸和其它区域，不添加渐变、物体或文字，输出修补草稿。精确坐标赋值稍后在编辑器里完成。
```

## 改完怎么检查与实现缺口

固定复刻的glass路径仍含占位clip，部分ramp_mask未生效；这些不能通过模型提示词修好。别把“复刻缺少效果”归咎于自己的图。核心版本、材质类型、顶点色、UseSkinMask、UseMainTexA、NormalFlip、UV/ST要一起记录。

先检查packed N的RG/BA与Alpha，逐通道A/B测试，尤其头发、脸与眼不能共用身体规则。更新改变Hash/绑定时先修资源对应，不能仅重画纹理。数字与示意是教学，不代表实际游戏渲染已验收。
