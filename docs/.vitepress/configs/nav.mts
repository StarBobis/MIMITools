import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: 'Home', link: '/' },
  {
    text: '新手教程',
    activeMatch: '/newbie/',
    items: [
      {
        text: 'MMT',
        link: '/newbie/MMT/WhatIsVSCheck/WhatIsVSCheck'
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
        text: 'FAQ',
        link: '/newbie/faq/BaseInfo/BaseInfo'
      },
    ]
  },
  {
    text: '附加功能',
    activeMatch: '/other/',
    items: [
      {
        text: 'Mod逆向',
        link: '/other/reverse/Welcome/Welcome'
      },
      {
        text: '原神10612-4001报错',
        link: '/other/gimierror/GenshinImpactError/GenshinImpactError'
      },
    ]
  },
  {
    text: '游戏配置',
    activeMatch: '/games/',
    items: [
      { items: [
        { text: '原神', link: '/games/gimi/BaseInfo/BaseInfo' },
        { text: '崩坏三', link: '/games/himi/BaseInfo/BaseInfo' },
        { text: '崩坏:星穹铁道', link: '/games/srmi/BaseInfo/BaseInfo' },
        { text: '绝区零', link: '/games/zzmi/BaseInfo/BaseInfo' },
        { text: '鸣潮', link: '/games/wwmi/BaseInfo/BaseInfo' },
        { text: '明日方舟:终末地', link: '/games/efmi/BaseInfo/BaseInfo' },
      ] },
      { items: [
        { text: '燕云十六声', link: '/games/yysls/BaseInfo/BaseInfo' },
        { text: '少女前线2:追放', link: '/games/gf2/BaseInfo/BaseInfo' },
        { text: '第五人格', link: '/games/identityv/BaseInfo/BaseInfo' },
        { text: 'Liar\'s Bar', link: '/games/liarsbar/BaseInfo/BaseInfo' },
        { text: '异环', link: '/games/ntemi/BaseInfo/BaseInfo' },
        { text: '永劫无间', link: '/games/naraka/BaseInfo/BaseInfo' },
      ] }
    ]
  }
]
