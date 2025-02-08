<template>
    <!-- 路由组件出口位置(展示二级路由) -->
    <router-view>
    </router-view>
</template>

<script setup lang='ts'>



</script>
<style scoped>
/* 配置过度动画 */
.fade-enter-from {
    opacity: 0;
    /* 缩放 */
    transform: scale(0);
}

.fade-enter-active {
    transition: all 0.3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>