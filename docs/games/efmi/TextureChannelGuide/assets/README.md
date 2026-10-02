# 通道图解资源

`maps/`中每种贴图有原始RGBA练习图、R/G/B/A灰度PNG和overview拼图。它们是原创程序绘制示意，使用texconv 2024.6.5.1转换/swizzle；每个灰度层的RGB字节都与原图对应通道完全一致，不做Gamma和预乘。

overview只作阅读展示，标签和缩放不属于原始数据。数值方向图是公式示意，不是游戏内实机渲染；SDF/未知通道占位不声称恢复角色原数据。尺寸、SHA256和工具版本见[图解清单](./map-manifest.json)。

旧版根目录合成图仍保留，避免硬删除；当前正文使用新的maps图解。旧图仍是教学预设，不是游戏贴图或AI生成结果。

终末地MME的游戏命名示例不受根MIT自动覆盖，只在正文链接原仓库，没有把受限原纹理或其派生通道提交进本站。

## 自己拆通道

从微软[DirectXTex工具发布页](https://github.com/microsoft/DirectXTex/releases)取得texconv，把输出放在单独目录。下面只转第一层mip、不改尺寸、不做sRGB转换或预乘：

```powershell
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -o output input.dds
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -swizzle rrr1 -sx -r -o output input.dds
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -swizzle ggg1 -sx -g -o output input.dds
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -swizzle bbb1 -sx -b -o output input.dds
texconv.exe -m 1 -f R8G8B8A8_UNORM -ft png -swizzle aaa1 -sx -a -o output input.dds
```

rrr1把R复制到显示RGB，并让展示PNG本身的Alpha为1；aaa1显示原A灰度，**不是把原图A改成1**。PNG输入同样可用，输出目录不要覆盖源文件。BC6H等HDR图转8位可能裁剪/量化，不用于证明原浮点值无损；多面立方体与数组纹理也要另选正确子资源。
