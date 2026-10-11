# 🔫 LiarsBar 手枪模型问题

## 📝 问题描述

![alt text](image.png)

这里 LiarsBar 使用了 `drawindexedinstanced` 来显示多个手枪模型，我们改了之后只能有一个显示成功，其它的都会少显示很多顶点。

如图右上角是完整的，其它三个不完整。

即使我们使用了 `drawindexedinstanced = auto`，仍然是一样的情况。

## 🔍 原因推测

推测可能原因如下：

1.  **3Dmigoto Bug**：3Dmigoto 的 `drawindexedinstanced` 的底层实现有问题。
2.  **用法错误**：没有搞懂 3Dmigoto 的正确用法导致的。

## 🛠️ 解决方案

经过研究发现，其它三个不完整的模型绘制时使用的顶点数还是模型原本的顶点数。

> 💡 **临时方案**：制作 Mod 时，对于使用 `drawindexedinstanced` 绘制的物体，**顶点数不要超过原模型的顶点数**。

