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

运行完成后就可以把.msi或.exe的安装包发给客户了