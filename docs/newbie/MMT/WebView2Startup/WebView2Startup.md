# 缺失WebView2导致无法打开软件如何处理

MMT 使用 **Microsoft Edge WebView2 Evergreen Runtime** 显示主窗口。安装器提示缺少 WebView2，或双击 MMT 后窗口没有出现时，可以先按下面的步骤确认运行时是否已安装。你可以继续使用原来的默认浏览器。[微软 WebView2 运行时说明](https://learn.microsoft.com/zh-cn/microsoft-edge/webview2/concepts/distribution)

## 安装 WebView2 Evergreen Runtime

1. 打开 Windows **设置 → 应用 → 已安装的应用**（Windows 10 中是 **应用和功能**），搜索 `Microsoft Edge WebView2 Runtime`。
2. 如果搜不到，进入[微软 WebView2 下载页](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/#download)。普通联网电脑选择 **Evergreen Bootstrapper（常青引导程序）**。如果在线安装下载失败，选择 **Evergreen Standalone Installer（常青独立安装程序）**。常见的 64 位 Intel 或 AMD 电脑选择 **x64**，Windows on ARM 电脑选择 **ARM64**。可在 **设置 → 系统 → 关于 → 系统类型** 确认架构。
3. 运行下载的安装程序，完成后重新打开 MMT。如果是 MMT 安装或升级时弹出缺少 WebView2 的提示，请重新运行刚才的 MMT 安装包。

## 曾用优化工具禁用 Edge 或 Edge Update

如果曾用系统精简、优化或禁用 Edge 的工具，在个人电脑上先用原工具撤销与 **WebView2 Runtime** 和 **Microsoft Edge Update** 有关的改动，再安装 Evergreen Runtime。若手动禁用了更新服务，按 `Win + R`，运行 `services.msc`，找到 **Microsoft Edge Update Service**。将自己改过的服务启动类型恢复到改动前的设置。微软的支持文档还列出了更新服务缺失或被禁用时的处理方式。[微软 Edge 安装与更新排查](https://support.microsoft.com/en-US/edge/troubleshooting-tips-for-downloading-installing-and-updating-microsoft-edge)

公司或学校管理的设备，请让管理员检查 **计算机配置 → 管理模板 → Microsoft Edge Update → 应用程序 → Microsoft Edge WebView2 Runtime**。重点检查 **允许安装（Allow installation）** 和 **更新策略覆盖（Update policy override）**。前者可能阻止安装，后者可能让已安装的版本长期得不到更新。[微软 Edge Update 策略](https://learn.microsoft.com/zh-cn/deployedge/microsoft-edge-update-policies)

## 已装 WebView2，MMT 仍打不开

- **曾手动指定 WebView2 运行时路径**。在 Windows 中搜索“编辑系统环境变量”，进入 **环境变量**。如果之前自行设置过 `WEBVIEW2_BROWSER_EXECUTABLE_FOLDER`，且它仍指向已经移走的旧运行时，移除这项覆盖后再打开 MMT。由单位统一设置的电脑，请管理员核对 **Microsoft Edge WebView2 → 加载程序替代设置 → BrowserExecutableFolder**，尤其是针对 `mmt-app.exe` 或通配符 `*` 的条目。[微软 WebView2 路径策略](https://learn.microsoft.com/zh-cn/deployedge/microsoft-edge-webview-policies)
- **任务管理器里 WebView2 进程没出现，或出现后立刻消失**。打开 MMT 时，在任务管理器里观察 `mmt-app.exe` 下是否出现 `msedgewebview2.exe`，再用 `eventvwr.msc` 查看同一时间的 **Windows 日志 → 应用程序**。如果安全软件或应用控制日志明确记录了拦截，请把记录交给管理员核对，由管理员按已验证的发布者或程序规则处理。[微软 WebView2 安全软件排查](https://learn.microsoft.com/en-us/deployedge/webview2-security-tools)

如果仍打不开，反馈时请附上 MMT 版本、Windows 版本、已安装的 WebView2 版本，以及安装器错误码或事件查看器中的报错。
