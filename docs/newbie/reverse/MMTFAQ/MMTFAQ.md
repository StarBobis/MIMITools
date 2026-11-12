# MMT常见问题

## 我从老版本MMT、DBMT、SSMT升级到新版MMT(MIMITools)是否需要重新赞助或者重新激活？
不需要，我开发的所有3Dmigoto系列工具都是附带老用户激活的，激活绑定主板，只要你不换主板就可以直接下载最新版使用。

每次赞助获得的激活，只要激活到对应主板上，对应的主板就具有我开发的3Dmigoto系列工具的永久LTS权限。

## MMT和SSMT有什么区别？
MMT的前身就是SSMT，你可以理解为SSMT就是开源版MMT，我将SSMT开源后交给 高氙酸 进行维护了，目前完整维护团队包括 高氙酸、希尔、一夏 等社区成员。

MMT是我自己维护的一套，适配我自用的Mod流程，用法上比较有特色。

## Mod逆向出来，有骨骼吗？

有

## 为什么部分 Mod 作者会抵制MMT的Mod逆向功能

模型被薅了不高兴

## 🖥️ 界面问题
### Q: 为什么工具界面和 BiliBili 视频里的不一样？
**A:** 因为工具一直在更新新版本，目前格式转换工具和 Mod 制作工具已经拆开了。

新版本工具，经过不断的技术积累和细节打磨，功能上一定是强于旧版本的，只是界面发生了变更，实际上用法相差不大，不用担心。

## 🔄 Mod 制作与还原
### Q: 我想把 Mod 中转换出来的模型重新生成为 Mod 怎么做？
**A:** 使用 **SSMT** 和 **SSMT 的 Blender 插件** 来进行 Mod 制作，是最方便的。

其次也可以使用老外的工具，例如 `gui_collect` 和 `XXMI-Tools`, `WWMI-Tools`。

> 💡 **概念区分**：Mod 格式转换只是拿到了模型，拿到了模型剩下的你想干嘛都不是你说了算嘛，要区分这个概念，拿到了模型剩下的步骤就和 Mod 格式转换无关了，要生成 Mod 就是 Mod 制作的部分。
>
> 实际上，格式转换工具只是为了获取 Mod 中包含的模型，获取到模型之后，剩余的流程就和 `3Dmigoto-Sword-Lv6` 的关系不大了，主要是 Mod 制作流程。
>

### Q: 那么如何把模型制作为 Mod 呢？
- **米家游戏**：可以使用 `gui_collect` 或 `GIMI`，`SRMI`，`HIMI`，`ZZMI` 等仓库的模型收集脚本来提取模型，然后用 `XXMI-Tools` 导入模型后生成 Mod，也可以使用 **SSMT** 提取模型，然后用 **SSMT 的 Blender 插件** 生成 Mod。
- **鸣潮**：可以用 `WWMI-Tools` 来制作 Mod，也可以用 **SSMT** 来制作 Mod。

> 💡 **工具推荐**：对于工具的选择我的推荐是哪个好用用哪个，没必要绑定死在一个工具上，因为开发者不同所以每个工具都有其特色和优缺点。
>
> + 在鸣潮 Mod 制作方面 `WWMI-Tools` 的优势更大，次选 SSMT 流程。
> + 在米家游戏制作上面 SSMT 流程做的也不错，和老外的工具各有优劣。
>
> 当然最好是全部都能掌握，早日成为 Mod 大师，加油。
>

### 🔗 相关链接
- **SSMT 下载地址**：[https://github.com/StarBobis/SSMT3](https://github.com/StarBobis/SSMT3)
- **XXMITools 插件下载地址**（老外的米家游戏生成 Mod 工具）：[https://github.com/leotorrez/XXMITools](https://github.com/leotorrez/XXMITools)
- **gui_collect**（老外的米家游戏模型提取工具）：[https://github.com/Petrascyll/gui_collect](https://github.com/Petrascyll/gui_collect)
- **WWMI-Tools**（老外的鸣潮模型提取和 Mod 生成工具）：[https://github.com/SpectrumQT/WWMI-Tools](https://github.com/SpectrumQT/WWMI-Tools)


## 🔒 激活与安全
### Q: 机器码锁了之后是不是只要不换主板就没事？
**A:** 是。

### Q: 老版本激活格式转换插件 新版本是不是还得激活啊？
**A:** 不需要，新版本都附带旧的激活，从旧版本更新到新版本只需要下载最新版即可。

## MIMIBlender插件和TheHerta4插件的区别是什么？
SSMT4 & TheHerta4是开源的一套体系

MIMIBlender是MIMITools的Blender插件，也就是它和MMT是配套的。
