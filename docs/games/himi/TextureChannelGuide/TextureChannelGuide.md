# 崩坏三：Part 1 / Part 2 贴图通道与生成提示词

[通道基础与验收](../../../newbie/tools/TextureChannelGuide/TextureChannelGuide.md)。**崩坏三不是一套永远不变的Shader。** 本页分别记录 [HoyoToon Part 1](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl)与 [Part 2](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-program.hlsl)，固定版本 `d9e5ca2f312bf16fba89dee67d32c08b482dcda4`。公开复刻可含近似与新增功能，不等于原游戏全部角色规范。

![崩坏三LightMap教学示意](./assets/lightmap.png)

## 相邻教学资源

[合成Diffuse](./assets/synthetic-diffuse.png) · [同UV语义分区](./assets/synthetic-regions.png) · [原始RGBA教学数据](./assets/lightmap-data.png) · [资源来源与边界](./assets/README.md) · [SHA256清单](./assets/manifest.json)

这些资源只用于学习如何拆通道、量化与合并；分区颜色和材质ID的对应是教学预设，不是游戏官方规则。

## 1. 常见角色图总表

| 贴图 | R | G | B | A |
| --- | --- | --- | --- | --- |
| Diffuse（Part 1） | RGB颜色 | 同左 | 同左 | 可选透明/裁剪；另一模式可用作发光阈值 |
| LightMap（Part 1） | 普通高光强度 | 与顶点数据结合的阴影控制 | 硬高光区域阈值 | 阴影/边缘/发光等参数组选择 |
| FaceMap（Part 1） | 核心SDF路径未确认，保留 | 同左 | 同左 | 脸部阴影阈值场，镜像读取 |
| FacExpTex（Part 1） | 脸红层 | 表情阴影层1 | 表情阴影层2 | 反向表情阴影层3：使用1−A |
| LightMap（Part 2） | 普通高光强度；低R还可触发丝袜分支/部分pass裁剪 | 身体/头发阴影控制 | 高光软硬/区域控制，受UseSoftSpecular影响 | 材质区域与金属阈值路径 |
| BumpMap（Part 2） | XYZ法线X，函数内翻转X | XYZ法线Y | XYZ法线Z | 核心法线路径未见使用，保留 |
| FaceMapTex（Part 2） | 核心Face函数未确认，保留 | 同左 | 同左 | 镜像脸部SDF |
| FaceExpTex（Part 2） | 脸红层 | 表情阴影G | 表情阴影B | 反向表情阴影A；另被部分顶点pass采样 |
| SpecularMaskMap / JitterMap / HairStripPatterns（Part 2） | 各向异性发丝路径的独立控制 | 按原图/函数 | 按原图/函数 | 按原图/函数 |

**Part 1 法线范围：**此固定核心路径未见Part 2式BumpMap读入，不能由此推断所有老角色没有其它法线纹理。

## 2. LightMap Part 1：R强度、B阈值不是一回事

[普通高光函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Common.hlsl#L46-L55)由R乘高光颜色，而B与 `1−pow(N·H,Shininess)` 比较。G进 [hi3_shadow](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Common.hlsl#L29-L43)，不是单纯物理AO。

独立旧MME实现 [HI3-Toon-old](https://github.com/Elysia-simp/HI3-Toon-old/blob/8a53d3235f906517e202439aa9ec89dceb1701e0/Sub/materials.fxh#L99-L104)也用R强度与B阈值，但其后续合成还乘B；因此只能说结构相近，不能交换精确数值。该仓库明确标为过时。

```text
将<image1>崩坏三Part1角色服装UV颜色图转换为LightMap技术候选，原尺寸与UV布局不变，R编码普通高光强度、G编码阴影控制、B编码高光区域阈值，教学值皮肤RGB(30,128,40)、哑光布料(20,128,30)、光滑饰件(160,128,180)，明确结构缝隙只降低G到90、不按黑布颜色自动压暗，不保留自然RGB、不产生照明或3D效果，A必须逐像素继承<image2>同UV原LightMap的参数区编码而不是255，不擅自把某个A值定义为金属或皮肤，保留缝线小配件位置、不加文字，只输出控制图候选；不能保持A则只输出RGB外部合并。
```

R/G/B必须外部取样，不同高光公式不能仅凭标签混用。A最好保留原值与原区域，没材质参数时不重编号。

## 3. LightMap Part 2：附加的金属与丝袜路径

[核心采样与分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-program.hlsl#L52-L158)会使用A+0.1与金属阈值比较，R≤0.1还能结合EnableStocking触发丝袜路径。不能把“R=0的哑光布”不加条件地用于所有材质。

[material_region](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L69-L86)先对A加0.1再分区；教学安全内部点可选0.05/0.2/0.4/0.6/0.8（字节13/51/102/153/204）。这不是固定物理材质分类，仍应保留原A与材质阈值。Part1/Part2编号不能直接互换。

[specular_regular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L291-L332)中B既可参与指数调节也可参与硬阈值，R参与强度与门限；不能把B简单改名“光滑度”。

```text
以<image2>同UV原Part2 LightMap为模板，根据<image1>服装区域仅制作已确认普通非金属分支的高光控制候选，R皮肤40、普通布料35、光滑配件160以避免误落入低R丝袜条件，G以原值为准且无依据处保留、B皮肤40布料30配件180作为待验收高光区域参数，A完整继承原图不改变金属阈值与材质索引，保持原尺寸、UV岛和全部小饰件位置，不把自然颜色或环境光写进数据图，不加文字，只输出候选；金属和丝袜区域维持原四通道，不能维持则只生成所需灰度层外部合并。
```

## 4. Diffuse与发光

Part1 [AlphaType分支](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L216-L240)分透明和发光阈值；Part2 [发光来源](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-program.hlsl#L153-L158)可选择Diffuse A或常量1。不能统一宣称A为发光。

```text
编辑<image1>崩坏三角色服装Diffuse，仅按指定配色改RGB并保留纹理、UV岛和装饰位置，不增加投影高光或3D照明，A由外部工具继承<image2>同UV原图以保留已确认透明或发光用途，不自动把浅色布料设为发光，不把所有Alpha置255，输出同尺寸无文字颜色候选。
```

**只改已确认的Diffuse A发光层：**

```text
依据<image1>UV位置和我明确标出的发光图案生成单通道灰度发光候选，发光区域255、非发光0并保留细条边界，不把反光金属或白布算作发光、不做光晕或自然颜色，保持原尺寸、不加文字，用于外部替换已确认发光模式的Diffuse A；若该材质用A做透明或裁剪，不应用这张图。
```

## 5. FaceMap与表情图

脸部 [Part1镜像采样](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L145-L171)配合头部方向与G控制；表情 [RGBA读取](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/HoyoToonHonkaiImpact-Program.hlsl#L242-L256)含反向Alpha层。Part2表情 [face_exp](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L88-L111)也使用1−A。

**FaceMap：**

```text
以<image1>脸部UV作为定位参考修补<image2>同角色原FaceMap，A逐像素保留原方向阴影阈值场与镜像关系，只修复明确破损小区，R/G/B未知用途保留原值，不从Diffuse绘制鼻部投影代替SDF，不更改脸UV位置，不做颜色重绘、文字或3D渲染，只输出同尺寸候选；没有原SDF时保留原图而不是声称可精确重建。
```

**表情图：**

```text
对照<image1>脸部UV和<image2>同UV原表情图，按明确表情说明编辑R脸红层、G/B两层表情阴影，A采用反向遮罩约定且未作用区255、作用区按原图降低，未知区域保留原RGBA，不直接在自然肤色上画腮红、不改变SDF或UV岛，不加文字与3D照明，输出技术遮罩候选；需要严格数值时逐层生成并在外部合并，不能把A全涂0。
```

## 6. Part2 BumpMap：注意函数翻转X

[法线函数](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L21-L29)解码XYZ、缩放XY并翻转X。它不是ZZZ的“RG法线+B阴影偏置”。

```text
将<image1>服装UV图生成标准XYZ切线法线候选，平坦RGB约(128,128,255)、明确缝线和扣件只产生浅而连贯的凹凸，保持原尺寸、UV边界与细节位置，不把颜色明暗当高低、不加入噪点或场景照明，A继承<image2>原BumpMap，不把B写成阴影遮罩，仅输出无文字法线图；最终应依据目标Part2解包的X翻转和切线基校验，不能只凭蓝紫外观验收。
```

## 7. 头发专用高光、溶解与查表图

Part2 [hair_specular](https://github.com/Hoyotoon/HoyoToon/blob/d9e5ca2f312bf16fba89dee67d32c08b482dcda4/Shaders/Honkai%20Impact/Includes/Part2-common.hlsl#L335-L354)分别采样JitterMap R、HairStripPatterns的标量与SpecularMaskMap。平铺与沿UV特定坐标采样使它们不等于服装粗糙度；未核查完整材质时保留原值。

**JitterMap候选：**

```text
以<image1>原JitterMap为尺寸与平铺布局模板，只生成我指定的细小发丝高光扰动R灰度候选、基值128且弱变化110至145，G/B/A保持原图，不输入服装UV、不生成自然头发颜色或直接光照、不加文字，保持边缘连续供外部替换R并在头发切线方向验证，未知参数时不重建。
```

**HairStripPatterns：**

```text
以<image1>原HairStripPatterns为采样布局模板，沿原条带方向修补明确损坏的灰度高光扰动纹样，保持尺寸、ST映射、边缘连续与全部未修改通道，不把它画成角色UV颜色图，不添加高光渲染或文字，只输出配准候选供指定坐标采样测试。
```

**SpecularMaskMap：**

```text
以<image2>同UV原SpecularMaskMap为模板对照<image1>头发UV，仅修改已经源码确认并由我指定的高光控制通道与区域，其余RGBA逐像素保留，不凭名字推断全部通道都是金属或光滑度，不重排UV、不增加照明文字，输出候选或独立灰度层外部合并；没有通道契约时保留原图。
```

**MaskDisTex等溶解图：**

```text
以<image1>原溶解控制贴图为模板只修补指定区域和指定通道，严格保留原尺寸、噪声平铺与RGBA编码，不把服装颜色转为未知溶解值，不改变其它通道、不新增文字，输出局部候选；只有取得目标溶解函数和材质参数后才生成新控制场。
```

**Ramp类：**

```text
以<image1>原SpecularRamp或其它色带图为模板，仅修改我指定行的RGB色板，保留原行列、采样边界与Alpha，不放衣服UV、不重排行、不生成物体或文字，输出查表候选并按材质区域索引逐行验证。
```

这些保留/修补提示词刻意不编造未知通道。更多特效、眼部纹样及不同年代Shader必须作为独立材质契约研究。

## 验收

记录Part1/Part2、Shader关键词和原材质参数。每次单通道A/B测试；对金属、丝袜和眼部单独检查；表情Alpha方向不得反转。数值、UV、切线与真实渲染四项都过关才部署。配图与数字仅作教学，不是已验证游戏成品。
