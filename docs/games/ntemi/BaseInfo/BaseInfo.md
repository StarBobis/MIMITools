## 介绍

对于 **异环** 来说，更推荐使用 **`.pak` 格式的 UE 重打包 Mod**，尽量避免直接依赖 **3Dmigoto**，因为后者往往会带来更多兼容性和使用上的问题。

## GameBanana

https://gamebanana.com/games/23012

## ssice-a 的 3Dmigoto 适配资源

如果你仍然需要使用 3Dmigoto 相关方案，可以参考下面这些项目：

- Github 主页：<https://github.com/ssice-a>
- `NTMI-PACKAGE`：<https://github.com/ssice-a/NTMI-PACKAGE>
- NTMI 专属 `d3d11.dll`：<https://github.com/ssice-a/XXMI-Libs-Package>
- `NTMI-Tools`（用于导入导出 Blender 插件）：<https://github.com/ssice-a/mod_importer>

## 在 SSMT4 中使用异环 Mod

目前，**SSMT4** 已经支持以下内容：

- 自动下载由 **ssice-a** 开发的 NTMI 专属 `d3d11.dll`
- 自动更新 `NTMI-PACKAGE`

不过，考虑到稳定性和后续使用体验，我个人仍然更建议优先使用 **`.pak` 重打包** 的方式。因此，当前暂时 **不会添加模型提取和 Mod 生成功能**。

## 配置方式

请按下面的方式填写：

- **游戏预设**：`NTEMI`
- **目标进程路径**（替换为你自己的游戏路径）：`C:\Program Files\Neverness To Everness\Client\WindowsNoEditor\HT\Binaries\Win64\HTGame.exe`
- **启动器路径**：留空
- **启动参数**：留空

## 启动说明

点击 **开始游戏** 后，SSMT4 会自动启动 `Run.exe`。

之后需要你 **手动从官方启动器启动游戏**，并确保官方启动器中的渲染模式设置为 **DX11**。

