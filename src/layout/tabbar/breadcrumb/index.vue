<template>
    <!-- 顶部左侧 -->
    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold?'Expand':'Fold'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>qq地图</el-breadcrumb-item>
        <el-breadcrumb-item>高德</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting'

//获取 layout相关配置的仓库
let LayOutSettingStore = useLayOutSettingStore();

//定义控制图标切换
let fold = ref(false)
const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold;
}
</script>
<script lang="ts">
export default {
    name: "Breadcrumb"
}
</script>
<style scoped></style>