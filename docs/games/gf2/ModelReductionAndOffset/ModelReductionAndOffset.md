# ✂️ 少前2 模型删减与偏移

## 📦 工具版本

最低使用和我一样的版本，建议使用你当时观看日期的最新版本:

-   **DBMT**: V1.1.9.6 (已淘汰)
-   **Herta**: V1.3.0

> ⚠️ **注意**：现在 DBMT 已淘汰，建议升级到 **SSMT** 和 **SSMT 插件**。

## 🛠️ 制作流程

### 1. 提取模型

1.  **确定部位**：首先确定我们要做 Mod 的部位，例如删掉这个裙子的遮羞布：

    ![alt text](image.png)

2.  **Hunting 模式**：打开 Hunting 界面按小键盘 `7` 和 `8` 切换 IB，直到我们想做 Mod 的部位消失。

    ![alt text](image-1.png)

3.  **复制 IB**：按小键盘 `9` 复制这个 IB 值，按小键盘 `+` 重置 Hunting 界面，按 `F8` Dump FrameAnalysis 文件夹。

    随后去工作台创建工作空间并填写 `DrawIB`:

    ![alt text](image-2.png)

4.  **提取模型**：点击提取模型，提取运行完成后自动弹出当前工作空间文件夹。

    ![alt text](image-3.png)

5.  **导入 Blender**：打开 Blender，点击一键导入当前工作空间内容：

    ![alt text](image-4.png)

### 2. 顶点偏移 (Vertex Offset)

6.  **移动顶点**：因为 GF2 使用的是 **CPU-PreSkinning**，所以我们只能通过形态键顶点偏移技术的衍生版：**基于顶点偏移距离决定顶点消失技术的 HLSL** 来达成删除顶点的效果。

    所以这里我们选中裙摆的顶点，XYZ 轴都移动到两格以上的位置。

    ![alt text](image-5.png)

    ![alt text](image-6.png)

7.  **生成 Mod**：生成 Mod 后会自动打开生成的 Mod 的文件夹：

    ![alt text](image-7.png)

8.  **准备 Key.buf**：随后进入 `Buffer` 文件夹，复制 `Position.buf`，并改名为 `Key.buf`，放到我们提前准备好的模板文件夹 `CustomShader_CPU-PreSkinning` 里：

    ![alt text](image-8.png)

    ![alt text](image-9.png)

    ![alt text](image-10.png)

    > 💡 **提示**：`CustomShader_CPU-PreSkinning.zip` 位于 `DBMT-Package` 的 `3Dmigoto-GameMod-Fork` 文件夹下，可自行复制过来使用：
    >
    > ![alt text](image-11.png)

9.  **准备 Base.buf**：随后返回 Blender，重新一键导入当前工作空间内容，并且直接生成 Mod，随后去 `Buffer` 文件夹中复制 `Position.buf` 到我们的模板文件夹中并改名为 `Base.buf`。

    ![alt text](image-12.png)

    ![alt text](image-13.png)

### 3. 修改 ini 配置

10. **查看顶点数**：接下来打开我们刚才直接导入直接生成 Mod 的 `ini`，查看顶点数：

    ![alt text](image-14.png)

    这里可以看到是 `17367`，记下这个数字，打开我们模板文件夹中的 `Mod.ini` 进行修改，把 `dispatch` 后面的数字改为 `13767,1,1`。

    ![alt text](image-15.png)

11. **替换 Hash**：随后我们打开提取的工作空间文件夹，进入对应数据类型的文件夹下面，有个 `tmp.json`:

    ![alt text](image-16.png)

    点开后发现可以看到 `Position` 的 hash 值是 `40d32b21`，复制并替换到模板文件夹的 `Mod.ini` 中对应 `vb0` 的 Hash 值：

    ![alt text](image-17.png)

    ![alt text](image-18.png)

12. **测试效果**：随后保存，删除我们之前生成的 Mod 的文件夹防止它和我们的模板文件夹的 `ini` 冲突，到游戏里 `F10` 刷新查看效果。

    ![alt text](image-19.png)

## 🎨 进阶技巧：形态键雕刻

到这里就制作完成了，那么这个就是模型删减的过程。

> 💡 **原理**：如果把刚才的步骤中，编辑模式下模型的移动距离，移动的不是那么远的话，就不是删减的效果，而是 **顶点偏移的形态键效果**。

![alt text](image-20.png)

这里我们还返回刚才的编辑过的地方，我们刚才把遮羞布移动到很远的位置，所以通过 HLSL 就产生了顶点删除的效果，现在我们要实现一个顶点偏移的效果，进入雕刻模式，雕刻内裤：

![alt text](image-21.png)

这里使用膨胀工具让它膨胀一点，当然你也可以自己去雕刻想要的效果，随后生成 Mod，找到 `Position.buf` 复制为 `Key.buf` 并替换模板文件夹中的 `Key.buf`，删除刚才生成 Mod 的文件夹防止冲突，游戏里 `F10` 刷新查看效果：

![alt text](image-22.png)

### 📝 总结

由于不能改变顶点数，只能做形态键 Mod，所以灵活运用雕刻和模型删减，也能做出不错的效果。

> 💡 **提示**：这里就不得不提到 **跨 IB 渲染技术**，如果你会用的话，用衣服的部位雕刻为身体的形状，并且使用身体的渲染，就能达到你想要的效果。
