<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { initMeteorEffect, stopMeteorEffect } from '../meteors'
import { isEffectsEnabled } from '../themeState'
// @ts-ignore
import customStyles from '../index.css?inline'

const isLoading = ref(false)
const videoElement = ref(null)

const toggleEffects = () => {
  if (isEffectsEnabled.value) {
    // Turn off
    isEffectsEnabled.value = false
    disableEffects()
    localStorage.setItem('visual-effects-enabled', 'false')
  } else {
    // Turn on
    isEffectsEnabled.value = true
    isLoading.value = true
    enableEffects()
    localStorage.setItem('visual-effects-enabled', 'true')
  }
}

const disableEffects = () => {
  // Remove video
  if (videoElement.value) {
    videoElement.value.pause()
    videoElement.value.removeAttribute('src')
    videoElement.value.load()
    videoElement.value.remove()
    videoElement.value = null
  } else {
    const el = document.querySelector('.bg-video')
    if (el) {
      // @ts-ignore
      el.pause()
      // @ts-ignore
      el.removeAttribute('src')
      // @ts-ignore
      el.load()
      el.remove()
    }
  }
  
  // Stop meteors
  stopMeteorEffect()

  // Remove custom CSS
  const styleTag = document.getElementById('custom-theme-styles')
  if (styleTag) {
    styleTag.remove()
  }
}

const enableEffects = () => {
  // Inject custom CSS
  if (!document.getElementById('custom-theme-styles')) {
    const style = document.createElement('style')
    style.id = 'custom-theme-styles'
    style.textContent = customStyles
    document.head.appendChild(style)
  }

  // Start meteors immediately
  initMeteorEffect()
  
  // Load video
  loadVideo()
}

const loadVideo = () => {
  const videoUrl = withBase('/background.webm')

  createVideoElement(videoUrl)
}

const createVideoElement = (src) => {
  // Avoid duplicates
  if (document.querySelector('.bg-video')) return

  const video = document.createElement('video')
  video.className = 'bg-video'
  video.muted = true
  video.loop = true
  video.preload = 'auto'
  video.playsInline = true

  video.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    will-change: transform;
    transform: translateZ(0);
    transition: opacity 1.5s ease-in-out;
  `

  document.body.appendChild(video)
  videoElement.value = video

  const showPausedFrame = () => {
    // Show the video element at its current position (paused) as a static background
    video.style.opacity = '0.3'
    isLoading.value = false
  }

  const startPlayback = () => {
    // Seek to beginning and start normal playback
    video.currentTime = 0
    video.play().catch(() => {})
  }

  video.addEventListener('loadeddata', () => {
    // Seek to 1s to show a representative paused frame
    video.currentTime = 1
    showPausedFrame()
    // If fully buffered already, start playing immediately
    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      startPlayback()
    }
  }, { once: true })

  // Fires when the browser has buffered enough data to play through the entire video
  video.addEventListener('canplaythrough', startPlayback, { once: true })

  video.addEventListener('error', () => {
    if (src.endsWith('.webm')) {
      video.pause()
      video.removeAttribute('src')
      video.load()
      video.remove()
      if (videoElement.value === video) {
        videoElement.value = null
      }
      createVideoElement(withBase('/background.mp4'))
    } else {
      isLoading.value = false
    }
  }, { once: true })

  video.src = src
  video.load()

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    video.currentTime = 1
    showPausedFrame()
  }
  if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
    startPlayback()
  }
}

onMounted(() => {
  // Always enable effects
  isEffectsEnabled.value = true
  isLoading.value = true
  enableEffects()
})

onBeforeUnmount(() => {
  disableEffects()
})
</script>

<template>
  <div class="effect-control" :class="{ active: isEffectsEnabled, loading: isLoading }">
    <button
      class="effect-switch"
      @click="toggleEffects"
      :title="isEffectsEnabled ? '关闭视觉特效 (节省性能)' : '开启视觉特效 (消耗性能)'"
      :disabled="isLoading"
      :aria-pressed="isEffectsEnabled"
    >
      <span class="effect-track" aria-hidden="true">
        <span class="effect-thumb"></span>
      </span>
      <span class="effect-label">FX</span>
      <span class="effect-status">{{ isLoading ? '...' : isEffectsEnabled ? 'ON' : 'OFF' }}</span>
    </button>
  </div>
</template>

<style scoped>
.effect-control {
  display: flex;
  align-items: center;
  margin-left: 8px;
  height: 28px;
}

.effect-switch {
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 3px 8px 3px 4px;
  border: 1px solid rgba(1, 139, 141, 0.18);
  border-radius: 999px !important;
  background: rgba(255, 255, 255, 0.68);
  background-clip: padding-box;
  color: var(--vp-c-text-1);
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.dark .effect-switch {
  border-color: rgba(113, 226, 209, 0.2);
  background: rgba(13, 58, 105, 0.18);
}

.effect-switch:hover:not(:disabled),
.effect-switch:focus-visible {
  border-color: rgba(1, 139, 141, 0.38);
  background: rgba(113, 226, 209, 0.12);
}

.dark .effect-switch:hover:not(:disabled),
.dark .effect-switch:focus-visible {
  border-color: rgba(113, 226, 209, 0.38);
  background: rgba(113, 226, 209, 0.1);
}

.effect-switch:hover:not(:disabled) {
  transform: translateY(-1px);
}

.effect-switch:focus-visible {
  outline: 2px solid rgba(113, 226, 209, 0.55);
  outline-offset: 2px;
}

.effect-switch:disabled {
  cursor: wait;
  opacity: 0.72;
}

.effect-track {
  position: relative;
  flex: 0 0 auto;
  width: 26px;
  height: 16px;
  border-radius: 999px !important;
  background: rgba(200, 22, 29, 0.12);
  transition: background-color 0.2s ease;
}

.effect-control.active .effect-track {
  background: rgba(110, 204, 84, 0.18);
}

.effect-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  border-radius: 50% !important;
  background: var(--ssmt-danger);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.effect-control.active .effect-thumb {
  transform: translateX(10px);
  background: var(--ssmt-success);
}

.effect-control.loading .effect-thumb {
  background: var(--ssmt-tech);
}

.effect-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
}

.effect-status {
  min-width: 18px;
  color: var(--ssmt-danger);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
  text-align: right;
}

.effect-control.active .effect-status {
  color: var(--ssmt-success);
}

.effect-control:not(.active) .effect-status {
  color: var(--ssmt-danger);
}

.effect-control.loading .effect-status {
  color: var(--ssmt-info);
}

@media (max-width: 768px) {
  .effect-control {
    display: none;
  }
}
</style>
