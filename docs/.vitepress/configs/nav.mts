import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: 'Home', link: '/' },
  {
    text: '新手教程',
    activeMatch: '/newbie/',
    items: [
      {
        text: 'MMT',
        link: '/newbie/MMT/InjectionFAQ/InjectionFAQ'
      },
      {
        text: 'MIMIBlender',
        link: '/newbie/MIMIBlender/BaseInfo/BaseInfo'
      },
      {
        text: '3Dmigoto',
        link: '/migoto/Extra_VertexNumberRaise/Extra_VertexNumberRaise'
      },
      {
        text: 'Blender',
        link: '/blender/AlwaysSeeVertexNumber/AlwaysSeeVertexNumber'
      },
      {
        text: 'Tools',
        link: '/newbie/tools/PaintDotNet/PaintDotNet'
      },
      {
        text: 'Mod逆向',
        link: '/newbie/reverse/Welcome/Welcome'
      },
      {
        text: 'FAQ',
        link: '/newbie/faq/BaseInfo/BaseInfo'
      },
    ]
  },
]
