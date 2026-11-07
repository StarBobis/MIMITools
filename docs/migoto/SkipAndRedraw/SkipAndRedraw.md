# 🔁 `skip` 之后自己重画

Mod 的本质可以概括成一句话：**让游戏原来那个模型不要画，改成画我们自己的。**

前半句就是 `handling = skip`，后半句是 `drawindexed`（或者 `draw = from_caller`）。所以这两个写法几乎总是成对出现。

## 🧩 方式 A：skip + 换资源 + `drawindexed`

最常见的接管写法：跳掉原来的 draw，然后指定自己的索引、顶点和贴图，自己画一次。

```ini
[TextureOverride_IB_1234abcd]
hash = 1234abcd
match_first_index = 0
handling = skip

; 换成自己的资源
ib   = Resource_1234abcd_IB
vb0  = Resource_1234abcd_Position
vb1  = Resource_1234abcd_Texcoord
ps-t0 = Resource_1234abcd_Diffuse

; 画自己的模型
drawindexed = 5517, 0, 0
```

`drawindexed` 的三个参数依次是：

| 位置 | 含义 |
| --- | --- |
| 第 1 个 | 要画多少个索引 |
| 第 2 个 | 从第几个索引开始 |
| 第 3 个 | 基础顶点偏移（一般填 0） |

这几个数字不是拍脑袋来的：MMT 一键生成 Mod 时会把它们算好写进 ini，手动写的时候要跟自己的索引缓冲对上。

> 💡 顶点数超过游戏默认限制时，`drawindexed` 会画不全，需要先做 VertexLimitRaise，见 [默认顶点数量突破问题](/migoto/Extra_VertexNumberRaise/Extra_VertexNumberRaise)。

## ➕ 只想加东西，不想换掉原模型

如果你只是想在原模型之外再画一点东西（挂件、贴纸、另一层衣服），那就不需要 `skip`：原模型照常画，你额外再 `drawindexed` 一次就行。

```ini
[TextureOverride_IB_1234abcd_Accessory]
hash = 1234abcd
match_first_index = 0
ib    = Resource_Accessory_IB
vb0   = Resource_Accessory_Position
ps-t0 = Resource_Accessory_Diffuse
drawindexed = 300, 0, 0
```

区别只在于有没有 `handling = skip`：

- 有 `skip`：原来那次 draw 不画了，屏幕上只有你画的东西（**替换**）。
- 没有 `skip`：原来的照画，再加上你画的（**追加**）。

写错了就会出现「模型变成两份」——同一套几何被画了两次，通常表现为闪烁、重影或者边缘发黑。

## 🎨 方式 B：`skip` + `draw = from_caller` 换着色器

如果只想换着色器、几何一点不动，可以让 3Dmigoto 把原来那次 draw 用你的 shader 重放一次：

```ini
[ShaderOverride_1234567890abcdef]
hash = 1234567890abcdef
run = CustomShader_Body

[CustomShader_Body]
vs = ShaderFixes/body_vs.hlsl
ps = ShaderFixes/body_ps.hlsl
draw = from_caller
handling = skip
```

- `draw = from_caller`：用当前绑定的资源，把刚才那次 draw 原样再发一次，这次走的是你的 shader。
- `handling = skip`：告诉 3Dmigoto「原始那次就不要再画了」，否则会画两遍。

这两个必须写在同一个段里，顺序不重要，但都不能少。

## 🔀 方式 C：跨 IB 渲染

还有一种进阶用法：在 A 部位把原 draw 跳掉，然后在 B 部位画 A 部位的模型，让 A 用上 B 的材质和光照。原理和完整例子见 [跨 IB 渲染教程](/migoto/CrossIBRendering/CrossIBRendering)：

```ini
[TextureOverride_IB_298dc3b2]
hash = 298dc3b2
match_first_index = 0
handling = skip
ib = Resource_298dc3b2_Component1
drawindexed = 5517, 0, 0

; 换成另一个部位的资源，再画一次
ib  = Resource_81d8e71a_Component1
vb0 = Resource_VB0
vb1 = Resource_VB1
drawindexed = 13836, 70386, 0
```

## 🧷 顺序和状态

- **先准备资源，再画。** `ib` / `vb0` / `ps-t0` 这些替换要写在 `drawindexed` 前面，`drawindexed` 用的是替换后的资源。
- **用完记得还原。** 一个段里改了 `vb0`、`ps-t0`，后面的 draw 会继承这些绑定。需要还原时在 `post` 段写回去，或者像跨 IB 教程那样先把原资源 `ref` 备份起来。
- **`skip` 写在段里哪个位置都行**，它只标记「这一次 draw 不画」，和 `drawindexed` 谁先谁后不影响结果；习惯上写在最前面。
- **变量控制开关。** 用 `if $var == 1 ... endif` 把 `skip` 和 `drawindexed` 包起来，就能做「切换 Mod / 原版」的按键开关。

```ini
[Constants]
global persist $mod_on = 1

[Key_ToggleMod]
key = f8
type = cycle
$mod_on = 0,1,

[TextureOverride_IB_1234abcd]
hash = 1234abcd
match_first_index = 0
if $mod_on == 1
  handling = skip
  ib  = Resource_1234abcd_IB
  vb0 = Resource_1234abcd_Position
  drawindexed = 5517, 0, 0
endif
```

按 `F8` 就能在原版模型和自己的 Mod 之间来回切，排查问题非常方便。

## 🕳️ 常见坑

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 模型变两份、闪烁重影 | 忘了 `skip`，或者 `draw = from_caller` 段里没写 `skip` | 补上 `handling = skip` |
| 模型整个消失 | `skip` 写了，但 `drawindexed` 没执行或参数不对 | 看日志里有没有 `drawindexed`；先只加 `drawindexed` 不写 `skip` 验证能不能画出来 |
| 只画出一部分 | 索引数量填少了，或顶点数超过限制 | 核对索引数量，必要时做 VertexLimitRaise |
| 贴图是黑的 / 花的 | `ps-t0` 没绑上，或者绑定被后面的 draw 覆盖 | 在 `drawindexed` 前重新绑一次贴图 |
| 切到原版就崩 / 贴图错乱 | 开关只关掉了 `skip`，没关掉资源替换 | 把整组命令都放进 `if` 里 |

## 🧠 冷知识

`skip` 不只对图形 draw 生效。如果 `[ShaderOverride]` 命中的是一个 **Compute Shader**，它的 `Dispatch` 也会被跳过（依赖它的后续绘制就会拿到没算完的数据）。这可以用来验证某个计算是不是问题的来源，但一般不建议在成品 Mod 里这么干。
