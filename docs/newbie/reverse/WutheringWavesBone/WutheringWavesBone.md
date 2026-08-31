# 🔧 鸣潮解包获取原骨骼来绑骨

## 📥 (1) 下载安装 FModel 并配置鸣潮 AES 密钥

鸣潮的游戏原模型和原骨骼可以通过解包获取，一般为 **FModel + AES 密钥**。

- **FModel 下载地址**: [https://fmodel.app/](https://fmodel.app/)
- **鸣潮 AES 密钥获取处**: [https://github.com/ClostroOffi/wuwa-aes-archive](https://github.com/ClostroOffi/wuwa-aes-archive)

### 操作步骤
*(由于软件和版本会随时间更新，此步骤仅供参考，实际操作时记得随机应变)*

1. 下载 FModel 后，解压到原地：

   ![解压 FModel](image.png)

2. 运行 FModel.exe：

   ![运行 FModel](image-1.png)

3. 如果提示更新，就更新一下：

   ![更新提示](image-2.png)

   更新完就能正常使用了。

4. 设置里游戏切换到鸣潮：

   ![切换游戏](image-3.png)

5. 左上角 Directory 选择新的：

   ![选择 Directory](image-4.png)

   选你的鸣潮安装路径即可。

   ![安装路径](image-5.png)

   随后可以看到，左侧就有游戏的模型文件可以选择了。

## 🔑 填写 AES Key

![AES Key 设置](image-6.png)

这里我们打开文档开头提到的 GitHub 地址来寻找对应的 AES 密钥，逐个填写：

![GitHub AES](image-7.png)

填正确之后，左侧小图标都会变绿：

![图标变绿](image-8.png)

然后 Load Mode 选择 All，点击 Load：

![Load Mode](image-9.png)

然后跳到了文件夹结构：

![文件夹结构](image-10.png)

以角色为例，Client => Aki => Character => Role，基本上角色都在这里：

![角色文件夹](image-11.png)

选择对应的 Model：

![选择 Model](image-12.png)

进入具体文件列表页面：

![文件列表](image-13.png)

找到角色模型双击就可以显示了：

![显示模型](image-14.png)

右键保存一下：

![保存模型](image-15.png)

然后点击在 Explorer 中显示：

![Explorer 显示](image-16.png)

就得到了 psk 文件：

![PSK 文件](image-17.png)

把这个 psk 放桌面，方便导入，然后去 Blender 中导入。

### 导入 PSK 文件到 Blender

导入 psk 文件需要安装插件，如果没安装的话，先安装一下：
[https://extensions.blender.org/add-ons/io-scene-psk-psa/](https://extensions.blender.org/add-ons/io-scene-psk-psa/)

![安装插件](image-18.png)

![启用插件](image-19.png)

安装后确保启用，然后我们导入：

![导入 PSK](image-20.png)

可以看到角色就导入成功了：

![导入成功](image-21.png)

这里我们用的角色是鉴心，所以找个鉴心的 Mod 来转换。

## 🔗 (2) Mod 模型绑定游戏原骨骼

参考这个视频：[https://www.bilibili.com/video/BV1St5VzrE16/?spm_id_from=333.1387.homepage.video_card.click](https://www.bilibili.com/video/BV1St5VzrE16/?spm_id_from=333.1387.homepage.video_card.click)