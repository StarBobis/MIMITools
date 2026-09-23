绝区零中角色的头发那个刘海阴影也是实体建模，但是不能直接制作Mod替换，需要用到一些特殊技巧，可参考别人做好的模板：

```ini
; Ellen

; Constants -------------------------

; Overrides -------------------------




[TextureOverrideEllenHairPosition]
hash = a5448398
handling = skip
vb0 = ResourceEllenHairPosition
vb2 = ResourceEllenHairBlend
draw = 8274,0

[TextureOverrideEllenHairTexcoord]
hash = 9cddb082
vb1 = ResourceEllenHairTexcoord

[TextureOverrideEllenBodyTexcoord]
hash = 26966844
vb1 = ResourceEllenBodyTexcoord

[TextureOverrideEllenBodyVertexLimitRaise]
hash = 7bd3f8c2

[TextureOverrideEllenBodyPosition]
hash = 89d5fba4
handling = skip
vb0 = ResourceEllenBodyPosition
vb2 = ResourceEllenBodyBlend
draw = 5947,0

[ResourceEllenVirtualHairPosition]
[TextureOverrideEllenHairVertexLimitRaise]
hash = d59a5fec
ResourceEllenVirtualHairPosition = ref this



[ResourceCaputreCB0]
[ResourceCaputreCB1]
[TextureOverrideEllenHairIB]
hash = 7f89a2b3
handling = skip
ResourceCaputreCB0 = copy vs-cb0 unless_null
ResourceCaputreCB1 = copy vs-cb1 unless_null
;drawindexed = auto



[TextureOverrideEllenHairA]
hash = 7f89a2b3
match_first_index = 0
run = CommandListSkinTexture
ib = ResourceEllenHairAIB

[TextureOverrideEllenHairADiffuse]
hash = 81ccd2e2
this = ResourceEllenBodyADiffuse

[TextureOverrideEllenHairALightMap]
hash = dc9d8b6e
this = ResourceEllenBodyALightMap

[TextureOverrideEllenHairAMaterialMap]
hash = 01bb8189
this = ResourceEllenBodyAMaterialMap

[TextureOverrideEllenHairANormalMap]
hash = aaadca31
this = ResourceEllenBodyANormalMap



[ResourceTemp0]
[ResourceTemp1]
[TextureOverrideEllenBodyA]
hash = a72cfb34
match_first_index = 0
handling = skip
run = CommandListSkinTexture
ib = ResourceEllenBodyAIB
drawindexed = auto

ib = ResourceEllenHairAIB
vb0 = ResourceEllenVirtualHairPosition
vb1 = ResourceEllenHairTexcoord
vb3 = ResourceEllenHairBlend
ResourceTemp0 = ref vs-cb0
ResourceTemp1 = ref vs-cb1
vs-cb0 = ResourceCaputreCB0
vs-cb1 = ResourceCaputreCB1
drawindexed = auto
vs-cb0 = ref ResourceTemp0
vs-cb1 = ref ResourceTemp1



[TextureOverrideEllenBodyADiffuse]
hash = cf5f5fed
this = ResourceEllenBodyADiffuse

[TextureOverrideEllenBodyALightMap]
hash = ff26fb83
this = ResourceEllenBodyALightMap

[TextureOverrideEllenBodyAMaterialMap]
hash = f4487235
this = ResourceEllenBodyAMaterialMap

[TextureOverrideEllenBodyANormalMap]
hash = 798c3a51
this = ResourceEllenBodyANormalMap

; CommandList -----------------------

; Resources -------------------------

[ResourceEllenHairPosition]
type = Buffer
stride = 40
filename = EllenHairPosition.buf

[ResourceEllenHairBlend]
type = Buffer
stride = 32
filename = EllenHairBlend.buf

[ResourceEllenHairTexcoord]
type = Buffer
stride = 24
filename = EllenHairTexcoord.buf

[ResourceEllenBodyPosition]
type = Buffer
stride = 40
filename = EllenBodyPosition.buf

[ResourceEllenBodyBlend]
type = Buffer
stride = 32
filename = EllenBodyBlend.buf

[ResourceEllenBodyTexcoord]
type = Buffer
stride = 24
filename = EllenBodyTexcoord.buf

[ResourceEllenHairAIB]
type = Buffer
format = DXGI_FORMAT_R32_UINT
filename = EllenHairA.ib

[ResourceEllenBodyAIB]
type = Buffer
format = DXGI_FORMAT_R32_UINT
filename = EllenBodyA.ib

; [ResourceEllenHairADiffuse]
; filename = EllenHairADiffuse.dds

; [ResourceEllenHairALightMap]
; filename = EllenHairALightMap.dds

; [ResourceEllenHairAMaterialMap]
; filename = EllenHairAMaterialMap.dds

; [ResourceEllenHairANormalMap]
; filename = EllenHairANormalMap.dds

[ResourceEllenBodyADiffuse]
filename = EllenBodyADiffuse.dds

[ResourceEllenBodyALightMap]
filename = EllenBodyALightMap.dds

[ResourceEllenBodyAMaterialMap]
filename = EllenBodyAMaterialMap.dds

[ResourceEllenBodyANormalMap]
filename = EllenBodyANormalMap.dds
```