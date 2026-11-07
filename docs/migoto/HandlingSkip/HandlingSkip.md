# 🚫 `handling = skip` 是什么

`handling = skip` 是 3Dmigoto 里最短、最好用、也最容易被误解的一句指令。

一句话：**它让「这一次 DrawCall」不再交给游戏原本的渲染管线去画。**

它跳过的不是某张贴图，也不是「只关掉像素着色器」；被跳过的是整次绘制——这次 draw 的顶点着色器、像素着色器以及后面的所有阶段都不会执行，屏幕上自然也没有这一批几何。

## 🔬 它到底做了什么

3Dmigoto 会在游戏每次调用 `Draw` / `DrawIndexed` 之前，先执行「命中当前这次 draw 的命令列表」，也就是 ini 里对应 `[XXX]` 段的 `pre` 部分。

`handling = skip` 就是往这个 pre 列表里加一条「把这次 draw 标记为跳过」的命令：

1. **打标记**：执行到这条命令时，当前 draw 的 `skip` 标志被置为真。
2. **拦下来**：3Dmigoto 在把绘制转发给真正的 D3D11 之前检查这个标记，标记为真就整条 draw 不提交，只留一条日志。

所以画面上的表现是「东西直接不见了」，而不是「变成透明」或者「变成黑色」。

`skip` 的标记是**一次 draw 一份**的，不会顺延到下一次绘制。

> 💡 如果这条命令执行时当前根本没有 draw（比如写在 `[Present]` 或 `[Constants]` 里），日志会输出 `No active draw call to skip`，什么都不会发生。

## 📍 能写在哪

| 写在哪个段 | 执行时有没有当前 draw | skip 是否生效 | 说明 |
| --- | --- | --- | --- |
| `[ShaderOverride...]` | 有 | ✅ | 按 shader hash 命中，最常用 |
| `[TextureOverride...]` | 有 | ✅ | 按 IB（以及其它资源）hash 命中 |
| `[CustomShader...]` | 有 | ✅ | 被 `run =` 调用时作用于当前 draw |
| `[CommandList...]` | 有 | ✅ | 被 `run =` 调用时作用于当前 draw |
| `[Present]` | 无 | ❌ | 每帧一次，没有 draw 可跳 |
| `[Constants]` | 无 | ❌ | 同上，没有 draw 可跳 |

还有另一种 `skip` 不写在 ini 里：Hunting 模式下的 `marking_mode = skip`。那是临时把当前选中的 shader 藏起来，用来找它后面的东西，退出 Hunting 就恢复，见 [隐藏东西（PS 篇）](/migoto/HidePS/HidePS)。

## ⏱️ 只能写在「原始绘制之前」

命令列表分 `pre`（绘制前）和 `post`（绘制后）两段：

- `handling = skip` 默认进的是 **pre** 列表，因为它必须在原始 draw 提交之前执行。
- 写成 `post handling = skip` 没有意义：post 运行时原始绘制早就画完了，再打标记也拦不住。
- 3Dmigoto 的源码注释也写得很直白：`skip only makes sense in pre command lists, since it needs to run before the original draw call`。

同一个段里 `skip` 和别的命令的先后顺序不影响结果：只要在这次 draw 结束前执行到，就会生效。

## 🆚 和 `handling = abort` 的区别

`handling` 只有两个取值，区别很大：

| 取值 | 作用 | 典型用途 |
| --- | --- | --- |
| `skip` | 跳过**这一次绘制**，画面里不再出现它 | 隐藏模型、隐藏界面、Mod 自己重画 |
| `abort` | 中止**命令列表的执行**（连同调用它的上级列表），绘制照常进行 | 在 `checktextureoverride` 之后做条件判断，条件不满足就提前收工 |

想「让东西消失」，用 `skip`；想「让后面的命令别执行了」，才用 `abort`。

## ✅ 怎么确认它生效了

1. **看画面**：命中的那批东西消失。
2. **看日志**：`d3d11_log.txt` 里会出现 `[你的段名] handling = skip`。
   - 有日志但画面没变：说明命中的那批 draw 本来就没画这个东西。
   - 没有日志：段没被命中，或者根本没执行到这一行（条件不成立、段名拼错、文件没被加载）。
3. **看是不是跳过头了**：如果整个角色、整个场景都消失了，说明这个 shader / IB 被很多 draw 共用，需要再加条件，见下面的用法页。

## 🗂️ 各种用法

按需求挑一页看：

- [用 `handling = skip` 隐藏东西（PS 篇）](/migoto/HidePS/HidePS)：绿字界面里复制 PS Hash，然后一条 skip 把界面 / 遮罩 / 特效藏掉。
- [按 IB 隐藏模型或部位](/migoto/HideIB/HideIB)：PS 被多个物体共用时，改用 IB Hash 精确定位。
- [`skip` 之后自己重画](/migoto/SkipAndRedraw/SkipAndRedraw)：Mod 的核心用法，原模型不画，画自己的。

## ⚠️ 几条容易踩的坑

- **跳过的是整次 draw。** 一个 PS 如果被 10 个物体共用，`skip` 会让 10 个物体一起消失；反过来，一个物体如果和菜单在同一次 draw 里，也会一起消失。
- **只跳「画」，不跳逻辑。** 界面被隐藏了，按钮往往还点得到；碰撞、音效、技能判定都在。
- **深度和半透明可能留下痕迹。** 跳过某个 pass 之后，后面依赖它的遮挡、描边、残影可能看起来不对。
- **多个 Mod 抢同一个 hash 会互相影响。** 两个 Mod 都对同一个 hash 写 `skip`，后加载的那个说了算，排查时先只留一个 Mod。
