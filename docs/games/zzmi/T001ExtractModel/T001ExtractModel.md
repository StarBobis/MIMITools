# 🛠️ <font color="#FF5733">提取</font><font color="#C70039">模型</font> (Extract Model)

## 1. 📦 第一次使用的 <font color="#900C3F">简单</font><font color="#581845">配置</font>

如下图，第一次切换到 <font color="#FF00FF">ZZ</font><font color="#00FFFF">MI</font> 时，会提示没有 <font color="#FFA500">3D</font><font color="#32CD32">migoto</font>。

![alt text](image.png)

::: tip 💡 提示
此时我们在主页设置中，点击 **从 <font color="#181717">Github</font> 检查更新并自动下载 <font color="#FFA500">3D</font><font color="#32CD32">migoto</font> 加载器包**。
:::

![alt text](image-1.png)

检测到 <font color="#0000FF">新版本</font> 之后点击 **ok**。

![alt text](image-2.png)

弹出更新提示就说明 <font color="#FFA500">3D</font><font color="#32CD32">migoto</font> 包安装完成了。

![alt text](image-3.png)

此时我们配置好 <font color="#8B0000">进程</font><font color="#FF4500">路径</font> 和 <font color="#006400">启动</font><font color="#32CD32">路径</font>。

![alt text](image-4.png)

随后点击 **开始游戏** 🎮。

![alt text](image-5.png)

自动弹出加载器并启动游戏了。

![alt text](image-6.png)

可以看到 <font color="#FFA500">3D</font><font color="#32CD32">migoto</font> 加载成功了 🎉。

![alt text](image-7.png)

## 2. 🗝️ <kbd>F8</kbd> <font color="#FF4500">Dump</font> 并 <font color="#FF5733">提取</font><font color="#C70039">模型</font>

本次 <font color="#FFD700">Mod</font> 制作，我们使用这个角色 **琉音**。

![alt text](image-8.png)

按 <kbd>Numpad 0</kbd> 键打开 <font color="#228B22">Hunting</font> 界面，没错就是这个 **绿字**，就是 <font color="#228B22">Hunting</font> 界面。

![alt text](image-9.png)

然后 <kbd>Numpad 7</kbd> 和 <kbd>Numpad 8</kbd> 在 <font color="#1E90FF">IB</font> 之间切换，直到要提取模型的部分消失：

![alt text](image-10.png)

<kbd>Numpad 9</kbd> 复制这个 <font color="#1E90FF">IB</font> 值，左上角 **绿字** 会显示已复制到剪切板 📋。

![alt text](image-11.png)

此时我们回到 <font color="#FF1493">SSMT</font>，打开 **工作台页面**，填写 <font color="#1E90FF">IB</font> 值。

![alt text](image-12.png)

::: warning ⚠️ 注意
这里如果你有多个要制作的部位，可以 <kbd>Numpad 7</kbd> 和 <kbd>Numpad 8</kbd> 继续寻找直到把所有的部位的 <font color="#1E90FF">IB</font> 都填到列表里，这里作为演示我只填写一个身体的。
:::

随后我们给身体部位起个 **别名**：

![alt text](image-13.png)

回到游戏中按 <kbd>Numpad 0</kbd> 键，重置 <font color="#228B22">Hunting</font> 界面。

![alt text](image-14.png)

按 <kbd>F8</kbd> <font color="#FF4500">Dump</font> 一下，游戏会卡顿。

::: danger 🛑 等待
等待直到游戏恢复正常，左上角有 **绿字** 会显示 <font color="#FF4500">Dump</font> 成功：
:::

![alt text](image-15.png)

然后我们回到 <font color="#FF1493">SSMT</font> 的 **工作台页面**，点击 **提取模型** 📤。

![alt text](image-16.png)

提取成功后，自动打开当前 **工作空间文件夹** 📂。

![alt text](image-17.png)

## 3. 🎨 使用 <font color="#9370DB">The</font><font color="#8A2BE2">Herta</font><font color="#4B0082">3</font> 插件导入 <font color="#FF8C00">Blender</font>

这里我用的是 <font color="#FF8C00">Blender</font> <font color="#4682B4">4.5 LTS</font> 版本，界面语言选择是 **英文 English**，你也可以选择更高的版本。

![alt text](image-18.png)

::: tip 🧹 清理
随后我们先删除默认的场景中的东西，然后打开 <font color="#9370DB">The</font><font color="#8A2BE2">Herta</font><font color="#4B0082">3</font> 侧边栏。
:::

![alt text](image-19.png)

点击 **一键导入当前工作空间内容**。

![alt text](image-20.png)

可以看到模型成功导入了。

![alt text](image-21.png)

我们切换到 **材质模式**，发现还没有上贴图。

![alt text](image-22.png)

## 4. 🖼️ <font color="#20B2AA">贴图</font><font color="#008080">标记</font>

此时我们打开 <font color="#FF1493">SSMT</font>，进入 **贴图标记页面**。

![alt text](image-23.png)

将对应贴图依次标记好。

::: warning ⚠️ 重要
注意不要搞错了贴图标记的类别，每种贴图对应的贴图都是固定的。
还有这里我们使用的是 **槽位风格贴图标记**，以便于使用 <font color="#00CED1">Slot</font><font color="#20B2AA">Fix</font> 技术。
:::

![alt text](image-24.png)

标记完成后，回到 <font color="#FF8C00">Blender</font>，先删除旧的模型 🗑️。

![alt text](image-25.png)

随后重新 **一键导入**，可以看到贴图就上成功了 ✨。

![alt text](image-26.png)

## 5. 📤 略微修改进行 <font color="#4169E1">基础</font><font color="#1E90FF">演示</font>

这里我们随便修改一点东西，演示一下基础的导出流程。

![alt text](image-27.png)

修改完成后，返回到 **物体模式**，然后点击 **生成 <font color="#FFD700">Mod</font>**。

![alt text](image-28.png)

随后自动弹出生成好的 <font color="#FFD700">Mod</font> 文件所在文件夹 📂。

![alt text](image-29.png)

游戏里 <kbd>F10</kbd> 刷新，即可查看效果 👀。

![alt text](image-30.png)

::: tip 🎉 恭喜
当你走到这一步时，恭喜你，学会了 <font color="#FF1493">SSMT</font> 基础流程！
:::

接下来的内容建立在基础流程之上，我们下一节见 👋。

---

**📅 更新日期:** 2025年12月15日
**📝 结语:** 希望这篇教程能帮助你顺利迈出 <font color="#FFD700">Mod</font> 制作的第一步！如有疑问，请查阅其他相关文档或加入社区讨论。