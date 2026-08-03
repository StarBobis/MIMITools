<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const audioEl = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const blockedByPolicy = ref(false)
const volume = ref(0.3)

const musicSrc = withBase('/Background.ogg')
const volumePercent = computed(() => `${Math.round(volume.value * 100)}%`)

const buttonTitle = computed(() => {
  if (blockedByPolicy.value) return '浏览器限制自动播放，点击后开始播放'
  return isPlaying.value ? '暂停背景音乐' : '播放背景音乐'
})

const playNow = async () => {
  const el = audioEl.value
  if (!el) return
  try {
    await el.play()
    isPlaying.value = true
    blockedByPolicy.value = false
  } catch {
    isPlaying.value = false
    blockedByPolicy.value = true
  }
}

const pauseNow = () => {
  const el = audioEl.value
  if (!el) return
  el.pause()
  isPlaying.value = false
}

const setVolume = (value: number) => {
  const normalized = Math.min(1, Math.max(0, value))
  volume.value = normalized
  const el = audioEl.value
  if (el) {
    el.volume = normalized
  }
  localStorage.setItem('bgm-volume', String(normalized))
}

const onVolumeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  setVolume(Number(target.value))
}

const togglePlay = () => {
  if (isPlaying.value) {
    pauseNow()
  } else {
    void playNow()
  }
}

const resumeOnGesture = () => {
  void playNow()
}

onMounted(() => {
  const saved = Number(localStorage.getItem('bgm-volume'))
  if (!Number.isNaN(saved)) {
    setVolume(saved)
  }

  if (audioEl.value) {
    audioEl.value.volume = volume.value
  }

  // Direct src playback uses browser progressive loading.
  void playNow()
  window.addEventListener('pointerdown', resumeOnGesture, { once: true })
  window.addEventListener('keydown', resumeOnGesture, { once: true })
  window.addEventListener('touchstart', resumeOnGesture, { once: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', resumeOnGesture)
  window.removeEventListener('keydown', resumeOnGesture)
  window.removeEventListener('touchstart', resumeOnGesture)
})
</script>

<template>
  <div class="music-control" :class="{ blocked: blockedByPolicy }">
    <div class="music-shell">
      <button class="music-toggle" :title="buttonTitle" @click="togglePlay">
        <span class="play-mark" :class="{ pause: isPlaying }" aria-hidden="true"></span>
      </button>

      <div class="music-meta">
        <span class="label">BGM</span>
        <span class="status" :class="{ on: isPlaying }">{{ isPlaying ? 'ON' : 'OFF' }}</span>
      </div>

      <div class="volume-control">
        <span class="volume-mark" aria-hidden="true"></span>
        <input
          class="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="volume"
          @input="onVolumeInput"
          aria-label="背景音乐音量"
          title="背景音乐音量"
        />
        <span class="volume-value">{{ volumePercent }}</span>
      </div>
    </div>

    <audio
      ref="audioEl"
      :src="musicSrc"
      preload="none"
      loop
      @play="isPlaying = true"
      @pause="isPlaying = false"
    />
  </div>
</template>

<style scoped>
.music-control {
  display: flex;
  align-items: center;
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid rgba(249, 212, 108, 0.16);
  height: 32px;
  transition: border-color 0.3s;
}

.music-shell {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 3px 8px 3px 4px;
  border: 1px solid rgba(235, 92, 32, 0.18);
  border-radius: 999px;
  background:
    linear-gradient(135deg, rgba(249, 212, 108, 0.16), rgba(235, 92, 32, 0.08)),
    rgba(255, 255, 255, 0.72);
  box-shadow: 0 6px 18px rgba(73, 45, 34, 0.08);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.dark .music-shell {
  border-color: rgba(249, 212, 108, 0.22);
  background:
    linear-gradient(135deg, rgba(249, 212, 108, 0.12), rgba(235, 92, 32, 0.12)),
    rgba(11, 12, 21, 0.78);
  box-shadow: 0 6px 18px rgba(13, 58, 105, 0.22);
}

.music-shell:hover,
.music-shell:focus-within {
  border-color: rgba(235, 92, 32, 0.42);
  box-shadow: 0 8px 22px rgba(235, 92, 32, 0.16);
}

.music-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ssmt-hermes), var(--ssmt-china-red));
  color: #fff;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(200, 22, 29, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.music-toggle:hover {
  transform: translateY(-1px);
  filter: brightness(1.04);
  box-shadow: 0 5px 14px rgba(200, 22, 29, 0.32);
}

.music-toggle:focus-visible {
  outline: 2px solid var(--ssmt-schonbrunn);
  outline-offset: 2px;
}

.play-mark {
  display: block;
  width: 0;
  height: 0;
  margin-left: 2px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid currentColor;
}

.play-mark.pause {
  width: 8px;
  height: 10px;
  margin-left: 0;
  border-top: 0;
  border-bottom: 0;
  border-left: 3px solid currentColor;
  border-right: 3px solid currentColor;
}

.music-meta {
  display: grid;
  gap: 1px;
  min-width: 31px;
  line-height: 1;
}

.label {
  color: var(--vp-c-text-1);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.status {
  color: var(--ssmt-danger);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.6px;
}

.status.on {
  color: var(--ssmt-success);
}

.music-control.blocked .status {
  color: var(--ssmt-warning);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 8px;
  border-left: 1px solid rgba(73, 45, 34, 0.12);
}

.dark .volume-control {
  border-left-color: rgba(249, 212, 108, 0.14);
}

.volume-mark {
  position: relative;
  width: 12px;
  height: 12px;
  color: var(--ssmt-van-dyke);
}

.dark .volume-mark {
  color: var(--ssmt-schonbrunn);
}

.volume-mark::before {
  content: "";
  position: absolute;
  left: 0;
  top: 4px;
  width: 4px;
  height: 4px;
  background: currentColor;
  border-radius: 1px;
}

.volume-mark::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 2px;
  width: 6px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-radius: 50%;
}

.volume-value {
  width: 27px;
  color: var(--ssmt-van-dyke);
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
  text-align: right;
}

.dark .volume-value {
  color: var(--ssmt-schonbrunn);
}

.volume-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 72px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--ssmt-hermes), var(--ssmt-schonbrunn));
  cursor: pointer;
  outline: none;
  opacity: 0.86;
  transition: opacity 0.2s ease;
}

.volume-slider:hover,
.volume-slider:focus-visible {
  opacity: 1;
}

.volume-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: transparent;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 13px;
  height: 13px;
  margin-top: -4.5px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: var(--ssmt-schonbrunn);
  box-shadow: 0 1px 5px rgba(73, 45, 34, 0.35);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.14);
  box-shadow: 0 0 10px rgba(235, 92, 32, 0.46);
}

.dark .volume-slider::-webkit-slider-thumb {
  border-color: var(--ssmt-van-dyke);
}

.volume-slider::-moz-range-track {
  height: 4px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--ssmt-hermes), var(--ssmt-schonbrunn));
}

.volume-slider::-moz-range-thumb {
  width: 11px;
  height: 11px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: var(--ssmt-schonbrunn);
  box-shadow: 0 1px 5px rgba(73, 45, 34, 0.35);
  cursor: pointer;
}

.dark .volume-slider::-moz-range-thumb {
  border-color: var(--ssmt-van-dyke);
}

.music-control.blocked .music-shell {
  border-color: rgba(200, 22, 29, 0.45);
  box-shadow: 0 6px 18px rgba(200, 22, 29, 0.16);
}

audio {
  display: none;
}

@media (max-width: 768px) {
  .music-control {
    display: none;
  }
}
</style>
