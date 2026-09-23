项目创建完成之后，如果要进行构建用于分发给客户的安装宝，可以使用如下命令：
`bun run tauri build`

但是大概率如下：
```
PS D:\Dev\ssmt4> bun run tauri build
$ tauri build
        Info Looking up installed tauri packages to check mismatched versions...
     Running beforeBuildCommand `bun run build`
$ vue-tsc --noEmit && vite build
vite v6.4.1 building for production...
✓ 1509 modules transformed.
dist/index.html                   0.49 kB │ gzip:   0.31 kB
dist/assets/index-DkgnEtiy.css  351.05 kB │ gzip:  47.77 kB
dist/assets/index-C6Zt2TZm.js   473.14 kB │ gzip: 152.46 kB
✓ built in 3.32s
   Compiling proc-macro2 v1.0.106
   Compiling unicode-ident v1.0.22
   Compiling quote v1.0.44
   Compiling cfg-if v1.0.4
   Compiling serde_core v1.0.228

       （此处省略一万字）
       
   Compiling ssmt4 v0.1.0 (D:\Dev\ssmt4\src-tauri)                                             
   Compiling muda v0.17.1                                                                      
   Compiling tao v0.34.5                                                                       
   Compiling webview2-com v0.38.2
    Finished `release` profile [optimized] target(s) in 2m 07s                                 
       Built application at: D:\Dev\ssmt4\src-tauri\target\release\ssmt4.exe
        Info Target: x64
     Running candle for "D:\\Dev\\ssmt4\\src-tauri\\target\\release\\wix\\x64\\main.wxs"
     Running light to produce D:\Dev\ssmt4\src-tauri\target\release\bundle\msi\ssmt4_0.1.0_x64_en-US.msi
        Warn NSIS directory contains mis-hashed files. Redownloading them.
 Downloading https://github.com/tauri-apps/nsis-tauri-utils/releases/download/nsis_tauri_utils-v0.5.3/nsis_tauri_utils.dll
failed to bundle project `timeout: global`
       Error failed to bundle project `timeout: global`
error: script "tauri" exited with code 1
```

此时只需要让你的terminal走代理即可：
```
$env:HTTP_PROXY="http://127.0.0.1:7890"
$env:HTTPS_PROXY="http://127.0.0.1:7890"

```

然后就能正确构建成功了：
```
PS D:\Dev\ssmt4> bun run tauri build
$ tauri build
        Info Looking up installed tauri packages to check mismatched versions...
     Running beforeBuildCommand `bun run build`
$ vue-tsc --noEmit && vite build
vite v6.4.1 building for production...
✓ 1509 modules transformed.
dist/index.html                   0.49 kB │ gzip:   0.31 kB
dist/assets/index-DkgnEtiy.css  351.05 kB │ gzip:  47.77 kB
dist/assets/index-C6Zt2TZm.js   473.14 kB │ gzip: 152.46 kB
✓ built in 3.34s
   Compiling ssmt4 v0.1.0 (D:\Dev\ssmt4\src-tauri)
    Finished `release` profile [optimized] target(s) in 30.27s
       Built application at: D:\Dev\ssmt4\src-tauri\target\release\ssmt4.exe
        Info Target: x64
     Running candle for "D:\\Dev\\ssmt4\\src-tauri\\target\\release\\wix\\x64\\main.wxs"
     Running light to produce D:\Dev\ssmt4\src-tauri\target\release\bundle\msi\ssmt4_0.1.0_x64_en-US.msi
        Warn NSIS directory contains mis-hashed files. Redownloading them.
 Downloading https://github.com/tauri-apps/nsis-tauri-utils/releases/download/nsis_tauri_utils-v0.5.3/nsis_tauri_utils.dll
        Info validating hash
        Info Target: x64
     Running makensis to produce D:\Dev\ssmt4\src-tauri\target\release\bundle\nsis\ssmt4_0.1.0_x64-setup.exe
    Finished 2 bundles at:
        D:\Dev\ssmt4\src-tauri\target\release\bundle\msi\ssmt4_0.1.0_x64_en-US.msi
        D:\Dev\ssmt4\src-tauri\target\release\bundle\nsis\ssmt4_0.1.0_x64-setup.exe
```