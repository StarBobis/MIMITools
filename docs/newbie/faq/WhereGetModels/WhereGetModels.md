# 模型从哪里获取

萌新刚开始想入门做Mod，经常遇到的问题之一就是不知道从哪里搞模型，这里记录一些途径。

- 从各种游戏中解包获取
- 从其它人的Mod中提取
- 自己建模
- MMD模型
- Booth购买
- 恋活里提取
- DEVIANT ART

## PBR模型来源

- DAZ
- CC4
- MetaHuman

## Koikatsu Sunshine

很多作者通过搬运恋活Mod里的模型和衣服，来转换成Mod获取赞助收入。

虽然是流水线行为，但是收入确实不低，每次出新角色都能把之前的再套一遍。

见的比较多，所以特别记录一下，但是其本质已经失去了灵魂，沦为金钱的奴隶。

下载源之一(可能已失效): https://dl.betterrepack.com/public/#list-koikatsu

视频演示(可能已失效): https://www.bilibili.com/list/ml3252187940?oid=113532746073507&bvid=BV1dnB2YbE9s

模型提取到Blender
- mmdtools
- rigify 生成metahuman骨骼
- kkbp  把KK的模型导入Blender
- kkpmx 导出恋活模型
- rokoko 用于映射骨骼，传递动作

恋活的.zipmods格式实际上就是Unity标准格式，改名为.zip然后解压出来的文件夹，直接拖拽到AssetStudio/AssetDaemon之类的软件中就能解包出来模型了

人物模型的话得进游戏提取，因为人物卡里存放的相当于形态键捏模型的偏移数据，并未包含基础模型数据。

## AI生成

自2026年6月起，由于AI技术的成熟，越来越多的作者使用AI生成3D模型了

不过目前2026年9月，生成成本较高，布线没问题但是UV不太好看，相信未来会更好，AI生成3D模型是趋势，特此记录。


