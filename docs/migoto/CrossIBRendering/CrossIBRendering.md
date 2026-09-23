# 🔄 跨 IB 渲染教程

## 📝 什么是跨 IB 渲染？

部分游戏中，身体和衣服使用了不同的 **Shader** 进行渲染，使用不同渲染的部分一般不在同一个 **IB** 中，导致材质和光照效果不同。

在部分情况下，如果我们想让某个部分使用另一个部分的光照和材质 **Shader** 进行渲染，就需要用到跨 **IB** 渲染技术。

> 💡 **提示**：这个名字是我自己随便起的，没有英文对应的技术名词。

## 🛠️ 实现方法

首先把最终的 Mod 的 `ini` 先贴过来，方便随时参考：

```

;MARK:Constants----------------------------------------------------------
[Constants]
global $active0
global $active1
global $active2
global persist $swapkey0 = 0
global persist $swapkey1 = 1

;MARK:Present----------------------------------------------------------
[Present]
post $active0 = 0
post $active1 = 0
post $active2 = 0

;MARK:Key----------------------------------------------------------
[KeySwap_0]
condition = $active0 == 1
key = f7
type = cycle
$swapkey0 = 0,1,

;MARK:Key----------------------------------------------------------
[KeySwap_1]
condition = $active0 == 1
key = f8
type = cycle
$swapkey1 = 0,1,

;MARK:TextureOverrideVertexLimitRaise----------------------------------------------------------
[TextureOverride_6b3c1103_丝袜_VertexLimitRaise]
hash = 0ba52f8d
override_byte_stride = 40
override_vertex_count = 1025
uav_byte_stride = 4

;MARK:TextureOverrideVertexLimitRaise----------------------------------------------------------
[TextureOverride_81d8e71a_衣服_VertexLimitRaise]
hash = 1f516443
override_byte_stride = 40
override_vertex_count = 36397
uav_byte_stride = 4

;MARK:TextureOverrideVertexLimitRaise----------------------------------------------------------
[TextureOverride_298dc3b2_腿和脖子_VertexLimitRaise]
hash = 175c6c67
override_byte_stride = 40
override_vertex_count = 1051
uav_byte_stride = 4

;MARK:TextureOverrideVB----------------------------------------------------------
; 6b3c1103 ----------------------------
[TextureOverride_VB_6b3c1103_丝袜_Position]
hash = 9ca19154
cs-cb0 = Resource_6b3c1103_VertexLimit
cs-t0 = Resource6b3c1103Position
cs-t1 = Resource6b3c1103Blend
handling = skip
dispatch = 18,1,1
$active0 = 1

[TextureOverride_VB_6b3c1103_丝袜_Texcoord]
hash = 62585f16
vb1 = Resource6b3c1103Texcoord

[TextureOverride_VB_6b3c1103_丝袜_Blend]
hash = 13c142be

;MARK:TextureOverrideVB----------------------------------------------------------
; 81d8e71a ----------------------------
[TextureOverride_VB_81d8e71a_衣服_Position]
hash = 07f702b9
cs-cb0 = Resource_81d8e71a_VertexLimit
cs-t0 = Resource81d8e71aPosition
cs-t1 = Resource81d8e71aBlend
handling = skip
dispatch = 570,1,1
$active1 = 1

[TextureOverride_VB_81d8e71a_衣服_Texcoord]
hash = d4615e17
vb1 = Resource81d8e71aTexcoord

[TextureOverride_VB_81d8e71a_衣服_Blend]
hash = c123de45

;MARK:TextureOverrideVB----------------------------------------------------------
; 298dc3b2 ----------------------------
[TextureOverride_VB_298dc3b2_腿和脖子_Position]
hash = e3ca0283
cs-cb0 = Resource_298dc3b2_VertexLimit
cs-t0 = Resource298dc3b2Position
cs-t1 = Resource298dc3b2Blend
handling = skip
dispatch = 18,1,1
$active2 = 1

[TextureOverride_VB_298dc3b2_腿和脖子_Texcoord]
hash = c3af7d47
vb1 = Resource298dc3b2Texcoord

[TextureOverride_VB_298dc3b2_腿和脖子_Blend]
hash = 60cc2063

;MARK:TextureOverrideIB----------------------------------------------------------
[TextureOverride_IB_6b3c1103_丝袜_Component1]
hash = 6b3c1103
match_first_index = 0
checktextureoverride = vb1
handling = skip
ib = Resource_6b3c1103_Component1
if $swapkey0 == 1
  ; [mesh:6b3c1103-1-丝袜.001] [vertex_count:1025]
  drawindexed = 5517,0,0
endif

[Resource_VB0]
[Resource_VB1]
;MARK:TextureOverrideIB----------------------------------------------------------
[TextureOverride_IB_81d8e71a_衣服_Component1]
hash = 81d8e71a
match_first_index = 0
checktextureoverride = vb1
handling = skip
ib = Resource_81d8e71a_Component1
if $swapkey1 == 1
  ; [mesh:81d8e71a-1-水印] [vertex_count:27152]
  drawindexed = 38829,0,0
endif

; [mesh:81d8e71a-1-衣服.001] [vertex_count:6687]
drawindexed = 31557,38829,0

Resource_VB0 = ref vb0
Resource_VB1 = ref vb1

;MARK:TextureOverrideIB----------------------------------------------------------
[TextureOverride_IB_298dc3b2_腿和脖子_Component1]
hash = 298dc3b2
match_first_index = 0
checktextureoverride = vb1
handling = skip
ib = Resource_298dc3b2_Component1
ps-t8 = Resource_298dc3b2_1_d4b0a178_Slot_DiffuseMap
; [mesh:298dc3b2-1-腿和脖子.001] [vertex_count:1051]
drawindexed = 5517,0,0

ib = Resource_81d8e71a_Component1
vb0 = Resource_VB0
vb1 = Resource_VB1
; [mesh:81d8e71a-1-身体跨IB] [vertex_count:2558]
drawindexed = 13836,70386,0

;MARK:ResourceBuffer----------------------------------------------------------
[Resource_6b3c1103_VertexLimit]
type = Buffer
format = R32G32B32A32_UINT
data = 1025 0 0 0

;MARK:ResourceBuffer----------------------------------------------------------
[Resource6b3c1103Position]
type = ByteAddressBuffer
stride = 40
filename = Buffer/6b3c1103-Position.buf

[Resource6b3c1103Texcoord]
type = Buffer
stride = 8
filename = Buffer/6b3c1103-Texcoord.buf

[Resource6b3c1103Blend]
type = ByteAddressBuffer
stride = 32
filename = Buffer/6b3c1103-Blend.buf

[Resource_6b3c1103_Component1]
type = Buffer
format = DXGI_FORMAT_R32_UINT
filename = Buffer/6b3c1103-Component1.buf

;MARK:ResourceBuffer----------------------------------------------------------
[Resource_81d8e71a_VertexLimit]
type = Buffer
format = R32G32B32A32_UINT
data = 36397 0 0 0

;MARK:ResourceBuffer----------------------------------------------------------
[Resource81d8e71aPosition]
type = ByteAddressBuffer
stride = 40
filename = Buffer/81d8e71a-Position.buf

[Resource81d8e71aTexcoord]
type = Buffer
stride = 8
filename = Buffer/81d8e71a-Texcoord.buf

[Resource81d8e71aBlend]
type = ByteAddressBuffer
stride = 32
filename = Buffer/81d8e71a-Blend.buf

[Resource_81d8e71a_Component1]
type = Buffer
format = DXGI_FORMAT_R32_UINT
filename = Buffer/81d8e71a-Component1.buf

;MARK:ResourceBuffer----------------------------------------------------------
[Resource_298dc3b2_VertexLimit]
type = Buffer
format = R32G32B32A32_UINT
data = 1051 0 0 0

;MARK:ResourceBuffer----------------------------------------------------------
[Resource298dc3b2Position]
type = ByteAddressBuffer
stride = 40
filename = Buffer/298dc3b2-Position.buf

[Resource298dc3b2Texcoord]
type = Buffer
stride = 8
filename = Buffer/298dc3b2-Texcoord.buf

[Resource298dc3b2Blend]
type = ByteAddressBuffer
stride = 32
filename = Buffer/298dc3b2-Blend.buf

[Resource_298dc3b2_Component1]
type = Buffer
format = DXGI_FORMAT_R32_UINT
filename = Buffer/298dc3b2-Component1.buf

;MARK:ResourceTexture----------------------------------------------------------
[Resource_298dc3b2_1_d4b0a178_Slot_DiffuseMap]
filename = Texture/298dc3b2_1_d4b0a178_Slot_DiffuseMap.dds

;MARK:VertexShaderCheck----------------------------------------------------------
[ShaderOverride_a3c5c0c308ddeb69]
hash = a3c5c0c308ddeb69
if $costume_mods
  checktextureoverride = ib
endif

[ShaderOverride_e0f9ed199a2a5226]
hash = e0f9ed199a2a5226
if $costume_mods
  checktextureoverride = ib
endif

[ShaderOverride_98d23592a35efad9]
hash = 98d23592a35efad9
if $costume_mods
  checktextureoverride = ib
endif

[ShaderOverride_1757673cfe604ebe]
hash = 1757673cfe604ebe
if $costume_mods
  checktextureoverride = ib
endif

[ShaderOverride_2030c989673a6153]
hash = 2030c989673a6153
if $costume_mods
  checktextureoverride = ib
endif

[ShaderOverride_50bca0018babfea7]
hash = 50bca0018babfea7
if $costume_mods
  checktextureoverride = ib
endif

[ShaderOverride_3a66ac7f1cda3dd7]
hash = 3a66ac7f1cda3dd7
if $costume_mods
  checktextureoverride = ib
endif

[ShaderOverride_b57c0b15f73f5439]
hash = b57c0b15f73f5439
if $costume_mods
  checktextureoverride = ib
endif

[ShaderOverride_e81384063af12b94]
hash = e81384063af12b94
if $costume_mods
  checktextureoverride = ib
endif

;sha256=180ab2c539fc9db7795401fdf5af7c4fb102d09b97ce65a7c809e8ebaa681718
```

## 🔍 核心原理

```

[TextureOverride_VB_6b3c1103_丝袜_Texcoord]
hash = 62585f16
vb1 = Resource6b3c1103Texcoord



[TextureOverride_VB_81d8e71a_衣服_Texcoord]
hash = d4615e17
vb1 = Resource81d8e71aTexcoord


[TextureOverride_VB_298dc3b2_腿和脖子_Texcoord]
hash = c3af7d47
vb1 = Resource298dc3b2Texcoord


;MARK:TextureOverrideIB----------------------------------------------------------
[TextureOverride_IB_6b3c1103_丝袜_Component1]
hash = 6b3c1103
match_first_index = 0
checktextureoverride = vb1
handling = skip
ib = Resource_6b3c1103_Component1
if $swapkey0 == 1
  ; [mesh:6b3c1103-1-丝袜.001] [vertex_count:1025]
  drawindexed = 5517,0,0
endif


[Resource_VB0]
[Resource_VB1]
;MARK:TextureOverrideIB----------------------------------------------------------
[TextureOverride_IB_81d8e71a_衣服_Component1]
hash = 81d8e71a
match_first_index = 0
checktextureoverride = vb1
handling = skip
ib = Resource_81d8e71a_Component1
if $swapkey1 == 1
  ; [mesh:81d8e71a-1-水印] [vertex_count:27152]
  drawindexed = 38829,0,0
endif

; [mesh:81d8e71a-1-衣服.001] [vertex_count:6687]
drawindexed = 31557,38829,0

Resource_VB0 = ref vb0
Resource_VB1 = ref vb1

;MARK:TextureOverrideIB----------------------------------------------------------
[TextureOverride_IB_298dc3b2_腿和脖子_Component1]
hash = 298dc3b2
match_first_index = 0
checktextureoverride = vb1
handling = skip
ib = Resource_298dc3b2_Component1
ps-t8 = Resource_298dc3b2_1_d4b0a178_Slot_DiffuseMap
; [mesh:298dc3b2-1-腿和脖子.001] [vertex_count:1051]
drawindexed = 5517,0,0

ib = Resource_81d8e71a_Component1
vb0 = Resource_VB0
vb1 = Resource_VB1
; [mesh:81d8e71a-1-身体跨IB] [vertex_count:2558]
drawindexed = 13836,70386,0



```

首先我们知道

TextureOverride_IB_81d8e71a_衣服_Component1

它是复制一部分衣服的部分

TextureOverride_IB_298dc3b2_腿和脖子_Component1

它负责身体的部分

那么如果要实现跨IB渲染，我们就需要在身体的部分，把我们用衣服部分传递权重制作的身体模型给渲染出来。

所以首先，我们会在衣服的部分备份vb0和vb1：

```
[Resource_VB0]
[Resource_VB1]
;MARK:TextureOverrideIB----------------------------------------------------------
[TextureOverride_IB_81d8e71a_衣服_Component1]
hash = 81d8e71a
match_first_index = 0
checktextureoverride = vb1
handling = skip
ib = Resource_81d8e71a_Component1
if $swapkey1 == 1
  ; [mesh:81d8e71a-1-水印] [vertex_count:27152]
  drawindexed = 38829,0,0
endif

; [mesh:81d8e71a-1-衣服.001] [vertex_count:6687]
drawindexed = 31557,38829,0

Resource_VB0 = ref vb0
Resource_VB1 = ref vb1

```

这里的：

```ini
[Resource_VB0]
[Resource_VB1]
```

就是声明资源。

这里的：

```ini
Resource_VB0 = ref vb0
Resource_VB1 = ref vb1
```

就是备份资源。

备份完成资源后，要在身体的部分 `DrawIndexed` 出来，在 `DrawIndexed` 之前，需要替换 `IB`、`VB0`、`VB1`，如下：

```ini
;MARK:TextureOverrideIB----------------------------------------------------------
[TextureOverride_IB_298dc3b2_腿和脖子_Component1]
hash = 298dc3b2
match_first_index = 0
checktextureoverride = vb1
handling = skip
ib = Resource_298dc3b2_Component1
ps-t8 = Resource_298dc3b2_1_d4b0a178_Slot_DiffuseMap
; [mesh:298dc3b2-1-腿和脖子.001] [vertex_count:1051]
drawindexed = 5517,0,0

ib = Resource_81d8e71a_Component1
vb0 = Resource_VB0
vb1 = Resource_VB1
; [mesh:81d8e71a-1-身体跨IB] [vertex_count:2558]
drawindexed = 13836,70386,0
```

这里的代码是我们额外加上的，加在身体部分正常 `drawindexed` 完成之后：

```ini
ib = Resource_81d8e71a_Component1
vb0 = Resource_VB0
vb1 = Resource_VB1
; [mesh:81d8e71a-1-身体跨IB] [vertex_count:2558]
drawindexed = 13836,70386,0
```

这里的：

```ini
; [mesh:81d8e71a-1-身体跨IB] [vertex_count:2558]
drawindexed = 13836,70386,0
```

就是原本正常生成完 Mod 后，是在衣服部分 `drawindexed` 的，我们挪过来了。

到这里跨 **IB** 渲染就完成了，我们成功的把身体模型用衣服的权重来传递，并且在衣服的部位上生成 Mod，最后使用跨 **IB** 渲染技术，在身体部位绘制，以达到衣服部位生成的 Mod 使用身体材质渲染的效果。

## ⚠️ 注意事项

每个游戏的跨 **IB** 方法，都要随机应变，甚至每种 **Shader** 的跨 **IB** 方法都不一样，没有完全相同的方法适用于所有场景，理解其核心原理就好。

比如有些是在 `VB0` 的替换部分 `draw` 完成后 `copy So0` 的，比如有些除了 `copy vb0` 之外，还需要 `copy cs-t0` 等等来修正坐标系，具体 Mod 具体分析即可。

> 💡 **提示**：如果不懂的话，首选方案还是找别人做好的跨 **IB** 渲染 Mod 来参考原理。

- 这种跨IB渲染需要两个IB部位的数据类型完全相同，否则无法实现正确的效果，且受限于统一的骨骼变换矩阵架构，即Shader架构。

另外还有一种思路是在生成Mod时就把要跨IB渲染的部位按照目标IB的数据结构去生成，但是这个可能依赖于Shader处理的骨骼变换矩阵是否完全一致，如果不一致则会导致无法实现，所以没有去测试过，大部分都是不一致的

所以不要考虑这些。

