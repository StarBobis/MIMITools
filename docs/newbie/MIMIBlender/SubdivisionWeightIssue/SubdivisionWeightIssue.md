# 📉 模型细分后权重出问题

模型在细分后，向中心进行塌陷？😱

**可能的原因如下：**

- 🚫 **未突破顶点数量限制**：需要切换场景或者重启游戏生效。
- ⚖️ **权重未全部规格化**。
- 🔗 **细分之前没有按距离合并顶点**。

## ✅ 细分的正确方法

使用 `Subdivision` 修改器，直接细分后，模型出现皱纹：

![alt text](image.png)

此时我们要勾选 **Use Custom Normals** (使用自定义法向)：

![alt text](image-1.png)

此时模型恢复正常：

![alt text](image-2.png)

![alt text](image-3.png)
