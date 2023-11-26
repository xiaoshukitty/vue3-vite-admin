<template>
    <!-- 路由组件出口位置(展示二级路由) -->
    <router-view v-slot="{ Component }">
        <!-- 路由过度动画 -->
        <transition name="fade">
            <!-- 渲染 layout 一级路由的子路由 -->
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang='ts'>

//获取 setting 仓库
import useLayOutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue';
let layOutSettingStore = useLayOutSettingStore();

//控制当前组件是否销毁重建
let flag = ref(true);

//监听仓库 layOutSettingStore.refsh 数据是否发生变化，如果发生变化说明用户点击过刷新按钮
watch(() => layOutSettingStore.refsh, () => {
    //点击刷新组件销毁
    flag.value = false;
    // nextTick 响应式数据发生变化之后，获取更新之后的 dom。不要用延迟器不靠谱
    nextTick(() => {
        flag.value = true;
    })
})



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