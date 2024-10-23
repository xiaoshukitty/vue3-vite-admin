<template>
    <div class="tabbar">
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
</script>
<script lang="ts">
export default {
    name: "Tabbar"
}
</script>
<style scoped lang="scss">
.tabbar {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 1.25rem;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
    }
}
</style>