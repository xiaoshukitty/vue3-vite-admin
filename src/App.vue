<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    setTimeout(() => {
        // 移除 Loading 效果
        const appContainer = document.querySelector('#app');
        const loadingContainer = document.querySelector('#loading-mask');
        loadingContainer && appContainer.removeChild(loadingContainer);
    }, 1000)
})
</script>

<style scoped lang="scss"></style>