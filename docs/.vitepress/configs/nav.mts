import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: 'Home', link: '/' },
  {
    text: '新手教程',
    activeMatch: '/newbie/',
    items: [
      {
        text: 'SSMT',
        link: '/newbie/ssmt/Index/Index'
      },
      {
        text: 'TheHerta4',
        link: '/newbie/theherta4/TheHerta3Installation/TheHerta3Installation'
      },
      {
        text: 'Reverse',
        link: '/newbie/reverse/FAQ/FAQ'
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
    text: '游戏配置',
    activeMatch: '/games/',
    items: [
      {
        text: '原神',
        link: '/games/gimi/BaseInfo/BaseInfo'
      },
      {
        text: '崩坏:星穹铁道',
        link: '/games/srmi/BaseInfo/BaseInfo'
      },
      {
        text: '明日方舟:终末地',
        link: '/games/efmi/BaseInfo/BaseInfo'
      },
      {
        text: '燕云十六声',
        link: '/games/yysls/BaseInfo/BaseInfo'
      },
      {
        text: '少女前线2:追放',
        link: '/games/gf2/BaseInfo/BaseInfo'
      },
      {
        text: '崩坏3',
        link: '/games/himi/BaseInfo/BaseInfo'
      },
      {
        text: '第五人格',
        link: '/games/identityv/BaseInfo/BaseInfo'
      },
      {
        text: 'Liar\'s Bar',
        link: '/games/liarsbar/BaseInfo/BaseInfo'
      },
      {
        text: '鸣潮',
        link: '/games/wwmi/BaseInfo/BaseInfo'
      },
      {
        text: '绝区零',
        link: '/games/zzmi/BaseInfo/BaseInfo'
      },
      {
        text: '异环',
        link: '/games/ntemi/BaseInfo/BaseInfo'
      }
    ]
  },
  {
    text: '开发者文档',
    activeMatch: '/developer/',
    items: [
      {
        text: 'VitePress2.0文档',
        link: '/developer/vitepress/project-init'
      },
      {
        text: 'Tauri学习笔记',
        link: '/developer/tauri/HowToSetIcon/HowToSetIcon'
      },

      {
        text: 'Rust 学习笔记',
        link: '/developer/rust/简介'
      }
    ]
  }
]
