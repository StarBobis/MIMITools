# 🗡️ 爱丽丝的剑消失问题

我们都知道，正常情况下使用 SSMT 生成爱丽丝的剑的 Mod，会导致它的剑消失，如下图是原始模型：

![alt text](image.png)

下图为放大剑的模型，直接生成 Mod 的效果：

![alt text](image-1.png)

此时剑消失了，不正常显示，这是因为这个剑的渲染顺序比较特殊，我们需要修改自动生成的模板 `ini` 文件才行。

## 🛠️ 修复步骤

1.  **打开 Mod 文件夹**：生成 Mod 后，会自动打开 Mod 所在文件夹：

    ![alt text](image-2.png)

2.  **修改 ini 文件**：打开 Mod 的 `ini` 文件，重点关注如下内容：

    ![alt text](image-3.png)

3.  **移动配置**：我们需要把 `Position` 部位的 `vb2` 替换以及 `skip` 和 `draw` 都移动到 `Blend` 下面，改完之后是这样：

    ![alt text](image-4.png)

4.  **检查贴图**：此时我们游戏中 `F10` 刷新，虽然能够显示了，但是贴图对不上：

    ![alt text](image-5.png)

5.  **移动 Texcoord**：随后我们把 `Texcoord` 下的 `vb1` 替换，移动到 `IB` 对应的 Component 替换下面：

    ![alt text](image-6.png)

    ![alt text](image-7.png)

6.  **最终效果**：游戏中 `F10` 刷新可以看到贴图 UV 也正常了：

    ![alt text](image-8.png)

## 📝 总结

制作的过程中正常制作，最后的 `ini` 修改一下就行。