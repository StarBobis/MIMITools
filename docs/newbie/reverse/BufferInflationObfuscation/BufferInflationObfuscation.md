
# 🛡️ IndexBuffer 膨胀混淆技术

**IndexBuffer 膨胀混淆技术**，指的是对于使用了分开 `drawindexed` 具体数值的 Mod，在 `IndexBuffer` 中塞入一些干扰数据。由于使用 `DrawIndexed` 可以精确控制具体从 IB 文件中使用哪些数字列表来进行 Draw，所以可以用避开塞入的干扰数据，只绘制正确的数据。

此时就达到了膨胀 IB 文件大小的效果，也改变了 IB 文件中的 `UniqueVertexCount` (所有具有唯一值的数字索引的总和) 的数量，使得自动化 Mod 逆向中的根据 `IndexBuffer` 的 `Total UniqueVertexCount` 和 `ResourceVBList` 进行匹配的时候无法按照这个数值进行精确匹配，达到干扰自动化 Mod 逆向的效果。

## 🛠️ 解决方案 1

1.  **分类列表**：实际操作过程中，先把能够精确匹配的放到一个列表，然后把不能精确匹配的放到剩余的列表，后续的步骤只对剩余的列表进行操作。
2.  **统计数值**：根据 `ini` 中绘制的 `DrawIndexed` 的范围，截取出 `Index Buffer` 文件中对应的数字列表，统计出一个最大值，统计出一个 `UniqueVertexCount` 的总和。
3.  **过滤列表**：在所有可能的 `ResourceVBList` 中，先过滤掉最大值小于上面统计的最大值的 `ResourceVBList`。
4.  **二次过滤**：再过滤掉这些 `ResourceVBList` 的顶点数小于 `UniqueVertexCount` 的总和的，此时剩余的所有满足条件的 `ResourceVBList` 都作为一个可能出现的 Mod 类型参与后续的文件输出步骤。

## 🛠️ 解决方案 2

-   **手动逆向**：使用手动逆向脚本，精确指定 IB 文件和 Buffer 文件，可直接绕过顶点数匹配问题。

# 🛡️ CategoryBuffer 膨胀混淆技术

**CategoryBuffer 混淆技术** 指的是，由于在 3Dmigoto 的 Buffer 文件中，读取 Buffer 文件是按照 `Stride` 读取的，然后传递到 Shader 之后，Shader 只会读取自己定义的那部分 `stride` 而不会读取额外的 `stride`，这样在生成 Mod 时就可以加入长度混淆，使得 Mod 逆向时使用的数据类型和在游戏中提取原模型时使用的数据类型不一致，达到干扰 Mod 逆向的效果。

## 🛠️ 解决方案 1

-   **新增数据类型**：先提取游戏原模型，得到正确的数据类型，在此基础上新增加入了额外若干 `TEXCOORD.xy` 的数据类型，使得 `stride` 能够匹配，从而能够正常逆向。

## 🛠️ 解决方案 2

-   **手动逆向**：使用手动逆向脚本，和上面一样手搓一个额外的数据类型来逆向。