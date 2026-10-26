# MMT

**MIMITools · 面向 3Dmigoto 的 Mod 制作全流程工具箱**

[简体中文](#简体中文) · [English](#english)

---

## 简体中文

MMT（MIMITools）是一套面向 **3Dmigoto** 的 Mod 制作全流程工具箱。从模型提取、贴图标记、UI 构造，到 Mod 启动、模组管理与逆向提取，MMT 把这些环节整合进同一套简单直观的流程，让 Mod 作者不必再为底层操作分心。

> 本仓库仅用于托管 MMT 的发布版本与自动更新，不包含 MMT 的源代码。

### 主要能力

- **Mod 制作**：模型提取、贴图标记、UI 构造器，操作可视化，所见即所得。
- **Mod 启动器**：一键启动游戏，集中管理已安装的 Mod。
- **Mod 逆向**：提供手动逆向、一键逆向、模组分析与纳米猫 AI 自动逆向四种方式，提取结果可直接导入 Blender。
- **配套插件**：配合 Blender 插件 MIMIBlender，打通从提取到 Blender 编辑的完整流程。

### 下载与文档

- [MMT 下载地址](https://github.com/StarBobis/MIMITools/releases)
- [MIMIBlender 下载地址](https://github.com/StarBobis/MIMIBlender/releases)
- [使用文档](https://starbobis.github.io/MIMITools/)：安装、游戏配置、Mod 制作与逆向教程。

### 关于开源版本

MMT 是一套自用的工作流，以闭源形式发布。如果你更喜欢开源工具，不妨试试 MMT 的开源版本 **SSMT**：

| 项目 | 说明 |
| --- | --- |
| [SSMT4](https://github.com/Perxenic-Acid/SSMT4) | 基于 3Dmigoto 的开源 Mod 工具箱 |
| [SSMT4 文档](https://perxenic-acid.github.io/SSMT4-Documents/) | 安装、配置与各游戏教程 |
| [TheHerta4](https://github.com/Perxenic-Acid/TheHerta4) | SSMT 配套的 Blender 插件 |

开源版本完全由社区维护。你也可以借助 AI 的力量快速修改它，以适配任何你想要支持的 3Dmigoto 游戏。

### 文档站点开发

```bash
bun install          # 安装依赖
bun run docs:dev     # 启动本地开发服务器
bun run docs:build   # 构建静态站点
bun run docs:preview # 预览构建结果
```

### 许可证

本仓库中的文档与站点源码基于 [GPL-3.0](LICENSE) 授权；MMT 本身为闭源软件，不包含在本仓库中。

---

## English

MMT (MIMITools) is an all-in-one toolkit for creating **3Dmigoto** mods. From model extraction, texture marking, and UI construction to mod launching, mod management, and mod reverse engineering, MMT brings these steps together into one simple, visual workflow—so mod authors can stay focused on creating.

> This repository is used only to host MMT releases and auto-updates. It does not contain the MMT source code.

### Highlights

- **Mod creation**: model extraction, texture marking, and a visual UI builder—what you see is what you get.
- **Mod launcher**: launch games and manage installed mods in one place.
- **Mod reverse engineering**: four approaches—manual, one-click, mod analysis, and NanoCat AI-assisted extraction; results can be imported directly into Blender.
- **Companion add-on**: works with the MIMIBlender add-on to cover the path from extraction to editing in Blender.

### Downloads and documentation

- [Download MMT](https://github.com/StarBobis/MIMITools/releases)
- [Download MIMIBlender](https://github.com/StarBobis/MIMIBlender/releases)
- [Documentation](https://starbobis.github.io/MIMITools/): installation, per-game setup, mod creation, and reverse-engineering guides.

### Open-source edition

MMT is a personal workflow released as closed-source software. If you prefer open-source tools, give **SSMT**, the open-source edition of MMT, a try:

| Project | Description |
| --- | --- |
| [SSMT4](https://github.com/Perxenic-Acid/SSMT4) | An open-source mod toolbox built on 3Dmigoto |
| [SSMT4 Documentation](https://perxenic-acid.github.io/SSMT4-Documents/) | Installation, configuration, and per-game guides |
| [TheHerta4](https://github.com/Perxenic-Acid/TheHerta4) | The companion Blender add-on for SSMT |

The open-source edition is maintained entirely by the community. With AI, you can quickly adapt it to support any 3Dmigoto game you want.

### Documentation site development

```bash
bun install          # install dependencies
bun run docs:dev     # start the local dev server
bun run docs:build   # build the static site
bun run docs:preview # preview the build
```

### License

The documentation and site source in this repository are licensed under [GPL-3.0](LICENSE). MMT itself is closed-source software and is not included in this repository.
