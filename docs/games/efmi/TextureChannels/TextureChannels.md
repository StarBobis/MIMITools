# 终末地贴图作用（社区简表）

::: warning 这不是通用通道规范
以下为原有社区记录，未附对应Shader版本与材质绑定证据。新核查的公开MME衣服Property采用R=金属、G=反射率、B=AO、A=光滑度，与下表BA顺序不同。请先确认自己的资产契约，勿直接交换通道。完整证据、分材质说明与提示词见[终末地贴图通道详解](../TextureChannelGuide/TextureChannelGuide.md)。
:::

- `R` 金属
- `G` 镜面高光类型
- `B` 平滑度(1-粗糙度)
- `A` AO控制

皮肤的Diffuse贴图，A通道控制AO，G应该是控制各向异性还是同性的

> 资料来源于: 失乡のKnight

