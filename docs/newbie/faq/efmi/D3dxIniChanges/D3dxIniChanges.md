# 终末地d3dx.ini变更

在终末地的一次版本更新后，所有的Mod都炸了，因为终末地的渲染把所有内容都放到了一个巨大的Buffer中，然后通过byte_offset来区分开不同的部分。

对此，SpectrumQT进行了修复，如下需要注意：

## track_region_hashes  
```ini
; When enabled, 3DMigoto hashes relevant buffer region data used by the current draw,
; instead of relying on the full resource hash.
;
; Some games pack multiple meshes into a single vertex or index buffer and
; bind different regions via offsets. In these cases, hashing the entire
; resource is not sufficient to uniquely identify a draw call.
;
; Index Buffers (IB):
;   - The region size can be determined from IndexCount
;   - Hash is computed from the exact data range used by the draw call
;
; Vertex Buffers (VB):
;   - Non-indexed draws (VertexCount available):
;       Hash is computed from the full referenced region
;   - Indexed draws (no explicit VertexCount):
;       Vertex count is estimated (~15% of IndexCount)
;       Hash is computed from approximately the first 50% of that region
```

## track_implicit_index_buffers 

```ini
; When enabled, 3DMigoto will remember the last index buffer bound via IASetIndexBuffer
; and automatically rebind it for subsequent draw calls that do not explicitly set one.
;
; This is primarily needed for engines that reuse index buffers across multiple draws
; without rebinding them every time. Without this option, such draw calls may appear
; as if they have no index buffer bound, which can break features that rely on it.
;
; In particular, it allows `CheckTextureOverride = ib` to work with implicitly set IBs.
; - Only affects indexed draw calls (IndexCount > 0).
; - Has no effect if the application already binds index buffers explicitly.

```

## overlay_buffer_hash_lifetime
```ini
; Number of frames a IB/VB buffer hash can remain in the overlay 
; for cycling through without being encountered again before it is purged.
; If >= 0, stale hashes are removed once per frame before Present processing.
; Automatically set to 0 with Rendering > track_region_hashes enabled.
overlay_buffer_hash_lifetime = -1
```

## allow_buffer_resize
```ini
; Enables buffer resizing for overrides, allowing vertex and structured buffers
; to be expanded beyond their original size. Primarily used for "vertex limit raise"
; scenarios where the games default buffer size is too small.
;
; When enabled, buffer size can be overridden using TextureOverride section parameters:
;
;   override_vertex_count
;       Specifies the desired number of vertices. This is the main control used
;       to increase buffer capacity.
;
;   override_byte_stride
;       Required when using override_vertex_count. Defines the size (in bytes)
;       of a single vertex. The final buffer size is computed as:
;           override_vertex_count * override_byte_stride
;
;   uav_byte_stride (optional)
;       If set, adjusts the number of UAV elements based on stride mismatch.
;       Useful when the actual buffer layout differs from what the game declares.
;
; Behavior:
;   - If override_vertex_count > 0:
;       Buffer size is recomputed using the provided stride
;       UAV element count is adjusted accordingly
;
;   - If not set, but section name contains "VertexLimitRaise":
;       Falls back to a default ~8.8 MB buffer size (legacy behavior)
;
; Notes:
;   - override_byte_stride must be specified when using override_vertex_count,
;     or the override will fail
;   - Incorrect values may lead to rendering issues or crashes
allow_buffer_resize = 1
```