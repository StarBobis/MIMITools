# 注入3Dmigoto常见问题

## 注入器无法启动

MMT使用Run.exe来注入3Dmigoto到目标进程，它本身是基于原始3Dmigoto仓库的注入器魔改增强得到的。

由于包含注入代码，且并未长期单独包含在Github的发布页，所以未被微软SmartScreen收录

所以100%会被微软的Smart Screen拦截，导致我们在点击开始游戏按钮后，无法启动3Dmigoto注入器，也就是Run.exe

可以按下面的方式处理：

### 1.彻底关闭Smart Screen，即基于声誉的保护

设置中搜索smart，即可出现：

![alt text](image-3.png)

点击后，将其关闭：

![alt text](image-1.png)

![alt text](image-2.png)


### 2.手动运行一次MMT安装目录下的resources目录下的Run.exe

第一次运行会弹出提示说不认识这个文件，无脑运行就可以了

然后后面都不会再出现Run.exe运行被自动拦截问题

但是由于每次MMT更新时，都会把resources下面的内容覆盖掉，

所以如果Run.exe的内容发生了变化或者更新后，就需要重新执行这个步骤

所以推荐第一种方式。

### 3.如果实在不信任MMT的注入器😂

你也可以将3Dmigoto目录选择为其它启动器，例如XXMI Launcher下面的3Dmigoto目录

随后每次启动时，都使用XXMI Launcher启动，MMT仅用于模型提取和Mod管理等等其它功能

MMT的设计是专门为Mod作者优化过的，所以灵活性拉满，你可以自由选择搭配方式。

另外，Run.exe这个注入器是开源的，源码就在：https://github.com/Perxenic-Acid/MMT-Native/tree/main/3Dmigoto-Injector-V2

有条件可自行编译后，替换resources目录下原本的Run.exe来使用

另外，如果有条件且强迫症驱使，你可以自行使用IDA Pro反编译Run.exe验证其执行流程与安全性。

## 注入后没有反应

无法注入3Dmigoto到目标进程，表现为注入后，按0无法打开绿字，F10没有反应，也不显示任何除游戏外其它内容。

此时可能是由于以下原因导致的，但不限于以下原因：

- NVDIA显卡驱动中的AI插针忘记关闭
- 2k屏幕通过NVDIA显卡驱动渲染成4K画质
- 目标进程路径填写不正确
- 目标游戏未选择DX11模式启动
- 目标游戏不支持DX11模式
- 目标游戏具有强力反作弊拦截了注入行为

请自行排查，如有补充请提交PR
