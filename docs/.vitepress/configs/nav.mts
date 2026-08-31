import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  {
    text: '文档',
    items: [
      { text: 'Mod 格式转换教程', link: '/newbie/reverse/Introduction/Introduction' },
      { text: 'ib vb fmt 与 SSMT 格式', link: '/newbie/reverse/IBVBFmtAndSSMT/IBVBFmtAndSSMT' },
      { text: '形态键面板 Mod 转换演示', link: '/newbie/reverse/ShapeKeyPanelModConvert/ShapeKeyPanelModConvert' },
      { text: '原神 Mod 防报错', link: '/games/gimi/HowToSolveErrorCode/HowToSolveErrorCode' }
    ]
  },
  { text: 'GitHub', link: 'https://github.com/StarBobis/MIMITools' },
  { text: '赞助', link: 'https://afdian.com/item/ec74ee782b2f11efb5a052540025c377' }
]
