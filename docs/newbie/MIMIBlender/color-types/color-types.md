# 各游戏的 COLOR 类型记录

本文单独记录 MMT 数据类型和 MIMIBlender 使用的 COLOR 规则，供后续逐个游戏补齐。最后核对日期：2026-11-15。

## 四种类型

| `BlenderColorType` | Blender 存储类型 | 导入、导出使用的接口 |
| --- | --- | --- |
| `BYTECOLOR_LINEAR` | `BYTE_COLOR` | `color` |
| `BYTECOLOR_SRGB` | `BYTE_COLOR` | `color_srgb` |
| `FLOATCOLOR_LINEAR` | `FLOAT_COLOR` | `color` |
| `FLOATCOLOR_SRGB` | `FLOAT_COLOR` | `color_srgb` |

BYTE／FLOAT 决定存储精度，LINEAR／SRGB 决定读写数值使用的颜色空间。二者必须同时确定。SRGB 名称只说明 Blender API 的读写约定，不能据此断言游戏的 COLOR 数据一定表示显示颜色；它还可能承载遮罩、描边参数等数值。

例如，同一个 BYTE_COLOR 层底层存储 RGB 字节 128，`color_srgb` 读取约为 0.502，`color` 读取约为 0.216。将后者直接乘以 255 导出，就会得到约 55。Alpha 不做 RGB 的传递函数转换。

`BYTECOLOR_LINEAR` 会先把线性数值转换成 sRGB 字节存储，再转换回来，因此存在量化损失，不能保证所有原始字节无损往返。需要保存高精度数值时应核对是否适合 FLOAT 存储，而不是只根据游戏缓冲区使用 UNORM8 就选择 BYTE。

## 每个游戏的核对表

**“已核实的上游默认”留空表示尚未核实，不能把当前程序默认当成游戏正确答案。** 后续请补充工具版本、适用导入路径、实际模型及游戏内验证结果。同一游戏、不同 COLOR 通道如有不同约定，应拆行记录。

“按格式迁移”表示保留本次修改前 MMT 已输出的存储提示：8-bit UNORM 使用 `BYTECOLOR_LINEAR`，其余格式使用 `FLOATCOLOR_LINEAR`。它只是兼容默认，不是上游核实结论。

| 游戏预设 | 当前新数据类型默认 | 已核实的上游默认 | 游戏内验证／待补事项 |
| --- | --- | --- | --- |
| AILIMIT | 按格式迁移 | | |
| APMI | 按格式迁移 | | |
| CPUSkinning | 按格式迁移 | | |
| DOAV | 按格式迁移 | | |
| EFMI | FLOATCOLOR_LINEAR | FLOATCOLOR_LINEAR | 默认 LINEAR；另有 LEGACY 选项；游戏验证待补 |
| GF2 | 按格式迁移 | | |
| GIMI | FLOATCOLOR_LINEAR | FLOATCOLOR_LINEAR | XXMI 标准导入路径；游戏验证待补 |
| HIMI | FLOATCOLOR_LINEAR | FLOATCOLOR_LINEAR | XXMI 标准导入路径；游戏验证待补 |
| HOK | 按格式迁移 | | |
| IDENTITYV | 按格式迁移 | | |
| IDENTITYVOLD | 按格式迁移 | | |
| MISIDE | 按格式迁移 | | |
| NARAKA | 按格式迁移 | | |
| NARAKAM | 按格式迁移 | | |
| NEIRR | 按格式迁移 | | |
| NIOH2 | 按格式迁移 | | |
| NTEMI | 按格式迁移 | | |
| PGR | 按格式迁移 | | |
| SNOWBREAK | 按格式迁移 | | |
| SRMI | FLOATCOLOR_LINEAR | FLOATCOLOR_LINEAR | XXMI 标准导入路径；游戏验证待补 |
| THEOUTCAST | 按格式迁移 | | |
| WWMI（WUWA） | FLOATCOLOR_LINEAR | FLOATCOLOR_LINEAR | 默认 LINEAR；另有 LEGACY 选项；游戏验证待补 |
| YYSLS | 按格式迁移 | | |
| ZZMI | FLOATCOLOR_LINEAR | FLOATCOLOR_LINEAR | 新标准导入路径；旧字节工程另按兼容规则读取；游戏验证待补 |
| ZZMIDX12 | 按格式迁移 | | 不因 ZZMI 已核实就推断 DX12 路径相同 |

## 数据类型与兼容规则

MMT 在每个 COLOR 元素的 `BlenderColorType` 字段写入上述四种值之一。GPU 原生语义仍为 `COLOR`、`COLOR1` 等，Blender 层名也保持不变；它们用于匹配布局、着色器和已有工程，不能简单改成新的四种类型名称。DXGI `Format`、字节宽度、分类和偏移不受这个字段影响。

```json
{
  "SemanticName": "COLOR",
  "SemanticIndex": "0",
  "Format": "R8G8B8A8_UNORM",
  "ByteWidth": "4",
  "BlenderColorType": "FLOATCOLOR_LINEAR"
}
```

新数据不再生成只有 BYTE／FLOAT、没有颜色空间的类型提示。旧文件中的 `BYTECOLOR`、`FLOATCOLOR` 和缺失字段保留兼容读取；MIMIBlender 对旧 ZZMI 字节工程沿用前次修复的 sRGB 读取，其余旧行为保持原约定。新四种值优先于预设判断，拼错的值会报错。

迁移仅覆盖内置数据类型生成路径，不批量改写用户已有工作区、Mod 或 `.blend`。重新提取并导入会使用新配置；切勿只改旧工作区的字段而不检查现有 Blender 颜色层。已经被旧代码改变的颜色值不能通过改类型名自动恢复。

显式配置要求的 BYTE／FLOAT 与现有颜色层不一致时，MIMIBlender 会拒绝导出并提示重新导入或先转换颜色层。新版 MMT 生成的四类型元数据需要配套新版 MIMIBlender，旧插件不能保证正确理解这些值。

## 上游证据与边界

- XXMI-Tools 固定版本：[`45be554`](https://github.com/leotorrez/XXMITools/tree/45be554727cb3c79f07cffa810d60073c19f4b3d)。[标准导入器](https://github.com/leotorrez/XXMITools/blob/45be554727cb3c79f07cffa810d60073c19f4b3d/migoto/importer.py) 将 `legacy_vertex_colors` 设置为 false；[颜色导入器](https://github.com/leotorrez/XXMITools/blob/45be554727cb3c79f07cffa810d60073c19f4b3d/migoto/data/data_importer.py) 创建 FLOAT_COLOR 并通过 `color` 写入，[导出读取器](https://github.com/leotorrez/XXMITools/blob/45be554727cb3c79f07cffa810d60073c19f4b3d/migoto/data/data_extractor.py) 通过 `color` 读取。旧 `import_ops.py` 路径仍有 legacy 字节色，不能与标准路径混为一谈。
- WWMI-Tools 固定版本：[`5bd6fa4`](https://github.com/SpectrumQT/WWMI-Tools/tree/5bd6fa4f16cf8e675a1d273ca2aa2f97a1d00ffb)。[设置](https://github.com/SpectrumQT/WWMI-Tools/blob/5bd6fa4f16cf8e675a1d273ca2aa2f97a1d00ffb/wwmi-tools/addon/settings.py) 中 `color_storage` 默认为 LINEAR，另外允许 LEGACY。
- EFMI-Tools 固定版本：[`eaa9036`](https://github.com/SpectrumQT/EFMI-Tools/tree/eaa903624529e4cff93fa5c6cf999b3d44d40eff)。[设置](https://github.com/SpectrumQT/EFMI-Tools/blob/eaa903624529e4cff93fa5c6cf999b3d44d40eff/efmi-tools/addon/settings.py) 同样默认为 LINEAR，并由导入器选择 legacy 路径。

这些记录是固定版本的源码核对与本地 Blender 读写测试，尚未逐游戏进行新导出结果的游戏内验证，也未进行对抗审查。游戏版本、工具版本或导入选项改变时需重新核对。

## 后续补充模板

| 游戏／COLOR 通道 | 选定的四种类型之一 | 工具与版本 | 导入／导出证据 | 模型与游戏验证 | 核对日期 |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
