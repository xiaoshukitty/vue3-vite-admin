<template>
    <div :class="['tabbar',layOutThemeStore.theme === 'dark' ? 'tabbar-theme' : '']">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Setting from './setting/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import { useThemeStore } from '@/store/modules/theme'

let layOutThemeStore = useThemeStore();
</script>
<script lang="ts">
export default {
    name: "Tabbar"
}
</script>
<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
    background-color: #fff !important;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}

.tabbar-theme {
    border-bottom: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    background-color: var(--header-bg-color) !important;
}
</style>