<template>
  <div @mousemove="onMouseMove" class="app" :class="{ 'no-cursor': isCursorHidden }">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isCursorHidden = ref(false); // 是否隐藏鼠标指针
let timer: number | null = null; // 保存计时器的引用

const onMouseMove = () => {
  // 如果鼠标指针已隐藏，显示它
  if (isCursorHidden.value) {
    isCursorHidden.value = false;
  }

  // 清除之前的计时器
  if (timer !== null) {
    clearTimeout(timer);
  }

  // 重置计时器，在指定时间后隐藏鼠标
  timer = window.setTimeout(() => {
    isCursorHidden.value = true; // 设置鼠标指针隐藏
  }, 10000); // 10000ms = 10秒
};


onMounted(() => {
  setTimeout(() => {
    // 移除 Loading 效果
    const appContainer = document.querySelector('#app');
    const loadingContainer = document.querySelector('#loading-mask');
    loadingContainer && appContainer?.removeChild(loadingContainer);
  }, 500)
  // 添加鼠标移动事件监听器
  window.addEventListener("mousemove", onMouseMove);
})

onUnmounted(() => {
  // 移除鼠标移动事件监听器
  window.removeEventListener("mousemove", onMouseMove);
  // 清除计时器
  if (timer !== null) clearTimeout(timer);
});

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

.no-cursor {
  cursor: none !important;
  /* 隐藏鼠标箭头 */
}
</style>