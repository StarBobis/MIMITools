# 💃 将MMD模型转为Mod流程 - 基础调整篇

## 🗑️ 移除joints和rigidbodies

导入后可以看到 <font color="#d97706">MMD模型</font> 有俩我们制作 <font color="#2196f3">Mod</font> 用不到的东西。

![alt text](image-5.png)

右键把它们 <font color="#ff5722">Delete Hierarchy</font> (删除层级)。

![alt text](image-6.png)

删除后如下，清爽多了：

![alt text](image-7.png)

## 📏 调整整体大小

<font color="#d97706">MMD模型</font> 得选中这个坐标系图标一样的 **最外层的东西**，然后切换到 <font color="#4caf50">Scale</font> (缩放) 模式，调整大小。

![alt text](image-8.png)

调整到和游戏 <font color="#9c27b0">原模型</font> 差不多大小就行了，确保 **肩膀** 的位置大概对上。

![alt text](image-9.png)

::: tip 🧠 灵活变通
这一步注意要 **随机应变**，因为不是所有的游戏模型都是标准的 <font color="#d97706">MMD体型</font>。
:::

随后点击 `Object` => `Apply` => `All Transforms`。

![alt text](image-10.png)

应用完成后，删除这个坐标系。

此时只剩下 **骨架** 和 **模型** 了：

![alt text](image-11.png)

## 🧘 姿态对齐

选中 **骨架**，进入 **姿态模式**，进入 **旋转模式**。

![alt text](image-12.png)

旋转右边的胳膊到和游戏 <font color="#9c27b0">原模型</font> 差不多的角度：

![alt text](image-13.png)

旋转完成后，右键选择 <font color="#2196f3">MMD Flip Pose</font>。

![alt text](image-14.png)

这样左边的胳膊也就跟着对齐了，是不是很神奇？✨

![alt text](image-15.png)

如此这般，进行一系列 **缩放** 和 **旋转** 操作，直到 <font color="#d97706">MMD模型</font> 和 <font color="#9c27b0">原模型</font> 基本对齐。

![alt text](image-16.png)

接下来切换到 **物体模式**，`Object` => `Apply` => `All Transforms`。

![alt text](image-17.png)

应用后，右侧属性变为基础状态：

![alt text](image-18.png)

选中 <font color="#d97706">MMD的模型</font>，打开右侧 **数据面板**：

![alt text](image-19.png)

删除最下面两个锁定的 **顶点组**，一般名为 `mmd_edge_scale` 和 `mmd_vertex_color`。

![alt text](image-20.png)

然后应用所有的 **形态键**。

![alt text](image-21.png)

切换到 **修改器**，然后把它应用掉：

![alt text](image-22.png)

随后删除 **骨架**，仅保留 <font color="#d97706">MMD模型</font>：

![alt text](image-23.png)

::: danger 🛑 关键步骤
这里我们 **必须** 再次 `Object` => `Apply` => `All Transforms`。
:::

![alt text](image-24.png)

使得右侧属性面板恢复默认：

![alt text](image-25.png)

接下来保存一下 `.blend` 文件，并将这个 <font color="#d97706">MMD模型</font> 复制一份放到一个集合里作为 **备份**。

![alt text](image-26.png)

准备好就开始后面的步骤吧！🚀
