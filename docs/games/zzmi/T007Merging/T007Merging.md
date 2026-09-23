# 💃 将MMD模型转为Mod流程 - 合并篇

## 🔗 合并模型

在合并 <font color="#d97706">MMD模型</font> 和 <font color="#9c27b0">游戏原模型</font> 之前，需要给 <font color="#d97706">MMD模型</font> 的 **UV** 改名。

![alt text](image-43.png)

改名为 `TEXCOORD.xy`。

随后合并到 <font color="#9c27b0">游戏原模型</font> 上：

![alt text](image-44.png)

## 🎨 合并贴图

此时打开 <font color="#2196f3">Material Combiner</font> 插件（萌新偷懒法，懒得手动拼接了）。

点击 **Generate Material List**。

![alt text](image-45.png)

然后此时我们点击 **Save Atlas To**。

![alt text](image-46.png)

将合并的图片保存到桌面：

![alt text](image-47.png)

此时我们去 **UV** 里查看，就能看到它变成一张大图了：

![alt text](image-48.png)

虽然空间占用很难看，不过我们无所谓了，这就是 **偷懒的代价**。🤷‍♂️
