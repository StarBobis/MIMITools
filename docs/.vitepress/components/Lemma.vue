<script setup lang="ts">
import { inject, ref } from 'vue'

const props = defineProps<{
    title?: string
}>()

// 全局 lemma 计数器
const lemmaCounter = inject('lemmaCounter') as { value: number }
lemmaCounter.value++
const id = lemmaCounter.value
</script>

<template>
    <div class="lemma-box">
        <div class="lemma-title">
            引理 {{ id }} <span v-if="title">（{{ title }}）</span>
        </div>
        <div class="lemma-body">
            <slot />
        </div>
    </div>
</template>