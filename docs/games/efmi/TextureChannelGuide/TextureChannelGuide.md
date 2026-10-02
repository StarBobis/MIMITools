# 明日方舟：终末地：逐贴图通道图解与建议提示词

选好下面的贴图类型，就可以查看 RGBA 通道的作用、数值示例和建议提示词。每个分区都提供两种模板：**只有 DiffuseMap**，或 **DiffuseMap＋Blender 导出的 UV 分布图**，可用于 ChatGPT 等支持参考图的图像模型。

如果手边有模型，建议一起提供 UV 图：模型会更容易辨认 UV 岛、边界和细条，通常有助于对齐。只有 Diffuse 也可以尝试；请补充皮肤、布料、裸金属或发光区域的文字说明。

这里的提示词是可调整的参考模板，数字是练习预设，不是角色原始参数。图解是教学示意，不是 AI 实测结果。生成后仍需检查尺寸、UV 和通道数值；UV 图也不能代替材质参数、几何法线或 SDF 方向信息。

## 找到你要生成的贴图

- [DiffuseMap / 颜色图](#map-diffuse)
- [衣服 Property / MME属性图](#map-property)
- [AKE社区属性图核对](#map-community-property)
- [衣服 NormalMap / RG法线](#map-normal)
- [脸部 Diffuse / Alpha AO](#map-face-diffuse)
- [脸 cm_M / 控制图](#map-cmm)
- [头发 HN / 双法线](#map-hairnormal)
- [头发 Property / P](#map-hairproperty)
- [FaceMap / 脸部方向阴影图](#map-sdf)
- [Ramp / 漫反射色带](#map-ramp)
- [MatCap / 球面外观图](#map-matcap)
- [发丝线 / 雨水 / 微细节控制图](#map-microdetail)
- [LUT / 精确布局与适用范围](#map-lut)
- [RD / 明暗混合色带](#map-rd)
- [RS / 高光查表](#map-rs)

本页区分 MME 属性布局与社区属性布局，BA 顺序不同，请按实际材质选择。MME 图用于 MMD/MME 材质，不是直接替换游戏贴图的通用格式。

- [16. Eye iris Matcap05 / 虹膜乘色反射](#map-eye-matcap05)
- [17. Eye iris Matcap07 / UV发光层](#map-eye-matcap07)
- [18. Eye HL / 独立眼高光颜色](#map-eye-highlight)

- [19. FGD / 预积分BRDF表](#map-fgd)
- [20. EnvTexture / RGBM环境反射](#map-environment-rgbm)
- [21. ManualMatcapTexture / 手工LOD图集](#map-manual-matcap)
- [22. FacialMainTexture / 虹膜、眼白与面部覆盖层](#map-facial-main)

- [23. EyeCaptureMaterial / EyeCaptureIris 捕获源图](#map-eye-capture-source)
- [24. HairVisibilityMaterial / 头发深度捕获源](#map-hair-capture-source)
- [25. HairVisibility_RT / FaceDepth_RT 打包深度](#map-packed-depth-rt)
- [26. 共享ShadowViewport / 阴影与外部深度输入](#map-shadow-viewport-rt)
- [27. PostSceneMap / PostToneMap 场景颜色RT](#map-post-scene-rt)
- [28. PostBloom0…4 / Blur / Up0…3 泛光RT](#map-post-bloom-rt)
- [29. PostDepthBuffer / 深度模板目标](#map-post-depth-buffer)

- [SkinMain / 身体皮肤颜色](#map-skin-diffuse)
- [SkinRd / 皮肤亮暗表](#map-skin-rd)

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

![明日方舟：终末地 DiffuseMap / 颜色图 输入、输出与四通道示意](./assets/maps/diffuse/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/diffuse/diffuse.png) · [R灰度层](./assets/maps/diffuse/diffuse-r.png) · [G灰度层](./assets/maps/diffuse/diffuse-g.png) · [B灰度层](./assets/maps/diffuse/diffuse-b.png) · [A灰度层](./assets/maps/diffuse/diffuse-a.png)

**R怎么用：** R是基础颜色红分量，0最低、255最高。

**G怎么用：** G是基础颜色绿分量，0最低、255最高。

**B怎么用：** B是基础颜色蓝分量，0最低、255最高。

**A怎么用：** A在专用ClothMain采样未消费，只取RGB；通用HairMain则用于AlphaClip、输出Alpha和部分SSS混合，不能给两分支同一填值。

颜色分量不是金属、高光或AO；不要增加新的方向光、投影和高光。

**实际绑定：** [衣服主色](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1728-L1736)只取RGB。头发主色[读取与Alpha裁剪](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1478-L1499)取RGBA，RGB经sRGB转线性，USE_ALPHA_CLIP时clip(A−CUTOFF)，多条输出保留A；[通用头发尾部](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L2312-L2335)还用1−DIFFUSE_BLEND_EFFECT×(1−A)参与SSS。脸A的AO与皮肤A未消费另见独立章节，不据文件名概括。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成DiffuseMap / 颜色图的颜色贴图草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是基础颜色红分量，0最低、255最高；
G是基础颜色绿分量，0最低、255最高；
B是基础颜色蓝分量，0最低、255最高；
A在专用ClothMain采样未消费，只取RGB；通用HairMain则用于AlphaClip、输出Alpha和部分SSS混合，不能给两分支同一填值。

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
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成DiffuseMap / 颜色图的颜色贴图草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是基础颜色红分量，0最低、255最高；
G是基础颜色绿分量，0最低、255最高；
B是基础颜色蓝分量，0最低、255最高；
A在专用ClothMain采样未消费，只取RGB；通用HairMain则用于AlphaClip、输出Alpha和部分SSS混合，不能给两分支同一填值。

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

## 2. 衣服 Property / MME属性图 {#map-property}

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![明日方舟：终末地 衣服 Property / MME属性图 输入、输出与四通道示意](./assets/maps/property/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/property/property.png) · [R灰度层](./assets/maps/property/property-r.png) · [G灰度层](./assets/maps/property/property-g.png) · [B灰度层](./assets/maps/property/property-b.png) · [A灰度层](./assets/maps/property/property-a.png)

**R怎么用：** R金属度0非金属255金属端，受强度控制。

**G怎么用：** G反射率权重增大通常更强，0仍不保证所有层无反射，非离散类型。

**B怎么用：** B AO低值更遮蔽、255不额外遮蔽，高光AO可能用0.5+0.5B。

**A怎么用：** A光滑度，roughness=max((1−A)×强度,0.04)，强度1时245起到下限，不是完美镜面。

**源码：** [衣服P消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1836-L1855)：saturate(R×metallicStrength)、saturate(G×reflectivityStrength)、B作为AO、roughness=max(saturate((1−A)×roughnessStrength),0.04)。[取样及回退](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L661-L668)读取线性RGBA并saturate；没有P资源时回退(0,0.5,1,0)，不是自动全白。A还调节雨水吸收、膜层等复合效果，不能单靠粗糙度描述所有输出。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成衣服 Property / MME属性图的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R金属度0非金属255金属端，受强度控制；
G反射率权重增大通常更强，0仍不保证所有层无反射，非离散类型；
B AO低值更遮蔽、255不额外遮蔽，高光AO可能用0.5+0.5B；
A光滑度，roughness=max((1−A)×强度,0.04)，强度1时245起到下限，不是完美镜面。

本次明确采用的生成预设：仅MME布局练习：普通布RGBA(0,100,255,40)、光滑饰件(0,100,255,140)、裸金属(255,180,255,180)、未知(0,100,255,40)，明确结构缝隙只把B降230。

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
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成衣服 Property / MME属性图的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R金属度0非金属255金属端，受强度控制；
G反射率权重增大通常更强，0仍不保证所有层无反射，非离散类型；
B AO低值更遮蔽、255不额外遮蔽，高光AO可能用0.5+0.5B；
A光滑度，roughness=max((1−A)×强度,0.04)，强度1时245起到下限，不是完美镜面。

本次明确采用的生成预设：仅MME布局练习：普通布RGBA(0,100,255,40)、光滑饰件(0,100,255,140)、裸金属(255,180,255,180)、未知(0,100,255,40)，明确结构缝隙只把B降230。

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

![衣服A光滑度与粗糙度示意](./assets/smoothness-values.png)

## 3. AKE PBRToonBase / 社区属性图核对 {#map-community-property}

此前本节把社区图概括为“B光滑度、A AO”，但本次检查固定Gacha Setup所带AKE节点后，**这不是该PBRToonBase的绑定规则**。不能仅凭社区名称交换BA。下列说明限这一节点组，不外推其他实现。

**R怎么用：** P.R经Separate XYZ.001.X→Reroute.008→Mix.002.Factor，在0与MetallicMax之间混合，再送金属参数；线性R=0非金属端、R=1为MetallicMax。

**G怎么用：** P.G经Separate XYZ.001.Y接到Reroute.007，但该节点没有输出连线，所以在此节点组未消费；没有证据称它为离散高光类型。

**B怎么用：** P.B经Separate XYZ.002.Z→Reroute.006进入AO相关运算，并不是本组光滑度。后续也会参与环境高光的AO链，不能把B变成法线Z。

**A怎么用：** 独立P Alpha输入接到Reroute.005，再供给Mix.001、Mix.014和Mix.015的Factor，分别混合SmoothnessMax及各向异性SmoothnessMaxT/B，随后进入PerceptualSmoothnessToPerceptualRoughness组；不是本组AO或表面透明度。

**证据与范围：** [固定AKE Blender源](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/shaders/ake/AKE.blend)的 `Arknights: Endfield_PBRToonBase` 节点拓扑；[精简P通道连线证据](/data/texture-channel-evidence/endfield-property.json)。数据输入明确标为Non_Color。此文件含NodeUndefined自定义节点，因此这里只证明连线及指定运算，不声称已执行整个自定义渲染器。

旧图保留仅作通道拆分示意，不是已核对的AKE原生编码；其中BA相反的旧预设不得直接替换此PBRToonBase。正确资产编辑使用本节数据定义或衣服MME Property章节，不再提供该旧布局的AI提示词。

![旧社区属性图通道示意，不适用此AKE绑定](./assets/maps/community-property/overview.png)


## 4. 衣服 NormalMap / RG法线 {#map-normal}

看R和G里的细小变化，方向信息藏在这些梯度里，而不是藏在“蓝紫色外观”里。平坦区域约128；从128向两侧偏移表示向不同切线方向倾斜，不是越白越凸。

![明日方舟：终末地 衣服 NormalMap / RG法线 输入、输出与四通道示意](./assets/maps/normal/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/normal/normal.png) · [R灰度层](./assets/maps/normal/normal-r.png) · [G灰度层](./assets/maps/normal/normal-g.png) · [B灰度层](./assets/maps/normal/normal-b.png) · [A灰度层](./assets/maps/normal/normal-a.png)

**R怎么用：** R编码切线法线X：0负方向、128附近零偏转、255正方向。

**G怎么用：** G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader。

**B怎么用：** B该RG解包未使用，不能当粗糙度。

**A怎么用：** A该RG解包未使用，不能当AO。

**源码：** [Cloth Normal解包](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L858-L880)只取RG，经2×值−1后重建Z并使用材质TBN；BA未进入该解包。普通ClothNormal与Hair HN.ba第二法线布局不同，不可丢掉头发BA。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成衣服 NormalMap / RG法线的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；
G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；
B该RG解包未使用，不能当粗糙度；
A该RG解包未使用，不能当AO。

本次明确采用的生成预设：平坦RGBA(128,128,0,255)，只指定结构作浅XY变化；
BA占位，不替代原角色未知数据。

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
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成衣服 NormalMap / RG法线的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；
G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；
B该RG解包未使用，不能当粗糙度；
A该RG解包未使用，不能当AO。

本次明确采用的生成预设：平坦RGBA(128,128,0,255)，只指定结构作浅XY变化；
BA占位，不替代原角色未知数据。

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

## 5. 脸部 Diffuse / Alpha AO {#map-face-diffuse}

先看输入的蓝色衣片：颜色图里它就该是蓝色，R/G/B是颜色分量。到了控制图，同一片蓝布可能变成红橙色，那不是改了衣服颜色，而是几个控制值叠在一起。

![明日方舟：终末地 脸部 Diffuse / Alpha AO 输入、输出与四通道示意](./assets/maps/face-diffuse/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/face-diffuse/face-diffuse.png) · [R灰度层](./assets/maps/face-diffuse/face-diffuse-r.png) · [G灰度层](./assets/maps/face-diffuse/face-diffuse-g.png) · [B灰度层](./assets/maps/face-diffuse/face-diffuse-b.png) · [A灰度层](./assets/maps/face-diffuse/face-diffuse-a.png)

**R怎么用：** R是脸部颜色红分量，0最低255最高，RGB按sRGB转线性。

**G怎么用：** G是脸部颜色绿分量，0最低255最高。

**B怎么用：** B是脸部颜色蓝分量，0最低255最高，不能把RGB绘制明暗直接当AO。

**A怎么用：** A是Face链AO：正指数时低更暗255保留1；200指数1约78.4%、指数2约61.5%。

**源码：** [脸基础色与AO](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L953-L975)RGBsRGB解码，AO=pow(saturate(A),max(AO_STRENGTH,0))。但[LUT/RD诊断组合](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L769-L812)有两个不同AO模式：COLOR_AO_RAMP_DEBUG取min(RD.A,AO)选暗色而非直接乘黑；COLOR_AO_DEBUG在线性空间乘AO。必须按启用的wrapper判断，不能把低A统一叫纯黑。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成脸部 Diffuse / Alpha AO的颜色贴图草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是脸部颜色红分量，0最低255最高，RGB按sRGB转线性；
G是脸部颜色绿分量，0最低255最高；
B是脸部颜色蓝分量，0最低255最高，不能把RGB绘制明暗直接当AO；
A是Face链AO：正指数时低更暗255保留1；
200指数1约78.4%、指数2约61.5%。

本次明确采用的生成预设：RGB按用户颜色修改保留眼鼻嘴；
A普通255、明确结构遮蔽230，弱过渡；
仅Face链练习，不外推独立Skin只读RGB路径。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成脸部 Diffuse / Alpha AO的颜色贴图草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是脸部颜色红分量，0最低255最高，RGB按sRGB转线性；
G是脸部颜色绿分量，0最低255最高；
B是脸部颜色蓝分量，0最低255最高，不能把RGB绘制明暗直接当AO；
A是Face链AO：正指数时低更暗255保留1；
200指数1约78.4%、指数2约61.5%。

本次明确采用的生成预设：RGB按用户颜色修改保留眼鼻嘴；
A普通255、明确结构遮蔽230，弱过渡；
仅Face链练习，不外推独立Skin只读RGB路径。

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

## 6. 脸 cm_M / 控制图 {#map-cmm}

脸图和身体图不能共用解释。图中常量只是把每个通道的位置拆给你看，不代表脸的方向阴影已经恢复；眼鼻嘴的对应关系、视角和材质分支都很重要。

![明日方舟：终末地 脸 cm_M / 控制图 输入、输出与四通道示意](./assets/maps/cmm/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/cmm/cmm.png) · [R灰度层](./assets/maps/cmm/cmm-r.png) · [G灰度层](./assets/maps/cmm/cmm-g.png) · [B灰度层](./assets/maps/cmm/cmm-b.png) · [A灰度层](./assets/maps/cmm/cmm-a.png)

**R怎么用：** R为SSS乘子0关闭该项255最大纹理权重。

**G怎么用：** G在SSS链减弱视角限制、诊断链混SDF/几何、摄像机阴影链提高接收，非统一明暗刻度。

**B怎么用：** B摄像机阴影区域乘子0无这项区域、增大允许更多阴影，最终max(G,区域×B)。

**A怎么用：** A边缘光权重0抑制255最大，另受光侧/视角/宽度限制。

**源码：** [SSS](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L598-L625)消费R/G；[摄像机阴影](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L552-L561)消费G/B；[边缘光](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L861-L886)消费A。各开关关闭时对应通道无该效果。SDF到几何光照的G混合在CMM_BLEND_DEBUG诊断分支；保留分支限定，不称为所有配置都生效。

### 建议提示词（占位练习）

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成脸 cm_M / 控制图的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R为SSS乘子0关闭该项255最大纹理权重；
G在SSS链减弱视角限制、诊断链混SDF/几何、摄像机阴影链提高接收，非统一明暗刻度；
B摄像机阴影区域乘子0无这项区域、增大允许更多阴影，最终max(G,区域×B)；
A边缘光权重0抑制255最大，另受光侧/视角/宽度限制。

本次明确采用的生成预设：非还原性无附加效果占位RGBA(0,0,0,0)，或用户明确启用SSS时脸区R128；
不从Diffuse推断原相机遮罩与轮廓场。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成脸 cm_M / 控制图的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R为SSS乘子0关闭该项255最大纹理权重；
G在SSS链减弱视角限制、诊断链混SDF/几何、摄像机阴影链提高接收，非统一明暗刻度；
B摄像机阴影区域乘子0无这项区域、增大允许更多阴影，最终max(G,区域×B)；
A边缘光权重0抑制255最大，另受光侧/视角/宽度限制。

本次明确采用的生成预设：非还原性无附加效果占位RGBA(0,0,0,0)，或用户明确启用SSS时脸区R128；
不从Diffuse推断原相机遮罩与轮廓场。

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

## 7. 头发 HN / 双法线 {#map-hairnormal}

看R和G里的细小变化，方向信息藏在这些梯度里，而不是藏在“蓝紫色外观”里。平坦区域约128；从128向两侧偏移表示向不同切线方向倾斜，不是越白越凸。

![明日方舟：终末地 头发 HN / 双法线 输入、输出与四通道示意](./assets/maps/hairnormal/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/hairnormal/hairnormal.png) · [R灰度层](./assets/maps/hairnormal/hairnormal-r.png) · [G灰度层](./assets/maps/hairnormal/hairnormal-g.png) · [B灰度层](./assets/maps/hairnormal/hairnormal-b.png) · [A灰度层](./assets/maps/hairnormal/hairnormal-a.png)

**R怎么用：** R编码切线法线X：0负方向、128附近零偏转、255正方向。

**G怎么用：** G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader。

**B怎么用：** B是soft法线X：0负128附近零255正，不是Z或AO。

**A怎么用：** A是soft法线Y：0负128附近零255正，不是透明度。

**源码：** [头发双法线](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1231-L1252)regular=Unpack(RG,BUMP_SCALE)，soft=Unpack(BA,1)，经同一TBN转换；P.R在外层球面/soft与regular之间混合。RG与BA都须保持线性signed-normal编码；并非RGBA四个灰度蒙版。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成头发 HN / 双法线的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；
G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；
B是soft法线X：0负128附近零255正，不是Z或AO；
A是soft法线Y：0负128附近零255正，不是透明度。

本次明确采用的生成预设：平坦RGBA(128,128,128,128)，RG仅按明确发丝浅凹凸作弱变化，BA128平滑方向占位；
真正soft方向需要几何信息，不能从Diffuse恢复。

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
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成头发 HN / 双法线的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；
G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；
B是soft法线X：0负128附近零255正，不是Z或AO；
A是soft法线Y：0负128附近零255正，不是透明度。

本次明确采用的生成预设：平坦RGBA(128,128,128,128)，RG仅按明确发丝浅凹凸作弱变化，BA128平滑方向占位；
真正soft方向需要几何信息，不能从Diffuse恢复。

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

## 8. 头发 Property / P {#map-hairproperty}

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![明日方舟：终末地 头发 Property / P 输入、输出与四通道示意](./assets/maps/hairproperty/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/hairproperty/hairproperty.png) · [R灰度层](./assets/maps/hairproperty/hairproperty-r.png) · [G灰度层](./assets/maps/hairproperty/hairproperty-g.png) · [B灰度层](./assets/maps/hairproperty/hairproperty-b.png) · [A灰度层](./assets/maps/hairproperty/hairproperty-a.png)

**R怎么用：** R层法线混合，0偏外层球面/soft，255偏regular；可显式sRGB转换，128不一定半权重。

**G怎么用：** G原生高光路径是highlightMask，另一ORM路径是反射率。

**B怎么用：** B通常AO低更遮蔽高保留，按wrapper。

**A怎么用：** A原生链是发丝线控制，ORM链是光滑度，两者没有统一端点解释。

**源码：** [P.R层混合](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1238-L1252)、[P.G高光及P.A暗线诊断](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1393-L1403)与[通用头发ORM分支](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L2161-L2164)。固定复刻的Goo式路径G乘highlightMask，A作为packedLineMask只在RD_DARK_LINE_DEBUG取用；通用ORM路径G为reflectivity、A为1−roughness。P.R可由P_MATCH_BLEND_SRGB开关进行RGB解码，P.A不参与该解码；128对应权重必须看开关。此处“原生链”指复刻内的Goo合同，不是证明所有原游戏shader。

### 建议提示词

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成头发 Property / P的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R层法线混合，0偏外层球面/soft，255偏regular；
可显式sRGB转换，128不一定半权重；
G原生高光路径是highlightMask，另一ORM路径是反射率；
B通常AO低更遮蔽高保留，按wrapper；
A原生链是发丝线控制，ORM链是光滑度，两者没有统一端点解释。

本次明确采用的生成预设：仅独立确认ORM头发练习：R128、G128、B255、A128，明确缝隙B230；
原生发丝线链不使用这套预设。

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
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成头发 Property / P的技术数据草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R层法线混合，0偏外层球面/soft，255偏regular；
可显式sRGB转换，128不一定半权重；
G原生高光路径是highlightMask，另一ORM路径是反射率；
B通常AO低更遮蔽高保留，按wrapper；
A原生链是发丝线控制，ORM链是光滑度，两者没有统一端点解释。

本次明确采用的生成预设：仅独立确认ORM头发练习：R128、G128、B255、A128，明确缝隙B230；
原生发丝线链不使用这套预设。

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

## 9. FaceMap / 脸部方向阴影图 {#map-sdf}

这张示意图展示常量占位，用来认识通道，并不具备正确的脸部方向阴影。颜色图没有告诉我们每个脸部像素在哪个光向开始转暗；正确方向场需要额外设计或几何信息。

![明日方舟：终末地 FaceMap / 脸部方向阴影图 输入、输出与四通道示意](./assets/maps/sdf/overview.png)

**常量占位示意：** 用于认识通道，不具备正确的脸部方向阴影。

[原始RGBA图](./assets/maps/sdf/sdf.png) · [R灰度层](./assets/maps/sdf/sdf-r.png) · [G灰度层](./assets/maps/sdf/sdf-g.png) · [B灰度层](./assets/maps/sdf/sdf-b.png) · [A灰度层](./assets/maps/sdf/sdf-a.png)

**R怎么用：** R方向场，与G平均或按诊断选路，增大通常更偏亮面。

**G怎么用：** G另一方向场，与R配套，不能当皮肤绿颜色。

**B怎么用：** B在当前FaceSdf方向响应中未消费，仅调试可显示。

**A怎么用：** A在当前FaceSdf方向响应中未消费，仅调试可显示。

只上传Diffuse无法唯一确定方向场。下面建议模板仅生成标明用途的占位草稿，不是正确SDF生成配方；要重建必须增加几何/光向设计信息。

**源码与分支：** [SDF采样及响应](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L695-L759)，光侧side≥0保持U，否则取1−U。默认Goo路径以saturate((R+G)/2)作为同一全角度阈值，角度abs(atan2(side,headFrontDot×FORWARD_SIGN))/π。mask=1/(1+BASE^(−3×SHARP×(average−angle−CENTER)))；BASE>1、SHARP>0时R/G增大通常提高mask，不能把默认路径写成R只背光/G只前光。THRESHOLD_DEBUG另用前光G、背光R，经1−smoothstep与前后混合；它是指定诊断分支，不代表所有默认配置。

### 建议提示词（占位练习）

有 UV 分布图时可选双图模板，更方便核对边界；单图模板同样可以作为起点。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成FaceMap / 脸部方向阴影图的占位草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R方向场，与G平均或按诊断选路，增大通常更偏亮面；
G另一方向场，与R配套，不能当皮肤绿颜色；
B在当前FaceSdf方向响应中未消费，仅调试可显示；
A在当前FaceSdf方向响应中未消费，仅调试可显示。

本次明确采用的生成预设：非还原占位RGBA(128,128,0,255)，RG平场没有正确转光阴影，BA占位。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成FaceMap / 脸部方向阴影图的占位草稿。

生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R方向场，与G平均或按诊断选路，增大通常更偏亮面；
G另一方向场，与R配套，不能当皮肤绿颜色；
B在当前FaceSdf方向响应中未消费，仅调试可显示；
A在当前FaceSdf方向响应中未消费，仅调试可显示。

本次明确采用的生成预设：非还原占位RGBA(128,128,0,255)，RG平场没有正确转光阴影，BA占位。

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

## 10. Ramp / 漫反射色带 {#map-ramp}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![明日方舟：终末地 Ramp / 漫反射色带 输入、输出与四通道示意](./assets/maps/ramp/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/ramp/ramp.png) · [R灰度层](./assets/maps/ramp/ramp-r.png) · [G灰度层](./assets/maps/ramp/ramp-g.png) · [B灰度层](./assets/maps/ramp/ramp-b.png) · [A灰度层](./assets/maps/ramp/ramp-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A在通用EfRampSampler分支作为亮暗混合输入；同图在法线与摄像机前向坐标下另取A作rampNoF，具体见下方源码；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

**源码：** [通用Ramp采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L2175-L2195)在(rampNoL,0.5)取RGBA，RGB进行sRGB解码；在(dot(N,camFwd)×0.5+0.5,0.5)另取A作为rampNoF。A同时进入min(ao,shadow,A)等亮暗混合，不是透明度。专用衣服／脸部RD和头发RD路径另见RD分区，不能把所有Ramp统一解释成RGB-only。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成Ramp / 漫反射色带的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A在通用EfRampSampler分支作为亮暗混合输入；同图在法线与摄像机前向坐标下另取A作rampNoF，具体见下方源码；
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
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成Ramp / 漫反射色带的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A在通用EfRampSampler分支作为亮暗混合输入；同图在法线与摄像机前向坐标下另取A作rampNoF，具体见下方源码；
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

## 11. MatCap / 球面外观图 {#map-matcap}

这里看的是球面查表外观，不是扣件在UV中的位置。转视角时材质去球面图取样；直接把服装图变成橙色不可能得到正确MatCap。

![明日方舟：终末地 MatCap / 球面外观图 输入、输出与四通道示意](./assets/maps/matcap/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/matcap/matcap.png) · [R灰度层](./assets/maps/matcap/matcap-r.png) · [G灰度层](./assets/maps/matcap/matcap-g.png) · [B灰度层](./assets/maps/matcap/matcap-b.png) · [A灰度层](./assets/maps/matcap/matcap-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A在衣服普通MatcapTexture采样中未消费，只取RGB；手工LOD图集另见独立分区。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

**源码与坐标：** [衣服Matcap](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1644-L1673)使用视图法线XY×(0.5,−0.5)+0.5、Clamp，RGB经sRGB→线性解码后供环境反射；启用MANUAL_LOD时改读手工图集，不能仍按单张球面图编辑。眼睛Matcap05/07消费不同，见独立章节。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成MatCap / 球面外观图的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A在衣服普通MatcapTexture采样中未消费，只取RGB；手工LOD图集另见独立分区；
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
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成MatCap / 球面外观图的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；
G是查表颜色绿分量，值增大增加所采样绿贡献；
B是查表颜色蓝分量，值增大增加所采样蓝贡献；
A在衣服普通MatcapTexture采样中未消费，只取RGB；手工LOD图集另见独立分区；
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

## 12. 发丝、雨水与唇高光：逐资产通道 {#map-microdetail}

这几类图不是同一种RGBA布局。以下使用固定版本终末地MME的实际采样，数据值按加载后的0…1解释；不把MME新增的雨水近似当成游戏原生通道。平铺、世界空间投影和视角偏移的图不能套衣服Diffuse的UV布局。

### 12.1 hairline_M / 发丝暗线遮罩 {#map-hairline}

**R怎么用：** 发丝线遮罩，`hairLine=saturate(R)`，正面高光乘 `1−hairLine`。0保留这项高光，1抑制；调试RD暗线分支还把它作为diffuseHairLine传入。

**G怎么用：** 此采样链只取R，不消费G。

**B怎么用：** 此采样链只取R，不消费B。

**A怎么用：** 此采样链只取R，不消费A；头发P.A是另外的packed line mask，不能把它和hairline.A混为一层。

采样UV为 `uv*HAIR_LINE_UV_ST.xy+zw`；它是发丝细节，不是全部Diffuse阴影。证据：[读R及反向高光遮罩](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1393-L1404)。

### 12.2 hairst_ST / 各向异性扰动 {#map-hairst}

**R怎么用：** 重映射为带符号噪声 `n=2R−1`，乘NoiseStrength并加BaseOffset后沿hairNormalWS偏移。R=0产生负偏移、0.5近中性、1正偏移；不是白高光更强。

**G怎么用：** 这份MME的各向异性噪声采样只读R，不消费G。

**B怎么用：** 同上，不消费B。

**A怎么用：** 同上，不消费A。

UV按AnisoNoiseUvSt平铺／偏移；强度和方向由头发法线与材质参数共同决定。证据：[带符号噪声与偏移](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1277-L1291)。

### 12.3 rain_M / 竖向水流法线与覆盖 {#map-rain-flow}

**R怎么用：** 水流打包法线X分量，在两组世界空间投影间按几何法线权重混合，再与G一起解包；0.5为零偏转附近，不是红色雨水。

**G怎么用：** 水流打包法线Y分量，同样重建法线并受NormalStrength、轴符号和Coverage影响。

**B怎么用：** 静态水沟覆盖遮罩。静态覆盖为B的投影加权；动画覆盖为各投影的B乘同投影的动态A遮罩，再乘RainAmount和侧面几何遮罩。增大B通常增加水流区域，不是金属度。

**A怎么用：** 此MME复用A为动态揭露遮罩，另用纵向动画UV取样并算 `sqrt(saturate(A))`。它与B相乘后决定水流出现时机；A=0抑制对应动态覆盖，1完整保留B。不等于贴图透明度。

两组投影分别使用position.zy与position.xy，权重来自geometryNormalWS.xz；没有衣服UV岛逐像素复原的契约。A复用是MME实现注释明确说明的近似。证据：[世界投影、RGBA合成](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L913-L948)、[Coverage和RG法线](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L950-L978)。

### 12.4 rain_drops / 雨滴法线与带符号覆盖 {#map-rain-drops}

**R怎么用：** 雨滴法线X，`(2R−1)*dropCoverage*NormalStrength`，再乘X轴符号。

**G怎么用：** 雨滴法线Y，`(2G−1)*dropCoverage*NormalStrength`，再乘Y轴符号；Z由XY重建，不直接读B。

**B怎么用：** 这条雨滴函数没有读取B。

**A怎么用：** `signedMask=2A−1`，静态覆盖使用正负两端的绝对幅度，即 `abs(2A−1)` 再乘雨强、几何上向遮罩和Intensity。0和1都可产生大覆盖，0.5附近反而最小；**不是白作用最大／黑不透明**。然后由独立phase图形成法线和湿润两个动画包络。

证据：[雨滴RG、A及重建Z](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1035-L1079)。8位字节128并非精确0.5，需保留原图，不对A做自动对比度。

### 12.5 rain_drops_phase / 雨滴相位 {#map-rain-phase}

**R怎么用：** authoredTiming输入，控制每处雨滴出现的动画相位，交给RainDropEnvelopes形成短暂法线和较长湿润包络。R改变时机，不是雨滴强度。

**G怎么用：** 当前phase图采样只取R，不消费G。

**B怎么用：** 同上，不消费B。

**A怎么用：** 同上，不消费A。

它与rain_drops使用同一个 `uv*dropTiling`；须成套保留，不能把颜色图阴影当相位。证据：[phase读取及动画调用](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1044-L1071)。

### 12.6 face_hl_M / 唇部滑动高光 {#map-lip-highlight}

**R怎么用：** 唇高光区域遮罩，随 `dot(viewDirWS,headRight)*LipUvOffset` 横向偏移取样，乘正面光向smoothstep门控，再乘高光强度。白增强此项、黑关闭，但背光或开关关闭时不会仅因白而发亮。

**G怎么用：** 此唇高光采样只读取R，不消费G。

**B怎么用：** 同上，不消费B。

**A怎么用：** 同上，不消费A。

证据：[视角UV偏移、R遮罩和背光淡出](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L833-L856)。这是脸部专用UV控制图，不能用衣服UV，也不能把画在Diffuse上的固定白点当成滑动高光。

### 编辑检查

先确认纹理名与对应sampler，不同时改所有四层。噪声／相位图保持平铺连续，法线数据保持Non-Color和轴方向，雨水必须扫动画时间及几何朝向，唇高光必须转视角和光源。所有“未消费”仅限所引固定源码路径，兼容原生角色或另一套shader时保留原通道并重新核对。

## 13. LUT / 衣服与肤色颜色变换表 {#map-lut}

这里的 LUT 是**颜色变换表**，不是服装 UV 图，也不是金属度／粗糙度／AO 的四通道打包。输入颜色决定取样坐标；像素 RGB 存取样后输出的颜色。

**R怎么用：** R 存输出颜色的红分量；提高某个表格像素的 R，只改变落在该颜色区间的红色输出，不是增加材质金属度。

**G怎么用：** G 存输出颜色的绿分量；不是粗糙度，也不是受光遮罩。

**B怎么用：** B 存输出颜色的蓝分量；不是 AO、法线 Z 或材质编号。

**A怎么用：** 以下固定版本的颜色 LUT 采样只取 `.rgb`，A 不进入颜色变换。保留原 Alpha 便于兼容其他工具；在这一已核对路径中新建 A=255 不会改变 RGB 结果。这不适用于材质参数 LUT。

### 终末地 MME 的 1024×32 坐标

默认 `USE_BRG=1`：将显示空间的 albedo RGB 重排为 BRG，但**不经过星铁／ZZZ 的对数编码**。B 选水平切片，R 为片内 U，G 为片内 V。输入先 clamp 到0…1，切片编号 `s=floor(B*31)`，混合权重 `t=frac(B*31)`：

```text
u0 = s/32 + R*(31/1024) + 0.5/1024
v  = 1 - (G*(31/32) + 0.5/32)
u1 = u0 + 1/32
out = lerp(LUT(u0,v).rgb, LUT(u1,v).rgb, t)
```

**V 翻转**是此实现的明确步骤；不能直接拿不翻转的 ZZZ 表替换。关闭 USE_BRG 后变成 R 选切片、G 片内 U、B 片内 V。脸部还暴露 next-slice V offset，默认0，须跟随目标配置。

衣服 LUT 生成暗部配色，再由 LUT strength 混合；脸／身体皮肤使用肤色 LUT，与 RD 的亮暗选择共同工作。RGB 是颜色结果而不是精确“某行粗糙度参数”，A 在所引 LUT 函数中不读取。MME 默认颜色输入是显示空间，读写转换必须遵循该材质实现。

**证据：** [衣服 LUT 完整采样](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1178-L1203)、[衣服暗部分支](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1972-L1977)、[脸肤色表及切片偏移](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L404-L425)、[脸 RD 选择](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L765-L804)。[身体皮肤LUT](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_skin.hlsl#L351-L371)同样按USE_BRG、32切片及V翻转取RGB。上述三份绑定分别为ClothLut、FaceSkinLut、SkinLut，不能与FGD预积分表混用。这是社区 MME 的确定契约，不宣称覆盖所有游戏版本的原生 shader。

### 如何制作或修改

Diffuse 和 UV 不决定完整的颜色变换：请提供原 LUT、目标调色及目标着色器。用脚本／颜色查表工具按上述坐标生成，或对原表逐像素修改 RGB；不要让图像模型画衣服形状、自动改对比度或跨切片涂抹。先测试黑、白、灰、红、绿、蓝和高亮输入，再比较启用／关闭 LUT 的渲染。这个步骤需要准确数值文件，不提供声称能从一张 Diffuse 还原原表的 AI 提示词。

## 14. RD / 明暗混合色带 {#map-rd}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![明日方舟：终末地 RD / 明暗混合色带 输入、输出与四通道示意](./assets/maps/rd/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/rd/rd.png) · [R灰度层](./assets/maps/rd/rd-r.png) · [G灰度层](./assets/maps/rd/rd-g.png) · [B灰度层](./assets/maps/rd/rd-b.png) · [A灰度层](./assets/maps/rd/rd-a.png)

**R怎么用：** R色带红分量。

**G怎么用：** G色带绿分量。

**B怎么用：** B色带蓝分量。

**A怎么用：** A在衣服与脸RD组合中为亮暗混合权重，0偏暗/LUT端、255偏绘制Diffuse端；头发RD诊断分支仅用RGB，A未消费。

**分支差异：** [衣服RD](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1832-L1841)在(pow(halfLambert,LIGHT_CURVE),0.5)Clamp取RGBA，RGB按强度与白混作tint、A选暗LUT/亮Diffuse；[头发RD诊断](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1830-L1860)同样取RGBA但这里只消费RGB，经sRGB解码乘主色，A未消费。通用头发的Ramp.A另有消费，见Ramp章节；专用SkinRD还有色度去灰规则。不能把RD.A混合规则称为所有材质通用。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成RD / 明暗混合色带的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R色带红分量；
G色带绿分量；
B色带蓝分量；
A在衣服与脸RD组合中为亮暗混合权重，0偏暗/LUT端、255偏绘制Diffuse端；头发RD诊断分支仅用RGB，A未消费。

本次明确采用的生成预设：256×16，RGB从左(45,50,65)到右(255,255,255)，A从左0到右255连续变化；
同一行复制到16行，仅练习，布局不能冒充原RD。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成RD / 明暗混合色带的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R色带红分量；
G色带绿分量；
B色带蓝分量；
A在衣服与脸RD组合中为亮暗混合权重，0偏暗/LUT端、255偏绘制Diffuse端；头发RD诊断分支仅用RGB，A未消费。

本次明确采用的生成预设：256×16，RGB从左(45,50,65)到右(255,255,255)，A从左0到右255连续变化；
同一行复制到16行，仅练习，布局不能冒充原RD。

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

## 15. RS / 高光查表 {#map-rs}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![明日方舟：终末地 RS / 高光查表 输入、输出与四通道示意](./assets/maps/rs/overview.png)

**教学示意：** 数字对应本节练习预设，图例不属于贴图数据。

[原始RGBA图](./assets/maps/rs/rs.png) · [R灰度层](./assets/maps/rs/rs-r.png) · [G灰度层](./assets/maps/rs/rs-g.png) · [B灰度层](./assets/maps/rs/rs-b.png) · [A灰度层](./assets/maps/rs/rs-a.png)

**R怎么用：** R高光查表红。

**G怎么用：** G高光查表绿。

**B怎么用：** B高光查表蓝。

**A怎么用：** A在所引衣服RS与头发RS采样都未消费，均只取RGB；不是高光遮罩。

**源码：** [衣服RS helper](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L680-L685)只取RGB；[头发RS消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1406-L1413)UV=(pow(saturate(dot(view.xz,hairNormal.xz)),RS_U_POWER),saturate(specularRange))，Clamp，RGBsRGB解码后参与高光，A未取。[衣服RS坐标与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1453-L1474)不同：r2=max(roughness²,0.0078125)，distribution=r2/max((NoH²×(r2−1)+1)²,0.00001)，UV=saturate(distribution×(r2+0.0001),(1−metallic)×roughness)，输出F0×lerp(1,saturate(RS.rgb),saturate(strength))，这里不做sRGB解码。头发RS则明确sRGB解码。不要把RS当固定单行色带或A当透明度。

### 建议提示词

这类图不沿服装 UV 排列，双图模板也保持指定的查表/平铺结构。

::: tabs

== 只有 DiffuseMap

![单图模板的参考输入示意](./assets/reference-inputs/diffuse-only.png)

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成RS / 高光查表的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R高光查表红；
G高光查表绿；
B高光查表蓝；
A在所引衣服RS与头发RS采样都未消费，均只取RGB；不是高光遮罩。

本次明确采用的生成预设：256×16，RGB由左(0,0,0)到右(255,255,255)，A255，各行相同；
只做查表练习。

不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；
只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。

输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。

这是按给定预设生成的候选，不视为角色原始通道的还原；
不能输出真实Alpha时明确说明，不要以白底预览代替 RGBA 文件。
```

== DiffuseMap＋UV 分布图

![双图模板的参考输入示意](./assets/reference-inputs/diffuse-and-uv.png)

```text
我上传了两张参考图：第一张是明日方舟：终末地角色 DiffuseMap 颜色贴图，第二张是 Blender 导出的同一材质 UV 分布图。请结合这两张参考图，生成RS / 高光查表的技术数据草稿。

这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。

通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。

完整通道规则：R高光查表红；
G高光查表绿；
B高光查表蓝；
A在所引衣服RS与头发RS采样都未消费，均只取RGB；不是高光遮罩。

本次明确采用的生成预设：256×16，RGB由左(0,0,0)到右(255,255,255)，A255，各行相同；
只做查表练习。

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

## 16. Eye iris Matcap05 / 虹膜乘色反射 {#map-eye-matcap05}

**R怎么用：** R为虹膜乘色反射红分量，color.R×(1+max(R,0)×strength)。

**G怎么用：** 同上绿色分量。

**B怎么用：** 同上蓝色分量。

**A怎么用：** 只采样.rgb，A未消费。

EF_EYE_IRIS_MATCAP05_ENABLED开启。坐标为归一化视图normal.xy×(0.5,−0.5)+0.5并saturate；V翻转以适配Direct3D，Clamp。strength由眼控制器与MATCAP05_STRENGTH给出；正strength下RGB增大提高对应乘色，但最终输出会限制到0…1。不是服装UV纹理或金属度表。

**源码：** [16. Eye iris Matcap05 / 虹膜乘色反射采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_eye.hlsl#L136-L157)。范围限固定Endfield MME版本，不代表所有原游戏版本；保持原RGB色彩加载方式，A未消费不等于原资产可任意丢弃。

## 17. Eye iris Matcap07 / UV发光层 {#map-eye-matcap07}

**R怎么用：** R为虹膜加色红分量，max(R,0)×控制器发光强度。

**G怎么用：** 同上绿色分量。

**B怎么用：** 同上蓝色分量。

**A怎么用：** 只采样.rgb，A未消费。

EF_EYE_IRIS_MATCAP07_ENABLED开启。虽然名字叫Matcap07，实际使用传入irisUv采样，不取视图球面坐标；Clamp。outRGB=max(color,0)+max(textureRGB,0)×EfEyeControllerMatcap07(EMISSION)。不能把Matcap05的球面坐标直接套用到此层。

**源码：** [17. Eye iris Matcap07 / UV发光层采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_eye.hlsl#L160-L181)。范围限固定Endfield MME版本，不代表所有原游戏版本；保持原RGB色彩加载方式，A未消费不等于原资产可任意丢弃。

## 18. Eye HL / 独立眼高光颜色 {#map-eye-highlight}

**R怎么用：** R进入高光RGB及亮度dot(RGB,(0.2126,0.7152,0.0722))，再按Saturation混色。

**G怎么用：** G同样进入颜色与亮度转换。

**B怎么用：** B同样进入颜色与亮度转换。

**A怎么用：** 贴图A没有采样，不控制此高光几何层覆盖。

独立高光几何的原UV，Clamp及各向异性过滤。颜色乘非负ColorGain与控制器Highlight(EMISSION)，saturate后全局分级。实际覆盖=饱和(ALPHA_SCALE×材质Diffuse.A×饱和(EYES_MASK)×控制器HighlightVisibility)，再按ALPHA_CUTOFF裁剪，使用SrcAlpha/InvSrcAlpha混合并写深度。旧Facing参数保留但不改变覆盖；不能把贴图A或旋转视角当淡出因子。

**源码：** [18. Eye HL / 独立眼高光颜色采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_eye_highlight.hlsl#L130-L194)。范围限固定Endfield MME版本，不代表所有原游戏版本；保持原RGB色彩加载方式，A未消费不等于原资产可任意丢弃。

## 19. FGD / 预积分BRDF表 {#map-fgd}

**R怎么用：** R为低F0端的singleScatter系数，与G按saturate(F0)混合，非红色输出。

**G怎么用：** G既是高F0端系数又用于reflectivity=max(G,0.001)，补偿energyLoss=max(1/reflectivity−1,0)。改变G不保证所有项单调。

**B怎么用：** B经max(B+0.5,0)作为diffuseFgd；不是AO或颜色蓝分量。

**A怎么用：** 只采样.rgb，贴图A未消费；函数返回A是计算出的diffuseFgd，不能与贴图A混淆。

64×64线性数据表，Clamp；UV=(sqrt(saturate(N·V)),perceptualRoughness)，再saturate并映射到texel中心：UV×63/64+0.5/64。specularFgd=max(lerp(R,G,saturate(F0))×(1+F0×energyLoss),0)。漫反射与环境高光分别消费这些结果，不能用颜色分级LUT的BRG切片布局代替。

**源码：** [19. FGD / 预积分BRDF表采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1533-L1552)。范围仅限固定Endfield MME实现，保留原始编码和对应材质开关，不代表原游戏全版本。

## 20. EnvTexture / RGBM环境反射 {#map-environment-rgbm}

**R怎么用：** R是RGBM编码颜色红系数，实际红色=R×A×RGBM_RANGE。

**G怎么用：** 同上绿色系数。

**B怎么用：** 同上蓝色系数。

**A怎么用：** A为所有RGB共享的HDR倍数M，不是透明度；A=0使解码环境为黑。

2D经纬图而非TextureCube。反射方向绕Y按ENV_ROTATION角度旋转，u=1−(atan2(dir.x,dir.z)/(2π)+0.5)，v=acos(clamp(dir.y,−1,1))/π。显式mip=saturate(roughness²)×max(MIP_COUNT−1,0)。解码直接RGB×A×max(RGBM_RANGE,0)，没有在此函数sRGB解码；保持线性RGBM编码，不能导出普通无Alpha RGB。最后按DESATURATION与亮度混合。

**源码：** [20. EnvTexture / RGBM环境反射采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1556-L1600)。范围仅限固定Endfield MME实现，保留原始编码和对应材质开关，不代表原游戏全版本。

## 21. ManualMatcapTexture / 手工LOD图集 {#map-manual-matcap}

**R怎么用：** R为对应LOD的sRGB反射颜色红分量，取样后转换到线性。

**G怎么用：** 同上绿色分量。

**B怎么用：** 同上蓝色分量。

**A怎么用：** 只取.rgb，A未消费，不是LOD索引。

启用MATCAP_MANUAL_LOD时改读此图，不再读普通MatcapTexture。视图法线XY映射(0.5,−0.5)+0.5。LOD由roughness×(1.7−0.7roughness)×LOD_COUNT×LOD_SCALE+BIAS或OVERRIDE决定；Clamp到合法等级。图集mipScale=2^−floor(level)，level0在左侧，其他级在右侧逐级缩小；坐标u=(offsetX+safeU×mipScale)/1.5，v=offsetY+safeV×mipScale，offsetX=level0?0:1，offsetY=level0?0:1−2mipScale。safeUV按每级半像素内缩，实际采样显式mip0；lower/upper级先sRGB解码再按frac(LOD)混合。不能把图集当普通球面图缩放。

**源码：** [21. ManualMatcapTexture / 手工LOD图集采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1603-L1673)。范围仅限固定Endfield MME实现，保留原始编码和对应材质开关，不代表原游戏全版本。

## 22. FacialMainTexture / 虹膜、眼白与面部覆盖层 {#map-facial-main}

**R怎么用：** RGB颜色红分量，普通分支sRGB解码并调色，眼白分支进入EyeWhiteEvaluate。

**G怎么用：** 同上绿色分量。

**B怎么用：** 同上蓝色分量。

**A怎么用：** USE_TEXTURE_ALPHA开启时乘材质A成为coverage；IRIS_ENABLED时另进入虹膜亮度插值，不自动作为最终透明度。

使用原UV；虹膜开启时先EfEyeIrisParallaxUv修改sampleUv，Clamp。coverage=saturate(材质A)，可乘saturate(贴图A)，clip(coverage−ALPHA_CUTOFF)。虹膜Alpha发光启用时按A在BASE_BRIGHTNESS和HIGHLIGHT_BRIGHTNESS间插值，再除BASE_BRIGHTNESS（下限0.0001），所以增加A不一定增加亮度，需比较两端。普通非Overlay最终输出A=1；Overlay输出saturate(coverage×OVERLAY_ALPHA×sideFade×depthFade)并裁剪，另有头部侧向和深度门控。同一绑定不能概括为“A全是透明度”。

**源码：** [22. FacialMainTexture / 虹膜、眼白与面部覆盖层采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_facial.hlsl#L274-L342)。范围仅限固定Endfield MME实现，保留原始编码和对应材质开关，不代表原游戏全版本。

## 23. EyeCaptureMaterial / EyeCaptureIris 捕获源图 {#map-eye-capture-source}

**R怎么用：** R乘材质RGB；虹膜可由独立IrisTexture覆盖PMX材质图，然后进行虹膜调色。

**G怎么用：** 同上G颜色。

**B怎么用：** 同上B颜色。

**A怎么用：** 虹膜gradeIris时A送AlphaEmission亮度函数；普通feature、sclera、高光的覆盖不乘贴图A，覆盖来自材质A及facing/distance/alphaScale。

use_texture开启，feature的虹膜路径先视差UV，再按IRIS_TEXTURE_RESOURCE覆盖源以保留原虹膜A发光数据。A作为亮度控制时需比较BASE/HIGHLIGHT亮度端点，不能默认越白越亮。Sclera取原UV RGB送EyeWhiteEvaluate；Highlight只取RGB送EyeHlColor。最终clip与输出A来自材质覆盖链，不是源图A。

**源码：** [23. EyeCaptureMaterial / EyeCaptureIris 捕获源图采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_eye_through_capture_core.fxsub#L235-L323)。范围仅限固定MME捕获／后处理路径；运行时RT不是从Diffuse生成并替换的角色资产，数据RT不要sRGB解码。

## 24. HairVisibilityMaterial / 头发深度捕获源 {#map-hair-capture-source}

**R怎么用：** 未消费，捕获不输出贴图颜色。

**G怎么用：** 未消费。

**B怎么用：** 未消费。

**A怎么用：** use_texture时取A乘saturate(材质A)，clip(coverage−0.01)；低于0.01不写头发深度。

原头发UV，仅取材质图A。幸存片元将投影深度z/abs(w)饱和并打包到RGB，输出A=1。A=1表示有效深度而非原头发透明度；不要把捕获源图与产生的RT混为一谈。

**源码：** [24. HairVisibilityMaterial / 头发深度捕获源采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_hair_visibility_capture_core.fxsub#L44-L59)。范围仅限固定MME捕获／后处理路径；运行时RT不是从Diffuse生成并替换的角色资产，数据RT不要sRGB解码。

## 25. HairVisibility_RT / FaceDepth_RT 打包深度 {#map-packed-depth-rt}

**R怎么用：** R为深度高位，参与decode=R+G/255+B/65025。

**G怎么用：** G为进位校正后的第二分量。

**B怎么用：** B为第三精度分量，不是颜色或法线。

**A怎么用：** 捕获时有效像素写1；消费时A≥0.5才视为有效捕获，不是深度本身。

编码p=frac(depth×(1,255,65025))，p.xy−=p.yz/255；depth=saturate(clipZ/max(abs(clipW),0.000001))。深度=1在frac编码会绕到0，这是所引实现真实边界，不能称其为无损任意深度存储。消费以源屏幕UV解码RGB、检查A及屏幕范围，比较sourceDepth≤capturedDepth+tolerance，失败可clip。[消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L2517-L2559)。Hair RT以coverage裁剪后写深度；Face RT按指定脸几何写深度，两个RT不是普通贴图。

**源码：** [25. HairVisibility_RT / FaceDepth_RT 打包深度采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face_depth_capture_core.fxsub#L23-L35)。范围仅限固定MME捕获／后处理路径；运行时RT不是从Diffuse生成并替换的角色资产，数据RT不要sRGB解码。

## 26. 共享ShadowViewport / 阴影与外部深度输入 {#map-shadow-viewport-rt}

**R怎么用：** 衣服／脸／皮肤ZMD和通用HgShadow路径取R为shadowAmount，visibility=1−saturate(R)，值越大通常更遮挡。

**G怎么用：** FacialOverlayDepth专用绑定取G为相机距离深度；depthDelta=max(featureDistance−G−bias,0)，再用1−smoothstep淡出。

**B怎么用：** 所核对这些阴影／OverlayDepth路径不消费B；不推断外部producer的其他定义。

**A怎么用：** 所核对这些路径不消费A；不是透明度。

共享外部RT，屏幕NDC映射(u=(1+x)/2,v=(1−y)/2)并加半像素偏移。不同接口不能互换：R是阴影量，G是距离深度。RT有效性失败时返回全可见；Overlay G≤0.0001也fail-open，避免黑RT删除整层眼眉。[衣服R](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1680-L1696)、[通用R](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1048-L1058)。这里只核对consumer，不虚构未提供的外部RT生产通道。

**源码：** [26. 共享ShadowViewport / 阴影与外部深度输入采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_facial.hlsl#L238-L270)。范围仅限固定MME捕获／后处理路径；运行时RT不是从Diffuse生成并替换的角色资产，数据RT不要sRGB解码。

## 27. PostSceneMap / PostToneMap 场景颜色RT {#map-post-scene-rt}

**R怎么用：** Scene.R为显示编码场景红分量，Bloom和Composite先sRGB→线性；ToneMap.R存合成、分级和色调映射后的线性红色。

**G怎么用：** 同上绿色分量。

**B怎么用：** 同上蓝色分量。

**A怎么用：** Scene.A在Composite直接传到ToneMap.A；Final再取ToneMap.A原样输出，没有作为Bloom遮罩。

视口比例1×1的运行时RT、Clamp，屏幕UV加半像素偏移。Composite将Scene解码线性RGB+BloomUp0线性RGB×Intensity×Tint后一起色调映射，不是映射后再加Bloom。Final对ToneMapRGB自适应锐化，再LinearToSrgb、saturate、抖动，A保持原值。ModeOriginal/BloomView会替换RGB，但仍传A。

**源码：** [27. PostSceneMap / PostToneMap 场景颜色RT采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_post.fxsub#L593-L622)。范围仅限固定MME捕获／后处理路径；运行时RT不是从Diffuse生成并替换的角色资产，数据RT不要sRGB解码。

## 28. PostBloom0…4 / Blur / Up0…3 泛光RT {#map-post-bloom-rt}

**R怎么用：** R存各级线性红色泛光贡献。

**G怎么用：** G存线性绿色泛光贡献。

**B怎么用：** B存线性蓝色泛光贡献。

**A怎么用：** 各Bloom生成pass写A=1，后续采样只取RGB，A不表示发光遮罩。

11个A16B16G16R16F运行时目标：Bloom0半分辨率、1四分之一、2八分之一、3十六分之一、4三十二分之一；BlurTemp/Blur三十二分之一；Up3…0逐级恢复。Bloom0由SceneRGB线性化后13点Karis采样与软阈值产生；后续9点降采样、水平/垂直模糊、Tent升采样，合并high+low×Scatter。阈值brightness=max(dot(RGB,(0.2126,0.7152,0.0722)),max(RGB)×0.65)，不是贴图A或单R判断。所有采样Clamp；HDR浮点范围不应压成8位。

**源码：** [28. PostBloom0…4 / Blur / Up0…3 泛光RT采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_post.fxsub#L130-L322)。范围仅限固定MME捕获／后处理路径；运行时RT不是从Diffuse生成并替换的角色资产，数据RT不要sRGB解码。

## 29. PostDepthBuffer / 深度模板目标 {#map-post-depth-buffer}

**R怎么用：** D24S8深度模板格式，不存在普通RGBA颜色R语义。

**G怎么用：** 同上，不是第二颜色通道。

**B怎么用：** 同上，不是第三颜色通道。

**A怎么用：** 没有颜色Alpha；8位S是模板值，不是A透明度。

视口比例1×1，RENDERDEPTHSTENCILTARGET，作为CaptureScene的RenderDepthStencilTarget；该文件没有tex2D采样它。不能给此资源编RGBA生成配方或声称它是深度灰度PNG。颜色Scene/Tone/Bloom RT另见前两节。

**源码：** [29. PostDepthBuffer / 深度模板目标采样与消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_post.fxsub#L71-L101)。范围仅限固定MME捕获／后处理路径；运行时RT不是从Diffuse生成并替换的角色资产，数据RT不要sRGB解码。

## 30. SkinMain / 身体皮肤颜色 {#map-skin-diffuse}

**R怎么用：** R为绘制皮肤颜色红分量，进入显示空间LUT暗色与原绘制色的混合，再sRGB转线性。

**G怎么用：** 同上绿色分量。

**B怎么用：** 同上蓝色分量。

**A怎么用：** SkinMain采样只取.rgb，A未消费；不要套用脸Diffuse.A的AO语义。

使用真实皮肤原UV、Clamp。皮肤亮暗由SkinRd.A及场景阴影决定，SkinMain并不提供一张额外P或AO数据。无贴图时回退材质RGB。专用肤色LUT见颜色LUT章节。

**源码：** [皮肤主色和RD消费](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_skin.hlsl#L419-L478)。范围限固定MME皮肤路径。

## 31. SkinRd / 皮肤色度与亮暗表 {#map-skin-rd}

**R怎么用：** R与G/B一起决定RD色度max(RGB)−min(RGB)，再构成彩色tint；不是直接乘皮肤变红或变暗。

**G怎么用：** 与R/B参与同一色度运算，之后贡献绿色tint。

**B怎么用：** 与R/G参与同一色度运算，之后贡献蓝色tint。

**A怎么用：** A=saturate(rd.a)作为绘制皮肤亮色与LUT暗色的混合权重，同时在DarkStrength与LightStrength之间混合；场景阴影可取min降低该权重。

Clamp、UV=(pow(saturate(N·L×0.5+0.5),max(LIGHT_CURVE,0.0001)),0.5)。RGB先saturate，chroma=max−min，tint=RGB×chroma+1−chroma，再按RD_COLOR_STRENGTH和白色混合；黑/灰/白这些中性RGB的chroma=0，所以不会简单乘暗皮肤。A增大更趋向原Diffuse，不保证更亮（两端颜色/强度由参数决定）。

**源码：** [SkinRd完整公式](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_skin.hlsl#L445-L478)。SkinRd不同于普通衣服RD或头发RD，不共用错误RGB乘色规则。

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

- [材质指南](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/USER_GUIDE_CN.md#L67-L75)
- [衣服实际计算](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1842-L1852)
- [DanbaidongRP实际读取](https://github.com/danbaidong1111/DanbaidongRP/blob/072b375399e4c38d0cad235a7ec513f981fd5676/Shaders/Material/PBRToon/PBRToonBase.shader#L466-L475)
- [RG解包](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L811-L885)
- [Face读取AO](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L969-L975)
- [SDF读取](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L705-L758)
- [摄像机阴影](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L552-L560)
- [SSS](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L602-L621)
- [边缘遮罩](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L861-L876)
- [头发读入](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1231-L1252)
- [衣服路径](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1838-L1844)
- [脸路径](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L765-L788)


- [微软 DirectXTex / texconv 下载](https://github.com/microsoft/DirectXTex/releases)
- [Blender UV 布局导出说明](https://docs.blender.org/manual/en/latest/addons/import_export/mesh_uv_layout.html)

### 外部贴图示例

MME仓库包含[真实脸SDF](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/textures/common/T_actor_common_female_face_01_SDF.png)、[真实cm_M](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/textures/common/T_actor_common_female_face_01_cm_M.png)和[RD色带](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/textures/common/T_actor_common_face_01_RD.png)。但作者的[资产许可边界](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/ASSET_LICENSE_BOUNDARY_CN.md)明确不授予这些游戏命名纹理的MIT权利，因此这里只链接原仓库，不把原文件或拆出的通道再分发。

真实SDF能看到大面积方向渐变而非普通鼻子投影；cm_M能看到彼此不同的脸部控制区域。下面本地图片是标明占位/预设的原创图，不能把它们当成这两张真实资产的复原。

## 导入器别名与消费端边界 {#importer-aliases}

以下核对Gacha Setup固定版本的分类/JSON绑定代码：**导入器找到图片，只能证明图片被分配给某个节点，不能证明通道含义与HoyoToon或MME相同**。模糊文件名、角色特例、材质分支仍须看实际消费节点。

| 导入槽或属性 | 对应说明 | 核对源码 |
| --- | --- | --- |
| `_D` | [消费端与通道边界](#map-diffuse) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |
| `_N` | [消费端与通道边界](#map-normal) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |
| `_P` | [消费端与通道边界](#map-community-property) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |
| `_E` | [消费端与通道边界](#map-diffuse) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |
| `_M` | [消费端与通道边界](#map-microdetail) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |
| `_HN` | [消费端与通道边界](#map-hairnormal) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |
| `_ST` | [消费端与通道边界](#map-hairst) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |
| `_RS` | [消费端与通道边界](#map-rs) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |
| `_RD` | [消费端与通道边界](#map-rd) | [固定版本绑定](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2410-L2453) |

AKE的`_M`只是mask/disturb的模糊匹配后缀，具体应区分cm_M、hl_M、hairline_M及雨水图。`_E`匹配emission/emissive属性；[PBRToonBase的E消费链](#map-ake-emission)已核实，仍不代表所有材质E都共用此规则。

**导入颜色空间并不统一：**顶层图像匹配将RS/P/HN/M/ST/LUT等设为Non-Color，其他设sRGB（RD未在此列表中）；内部节点替换另把RD设Non-Color。两分支对RD可能不同，且原AKE PBRToonBase里的RS图片可能保存为sRGB。文档的MME线性RS与各材质RD定义不能冒充所有AKE导入状态。Alpha mode设CHANNEL_PACKED也不证明Alpha一定用于透明度。[顶层颜色空间](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2491-L2512)、[内部替换分支](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2514-L2537)。

## AKE E / 额外发光颜色 {#map-ake-emission}

仅适用于固定AKE `Arknights: Endfield_PBRToonBase`：cloth/head/wing/wpn等E图片的Color接Socket_6，Alpha输出未连接；不是MME Diffuse.A发光强度契约。消费链为E→转接→MULTIPLY(Emission Color)→ADD(当前底色)→可选RS效果→色相调整→ShaderOutput的颜色输入→最终Result。UV来自材质图片节点，具体UV/缩放由该节点连接决定，非全局表布局。

**R怎么用：** 线性发光红分量，乘Emission Color.R后追加；正参数下提高R追加红色能量。

**G怎么用：** 线性发光绿分量，同样逐通道相乘/追加。

**B怎么用：** 线性发光蓝分量，不是AO或金属度。

**A怎么用：** 图片Alpha输出没有连接；透明度另由ShaderOutput的Alpha输入决定，不从E.A取值。

组输入标为Non-Color，但导入器顶层默认可能将E设sRGB，应核对实际节点/图片导入状态，不把标签当执行证明。自定义引擎节点在普通Blender可能为NodeUndefined，以上核实的是连接与数学节点，不宣称完整引擎渲染通过。

源码：[固定AKE节点资产](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/shaders/ake/AKE.blend)，[紧凑节点拓扑](/data/texture-channel-evidence/endfield-extra.json)。

## AKE M / RS颜色调制 {#map-ake-rs-mask}

同一PBRToonBase的M.Color接Socket_15，分两路：`M×当前RS颜色`与`M×RS ColorTint`；RS Model选择两路结果，再经RS Multiply Value控制LIGHTEN混合，Use RS_Eff开关决定是否选该效果。不是衣服Property，也不能把所有后缀M写成同一遮罩。

**R怎么用：** 调制RS红分量或Tint红分量；正参数下0压掉该路红，1保留原幅度，是否影响最终图像还取决于开关和LIGHTEN的另一颜色。

**G怎么用：** 同上，绿色响应调制；不是法线Y。

**B怎么用：** 同上，蓝色响应调制；不是AO。

**A怎么用：** 图片Alpha未连接，不控制透明度。

消费端为Non-Color数据；实际匹配颜色空间需检查导入器。M没有固定一维/二维查表行，不凭Diffuse推断精确RS响应。

源码：[固定AKE节点资产](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/shaders/ake/AKE.blend)，[紧凑节点拓扑](/data/texture-channel-evidence/endfield-extra.json)。

## AKE CsutmMask / 两处脸部自定义遮罩 {#map-ake-custom-face-mask}

这是同一个保存为Non-Color的自定义图在Face组中被两次采样，并非已证明的原生导出纹理类型。第一处Color→SeparateXYZ005；第二处Color→SeparateXYZ006。每次采样坐标都应保留对应图像节点连接，不能假设两次同UV。精确数学操作见下载证据的数字节点ID。

**R怎么用：** 第一处R接GREATER_THAN的**第二操作数**Value_001（阈值），第一操作数来自颜色渐变经B混合白色再Color→float转换。提高R使`value>R`更难通过；不要误写R是被测输入或“越白越保留”。第二处R没有输出连接。

**G怎么用：** 第一处G未连接；第二处G为GREATER_THAN的第一操作数，阈值0.5。G>0.5切换颜色分支与发光强度系数，系数约从1.15变1.30（之后还经过其它因子），不是透明度。

**B怎么用：** 第一处B为Mix的Factor，将颜色渐变混向白色，结果转换标量作为上述R比较的被测输入；B增加改变测试值，不是单独粗糙度。第二处B未连接。

**A怎么用：** 两个图像节点Alpha输出均未连接，非透明度契约。

R比较的布尔结果又作为LESS_THAN的第二操作数，随后SUBTRACT/ADD/MAXIMUM及其它阴影链共同决定脸部输出；不可把它简化成独立的白黑剪裁。特殊引擎节点未运行，因此只报告节点拓扑和比较方向，不报告原生游戏效果。

以上三个分区来源：[固定AKE节点资产](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/shaders/ake/AKE.blend)、[E/M导入匹配与颜色空间](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/texture_import_setup/game_texture_importers.py#L2426-L2512)。紧凑节点证据：[下载JSON](/data/texture-channel-evidence/endfield-extra.json)。

## AKE图像节点覆盖账本 {#ake-image-ledger}

对固定AKE资产审计中的全部图像节点逐项分类，保留节点所在树、索引、保存的颜色空间和接出的Color/Alpha插槽。相同后缀或图名不代表跨材质消费契约一致；账本链接到对应分区，其中MME与AKE差异仍以分区范围为准。没有加载原贴图像素，也没有声称自定义引擎节点已渲染通过。

| 观察到的类型 | 对应说明 | 图像节点数量 |
| --- | --- | --- |
| `D` | [适用范围与通道说明](#map-diffuse) | 6 |
| `E` | [适用范围与通道说明](#map-ake-emission) | 5 |
| `FGD` | [适用范围与通道说明](#map-fgd) | 2 |
| `M` | [适用范围与通道说明](#map-ake-rs-mask) | 5 |
| `N` | [适用范围与通道说明](#map-normal) | 6 |
| `P` | [适用范围与通道说明](#map-community-property) | 5 |
| `RD` | [适用范围与通道说明](#map-rd) | 7 |
| `RS` | [适用范围与通道说明](#map-rs) | 2 |
| `custom-face-mask` | [适用范围与通道说明](#map-ake-custom-face-mask) | 2 |
| `effect-matcap` | [适用范围与通道说明](#map-matcap) | 1 |
| `face-D` | [适用范围与通道说明](#map-face-diffuse) | 3 |
| `face-control` | [适用范围与通道说明](#map-cmm) | 1 |
| `face-sdf` | [适用范围与通道说明](#map-sdf) | 1 |
| `hair-HN` | [适用范围与通道说明](#map-hairnormal) | 1 |
| `hair-P` | [适用范围与通道说明](#map-hairproperty) | 1 |
| `iris-D` | [适用范围与通道说明](#map-facial-main) | 2 |
| `iris-matcap05` | [适用范围与通道说明](#map-eye-matcap05) | 1 |
| `iris-matcap07` | [适用范围与通道说明](#map-eye-matcap07) | 1 |
| `lip-highlight` | [适用范围与通道说明](#map-lip-highlight) | 1 |
| `rain-common` | [适用范围与通道说明](#map-microdetail) | 4 |
| `skin-D` | [适用范围与通道说明](#map-skin-diffuse) | 1 |

源码：[固定版本AKE资产](https://github.com/PaoloESAN/gacha-setup/blob/3e40423dbec489368696c4f89a2bfb285662cdc1/setup_wizard/shaders/ake/AKE.blend)；[完整图像节点账本](/data/texture-channel-evidence/endfield-image-ledger.json)。此账本覆盖58个图像节点／53个观察名称；泛化导入器接受的任意图片和其它版本不计作已验证。
