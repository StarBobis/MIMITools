<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'

const showDropdown = ref(false)
const currentLang = ref('zh-CN')
let observer: MutationObserver | null = null
let scriptEl: HTMLScriptElement | null = null

const languages = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ru', label: 'Русский' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' }
]

const currentLabel = computed(() =>
  languages.find(l => l.code === currentLang.value)?.label ?? '简体中文'
)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const selectLang = (lang: string) => {
  if (lang === currentLang.value) {
    showDropdown.value = false
    return
  }

  currentLang.value = lang
  showDropdown.value = false

  // 设置 Google 翻译 Cookie
  const cookieValue = `/auto/${lang}`
  
  document.cookie = `googtrans=${cookieValue}; path=/;`
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`
  
  // 刷新页面以应用翻译
  window.location.reload()
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.translate-wrapper')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // 读取当前 Cookie 中的语言设置
  const cookies = document.cookie.split(';')
  const googtrans = cookies.find(c => c.trim().startsWith('googtrans='))
  if (googtrans) {
    const lang = googtrans.split('/').pop()
    if (lang && languages.some(l => l.code === lang)) {
      currentLang.value = lang
    }
  }

  // 初始化 Google 翻译（隐藏模式）
  // @ts-ignore
  window.googleTranslateElementInit = () => {
    // @ts-ignore
    new window.google.translate.TranslateElement(
      { 
        pageLanguage: 'zh-CN', 
        includedLanguages: 'en,ja,ko,ru,zh-CN,es,fr,de',
        autoDisplay: false 
      },
      'google_translate_element'
    )
  }

  const existingScript = document.querySelector<HTMLScriptElement>('script[src*="translate_a/element.js"]')
  if (existingScript) {
    scriptEl = existingScript
  } else {
    scriptEl = document.createElement('script')
    scriptEl.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    scriptEl.async = true
    document.body.appendChild(scriptEl)
  }

  // ---------------------------------------------------------
  // 强力去广告/去横幅逻辑
  // ---------------------------------------------------------
  observer = new MutationObserver(() => {
    // 1. 移除顶部横幅 iframe
    const banner = document.querySelector('.goog-te-banner-frame')
    if (banner) {
      banner.remove()
    }

    // 2. 强制重置 body 样式，防止页面下移
    if (document.body.style.top !== '0px' && document.body.style.top !== '') {
      document.body.style.top = '0px'
    }
    
    // 3. 移除其他可能的 Google 容器
    const frames = document.querySelectorAll('iframe[id*=":1.container"]')
    frames.forEach(frame => {
        if (frame instanceof HTMLElement) frame.style.display = 'none'
    })
  })

  observer.observe(document.body, { 
    childList: true, 
    attributes: true, 
    attributeFilter: ['style', 'class'] 
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <div class="translate-wrapper notranslate" translate="no">
    <button class="translate-btn" @click.stop="toggleDropdown" :class="{ active: showDropdown }">
      <svg class="translate-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m5 8 6 6"/>
        <path d="m4 14 6-8 2-2"/>
        <path d="M2 5h12"/>
        <path d="M7 2h1"/>
        <path d="m22 22-5-10-5 10"/>
        <path d="M14 18h6"/>
      </svg>
      <span class="selected-text">{{ currentLabel }}</span>
      <svg class="chevron-icon" :class="{ open: showDropdown }" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="showDropdown" class="translate-dropdown">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="dropdown-item"
          :class="{ active: lang.code === currentLang }"
          @click="selectLang(lang.code)"
        >
          <span class="item-label">{{ lang.label }}</span>
          <span v-if="lang.code === currentLang" class="item-check">✓</span>
        </button>
      </div>
    </Transition>

    <!-- 隐藏的原生组件挂载点 -->
    <div id="google_translate_element" style="display: none;"></div>
  </div>
</template>

<style>
.translate-wrapper {
  display: flex;
  align-items: center;
  padding: 0 8px;
  position: relative;
}

/* ---- 触发按钮 ---- */
.translate-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px 5px 7px;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.translate-btn:hover,
.translate-btn.active {
  background-color: rgba(249, 212, 108, 0.1);
  border-color: rgba(235, 92, 32, 0.22);
}

.dark .translate-btn:hover,
.dark .translate-btn.active {
  background-color: rgba(235, 92, 32, 0.14);
  border-color: rgba(249, 212, 108, 0.26);
}

.translate-icon {
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  transition: color 0.25s ease, transform 0.3s ease;
}

.translate-btn:hover .translate-icon,
.translate-btn.active .translate-icon {
  color: var(--ssmt-hermes);
  transform: rotate(-8deg) scale(1.1);
}

.selected-text {
  font-size: 12px;
  line-height: 1;
  transition: color 0.25s ease;
}

.translate-btn:hover .selected-text,
.translate-btn.active .selected-text {
  color: var(--ssmt-burgundy);
}

.chevron-icon {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: transform 0.3s ease, color 0.25s ease;
}

.chevron-icon.open {
  transform: rotate(180deg);
}

.translate-btn:hover .chevron-icon,
.translate-btn.active .chevron-icon {
  color: var(--ssmt-hermes);
}

/* ---- 自定义下拉菜单 ---- */
.translate-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 8px;
  min-width: 140px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(235, 92, 32, 0.22);
  border-radius: 10px;
  padding: 5px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.06),
    0 12px 36px rgba(73, 45, 34, 0.1);
  z-index: 100;
  overflow: hidden;
}

.dark .translate-dropdown {
  background-color: rgba(11, 12, 21, 0.7);
  border-color: rgba(249, 212, 108, 0.28);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.2),
    0 12px 36px rgba(0, 0, 0, 0.3);
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 7px 12px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: rgba(249, 212, 108, 0.14);
  color: var(--ssmt-burgundy);
  padding-left: 16px;
}

.dark .dropdown-item:hover {
  background-color: rgba(235, 92, 32, 0.16);
}

.dropdown-item.active {
  color: var(--ssmt-hermes);
  font-weight: 600;
}

.item-check {
  font-size: 13px;
  opacity: 0.8;
}

/* ---- 展开/收起动画 ---- */
.dropdown-enter-active {
  animation: dropIn 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.dropdown-leave-active {
  animation: dropOut 0.15s ease-in;
}

@keyframes dropIn {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes dropOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-4px) scale(0.97);
  }
}

/* 彻底隐藏 Google 翻译的所有 UI 元素 */
.goog-te-banner-frame.skiptranslate {
  display: none !important;
}

body {
  top: 0px !important;
}

/* 隐藏 Google 翻译的鼠标悬停提示框 (Tooltip) */
.goog-tooltip, 
#goog-gt-tt, 
.goog-te-balloon-frame {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* 强力覆盖 Google 翻译的高亮样式 */
.goog-text-highlight {
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
  position: static !important;
  color: inherit !important;
}

/* 覆盖 hover 状态，防止鼠标悬停变色 */
.goog-text-highlight:hover {
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

/* 修复翻译后的字体标签样式 */
font {
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
  color: inherit !important;
  font-family: inherit !important;
  font-size: inherit !important;
  font-weight: inherit !important;
}

/* 针对带有内联样式的 font 标签进行覆盖 */
font[style] {
  background-color: transparent !important;
  box-shadow: none !important;
}

/* 隐藏 Google 建议的弹窗 */
#goog-gt-tt {
  display: none !important;
  visibility: hidden !important;
}

@media (max-width: 768px) {
  .translate-wrapper {
    display: none;
  }
}
</style>
