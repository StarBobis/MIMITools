<script setup>
import { ref, onBeforeUnmount } from 'vue'

const isClient = typeof document !== 'undefined'
const checkDark = () => (isClient ? document.documentElement.classList.contains('dark') : false)
const isDark = ref(checkDark())

let observer = null
if (isClient) {
    observer = new MutationObserver(() => {
        isDark.value = checkDark()
    })

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    })
}

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect()
    }
})
</script>

<template>
    <slot :isDark="isDark" />
</template>
