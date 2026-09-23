# 💃 将MMD模型转为Mod流程 - 生成Mod与贴图篇

## 🚀 生成Mod

此时我们选中当前工作空间为名称的集合：

![alt text](image-60.png)

然后把我们的模型名称改为 **一键导入后的模型名称**，也就是它需要符合命名规则：

![alt text](image-61.png)

然后 **生成Mod**。

![alt text](image-62.png)

自动弹出生成好的 <font color="#2196f3">Mod</font> 文件夹：

![alt text](image-63.png)

去游戏里查看效果：

![alt text](image-64.png)

可以看到模型差不多正确了，接下来就是 **贴图** 了。

## 🖼️ 上贴图

还记得我们之前的 **Save atlas to** 那个步骤吗，那会儿在桌面生成了一个贴图：

![alt text](image-65.png)

但是这玩意是 `PNG` 格式的贴图，需要转换成 `DDS` 格式。

我们需要先去 `Deduped` 文件夹中看看这个贴图的 `DDS` 格式是什么：

![alt text](image-66.png)

可以看到它是 `BC7_UNORM SRGB`。

我们现在要把这个 `PNG` 贴图使用 <font color="#2196f3">Paint.net</font> 转为 `dds` 格式，点击 **文件**，**另存为**。

![alt text](image-67.png)

选择格式 `dds`。

![alt text](image-68.png)

弹出来的进一步选择格式，选择 `BC7 SRGB +`。

![alt text](image-69.png)

得到了 `dds` 贴图，虽然它有恐怖的 **144MB** 大小。😱

![alt text](image-70.png)

别急后面我们再优化贴图大小，作为萌新你先学会流程。

现在，我们去把这个贴图，替换为 <font color="#2196f3">Mod</font> 文件夹中的 `Diffuse` 贴图：

打开生成的 <font color="#2196f3">Mod</font> 文件夹中的 `Textures` 文件夹，然后把原本的 `diffuse` 贴图的名称复制到我们的贴图上，然后把原本的 `diffuse` 删掉或者改名。

![alt text](image-71.png)

游戏里 <kbd>F10</kbd> 刷新查看效果。

![alt text](image-72.png)

看起来不错，接下来我们还需要调整其它三个贴图，以确保效果都正确。

先把当前 `DiffuseMap` 直接复制三份出来，改名到对应的名称。

![alt text](image-73.png)

然后去 `DedupedTextures` 里查看每个贴图的格式，用 <font color="#2196f3">Paint.net</font> 把每一个都另存为重新保存的方式来保证格式正确：

![alt text](image-74.png)

这里除了 `Diffuse` 之外，都是 `BC6H_UF16`，我们就选这个格式：

![alt text](image-75.png)

然后保存，但是由于之前 <font color="#2196f3">Material Combiner</font> 合并贴图时，实在是太多贴图了，导致合并出来的贴图太大，导致现在保存直接卡死了。😵

![alt text](image-76.png)

所以本节内容到这里就结束了。

本节内容的篇幅实在是太长了，所以暂时完结，下一节内容中，我们将会详细说明贴图部分的技巧。
