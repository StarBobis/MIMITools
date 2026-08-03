// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { nav } from './configs/nav.mts'
import { sidebar } from './configs/sidebar.mts'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import katexPlugin from './katex-compat.js'
// import strict from 'node:assert/strict'

export default defineConfig({
  base: "/MIMITools/",
  title: "MIMITools",
  description: "MIMITools - 二次元游戏 Mod 模型提取与逆向工具",
  appearance: true,

  themeConfig: {
    nav,
    sidebar,
    search: {
      provider: 'local'
    }
  },

  markdown: {
    config: (md) => {
      md.use(tabsMarkdownPlugin)
      md.use(katexPlugin, {
        throwOnError: false,
        strict: false
      })
    },
    lineNumbers: true,
    math: true
  },
  vite: {
    optimizeDeps: {
      include: ['katex'],
      exclude: ['markdown-it-katex']
    },
    ssr: {
      noExternal: ['katex']
    }
  }
})
