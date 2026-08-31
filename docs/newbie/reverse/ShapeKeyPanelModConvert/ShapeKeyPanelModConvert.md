# 🎛️ 形态键面板 Mod 格式转换演示

首先观察Mod中的文件：

![alt text](image.png)

![alt text](image-1.png)

可以看到这是一个典型的带有滑块儿的形态键面板Mod，可以通过滑块儿调整形态从而改变体型



有两种解法：

+ 第一种：纳米猫自动格式转换
+ 第二种：人工手动格式转换

## 纳米猫自动格式转换
![alt text](image-2.png)

直接将这个Mod的压缩包或者解压之后的文件夹整个拖拽到MMT的纳米猫页面中

然后跟他说格式转换这个Mod就行了

如果知道这个Mod是什么游戏的，可以顺手指定一下游戏预设：

![alt text](image-3.png)

![alt text](image-4.png)

然后点击发送，即可全自动完成格式转换：

![alt text](image-5.png)

一段时间的等待过后，如果你的游戏预设没选对，可能会要求你二次确认游戏预设

![alt text](image-6.png)

比如这个Mod其实是崩铁SRMI的Mod，这里我二次确认只有SRMI的选项，然后它继续用SRMI去转换

也就是说你选错游戏预设的话，纳米猫甚至会帮你纠正



再等一会儿，可以看到纳米猫说格式转换成功了：

![alt text](image-7.png)

格式转换成功会自动弹出转换好的文件夹的路径

![alt text](image-8.png)

并且纳米猫会绘制简单的3D模型预览：

![alt text](image-9.png)

接下来在Blender中一键导入，需要安装TheHerta4插件，然后侧边栏Sword4中一键导入：

![alt text](image-10.png)

可以看到，模型不仅是根据drawindexed分块儿好的，甚至每个部位都有形态键：

![alt text](image-11.png)

这就是AI全自动格式转换，纳米猫的魅力。

## 手动格式转换
手动格式转换的话，我们进入格式转换页面：

![alt text](image-12.png)

首先选择正确的游戏预设，这里你选错了可没人给你纠正，所以你必须先知道这个Mod到底是哪个游戏的Mod，例如我们这个是崩铁的，就选SRMI：

![alt text](image-13.png)

手动格式转换每个DrawIB页只能拖拽当前DrawIB的资源，需要你人力看ini确认一共有几个DrawIB

以及每个DrawIB对应的**IndexBuffer文件列表**、**CategoryBuffer文件列表**、以及**ShapeKey Position Buffer文件列表**等等

我们需要手动将Mod解压出来，然后看里面的结构:

![alt text](image-14.png)

![alt text](image-15.png)

通过看文件名，发现这个Mod并没有进行资源文件名称混淆，这大大简化了手动格式转换的难度。

然后我们要找一下一共有几个IB，粗略观察有三个：

+ RinTohsaka-Istar开头的
+ RinTohsakahair开头的
+ RinTohsaka开头的

然后我们需要去看ini文件，或者在这里直接判断每个文件的类型

一般情况下，如果mod混淆了资源文件名称，我们就需要去ini里仔细查看，如果没有混淆，一般直接看名称就行了。

例如我们先看第一个DrawIB：

+ RinTohsaka开头的



首先找IB文件列表：

![alt text](image-16.png)

这五个拖进来：

![alt text](image-17.png)

其次我们找CategoryBuffer文件列表：

![alt text](image-18.png)

![alt text](image-19.png)

![alt text](image-20.png)



接下来，我们需要检查一下IndexBuffer文件列表里的IB文件的格式是否正确，因为虽然大部分Mod的格式是DXGI_FORMAT_R32_UINT，但是不排除某些小众作者为了防一键格式转换魔改，或者某些特殊游戏仍然使用DXGI_FORMAT_R16_UINT，最好的方式就是打开ini去一个一个确认：

![alt text](image-21.png)

这里确认都是 DXGI_FORMAT_R32_UINT 没问题

接下来我们确认拖入的Buffer文件的每个分类：

![alt text](image-22.png)

这里我们根据名称，很轻松的就确认了分类是什么，一个一个指定好就行了。

然后，这里要注意，Position分类的Buffer可别选错了，在Mod的文件名没有被混淆的时候，一般众多Position.xxx.buf中，不带.xxx的才是基础的CategoryBuffer，带的一般都是ShapeKey Category Buffer：

![alt text](image-23.png)

好，那么最后我们把所有的形态键Buffer都拖拽到ShapeKey Position Buffer文件列表中，如果有就拖入，如果没有就不管：

![alt text](image-24.png)



形态键名称可以空着不填，接下来点击上方**执行手动格式转换**即可：

![alt text](image-25.png)

格式转换完成后会自动打开转换好的文件夹，

![alt text](image-26.png)

此时就可以一键导入Blender了：

![alt text](image-27.png)

导入后效果如下，有形态键，但是模型整体粘在一起，没有自动分隔：

![alt text](image-28.png)

这是因为，手动格式转换是不具备自动分割物体顶点的功能的，你可以使用这个功能来进行手动分割：

![alt text](image-29.png)

这里的Start Index和Index Count，需要你去ini里找**对应的DrawIB对应的drawindexed**，然后一个一个手动填写，每次填写完点击分割按钮即可

![alt text](image-30.png)

手动格式转换很麻烦，但是它是MMT最强大的功能，因为再强的混淆，也无法绕过人脑的思考破解。

当然，对于初学者来说可能会很迷惑，我建议还是使用纳米猫自动格式转换好一点



那么刚才只是转换了一个DrawIB，这个Mod还有两个DrawIB，点这里新增一个：

![alt text](image-31.png)

新增的DrawIB可以改名，可以自由拖拽

![alt text](image-32.png)

总之我已经演示了其中一个DrawIB的，剩下的可以照猫画虎，思路都是一样的



## 总结
非必要不要使用手动格式转换折磨自己，尽量交给纳米猫全自动操作。









