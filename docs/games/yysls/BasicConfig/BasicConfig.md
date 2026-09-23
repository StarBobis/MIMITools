# 如何配置燕云十六声

这游戏玩的人比较少，所以目前只支持了30%左右，遇到问题记得反馈给我，我有空会去测试。

##  添加游戏到主页 
首先切换到游戏库页面，点击YYSLS的图标

YYSLS就是燕云十六声的拼音首字母简写大写

![alt text](image.png)

点击后会切换到该游戏，随后右键添加到收藏

![alt text](image-1.png)

就会将此游戏添加到主页左侧常用列表，并跳转回主页：

![alt text](image-2.png)

## 顺手设置个背景图（仪式感）

![alt text](image-3.png)

![alt text](image-4.png)

## 检查包更新

![alt text](image-5.png)

目前SSMT对YYSLS的支持，仍然处于内测阶段，所以使用的是MinBase-Package以及手动Check

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)

## 路径设置注意事项

YYSLS的路径填写和其他游戏不一样，需要特别注意

首先我们去启动器的设置那里，找到游戏安装目录：

![alt text](image-9.png)

进入其Engine目录：

![alt text](image-10.png)

再进入Binaries目录：

![alt text](image-11.png)

你会发现有Win64r和Win64rh两个文件夹：

![alt text](image-12.png)

这俩文件夹下面，各有一个yysls.exe:

![alt text](image-13.png)

![alt text](image-14.png)

燕云最奇葩的点就是启动游戏时，它会随机启动其中一个，所以我们的进程路径有时候需要改变

这里我们进程填写为`Win64rh`的yysls.exe的路径：

![alt text](image-15.png)

如果注入不了3Dmigoto，就换成`Win64r`的再试一次

![alt text](image-16.png)

启动路径空着不写，我们点击开始游戏后，启动了Run.exe后，直接去官方启动器那里启动游戏：

![alt text](image-17.png)

并且这里一定要展开设置来勾选DX11启动，否则一定是无法使用3Dmigoto的：

![alt text](image-18.png)

然后进入游戏，成功打开绿字就成功了，否则按上面说的，换路径再试一次


