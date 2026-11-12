## Naraka快速跨IB渲染功能

以席拉默认皮肤为例：

 ![alt text](image.png)

 我们提取出来身体和胸部衣服的IB

 ![alt text](image-1.png)

 然后直接打开蓝图，右键添加一个Naraka 跨IB渲染

 ![alt text](image-2.png)

 然后选择源头物体和目标物体：

 ![alt text](image-3.png)

 例如，衣服使用身体的渲染：

 ![alt text](image-4.png)

 然后直接生成Mod：

 ![alt text](image-5.png)

 注意：这里源头物体和目标物体的Submesh子网格必须不同

生成的ini是标准化的：

![alt text](image-6.png)

备份资源声明统一在下面：

![alt text](image-7.png)

## 总结
相比于每次手写，现在只需要在蓝图里添加这个节点就能全自动写，解放一部分冗余重复性劳动。
