# ✨ 完美阴影与轮廓线

## ⚠️ 注意事项

-   **使用 VCM 插件**：使用 `VCM (Vertex Color Master)` 插件来手刷 `COLOR` 值，尽可能参考模型原本的 `COLOR` 值来刷，这样能获得更好的阴影和轮廓线。

![alt text](image.png)

## 🛠️ 必须步骤：向量相加归一化算法重计算 TANGENT 值

![alt text](image-2.png)

这里是全局控制，如果要精细控制，也可以右键：

![alt text](image-3.png)

## 🎨 RGBA 分量详解

在手刷 `COLOR` 值时，以下内容需要注意：

### 🔴 R 通道
R 通道控制的是 **轮廓线粗细**，0 为没有，1 为最粗。
> 💡 **注意**：头发那里特别精细，要用渐变刷。

### 🟢 G 通道
G 通道会影响 **轮廓线的显示朝向**，越趋于 0 越往左，越趋于 1 越往右。

### 🔵 B 通道
B 通道控制的是 **高光的强度**。
-   身体全部刷 0 即可不会影响身体。
-   头发需要非常精确的渐变，具体可参考原模型。

### ⚪ A 通道
A 通道控制的是 **遮光率的多少**。
-   身体全部刷 0 即可，这个会影响身体需要注意。
-   头发需要非常精确的渐变，具体可参考原模型。
-   越偏向为 1 光照越暗，所以头发上一般都是 0.5-1 之间的精细渐变值来控制阴影。

### 📝 总结

-   **R**: 控制轮廓线粗细，一般 fill 为 0.5。
-   **G**: 控制轮廓线朝向，一般 fill 为 0.5。
-   **B & A**: 一般身体部位设为 0 即可，头发部位则需要非常精细的渐变控制，具体值可在 0.5-1 之间使用 Hue 渐变设置。

> 💡 **提示**：不同模型的具体用途由于 Shader 的不同而不同，这里仅供参考。

## 🖌️ 刷 COLOR 值注意事项

在刷 `COLOR` 值时，务必调整光照强度为 **Flat**。

![alt text](image-4.png)

否则如果你使用默认的光照 Studio 的话，会出现如下效果：

![alt text](image-5.png)

这将会导致你的取色器无法准确获取对应部位的 `COLOR` 数值：

![alt text](image-6.png)

但是在 Flat 模式就可以获取精确值：

![alt text](image-7.png)

> 💡 **小知识**：这里的 0.004 其实就是 0，只不过 Blender 设计里面不允许计算后有全黑出现，习惯把 0.004 看作 0 就好。

## ⚙️ 自定义模型的轮廓线设置方法

### 🚀 偷懒版

先说一个偷懒方法，这是因为我们现在的版本特性：

![alt text](image-8.png)

`TEXCOORD1` 里面是顶视图的 UV。
所以为了让轮廓线生效，你需要把你的 UV 在这个 UV 里 unwrap 一下，然后全部缩小到最小，然后放到正中心，像酱紫：

![alt text](image-9.png)

以及 `Texcoord2` 中的内容是正面的轮廓线，也可以酱紫处理：

![alt text](image-10.png)

也这样缩小放进去，就搞定啦。

### 🛠️ 不偷懒的 Texcoord1 和 Texcoord2 设置方法

-   [★平滑法线存TEXCOORD1.xy](https://perxenic-acid.github.io/SSMT-Documents/Tutorials/SSMT-Blender-Plugins/%E2%98%85%E5%B9%B3%E6%BB%91%E6%B3%95%E7%BA%BF%E5%AD%98TEXCOORD1.xy/%E2%98%85%E5%B9%B3%E6%BB%91%E6%B3%95%E7%BA%BF%E5%AD%98TEXCOORD1.xy.html)
-   [★投影TEXCOORD2.xy(近似)](https://perxenic-acid.github.io/SSMT-Documents/Tutorials/SSMT-Blender-Plugins/%E2%98%85%E6%8A%95%E5%BD%B1TEXCOORD2.xy(%E8%BF%91%E4%BC%BC)/%E2%98%85%E6%8A%95%E5%BD%B1TEXCOORD2.xy(%E8%BF%91%E4%BC%BC).html)


