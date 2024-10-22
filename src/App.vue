<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    console.log('测试log');

    // 移除 Loading 效果
    const appContainer = document.querySelector('#app');
    const loadingContainer = document.querySelector('#loading-mask');
    loadingContainer && appContainer?.removeChild(loadingContainer);
  }, 500)
})
</script>

<style scoped lang="scss">
/** 去掉页面滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>