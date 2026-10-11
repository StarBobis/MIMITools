# ✨ 平滑法线存 TEXCOORD1.xy

## 📖 概念介绍

在 **ZZZ (绝区零)** 和 **WuWa (鸣潮)** 中，部分 UV 中的内容很奇怪。比如以 ZZZ 模型举例：

![alt text](image.png)

这个实际上是把模型的 **平滑法线** 存到 UV 里了。那么我们在修改模型之后，这个 `TEXCOORD1.xy` 里的内容肯定也需要跟着变。

## 🛠️ 使用方法

所以在 Blender 里可以右键模型 => `3Dmigoto` => `平滑法线存UV(近似)`。

![alt text](image-1.png)

点击后会生成一个名为 `SmoothNormalMap` 的 UV：

![alt text](image-2.png)

点开可以发现其内容和 `TEXCOORD1.xy` 的差不多：

![alt text](image-3.png)

然后你只要删除原本的 `TEXCOORD1.xy`，然后把这个 UV 改名为对应 `TEXCOORD1.xy`，即可实现复现平滑法线存 UV。

## 🎯 用途

- 修复 **ZZZ** 轮廓线
- 修复 **WuWa** 轮廓线

## 📉 缺点

- 这个算法只能达到近似实现，无法完美还原 `TEXCOORD1.xy` 中的内容，不过足够用了。
