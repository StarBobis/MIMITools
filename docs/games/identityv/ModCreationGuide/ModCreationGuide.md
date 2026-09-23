
# ⚠️ 前排提示

> 🚫 **风险警告**：第五人格官方明确表明，使用 Mod 行为属于违规第三方工具，一旦检测到将 **永久封禁账号**，同时会 **封禁设备码**。
>
> 且已有多个永久封号案例。请自行承担风险。

# 🎮 Neox2 引擎 (目前的正式服)

**第五人格 PC 客户端下载地址**:
[https://wiki.biligame.com/dwrg/%E6%AD%A3%E5%BC%8F%E6%9C%8D](https://wiki.biligame.com/dwrg/%E6%AD%A3%E5%BC%8F%E6%9C%8D)

![alt text](image-1.png)

一般下载是这个名字：

![alt text](image-2.png)

> 💡 **注意**：下载后运行是全自动安装到 C 盘下的，没法选位置，这个要注意提前腾出空间。

**配置设置**：
-   **引擎**：Neox2
-   **游戏名称**：IdentityV
-   **执行逻辑**：CTXMC

![alt text](image-3.png)

# 🧪 Neox3 引擎 (目前的共研服)

**共研服 (测试服) 下载地址**:
[https://adl.netease.com/d/g/id5/c/gongyanpccnnew](https://adl.netease.com/d/g/id5/c/gongyanpccnnew)

> 💡 **注意**：需要有测试服账号才能使用，测试服使用 Neox3 引擎。

**配置设置**：
-   **引擎**：Neox3
-   **游戏名称**：IdentityV2
-   **执行逻辑**：IdentityV2

![alt text](image-4.png)

**版本要求**：
-   **SSMT**: 最低 V1.8.9
-   **SSMT-Package**: 最低 V1.1.6
-   **TheHerta**: 最低 V1.9.6
-   *尽可能全部使用最新版。*

**引擎配置修改**：
需要在游戏的引擎 XAML 文件中，开启 **DX11** 并且开启 **GPU-PreSkinning**，才能正常使用 SSMT 制作 Mod。

![alt text](image-6.png)

`neox3.xml` 和 `neox3_gl.xml` 中带有 GPU 的配置项全部要设为 `True`。

> ⚠️ **重要**：随后将文件设为 **只读状态**，防止游戏进程还原配置。如果只读无法生效则使用第三方软件的驱动级文件保护功能，防止修改，例如火绒文件保护。

# 🛠️ Mod 制作说明

首先我们的 SSMT 对于 IdentityV 也就是第五人格的 Mod 制作流程比较特殊。

**特殊点**：
-   使用了 **槽位还原技术** 来支持任意顶点数量。
-   使用了 **手动 Vertex Shader Check 架构**，来解决使用槽位还原技术和全局 Check 冲突导致的 BUG。

这导致了一个严重的问题，你在 GameBanana 下载的第五人格的 Mod 以及 3Dmigoto 加载器，和我们 SSMT 制作的 Mod 存在根本性的冲突。

因为 GameBanana 上的 IdentityV 的 3Dmigoto 使用了 **全局 Check 技术**。

**冲突表现**：
-   我们的 3Dmigoto 无法加载 GameBanana 上的 Mod。
-   GameBanana 的 3Dmigoto 无法加载我们 SSMT 制作的 Mod。

# 📝 SSMT 制作流程

目前制作流程分为 **SSMT 流程** 和 **老外的制作流程**。

1.  **使用 SSMT 流程**：请务必使用 `SSMT-Package` 下面自带的 3Dmigoto。如果你用 GameBanana 的 3Dmigoto 版本会出现两个问题：
    -   秒 Dump，但是 Dump 出来没有任何东西。
    -   制作出来 Mod 后，部分身体模型破损（全局 Check 与 IB 还原技术冲突）。

2.  **生成 VSCheck**：IdentityV 需要在不同的场景都生成 VSCheck 来让 Mod 在对应场景生效。

    正常在我们的 Blender 中使用 SSMT 插件生成 Mod 后，是无法立刻看到显示效果的，必须生成 VSCheck。

    **VSCheck 功能位置**：

    ![alt text](image-5.png)

    **操作步骤**：
    在对应 Mod 无法生效的场景 **F8 Dump**（Dump 时务必关掉 Mod）之后，把你的模型的 `DrawIB` 填写在这里，然后点击生成 VSCheck，即可让 Mod 生效。

    > 💡 **提示**：每个无法生效的场景都需要这么做。

# 🧩 复杂性说明

第五人格存在以下问题：
-   **竞技公平性**：竞技游戏，Mod 天然存在作弊的可能性。
-   **制作分歧**：制作方式存在分歧，开源版本比较方便，不需要生成 VSCheck，但是无法突破顶点数量上限；SSMT 流程需要生成 VSCheck，可以突破顶点数量上限。
-   **兼容性冲突**：SSMT 流程和 GameBanana 的 Mod 制作流程存在冲突，且互相不兼容。

> 💡 **求助**：所以大部分技巧都是群友口口相传，如果你看完这个还不懂可以在群里问群友，如果觉得文档需要补充什么东西欢迎提交 PR 或者向 NicoMico 反馈。

# ❓ 常见问题：无法显示绿字

无法显示绿字大概率是注入失败了。

需要注意一点的是，第五人格 Neox2 引擎客户端版本如果要使用 3Dmigoto 则必须在设置中开启 **【兼容模式】** 而不是 **【流畅模式】**。

> 💡 **原因**：因为只有 **【兼容模式】** 能够支持 DX11，**【流畅模式】** 可能使用的是 OpenGL。

# 特别鸣谢

正式服Neox2引擎的模型提取与Mod制作，特别感谢 鼠鼠 的大力支持。

共研服Neox3引擎的模型提取与Mod制作，特别感谢哔哩哔哩：重生之我被挂地下室 参与测试。




