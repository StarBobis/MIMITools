import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/newbie/reverse/': [
    {
      text: 'Mod 逆向教程',
      items: [
        { text: '自动逆向功能', link: '/newbie/reverse/Introduction/Introduction' },
        { text: '如何激活自动逆向', link: '/newbie/reverse/HowToActivateAutoReverse/HowToActivateAutoReverse' },
        { text: '一键逆向后导入 Blender', link: '/newbie/reverse/T004ImportIntoBlender/T004ImportIntoBlender' },
        { text: '筛选正确的数据类型', link: '/newbie/reverse/T005UseCorrectDataType/T005UseCorrectDataType' },
        { text: '格式：ib vb fmt 与 SSMT 格式', link: '/newbie/reverse/IBVBFmtAndSSMT/IBVBFmtAndSSMT' },
        { text: '手动逆向功能', link: '/newbie/reverse/ManualReverse/ManualReverse' },
        { text: '案例：形态键面板 Mod 转换演示', link: '/newbie/reverse/ShapeKeyPanelModConvert/ShapeKeyPanelModConvert' },
        { text: '案例：原神脸部逆向', link: '/newbie/reverse/GenshinFaceReverse/GenshinFaceReverse' },
        { text: '案例：调用 TexFx 绘制的 Mod', link: '/newbie/reverse/Case_DrawWithTexFx/Case_DrawWithTexFx' },
        { text: '案例：IndexBuffer 膨胀混淆', link: '/newbie/reverse/BufferInflationObfuscation/BufferInflationObfuscation' },
        { text: '案例：ResourceVBList.size() 为 4 的 Mod', link: '/newbie/reverse/ResourceVBListSize4/ResourceVBListSize4' },
        { text: '案例：NPC Mod', link: '/newbie/reverse/NPCModReverseIssue/NPCModReverseIssue' },
        { text: '骨骼：模型如何绑定骨骼', link: '/newbie/reverse/BindModelToBone/BindModelToBone' },
        { text: '骨骼：米游系列原包骨骼', link: '/newbie/reverse/HoyoGamesBone/HoyoGamesBone' },
        { text: '骨骼：鸣潮解包原骨骼', link: '/newbie/reverse/WutheringWavesBone/WutheringWavesBone' },
        { text: '萌新常见问题', link: '/newbie/reverse/FAQ/FAQ' },
        { text: '常见问题解答 (FAQ)', link: '/newbie/reverse/T006FAQ/T006FAQ' },
        { text: '逆向后没有脸部模型？', link: '/newbie/reverse/WhyNoFaceModel/WhyNoFaceModel' }
      ]
    }
  ],
  '/games/gimi/': [
    {
      text: '原神',
      items: [
        { text: '10612-4001 等报错解决方法', link: '/games/gimi/HowToSolveErrorCode/HowToSolveErrorCode' }
      ]
    }
  ]
}
