import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  {
    text: '文档',
    items: [
      { text: 'Mod 逆向教程', link: '/newbie/reverse/Introduction/Introduction' },
      { text: '原神 Mod 防报错', link: '/games/gimi/HowToSolveErrorCode/HowToSolveErrorCode' }
    ]
  },
  { text: 'GitHub', link: 'https://github.com/StarBobis/MIMITools' },
  { text: '赞助', link: 'https://afdian.com/item/ec74ee782b2f11efb5a052540025c377' }
]
