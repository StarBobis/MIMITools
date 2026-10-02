# 明日方舟：终末地：逐贴图通道图解与完整生成提示词

这页可以单独使用。先上传一张自己的Diffuse颜色图到ChatGPT Image等支持图像输入的模型，再复制目标贴图下面的**完整提示词**。不需要上传第二张LightMap，也不用读另一篇基础文章才能知道怎么用。

**先分清两件事：**通道规则来自指定复刻Shader；下面按皮肤、布料、饰件给的数字是明确的生成练习预设，不是从该角色解包得到的原值。提示词写得完整可以减少歧义，但不能保证模型逐像素保持UV或精确执行RGBA。

本页用“原图/四通道图 → 看图说明 → 每通道数值 → 完整提示词”讲解。教学图都是程序绘制、texconv拆通道的示意，不冒充游戏解包或模型实测。

本页MME约定依据固定提交 `f9e90932a25678101e3e28a8d91663fa0706a4ed`。这是MMD/MME复刻，不是可直接安装进终末地的Shader；社区BA表与该MME不同，必须按各自布局使用。

## 找到你要生成的贴图

- [DiffuseMap / 颜色图](#map-diffuse)
- [衣服 Property / MME属性图](#map-property)
- [社区 BA 相反的属性图](#map-community-property)
- [衣服 NormalMap / RG法线](#map-normal)
- [脸部 Diffuse / Alpha AO](#map-face-diffuse)
- [脸 cm_M / 控制图](#map-cmm)
- [头发 HN / 双法线](#map-hairnormal)
- [头发 Property / P](#map-hairproperty)
- [FaceMap / 脸部方向阴影图](#map-sdf)
- [Ramp / 漫反射色带](#map-ramp)
- [MatCap / 球面外观图](#map-matcap)
- [发丝线 / 雨水 / 微细节控制图](#map-microdetail)
- [LUT / 参数查表图](#map-lut)
- [RD / 明暗混合色带](#map-rd)
- [RS / 高光查表](#map-rs)

## 这页怎样读

- 数据值用0～255；线性UNORM中除以255得到0～1。字节128约0.502，若RGB被sRGB解码则约0.216，不能对控制图做自动Gamma或美化。Alpha通常不经过sRGB转换，仍要核对加载路径。
- 灰度白只意味着数值大：乘子、反向遮罩、材质ID、方向数据的“白”含义不同。下面逐图解释，不用一条规则概括。
- 只上传Diffuse时，材质分类是猜测。裸金属、丝袜、发光区域最好在文字里指出；不明区域有保守默认值，但它不恢复原角色ID。
- 合成预览可能受Alpha显示影响；灰度A图是真正的第四通道。下载各层后用取色器看字节，不靠预览颜色判断。

## 仓库里确实有这些真实示例

MME仓库包含[真实脸SDF](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/textures/common/T_actor_common_female_face_01_SDF.png)、[真实cm_M](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/textures/common/T_actor_common_female_face_01_cm_M.png)和[RD色带](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/textures/common/T_actor_common_face_01_RD.png)。但作者的[资产许可边界](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/ASSET_LICENSE_BOUNDARY_CN.md)明确不授予这些游戏命名纹理的MIT权利，因此这里只链接原仓库，不把原文件或拆出的通道再分发。

真实SDF能看到大面积方向渐变而非普通鼻子投影；cm_M能看到彼此不同的脸部控制区域。下面本地图片是标明占位/预设的原创图，不能把它们当成这两张真实资产的复原。

## 1. DiffuseMap / 颜色图 {#map-diffuse}

先看输入的蓝色衣片：颜色图里它就该是蓝色，R/G/B是颜色分量。到了控制图，同一片蓝布可能变成红橙色，那不是改了衣服颜色，而是几个控制值叠在一起。

![明日方舟：终末地 DiffuseMap / 颜色图 输入、输出与四通道示意](./assets/maps/diffuse/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/diffuse/diffuse.png) · [R灰度层](./assets/maps/diffuse/diffuse-r.png) · [G灰度层](./assets/maps/diffuse/diffuse-g.png) · [B灰度层](./assets/maps/diffuse/diffuse-b.png) · [A灰度层](./assets/maps/diffuse/diffuse-a.png)

**R怎么用：** R是基础颜色红分量，0最低、255最高。

**G怎么用：** G是基础颜色绿分量，0最低、255最高。

**B怎么用：** B是基础颜色蓝分量，0最低、255最高。

**A怎么用：** A用途由材质决定，单张Diffuse不能推断透明、发光或ID。

颜色分量不是金属、高光或AO；不要增加新的方向光、投影和高光。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成DiffuseMap / 颜色图的颜色贴图草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是基础颜色红分量，0最低、255最高；G是基础颜色绿分量，0最低、255最高；B是基础颜色蓝分量，0最低、255最高；A用途由材质决定，单张Diffuse不能推断透明、发光或ID。本次明确采用的生成预设：本次生成同UV、不透明Diffuse颜色草稿：R/G/B按我给出的新配色修改，未指定改色时保留上传图的RGB颜色；A固定255，不猜透明、发光或材质ID。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 2. 衣服 Property / MME属性图 {#map-property}

**对应代码：** [衣服实际计算](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1842-L1852)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![明日方舟：终末地 衣服 Property / MME属性图 输入、输出与四通道示意](./assets/maps/property/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/property/property.png) · [R灰度层](./assets/maps/property/property-r.png) · [G灰度层](./assets/maps/property/property-g.png) · [B灰度层](./assets/maps/property/property-b.png) · [A灰度层](./assets/maps/property/property-a.png)

**R怎么用：** R金属度0非金属255金属端，受强度控制。

**G怎么用：** G反射率权重增大通常更强，0仍不保证所有层无反射，非离散类型。

**B怎么用：** B AO低值更遮蔽、255不额外遮蔽，高光AO可能用0.5+0.5B。

**A怎么用：** A光滑度，roughness=max((1−A)×强度,0.04)，强度1时245起到下限，不是完美镜面。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成衣服 Property / MME属性图的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R金属度0非金属255金属端，受强度控制；G反射率权重增大通常更强，0仍不保证所有层无反射，非离散类型；B AO低值更遮蔽、255不额外遮蔽，高光AO可能用0.5+0.5B；A光滑度，roughness=max((1−A)×强度,0.04)，强度1时245起到下限，不是完美镜面。本次明确采用的生成预设：仅MME布局练习：普通布RGBA(0,100,255,40)、光滑饰件(0,100,255,140)、裸金属(255,180,255,180)、未知(0,100,255,40)，明确结构缝隙只把B降230。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

![衣服A光滑度与粗糙度示意](./assets/smoothness-values.png)

## 3. 社区 BA 相反的属性图 {#map-community-property}

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![明日方舟：终末地 社区 BA 相反的属性图 输入、输出与四通道示意](./assets/maps/community-property/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/community-property/community-property.png) · [R灰度层](./assets/maps/community-property/community-property-r.png) · [G灰度层](./assets/maps/community-property/community-property-g.png) · [B灰度层](./assets/maps/community-property/community-property-b.png) · [A灰度层](./assets/maps/community-property/community-property-a.png)

**R怎么用：** R声称金属度，确认目标后低非金属高金属。

**G怎么用：** G声称高光类型，但无固定源码阈值定义，不能从Diffuse恢复。

**B怎么用：** B该社区布局是光滑度，低粗高滑。

**A怎么用：** A该社区布局是AO，低更遮蔽高保留。

### 完整占位生成提示词（非角色还原）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成社区 BA 相反的属性图的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R声称金属度，确认目标后低非金属高金属；G声称高光类型，但无固定源码阈值定义，不能从Diffuse恢复；B该社区布局是光滑度，低粗高滑；A该社区布局是AO，低更遮蔽高保留。本次明确采用的生成预设：仅已确认社区布局的占位练习：R非金属0裸金属255，G0未知类型占位，B布40金属180，A255；不是MME图，不保证G0兼容。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 4. 衣服 NormalMap / RG法线 {#map-normal}

**对应代码：** [RG解包](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L811-L885)

看R和G里的细小变化，方向信息藏在这些梯度里，而不是藏在“蓝紫色外观”里。平坦区域约128；从128向两侧偏移表示向不同切线方向倾斜，不是越白越凸。

![明日方舟：终末地 衣服 NormalMap / RG法线 输入、输出与四通道示意](./assets/maps/normal/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/normal/normal.png) · [R灰度层](./assets/maps/normal/normal-r.png) · [G灰度层](./assets/maps/normal/normal-g.png) · [B灰度层](./assets/maps/normal/normal-b.png) · [A灰度层](./assets/maps/normal/normal-a.png)

**R怎么用：** R编码切线法线X：0负方向、128附近零偏转、255正方向。

**G怎么用：** G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader。

**B怎么用：** B该RG解包未使用，不能当粗糙度。

**A怎么用：** A该RG解包未使用，不能当AO。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成衣服 NormalMap / RG法线的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；B该RG解包未使用，不能当粗糙度；A该RG解包未使用，不能当AO。本次明确采用的生成预设：平坦RGBA(128,128,0,255)，只指定结构作浅XY变化；BA占位，不替代原角色未知数据。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。法线细节仅来自我明确指出的浅缝线、压边、扣件和发丝结构，不把Diffuse明暗转成高度，不新增织物噪点；XY解码为2×值/255−1，保持X²+Y²≤1并按目标定义重建或填写Z，不能把方向极值当凹凸强度。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 5. 脸部 Diffuse / Alpha AO {#map-face-diffuse}

**对应代码：** [Face读取AO](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L969-L975)

先看输入的蓝色衣片：颜色图里它就该是蓝色，R/G/B是颜色分量。到了控制图，同一片蓝布可能变成红橙色，那不是改了衣服颜色，而是几个控制值叠在一起。

![明日方舟：终末地 脸部 Diffuse / Alpha AO 输入、输出与四通道示意](./assets/maps/face-diffuse/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/face-diffuse/face-diffuse.png) · [R灰度层](./assets/maps/face-diffuse/face-diffuse-r.png) · [G灰度层](./assets/maps/face-diffuse/face-diffuse-g.png) · [B灰度层](./assets/maps/face-diffuse/face-diffuse-b.png) · [A灰度层](./assets/maps/face-diffuse/face-diffuse-a.png)

**R怎么用：** R是脸部颜色红分量，0最低255最高，RGB按sRGB转线性。

**G怎么用：** G是脸部颜色绿分量，0最低255最高。

**B怎么用：** B是脸部颜色蓝分量，0最低255最高，不能把RGB绘制明暗直接当AO。

**A怎么用：** A是Face链AO：正指数时低更暗255保留1；200指数1约78.4%、指数2约61.5%。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成脸部 Diffuse / Alpha AO的颜色贴图草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是脸部颜色红分量，0最低255最高，RGB按sRGB转线性；G是脸部颜色绿分量，0最低255最高；B是脸部颜色蓝分量，0最低255最高，不能把RGB绘制明暗直接当AO；A是Face链AO：正指数时低更暗255保留1；200指数1约78.4%、指数2约61.5%。本次明确采用的生成预设：RGB按用户颜色修改保留眼鼻嘴；A普通255、明确结构遮蔽230，弱过渡；仅Face链练习，不外推独立Skin只读RGB路径。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只修改我指定的配色，未指定处保留上传Diffuse的颜色和绘制细节。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 6. 脸 cm_M / 控制图 {#map-cmm}

**对应代码：** [摄像机阴影](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L552-L560) · [SSS](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L602-L621) · [边缘遮罩](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L861-L876)

脸图和身体图不能共用解释。图中常量只是把每个通道的位置拆给你看，不代表脸的方向阴影已经恢复；眼鼻嘴的对应关系、视角和材质分支都很重要。

![明日方舟：终末地 脸 cm_M / 控制图 输入、输出与四通道示意](./assets/maps/cmm/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/cmm/cmm.png) · [R灰度层](./assets/maps/cmm/cmm-r.png) · [G灰度层](./assets/maps/cmm/cmm-g.png) · [B灰度层](./assets/maps/cmm/cmm-b.png) · [A灰度层](./assets/maps/cmm/cmm-a.png)

**R怎么用：** R为SSS乘子0关闭该项255最大纹理权重。

**G怎么用：** G在SSS链减弱视角限制、诊断链混SDF/几何、摄像机阴影链提高接收，非统一明暗刻度。

**B怎么用：** B摄像机阴影区域乘子0无这项区域、增大允许更多阴影，最终max(G,区域×B)。

**A怎么用：** A边缘光权重0抑制255最大，另受光侧/视角/宽度限制。

### 完整占位生成提示词（非角色还原）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成脸 cm_M / 控制图的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R为SSS乘子0关闭该项255最大纹理权重；G在SSS链减弱视角限制、诊断链混SDF/几何、摄像机阴影链提高接收，非统一明暗刻度；B摄像机阴影区域乘子0无这项区域、增大允许更多阴影，最终max(G,区域×B)；A边缘光权重0抑制255最大，另受光侧/视角/宽度限制。本次明确采用的生成预设：非还原性无附加效果占位RGBA(0,0,0,0)，或用户明确启用SSS时脸区R128；不从Diffuse推断原相机遮罩与轮廓场。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 7. 头发 HN / 双法线 {#map-hairnormal}

**对应代码：** [头发读入](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1231-L1252)

看R和G里的细小变化，方向信息藏在这些梯度里，而不是藏在“蓝紫色外观”里。平坦区域约128；从128向两侧偏移表示向不同切线方向倾斜，不是越白越凸。

![明日方舟：终末地 头发 HN / 双法线 输入、输出与四通道示意](./assets/maps/hairnormal/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/hairnormal/hairnormal.png) · [R灰度层](./assets/maps/hairnormal/hairnormal-r.png) · [G灰度层](./assets/maps/hairnormal/hairnormal-g.png) · [B灰度层](./assets/maps/hairnormal/hairnormal-b.png) · [A灰度层](./assets/maps/hairnormal/hairnormal-a.png)

**R怎么用：** R编码切线法线X：0负方向、128附近零偏转、255正方向。

**G怎么用：** G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader。

**B怎么用：** B是soft法线X：0负128附近零255正，不是Z或AO。

**A怎么用：** A是soft法线Y：0负128附近零255正，不是透明度。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成头发 HN / 双法线的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R编码切线法线X：0负方向、128附近零偏转、255正方向；G编码切线法线Y：0负方向、128附近零偏转、255正方向，最终翻转依Shader；B是soft法线X：0负128附近零255正，不是Z或AO；A是soft法线Y：0负128附近零255正，不是透明度。本次明确采用的生成预设：平坦RGBA(128,128,128,128)，RG仅按明确发丝浅凹凸作弱变化，BA128平滑方向占位；真正soft方向需要几何信息，不能从Diffuse恢复。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。法线细节仅来自我明确指出的浅缝线、压边、扣件和发丝结构，不把Diffuse明暗转成高度，不新增织物噪点；XY解码为2×值/255−1，保持X²+Y²≤1并按目标定义重建或填写Z，不能把方向极值当凹凸强度。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 8. 头发 Property / P {#map-hairproperty}

**对应代码：** [头发读入](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_shader.hlsl#L1231-L1252)

先找图中的衣片和扣件，再分别看R/G/B/A。同一位置在不同通道里的灰度可以完全不同：一层选材质，一层管高光，一层管阴影。不要为了让合成预览“像原衣服”而把四层一起涂。

![明日方舟：终末地 头发 Property / P 输入、输出与四通道示意](./assets/maps/hairproperty/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/hairproperty/hairproperty.png) · [R灰度层](./assets/maps/hairproperty/hairproperty-r.png) · [G灰度层](./assets/maps/hairproperty/hairproperty-g.png) · [B灰度层](./assets/maps/hairproperty/hairproperty-b.png) · [A灰度层](./assets/maps/hairproperty/hairproperty-a.png)

**R怎么用：** R层法线混合，0偏外层球面/soft，255偏regular；可显式sRGB转换，128不一定半权重。

**G怎么用：** G原生高光路径是highlightMask，另一ORM路径是反射率。

**B怎么用：** B通常AO低更遮蔽高保留，按wrapper。

**A怎么用：** A原生链是发丝线控制，ORM链是光滑度，两者没有统一端点解释。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成头发 Property / P的技术数据草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R层法线混合，0偏外层球面/soft，255偏regular；可显式sRGB转换，128不一定半权重；G原生高光路径是highlightMask，另一ORM路径是反射率；B通常AO低更遮蔽高保留，按wrapper；A原生链是发丝线控制，ORM链是光滑度，两者没有统一端点解释。本次明确采用的生成预设：仅独立确认ORM头发练习：R128、G128、B255、A128，明确缝隙B230；原生发丝线链不使用这套预设。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。除上面明确要求的连续阴影或灰度过渡外，每个确认材质区按预设定值填充；材质ID禁止渐变，不要因为白布/黑布就另设控制值。背景和未识别区按本次默认编码，不自行补未给出的游戏规则。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 9. FaceMap / 脸部方向阴影图 {#map-sdf}

**对应代码：** [SDF读取](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L705-L758)

这里故意展示平场占位，而不画一个看起来像鼻影的假SDF。颜色图没有告诉我们每个脸部像素在哪个光向开始转暗；正确方向场需要额外设计或几何信息。

![明日方舟：终末地 FaceMap / 脸部方向阴影图 输入、输出与四通道示意](./assets/maps/sdf/overview.png)

**图中是不能用于脸阴影还原的常量占位，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/sdf/sdf.png) · [R灰度层](./assets/maps/sdf/sdf-r.png) · [G灰度层](./assets/maps/sdf/sdf-g.png) · [B灰度层](./assets/maps/sdf/sdf-b.png) · [A灰度层](./assets/maps/sdf/sdf-a.png)

**R怎么用：** R方向场，与G平均或按诊断选路，增大通常更偏亮面。

**G怎么用：** G另一方向场，与R配套，不能当皮肤绿颜色。

**B怎么用：** B核心未确认用途。

**A怎么用：** A核心未确认用途。

只上传Diffuse无法唯一确定方向场。下面完整指令仅生成标明用途的占位草稿，不是正确SDF生成配方；要重建必须增加几何/光向设计信息。

### 完整占位生成提示词（非角色还原）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成FaceMap / 脸部方向阴影图的占位草稿。生成图片必须与上传Diffuse的像素尺寸、UV岛位置、空白区域、缝线、扣件和所有细条完全对齐，不缩放、镜像、移动或重新排UV。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R方向场，与G平均或按诊断选路，增大通常更偏亮面；G另一方向场，与R配套，不能当皮肤绿颜色；B核心未确认用途；A核心未确认用途。本次明确采用的生成预设：非还原占位RGBA(128,128,0,255)，RG平场没有正确转光阴影，BA占位。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 10. Ramp / 漫反射色带 {#map-ramp}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![明日方舟：终末地 Ramp / 漫反射色带 输入、输出与四通道示意](./assets/maps/ramp/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/ramp/ramp.png) · [R灰度层](./assets/maps/ramp/ramp-r.png) · [G灰度层](./assets/maps/ramp/ramp-g.png) · [B灰度层](./assets/maps/ramp/ramp-b.png) · [A灰度层](./assets/maps/ramp/ramp-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成Ramp / 漫反射色带的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；G是查表颜色绿分量，值增大增加所采样绿贡献；B是查表颜色蓝分量，值增大增加所采样蓝贡献；A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。本次明确采用的生成预设：256×16练习色带：每一行相同，左RGB(45,50,65)、中(150,160,180)、右(255,255,255)，A255，沿X平滑变化、不重排成衣服UV。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 11. MatCap / 球面外观图 {#map-matcap}

这里看的是球面查表外观，不是扣件在UV中的位置。转视角时材质去球面图取样；直接把服装图变成橙色不可能得到正确MatCap。

![明日方舟：终末地 MatCap / 球面外观图 输入、输出与四通道示意](./assets/maps/matcap/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/matcap/matcap.png) · [R灰度层](./assets/maps/matcap/matcap-r.png) · [G灰度层](./assets/maps/matcap/matcap-g.png) · [B灰度层](./assets/maps/matcap/matcap-b.png) · [A灰度层](./assets/maps/matcap/matcap-a.png)

**R怎么用：** R是查表颜色红分量，值增大增加所采样红贡献。

**G怎么用：** G是查表颜色绿分量，值增大增加所采样绿贡献。

**B怎么用：** B是查表颜色蓝分量，值增大增加所采样蓝贡献。

**A怎么用：** A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。

这是查表坐标图，不使用衣服UV；Diffuse只提供配色/风格线索，不能推回原查表参数。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成MatCap / 球面外观图的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R是查表颜色红分量，值增大增加所采样红贡献；G是查表颜色绿分量，值增大增加所采样绿贡献；B是查表颜色蓝分量，值增大增加所采样蓝贡献；A必须按表定义，单Diffuse无法恢复；以下只给不透明练习占位。本次明确采用的生成预设：256×256球面练习图，中心RGB(220,220,220)、边缘(40,40,40)，平滑球面高光，无背景物体；A255，仅用户确认该MatCap路径后试用。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 12. 发丝线 / 雨水 / 微细节控制图 {#map-microdetail}

LUT的一个像素可能就是一个精确参数。它不必有衣服形状，也没有一张图通用的“越白越强”；没有表定义时不能靠生成模型补出可替换文件。

**R怎么用：** R用途依独立噪声、发丝线、雨水或唇高光函数。

**G怎么用：** G没有统一用途定义。

**B怎么用：** B没有统一用途定义。

**A怎么用：** A没有统一用途定义。

这些是不同资产，不是一种统一RGBA图；必须先指出具体绑定，不能从Diffuse恢复全部。

### 单Diffuse输入下的完整处理指令（不伪造替代LUT）

```text
我只上传了这张明日方舟：终末地角色Diffuse颜色图。我想生成发丝线 / 雨水 / 微细节控制图，但你没有目标采样/参数定义。完整规则是：R用途依独立噪声、发丝线、雨水或唇高光函数；G没有统一用途定义；B没有统一用途定义；A没有统一用途定义。只上传Diffuse无法确定该图的采样布局和阈值，因此不生成声称可替换的四通道图，不自行填RGBA常量；需要取得目标Shader、参数或几何信息。不要编RGBA常量或行列，说明还缺哪些尺寸、采样UV、通道和阈值参数；Diffuse只提供颜色和UV，不足以确定这些数据。
```

**拿到结果先看：** 尺寸、UV边界和每通道数值；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 13. LUT / 参数查表图 {#map-lut}

LUT的一个像素可能就是一个精确参数。它不必有衣服形状，也没有一张图通用的“越白越强”；没有表定义时不能靠生成模型补出可替换文件。

**R怎么用：** R依表行列存特定参数，没有全图单调强弱方向。

**G怎么用：** G依表行列存特定参数，不能当统一粗糙度。

**B怎么用：** B依表行列存特定参数，不能当统一AO。

**A怎么用：** A依表行列定义，不能统一填255；缺少布局不生成替代图。

这里不伪造一个固定RGBA值就称能用；有些特殊贴图没有单Diffuse生成解。

### 单Diffuse输入下的完整处理指令（不伪造替代LUT）

```text
我只上传了这张明日方舟：终末地角色Diffuse颜色图。我想生成LUT / 参数查表图，但你没有目标采样/参数定义。完整规则是：R依表行列存特定参数，没有全图单调强弱方向；G依表行列存特定参数，不能当统一粗糙度；B依表行列存特定参数，不能当统一AO；A依表行列定义，不能统一填255；缺少布局不生成替代图。不生成替代图；仅说明缺少的表尺寸、行列和RGBA参数，让用户用编辑器按规范填写。不要编RGBA常量或行列，说明还缺哪些尺寸、采样UV、通道和阈值参数；Diffuse只提供颜色和UV，不足以确定这些数据。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 14. RD / 明暗混合色带 {#map-rd}

**对应代码：** [衣服路径](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_cloth.hlsl#L1838-L1844) · [脸路径](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/EndfieldMME/internal/endfield_face.hlsl#L765-L788)

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![明日方舟：终末地 RD / 明暗混合色带 输入、输出与四通道示意](./assets/maps/rd/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/rd/rd.png) · [R灰度层](./assets/maps/rd/rd-r.png) · [G灰度层](./assets/maps/rd/rd-g.png) · [B灰度层](./assets/maps/rd/rd-b.png) · [A灰度层](./assets/maps/rd/rd-a.png)

**R怎么用：** R色带红分量。

**G怎么用：** G色带绿分量。

**B怎么用：** B色带蓝分量。

**A怎么用：** A混合权重，0偏暗/LUT端、255偏绘制Diffuse亮端。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成RD / 明暗混合色带的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R色带红分量；G色带绿分量；B色带蓝分量；A混合权重，0偏暗/LUT端、255偏绘制Diffuse亮端。本次明确采用的生成预设：256×16，RGB从左(45,50,65)到右(255,255,255)，A从左0到右255连续变化；同一行复制到16行，仅练习，布局不能冒充原RD。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
```

**拿到结果先看：** 尺寸、查表/平铺布局和边缘连续性；再按上面的规则检查Alpha、常量与阈值。模型输出有偏色或渐变时，用通道编辑器精确赋值，不将草稿直接当合格游戏资产。

## 15. RS / 高光查表 {#map-rs}

看横向色带：它按受光坐标查颜色，不是按衣服UV读。四通道图里白色Alpha可能只是占位，也可能控制混合，要看这一种表的定义。

![明日方舟：终末地 RS / 高光查表 输入、输出与四通道示意](./assets/maps/rs/overview.png)

**图中是原创通道练习图，不是游戏原图。** 输入只用来指出位置；图例不应出现在最终生成贴图中。

[原始RGBA图](./assets/maps/rs/rs.png) · [R灰度层](./assets/maps/rs/rs-r.png) · [G灰度层](./assets/maps/rs/rs-g.png) · [B灰度层](./assets/maps/rs/rs-b.png) · [A灰度层](./assets/maps/rs/rs-a.png)

**R怎么用：** R高光查表红。

**G怎么用：** G高光查表绿。

**B怎么用：** B高光查表蓝。

**A怎么用：** A所用链没有统一定义，占位255不声称原值。

### 完整生成提示词（单张Diffuse输入）

```text
请根据我上传的这一张明日方舟：终末地角色DiffuseMap颜色贴图，生成RS / 高光查表的技术数据草稿。这是查表或平铺纹理，不是衣服UV图，按下面指定尺寸和坐标结构输出，不把衣服轮廓放进图里。通道数值采用8位0～255，不做Gamma、自动对比度、美化或预乘Alpha。完整通道规则：R高光查表红；G高光查表绿；B高光查表蓝；A所用链没有统一定义，占位255不声称原值。本次明确采用的生成预设：256×16，RGB由左(0,0,0)到右(255,255,255)，A255，各行相同；只做查表练习。不要把自然衣服颜色、RGB明暗或金色油漆直接当成金属、AO或高光值；只按我文字确认的材质区域分类，无法判断的区域使用上述未知默认值，没有默认时使用本次占位规则而不推断原游戏数据。输出只有目标贴图，不加文字、通道标签、图例、拼图、背景场景、3D渲染或光晕。这是按给定预设生成的候选，不声称从Diffuse恢复角色原通道；不能输出真实Alpha时明确说明，不用白底预览冒充RGBA文件。
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

[图解输出尺寸与SHA256](./assets/map-manifest.json) · [研究记录](../../../newbie/tools/TextureChannelGuide/Review.md)
