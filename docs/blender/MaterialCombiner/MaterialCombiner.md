# 🔧 Material Combiner 插件

> **项目地址**: [Material Combiner Addon](https://github.com/Grim-es/material-combiner-addon)

## ⚠️ 注意事项

- 安装完成插件后，需要点击面板里的 **Install Pillow**，然后安装完成后重启 Blender 才能正常使用 Material Combiner 插件。
- 必须使用 Blender 的 **英文界面**，其它语言的界面 100% 会导致 Material Combiner 用不了，此 BUG 最新版本仍然未修复。
- **必看视频**: [YouTube 教程](https://www.youtube.com/watch?v=8ZnSO3BnoIM) - 不看会遇到很多坑无法解决。

## 📖 用途

在 Mod 制作中，一般用于快速合并两个部位的贴图到一个贴图上，UV 会自动对齐，随后将导出的 Atlas 转为 DDS 格式，以此 DDS 为基础，去 PS 中手动拼接其它贴图，方便偷懒节省拼 UV 时间。

## ❌ 缺点

自动对齐的 UV 如果设置不正确会导致 DDS 文件变得很大，很多无效的空间占用，不如手动拼接贴图省贴图大小。
