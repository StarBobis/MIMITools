# 六游戏贴图图解：来源与检查记录

通道解释与提示词已经直接写进各游戏页，不再要求读公共基础篇：[原神](../../../games/gimi/TextureChannelGuide/TextureChannelGuide.md) · [星穹铁道](../../../games/srmi/TextureChannelGuide/TextureChannelGuide.md) · [崩坏三](../../../games/himi/TextureChannelGuide/TextureChannelGuide.md) · [绝区零](../../../games/zzmi/TextureChannelGuide/TextureChannelGuide.md) · [鸣潮](../../../games/wwmi/TextureChannelGuide/TextureChannelGuide.md) · [终末地](../../../games/efmi/TextureChannelGuide/TextureChannelGuide.md)。

## 本轮交付

- 六篇独立教程，71个逐贴图分区与71段完整指令。普通控制图指令包括RGBA用途、低高值方向、已确认阈值、明确练习预设、尺寸/UV/输出规则；默认只上传一张Diffuse，没有`<image1>/<image2>`或要求原LightMap输入。
- 60组原创逐贴图图解，每组原图、四通道灰度图、overview；另有3组PrimoToon实际资源原图/通道图，以及9张数值方向图，合计387张本轮PNG。
- 图像处理用本机已有texconv 2024.6.5.1。转换后通道逐像素核对，R/G/B/A灰度层都完全等于原RGBA相应分量；不是只改文件名或用截图代替通道。
- 公共篇有用的色彩空间、UV、格式和检查步骤迁入各游戏页；侧栏移除必读公共入口。旧URL只留六游戏跳转目录，避免旧链接突然404。

## 仓库里有哪些图，为什么不能都放进本站？

实际清点固定提交的完整文件树：

- HoyoToon `d9e5ca2f312bf16fba89dee67d32c08b482dcda4`有30个PNG，主要为Resources/UI装饰，不是六套角色纹理。
- PrimoToon `12d42095035edf879a45b3e7a679a6ab86fc081d`有法线占位、MetalMap和Specular Ramp等实际资源。其README Rules说明可带来源链接再分发，GPL-3.0；本站原神页保留来源归属和输出哈希。它们不能替代HoyoToon源码契约，也不是某角色完整贴图。
- Endfield MME `f9e90932a25678101e3e28a8d91663fa0706a4ed`有SDF、cm_M、RD等示例，已下载并查看；[资产许可边界](https://github.com/chris0214/Arknights-Endfield-MME-Shader/blob/f9e90932a25678101e3e28a8d91663fa0706a4ed/ASSET_LICENSE_BOUNDARY_CN.md)明确游戏命名纹理不自动受MIT授权，因此只链接原仓库，不复制或提交派生通道。
- HI3-Toon-old主要只有black占位图；Jonn仅有二进制blend且没有许可说明，不作为独立已审计通道图来源。
- DanbaidongRP有GUI色带和渲染截图，但采用Unity Companion License且属独立管线；gacha-setup主要为角色/界面截图，不能拆成游戏控制通道的证据。

## 保留的关键源码修正

原神R金属候选227起、普通高光关闭230起；A重叠边界102由后判断选组4。星铁B是高光门槛/范围，不只是强度；A255产生索引8。崩坏三Part2软硬分支B方向相反。绝区零辅助发光重映射0～51无贡献。鸣潮TypeMask完整计算0～127普通、128～229丝袜、230～255皮肤。终末地MME衣服BA顺序与旧社区表相反，头发HN的BA也是法线。

这些区间已用float32按源码顺序计算0～255；不是原游戏内渲染测试。固定引用与完整文件哈希见[来源清单](./sources.json)，本轮正文146处固定引用（含各分区旁的重复定位链接）、82个唯一记录。

## 检查方法

- 检查71段指令的单Diffuse输入、完整通道规则、独立分区锚点及资源链接。
- 检查387张PNG的尺寸、SHA256以及texconv拆分后的像素一致性。
- 查看全部60组图解总览与3组实际资源图；修正示意与提示词不一致之处，小尺寸Ramp只在展示图中放大，原数据尺寸不变。
- 完整VitePress生产构建与浏览器阅读检查：现有5173文档服务来自同一仓库，检查六页图片加载、提示词多行显示、复制和手机宽度。

## 不能靠提示词补出来的部分

仅有Diffuse无法唯一确定原角色材质ID、SDF方向场、几何法线、双法线soft方向和LUT参数。SDF或未知通道明确给的是非还原占位；LUT和未确认资产给的是停止猜测的处理指令，不用RGBA常量冒充可替换成品。71段指令并非71种已证明可单Diffuse还原的贴图。

没有执行这些指令的ChatGPT Image质量测试，也没有完成六游戏全角色实机A/B渲染。本轮图片是原创示意或带来源的仓库实际资源，不是生成模型测试输出；精确数值、Alpha、UV、绑定和真实渲染仍需验收。
