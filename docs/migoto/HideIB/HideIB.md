# 🧱 按 IB 隐藏模型或部位

用 PS Hash 隐藏很方便，但有个硬伤：**一个 PS 往往被很多物体共用**。想要「只让这个角色消失」「只让这件外套消失」，就得按 **IB（Index Buffer）** 来找。

IB 记录的是「这次绘制用了哪份索引数据」，也就是哪一份几何。一个部位一份 IB，所以按 IB 写 `handling = skip`，影响范围通常只有那个部位。

## 🎮 第一步：拿到 IB Hash

有两种办法：

1. **Hunting 里切**：小键盘 `7` / `8`（`previous_indexbuffer` / `next_indexbuffer`）轮流切换当前场景用到的 IB，切到目标部位消失时，绿字上的那串就是 **IB Hash**。小键盘 `9`（`mark_indexbuffer`）可以把 Hash 复制到剪贴板。
2. **FrameAnalysis 里翻**：`F8` dump 一帧，在输出目录里找形如 `000066-ib=1234abcd.txt` 的文件，文件名里 `ib=` 后面就是 IB Hash。具体见 [通过贴图找 IB 的 Hash 值](/migoto/FindIBHashByTexture/FindIBHashByTexture)。

## ✍️ 第二步：写进 ini

```ini
[TextureOverride_IB_1234abcd]
hash = 1234abcd
handling = skip
```

保存后按 `F10` 重新加载，这个 IB 画出来的东西就会消失。

## 🎯 同一个 IB 有多个部位怎么办

有些模型一个 IB 里塞了好几个部件，每次 draw 只取其中一段索引。这时只写 `hash` 会把整个 IB 都藏掉，需要再加上 `match_first_index`，只匹配「从第几个索引开始」的那一次 draw：

```ini
; 只隐藏从这个 IB 的第 0 个索引开始画的那一段
[TextureOverride_IB_1234abcd_Part0]
hash = 1234abcd
match_first_index = 0
handling = skip

; 同一个 IB 的下一段，从第 3516 个索引开始
[TextureOverride_IB_1234abcd_Part1]
hash = 1234abcd
match_first_index = 3516
handling = skip
```

常用的匹配条件（都写在 `[TextureOverride...]` 里，数值按十进制填）：

| 条件 | 匹配的是什么 |
| --- | --- |
| `match_first_index` | 这次 draw 的第一个索引位置 |
| `match_index_count` | 这次 draw 画了多少个索引 |
| `match_first_vertex` | 第一个顶点 |
| `match_vertex_count` | 顶点数量 |
| `match_instance_count` | 实例数量 |
| `match_priority` | 多个段命中同一个 hash 时的优先级 |

这些值都可以从 FrameAnalysis 的日志 / dump 文件名里读出来，或者在 Hunting 里一边切一边试。

> 💡 **如果按 IB 写 skip 没反应**：不同版本、不同游戏分支的 3Dmigoto 对 `[TextureOverride]` 的触发方式不完全一样。有的分支会在绘制时按 IB Hash 自动命中；有的版本需要由某个 `[ShaderOverride]` 用 `checktextureoverride = ib` 把它带出来。遇到前者写法不生效时，参考 [跨 IB 渲染教程](/migoto/CrossIBRendering/CrossIBRendering) 里的写法补上触发条件。

## 🆚 按 PS 藏 还是 按 IB 藏

| | 按 PS Hash | 按 IB Hash |
| --- | --- | --- |
| 定位的是 | 「用了哪个着色器」 | 「画的是哪份几何」 |
| 影响范围 | 常常是一大批物体 | 通常是单个部位 |
| 适合 | 全屏遮罩、后处理、界面、扫描线 | 模型、衣服、头发、单个部件 |
| 拿 Hash 的按键 | 小键盘 `1`/`2`，`3` 复制 | 小键盘 `7`/`8`，`9` 复制 |

经验做法：**先按 PS 试**，如果一关掉整个场景都变了，再换 IB；如果按 IB 找不到（比如那层东西压根没有独立的几何），就回到 PS 加条件。

## ⚠️ 注意

- **`match_first_index` 填错就是藏错人。** 同一个 hash 下 `match_first_index` 不同就是不同部位，写错一个数字可能把别的部件藏掉。
- **IB Hash 会随游戏更新变化。** 游戏改模型或调整索引顺序后，原来的 hash 可能失效，需要重新找。
- **藏掉的不只是「看得见」的部分。** 影子、描边、反射如果用了同一份几何，也会一起消失。
